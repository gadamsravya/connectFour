
var createCanvas= document.getElementById('Connect4');
var ctx = createCanvas.getContext("2d");

var parentStyle = createCanvas.parentElement.style;
parentStyle.textAlign = "center";

currentTurn = 1;

function createGrid(){
    let newGrid = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]

    return newGrid;
}

// Randomising Function
function random (item){
    return item[Math.floor(Math.random()*item.length)];
}

// This is the display of the board
function draw(grid, cof) {
    w=90;
    ctx.clearRect(0, 0, createCanvas.width, createCanvas.height);
    ctx.font="30px Arial";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(0, 0, cof.columns*w, cof.rows*w);
    
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.strokeStyle = 'black'
    ctx.stroke();
    
    for(let i=0; i < cof.rows; i++){
        for(let j=0 ; j < cof.columns; j++){

            ctx.beginPath()
            ctx.lineWidth = 1;
            ctx.arc(j*w + w/2,i*w +w/2, w/3, 0, 2*Math.PI);
            
            if(grid[i][j] == 0){
                ctx.fillStyle = 'white';
                ctx.fill();
                ctx.strokeStyle = 'black'
                ctx.stroke();
            }
            else if (grid[i][j] == 1){
                ctx.fillStyle = 'red';
                ctx.fill();
                ctx.strokeStyle = 'black'
                ctx.stroke();
            } else if(grid[i][j] == 2){
                ctx.fillStyle = 'yellow';
                ctx.fill();
                ctx.strokeStyle = 'black'
                ctx.stroke();
            }

        }
    }
}

function copy(grid){
    return grid1 = grid;
}
// These functions will be used to calculate the score  of the grid.
//The score for the moves
function score(board, cof, colNo, marker){

    var board_copy = {...board};
    board_copy.grid = add_coin_temp(board_copy.grid ,cof, colNo, marker);
    var complete4 = no_of_coins(board_copy.grid, marker, cof, 4);
    var count_3 = no_of_coins(board_copy.grid, marker, 3);
    var count_3_op = no_of_coins(board_copy.grid, marker%2 + 1, 3);
    var complete4_op = no_of_coins(board_copy.grid, marker%2 + 1, 4);

    return complete4*1000000 + count_3*1000 - count_3_op*100 - complete4_op*100000;
}
// The number coins of each move
function no_of_coins(grid, marker, cof, no_coin){
    var count_coin = 0;
    //Horizontal Check
    for (let i = 0; i < cof.rows; i++){
        for (let j = 0; j < cof.columns - cof.inArow + 1; j++){
                count = 0;
                count_0 = 0;
                for (let k = 0; k < cof.inArow; k++){
                    if(grid[i][j+k] == marker){
                            count++;
                    }
                    else if(grid[i][j+k] == 0)
                            count_0++;
                }

                if(count == no_coin && count_0 == cof.inArow - no_coin)
                    {count_coin++;}
        }
    }

    //Vertical Check
    for (let i = 0; i < cof.rows - cof.inArow + 1; i++){
        for (let j = 0; j < cof.columns; j++){
                count = 0;
                count_0 = 0;
                for (let k = 0; k < cof.inArow; k++){
                    if(grid[i+k][j] == marker){
                            count++;
                    } 
                    else if(grid[i][j+k] == 0)
                        count_0++;
                }

                if(count == no_coin && count_0 == cof.inArow - no_coin)
                    {count_coin++;}
        }
    }

    //Positive Diagnol Check
    for(let i = 0; i < cof.rows - cof.inArow + 1; i++){
        for(let j = 0; j < cof.columns - cof.inArow + 1; j++){
            count = 0;
            for(let k = 0; k < cof.inArow; k++){
                if(grid[i+k][j+k] == marker){
                    count++;
                }
                else if(grid[i][j+k] == 0)
                            count_0++;
            }

            if(count == no_coin && count_0 == cof.inArow - no_coin)
                    {count_coin++;}
        }
    }

    //Negative Diagnol Check
    for(let i = 0; i < cof.rows - cof.inArow + 1; i++){
        for(let j = cof.inArow-1; j < cof.columns; j++){
            count = 0;
            for(let k = 0; k < cof.inArow; k++){
                if(grid[i+k][j-k] == marker){
                    count++;
                }
                else if(grid[i][j+k] == 0)
                            count_0++;
            }

            if(count == no_coin && count_0 == cof.inArow - no_coin)
                    {count_coin++;}
        }
    }

    return count_coin;

}

function add_coin_temp(grid, cof, add_col, marker)
{
    for(let i = cof.rows-1; i>=0; i--){
        if(grid[i][add_col - 1] == 0){
            grid[i][add_col - 1] = marker;
            break;
        }
    }
    return grid;
}

// The next move
function next_move_score(board, cof, marker){
    var move_list = [];
    for(let i = 0; i< cof.columns; i++){
        if(board.grid[0][i]==0)
            move_list.push(i+1);
    }
    var score_list = [];
    if(move_list.length != 0){
        for(let i=0; i<move_list.length; i++){
            
            alert(board.grid);
            let n = score(board, cof, move_list[i], marker);
            score_list.push(n);
        }
        var max_score = 0;
        var n;
        for(let i=0; i<score_list.length; i++){

            if(max_score < score_list[i]){
                max_score = score_list[i];
                n = move_list[i];
            }
        }
        add_coin(board, cof, marker, n);
    }
    return n;
}

// This function checks wether the board has a winning postion or not
function checkWin(board, cof, marker){
    var grid = board.grid;
    //Horizontal Check
    for (let i = 0; i < cof.rows; i++){
        for (let j = 0; j < cof.columns - cof.inArow + 1; j++){
                count = 0;
                for (let k = 0; k < cof.inArow; k++){
                    if(grid[i][j+k] == marker){
                            count++;
                    }
                }

                if(count == cof.inArow)
                    return true;
        }
    }

    //Vertical Check
    for (let i = 0; i < cof.rows - cof.inArow + 1; i++){
        for (let j = 0; j < cof.columns; j++){
                count = 0;
                for (let k = 0; k < cof.inArow; k++){
                    if(grid[i+k][j] == marker){
                            count++;
                    }
                }

                if(count == cof.inArow)
                    return true;
        }
    }

    //Positive Diagnol Check
    for(let i = 0; i < cof.rows - cof.inArow + 1; i++){
        for(let j = 0; j < cof.columns - cof.inArow + 1; j++){
            count = 0;
            for(let k = 0; k < cof.inArow; k++){
                if(grid[i+k][j+k] == marker){
                    count++;
                }
            }

            if(count == cof.inArow)
                return true;
        }
    }

    //Negative Diagnol Check
    for(let i = 0; i < cof.rows - cof.inArow + 1; i++){
        for(let j = cof.inArow-1; j < cof.columns; j++){
            count = 0;
            for(let k = 0; k < cof.inArow; k++){
                if(grid[i+k][j-k] == marker){
                    count++;
                }
            }

            if(count == cof.inArow)
                return true;
        }
    }

    return false;

}

//Add the coin to the board from the user
function add_coin(board, cof, marker, add_col){
    grid = board.grid;
    for(let i = cof.rows-1; i>=0; i--){
        if(grid[i][add_col - 1] == 0){
            grid[i][add_col - 1] = marker;
            board.grid = grid;
            return true;
        }
    }
    return false;
}
//Add coin by the computer
function next_move(board, cof, marker){
    var move_list = [];
    for(let i = 0; i< cof.columns; i++){
        if(board.grid[0][i]==0)
            move_list.push(i);
    }

    if(move_list.length != 0){
        var n = random(move_list) + 1;
        add_coin(board, cof, marker, n);
    }

    return n;
}
var cof = {
    columns: 7,
    rows : 6,
    inArow: 4
};

grid = createGrid();

var board = {
    grid : grid,
    mark1 : 1,
    mark2 : 2
}

function setup(){
    currentTurn = currentTurn + 1;
    draw(grid, cof); 
    if(checkWin(board, cof, 1)){
        if(confirm("You won!! New Game?"))
            location.reload();
        else {
            document.getElementById("button").disabled = true;
            document.getElementById("colNumber").disabled = true;
            document.clearTimeout(function(){let x=0});
        }
    } else if (checkWin(board, cof, 2)){
        if(confirm("Computer won!! New Game?"))
            location.reload();
        else {
            document.getElementById("button").disabled = true;
            document.getElementById("colNumber").disabled = true;
            document.clearTimeout(function(){let x=0});
        }
    }

    else{
    if(currentTurn%2 == 0){
    var colNum = document.getElementById("colNumber").value;
    while (colNum < 1 || colNum > 7){
        colNum = document.getElementById("colNumber").value;
    }
    if(add_coin(board, cof, 1, colNum))
        { 
            draw(board.grid, cof);
            flag = true;
        }
    else 
       {
        if(confirm("You lost the game for choosing invalid column!! New Game?"))
            location.reload();
    else
        {
            document.getElementById("button").disabled = true;
            document.getElementById("colNumber").disabled = true;
            document.clearTimeout(function(){let x=0});
        }
       }
    }
    else{
       
        var n = next_move_score(board, cof, 2);
        document.getElementById("Put_text").innerHTML = n;
        draw(board.grid, cof);  
    }
    }     
}



setup();