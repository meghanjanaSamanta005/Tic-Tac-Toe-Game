var player1Symbol = ''
var player2Symbol = ''
var currTurn = 1;
var count = 0;
var matrix = [
	['-', '-', '-'],
	['-', '-', '-'],
	['-', '-', '-']
]


document.querySelector(".header h1").addEventListener("click", ()=>{window.location.reload()})
document.querySelectorAll("#symbol-select-container span").forEach(element => {
	element.addEventListener("click", startGame);
})
document.querySelectorAll("#grid-container>div").forEach(element => {
	element.addEventListener("click", checkAndMark)
})


function startGame()
{
	// console.log(this)
	
	if(this.innerHTML == 'X')
	{
		player1Symbol = 'X';
		player2Symbol = 'O'
	}
	else
	{
		player1Symbol = 'O';
		player2Symbol = 'X'
	}	
	
	document.getElementById("symbol-select-container").style.display = "none";
	document.getElementById("game-container").classList.remove("hide");
	
	document.getElementById("p1").innerHTML = `Player 1 (${player1Symbol})`;
	document.getElementById("p2").innerHTML = `Player 2 (${player2Symbol})`;
	
}


function checkAndMark()
{
	val = this.getAttribute("val")
	const i = Number(val[0]);
	const j = Number(val[1]);
	
	if(matrix[i][j] != '-')
		return;
	
	// --- if(matrix[i][j] == '-'), then proceed below ---
	
	if(currTurn == 1)
	{
		matrix[i][j] = player1Symbol;
		this.innerHTML = `<span>${player1Symbol}</span>`;		
	}
	else	// if(currTurn == 2)
	{
		matrix[i][j] = player2Symbol;
		this.innerHTML = `<span>${player2Symbol}</span>`;
	}
	
	count++;
	if(checkWin(i,j))
		stopGame(currTurn)
	else if(count == 9)
		stopGame(0);
	else
	{
		if(currTurn == 1)
		{
			currTurn = 2;
			document.querySelector("#turn-indicator").style.left = "140px";
			document.querySelector("#p1").style.color = "var(--theme)"
			document.querySelector("#p2").style.color = "white"
		}
		else
		{
			currTurn = 1;
			document.querySelector("#turn-indicator").style.left = "0px";
			document.querySelector("#p1").style.color = "white"
			document.querySelector("#p2").style.color = "var(--theme)"
		}
	}
	
}


function checkWin(i,j)
{
	if(matrix[i][0] == matrix[i][1] && matrix[i][1] == matrix[i][2])
		return true;
	
	if(matrix[0][j] == matrix[1][j] && matrix[1][j] == matrix[2][j])
		return true;
	
	if(i==j)
	{
		if(matrix[0][0] == matrix[1][1] && matrix[1][1] == matrix[2][2])
			return true;
	}
	
	if(i+j==2)
	{
		if(matrix[0][2] == matrix[1][1] && matrix[1][1] == matrix[2][0])
			return true;
	}
	
	return false;
}


function stopGame(winner)
{
	const element = document.getElementById("result");
	element.classList.remove("hide")
	
	if(winner != 0)
	{
		element.innerHTML = `Player ${winner} has won !! &#x1F3C6;`;
	}
	else
	{
		element.innerHTML = " A Tie !!";
	}
	
	document.querySelectorAll("#grid-container>div").forEach(element => {
		element.removeEventListener("click", checkAndMark)
	})
	
	
}