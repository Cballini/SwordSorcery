var map=12;
var go;
var corps_snake = [[0,2],[0,1]];
var tete_snake = [0,2];
var direction ="droite";
var speed = 180;
var score = 0;
var scoreVictoire = 4;
/*********************************/
var iceKingGo;
var iceKing = [map,map];
var directionKing = "gauche";

var advMove = 4;
var advMoveMax = 4;

var gunter1 = [0,map];
var directionG1 = "gauche";

var gunter2 = [map,0];
var directionG2 = "droite";

/***********************************/

$(document).ready(function(){
	creer_map();
	load_game();
	changer_direction();
	creer_fruit();
});

function resetGame(){
	go;
	corps_snake = [[0,2],[0,1]];
	tete_snake = [0,2];
	direction ="droite";
	score = 0;
	/*********************************/
	iceKingGo;
	iceKing = [map,map];
	directionKing = "gauche";

	advMove = 4;

	gunter1 = [0,map];
	directionG1 = "gauche";

	gunter2 = [map,0];
	directionG2 = "droite";
}

//la fonction qui va creer la map
function creer_map(){
	var td = "";
	var tr = [];

	for(var i=0; i<=map;i++)
	{
		td += "<td class='endGame'></td>";
	}

	for(var i=0; i<=map;i++)
	{
		tr.push("<tr class='endGame'>"+td+"</tr>");
	}
	$(document.body).append("<table class='endGame'>"+tr.join("\n")+"</table>");
}

//la fonction qui va creer le snake
function creer_snake()
{
	$("td").removeClass("tete_snake corps_snake finn jake")
	for(var cell in corps_snake)
	{
		$("tr").eq(corps_snake[cell][0]).find("td").eq(corps_snake[cell][1]).addClass("corps_snake");
	}
	$("tr").eq(tete_snake[0]).find("td").eq(tete_snake[1]).addClass("tete_snake");

	if(score >= 0)
	{
		$("tr").eq(corps_snake[0][0]).find("td").eq(corps_snake[0][1]).addClass("finn");
		$("tr").eq(corps_snake[1][0]).find("td").eq(corps_snake[1][1]).addClass("jake");
	}
	if(score >= 1)
	{
		$("td").removeClass("bubblegum")
		$("tr").eq(corps_snake[2][0]).find("td").eq(corps_snake[2][1]).addClass("bubblegum");
	}
	if(score >= 2)
	{
		$("td").removeClass("flame")
		$("tr").eq(corps_snake[3][0]).find("td").eq(corps_snake[3][1]).addClass("flame");
	}
	if(score >= 3)
	{
		$("td").removeClass("marceline")
		$("tr").eq(corps_snake[4][0]).find("td").eq(corps_snake[4][1]).addClass("marceline");
	}
}

//la fonction qui va creer les ennemis
function creer_adv()
{
	$("td").removeClass("iceKing adv")
	$("tr").eq(iceKing[0]).find("td").eq(iceKing[1]).addClass("iceKing");
	$("tr").eq(iceKing[0]).find("td").eq(iceKing[1]).addClass("adv");

	if(score >= 1)
	{
		$("td").removeClass("gunter")
		$("tr").eq(gunter1[0]).find("td").eq(gunter1[1]).addClass("gunter");
		$("tr").eq(gunter1[0]).find("td").eq(gunter1[1]).addClass("adv");
	}

	if(score >= 2)
	{
		$("tr").eq(gunter2[0]).find("td").eq(gunter2[1]).addClass("gunter");
		$("tr").eq(gunter2[0]).find("td").eq(gunter2[1]).addClass("adv");
	}

}

//la fonction qui va actualiser la position du snake
function act_snake()
{
	
	var nvl_tete = [];
	var taille_snake = corps_snake.length;

	nvl_tete = move(direction, nvl_tete,tete_snake);

	//Detection fruit
	var cell = $("tr").eq(nvl_tete[0]).find("td").eq(nvl_tete[1]);
	if(cell.hasClass("fruit") && (!cell.hasClass("gameDoor")))
	{
		corps_snake.push([]);

		//Ajout score
		score += 1;

		//recreation du fruit
		creer_fruit();
	} 
	else if(cell.hasClass("corps_snake")) //Gestion Fin du jeu *****************************GAME OVER
	{	
		gameOver("Vous êtes bloqués");
	}
	else if(nvl_tete[0] < 0 || nvl_tete[1] < 0)
	{
		gameOver("Hors limite");
	}
	else if(nvl_tete[0] > map || nvl_tete[1] > map)
	{
		gameOver("Hors limite");
	}
	
	var cell_tete = $("tr").eq(tete_snake[0]).find("td").eq(tete_snake[1]);
	if(cell_tete.hasClass("finn jake bubblegum flame marceline") && score >= scoreVictoire)
	{
		cell_tete.removeClass("finn jake bubblegum flame marceline");
		console.log("score : " + score);
		gameOver("Victoire !!");
	}

	if(cell.hasClass("gameDoor"))
	{
		//Ajout score
		score += 1;
		for(var i=taille_snake-1; i>0 ; i--)
		{
			corps_snake[i] = corps_snake[i-1];
		}
		//MaJ des coord de la tete et du corps avec les nvl coord
		corps_snake[0] = tete_snake;
		creer_snake();
	}
	else{
		//virer une cell du corps du snake
		for(var i=taille_snake-1; i>0 ; i--)
		{
			corps_snake[i] = corps_snake[i-1];
		}
		//MaJ des coord de la tete et du corps avec les nvl coord
		corps_snake[0] = tete_snake = nvl_tete;
		creer_snake();
	}
	
}

function act_adv()
{
	var tabKing = [];
	var tabG1 = [];
	var tabG2 = [];
	directionKing = aleaDirection(directionKing);
	iceKing = move(directionKing,iceKing,iceKing);
	tabKing = correctMove(iceKing,directionKing);
	directionKing = tabKing["mouvement"];
	iceKing = tabKing["pos"];

	//Detection fruit
	catchFruit(iceKing);
	//Gestion Fin du jeu *****************************GAME OVER
	
	if(score >= 1)
	{
		directionG1 = aleaDirection(directionG1);
		gunter1 = move(directionG1,gunter1,gunter1);
		tabG1 = correctMove(gunter1,directionG1);
		directionG1 = tabG1["mouvement"];
		gunter1 = tabG1["pos"];
		//Detection fruit
		catchFruit(gunter1)
		//Gestion Fin du jeu *****************************GAME OVER
	}
	if(score >= 2)
	{
		directionG2 = aleaDirection(directionG2);
		gunter2 = move(directionG2,gunter2,gunter2);
		tabG2 = correctMove(gunter2,directionG2);
		directionG2 = tabG2["mouvement"];
		gunter2 = tabG2["pos"];
		//Detection fruit
		catchFruit(gunter2)
		//Gestion Fin du jeu *****************************GAME OVER
	}
	//MaJ des coord de la tete et du corps avec les nvl coord
	creer_adv();
}

//la fonction qui va nous permettre de commencer le jeu
function load_game()
{
	go = setInterval(act_snake,speed);
	//iceKingGo = setInterval(act_adv,speed);
}

// la fonction qui va nous permettre de changer de direction
function changer_direction()
{
	var gauche = 37, haut = 38, droite = 39, bas = 40;
	$("body").keydown(function(e){
		if(e.keyCode == gauche && direction != "droite"){
			direction = "gauche";
		}
		else if(e.keyCode == droite && direction != "gauche"){
			direction = "droite";
		}
		else if(e.keyCode == haut && direction != "bas"){
			direction = "haut";
		}
		else if(e.keyCode == bas && direction != "haut"){
			direction = "bas";
		}
	})
}

//la fonction qui va creer les fruits
function creer_fruit()
{
	$("td").removeClass('fruit');
	if(score <= 3)
	{
		fruit = [parseInt(Math.random()*map),parseInt(Math.random()*map)];
		$("tr").eq(fruit[0]).find("td").eq(fruit[1]).addClass("fruit");

		if(score == 0)
		{
			$("tr").eq(fruit[0]).find("td").eq(fruit[1]).addClass("bubblegum");
		}
		else if(score == 1)
		{
			$("tr").eq(fruit[0]).find("td").eq(fruit[1]).addClass("flame");
		}
		else if(score == 2)
		{
			$("tr").eq(fruit[0]).find("td").eq(fruit[1]).addClass("marceline");
		}
		else if(score == 3)
		{
			$("tr").eq(fruit[0]).find("td").eq(fruit[1]).addClass("gameDoor");
		}
	}
}

//la fonction qui va arreter le jeu
function gameOver(message)
{
	
	$('table').fadeTo('slow', 0.5, function()
	{
 	   $(this).css('background-image', "url('img/youdied.jpg')");
	}).fadeTo('slow', 1);

	console.log(message);
	clearInterval(go);
	clearInterval(iceKingGo);
	off();
}

// fonction qui change la direction selon une variable aleatoire
function aleaDirection(mouvement)
{
	if(advMove == 0)
	{
		var alea = parseInt(Math.random()*4);
		if(alea == 0)
		{
			mouvement = "droite";
		}
		else if(alea == 1)
		{
			mouvement = "gauche";	
		}
		else if(alea == 2)
		{
			mouvement = "haut";
		}
		else if(alea == 3)
		{
			mouvement = "bas";
		}

		advMove = advMoveMax;
	}
	else
	{
		advMove--;
	}
	
	return mouvement;
}

// la fonction qui va faire bouger les pions adverses
function move(mouvement,newPos,pos)
{
	if(mouvement == "droite")
	{
		newPos = [pos[0],pos[1]+1];
	}
	else if(mouvement == "gauche")
	{
		newPos = [pos[0],pos[1]-1];
	}
	else if(mouvement == "haut")
	{
		newPos = [pos[0]-1,pos[1]];
	}
	else if(mouvement == "bas")
	{
		newPos = [pos[0]+1,pos[1]];
	}

	return newPos;
}

//La fonction qui gere les collisions avec les pions adverses et les murs
function correctMove(pos,mouvement)
{

	var tab = [];
	tab["pos"] = pos;
	tab["mouvement"] = mouvement;
	/*
	**	Gestion des collisions avec un adversaire
	*/
	var cell;
	if(mouvement == "bas")
	{
		cell = $("tr").eq(pos[0]+1).find("td").eq(pos[1]);
		if(cell.hasClass("gameDoor") || cell.hasClass("adv"))
		{
			tab["mouvement"] = "haut";
			advMove = advMoveMax;
			pos[0] = pos[0]-1;
			tab["pos"] = move(tab["mouvement"],pos,pos);
		}
		else{

		}
	}
	else if (mouvement == "haut")
	{
		cell = $("tr").eq(pos[0]-1).find("td").eq(pos[1]);
		if(cell.hasClass("gameDoor") || cell.hasClass("adv"))
		{
		tab["mouvement"] = "bas";
		advMove = advMoveMax;
		pos[0] = pos[0]+1;
		tab["pos"] = move(tab["mouvement"],pos,pos);
		}
	}
	else if (mouvement == "gauche")
	{
		cell = $("tr").eq(pos[0]).find("td").eq(pos[1]-1);
		if(cell.hasClass("gameDoor") || cell.hasClass("adv"))
		{
			tab["mouvement"] = "droite";
			advMove = advMoveMax;
			pos[1] = pos[1]+1;
			tab["pos"] = move(tab["mouvement"],pos,pos);
		}
	}
	else if (mouvement == "droite")
	{
		cell = $("tr").eq(pos[0]).find("td").eq(pos[1]+1);
		if(cell.hasClass("gameDoor") || cell.hasClass("adv"))
		{
			tab["mouvement"] = "gauche";
			advMove = advMoveMax;
			pos[1] = pos[1]-1;
			tab["pos"] = move(tab["mouvement"],pos,pos);
		}
	}

	/*
	** Gestion des collisions avec les murs
	*/
	if(pos[0] < 0)
	{
		tab["mouvement"] = "bas";
		advMove = advMoveMax;
		pos[0] = 0;
		tab["pos"] = move(tab["mouvement"],pos,pos);
	}
	else if(pos[1] < 0)
	{
		tab["mouvement"] = "droite";
		advMove = advMoveMax;
		pos[1] = 0;
		tab["pos"] = move(tab["mouvement"],pos,pos);
	}
	else if(pos[0] > map)
	{
		tab["mouvement"] = "haut";
		advMove = advMoveMax;
		pos[0] = map;
		tab["pos"] = move(tab["mouvement"],pos,pos);
	}
	else if( pos[1] > map)
	{
		tab["mouvement"] = "gauche";
		advMove = advMoveMax;
		pos[1] = map;
		tab["pos"] = move(tab["mouvement"],pos,pos);
	}
	
	return tab;
}

//la fonction qui va gerer une défaite
function catchFruit(pos)
{
	var cell = $("tr").eq(pos[0]).find("td").eq(pos[1]);
	if(cell.hasClass("gameDoor"))
	{
		return true;
	}
	else if(cell.hasClass("fruit") || cell.hasClass("corps_snake"))
	{
		gameOver("Un ennemi a attrapé une amie de Finn et Jake ! ");
	}
	else if(cell.hasClass("tete_snake"))
	{
		gameOver("Un ennemi a attrapé Finn !");
	}
}