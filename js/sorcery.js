$( function() {
	var buttons = $(".section button");
	var status = $("#status");
	var MAXLIFE = 5;
	var marceline = false;
	var princesse = false;
	var yoyo = false;
	var broche = false;
	var clef = false;
	//Cache les Div sauf intro
	//$(".box").hide();
	$("#intro").nextAll("div").hide();
	$("#container").show();
	/*
	** Liste de toutes les fonctions correspondantes aux boutons
	** de chaque section.
	*/
	buttons.click( function() {

		/************************ Début de jeu */
		$("#intro button:eq(0)").unbind().click(function()
		{
			var key = $(this).attr("go");
			startGame();
			$(".box").show();
			gotoSection("#"+key);
			$('body').css("background-image","url('img/grotte.jpg')");
		});
		
		/******************************* entrée */
		for (var i=0; i<2 ; i++) {
    		$("#20 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 21){
					$('body').css("background-image","url('img/couloir.jpg')");
				}
				else if (key == 50){
					$('body').css("background-image","url('img/anorLando.jpg')");
				}
			});
		}

		/***************************** couloir */
		for (var i=0; i<2 ; i++) {
    		$("#21 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 23){
					$('body').css("background-image","url('img/lave.jpg')");
				}
				else if (key == 22){
					loseLife(1);
				}
			});
		}

    	$("#22 button:eq(0)").unbind().click(function()
		{
			addItem("yoyo"); //yoyo lumineux
			yoyo = true;
			var key = $(this).attr("go");
			gotoSection("#"+key);
			if(key == 23){
				$('body').css("background-image","url('img/lave.jpg')");
			}
		}); 

    	/***************************** Izalith */
		for (var i=0; i<2 ; i++) {
    		$("#23 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 50){
					$('body').css("background-image","url('img/anorLando.jpg')");
				}
			});
		}

		for (var i=0; i<2 ; i++) {
    		$("#24 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key==26){
					loseLife(1);
					if(marceline == false){
						$("#26 button:eq(2)").hide();
					}
				}
			});
		}

		for (var i=0; i<3 ; i++) {
    		$("#25 button:eq("+i+")").unbind().click(function()
			{
				addItem("broche"); //broche dorée
				broche = true;
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key==26){
					loseLife(1);
					if(marceline == false){
						$("#26 button:eq(2)").hide();
					}
				}
			});
		}

		//Action Marceline proposée
		for (var i=0; i<3 ; i++) {
    		$("#26 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 27){
					loseLife(1);
				}
			});
		}

		for (var i=0; i<2 ; i++) {
    		$("#27 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
			});
		}

		for (var i=0; i<2 ; i++) {
    		$("#28 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 30){
					$('body').css("background-image","url('img/caverne.jpg')");
				}
			});
		}

		for (var i=0; i<2 ; i++) {
    		$("#29 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 30){
					$('body').css("background-image","url('img/caverne.jpg')");
				}
			});
		}

		/***************************** caverne */
		for (var i=0; i<2 ; i++) {
    		$("#30 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 32){
					$('body').css("background-image","url('img/lave.jpg')");
				}
			});
		}


    	$("#31 button:eq(0)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
			$('body').css("background-image","url('img/lave.jpg')");
			addItem("key");
			clef = true;
	
		});
		/***************************** fin caverne */


		for (var i=0; i<2 ; i++) {
    		$("#32 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 33){
					$('body').css("background-image","url('img/portail.png')");
					if(yoyo == false) {
						$("#33 button:eq(0)").hide();
					}
					if(broche == false){
						$("#33 button:eq(1)").hide();
					}
					if(clef == false){
						$("#33 button:eq(2)").hide();
					}
				}
				else if(key == 50){
					$('body').css("background-image","url('img/anorLando.jpg')");
				}
			});
		}

		/***************************** portail */
		//Choix selon objets + remove Obj
		$("#33 button:eq(0)").unbind().click(function()
		{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				$('body').css("background-image","url('img/porte.jpg')");
				deleteItem("yoyo");
				yoyo = false;
				if(clef == false){
					$("#34 button:eq(0)").hide();
				}
		});

		$("#33 button:eq(1)").unbind().click(function()
		{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				$('body').css("background-image","url('img/porte.jpg')");
				deleteItem("broche");
				broche = false;
				if(clef == false){
					$("#34 button:eq(0)").hide();
				}
		});

		$("#33 button:eq(2)").unbind().click(function()
		{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				$('body').css("background-image","url('img/porte.jpg')");
				deleteItem("key");
				clef = false;
				if(marceline == false){
					$("#35 button:eq(0)").hide();
				}

		});

    	$("#33 button:eq(3)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
			if(marceline == false){
				$("#35 button:eq(0)").hide();
			}

		});


		//Choix action Marceline
		for (var i=0; i<3 ; i++) {
    		$("#35 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 38 || key == 36){
					loseLife(2);
					if(marceline == false){
						$("#38 button:eq(1)").hide();
					}
				}
				else if(key == 37){
					loseLife(3);
				}
			});
		}

		$("#36 button:eq(0)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
			if(key == 40){
				$('body').css("background-image","url('img/porte.jpg')");
				if(clef == false){
					$("#40 button:eq(0)").hide();
				}
			}
		});

		$("#37 button:eq(0)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
			if(key == 40){
				$('body').css("background-image","url('img/porte.jpg')");
				if(clef == false){
					$("#40 button:eq(0)").hide();
				}
			}
		});

		//Choix action Marceline
		for (var i=0; i<2 ; i++) {
    		$("#38 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
			});
		}

		/***************************** porte */
		for (var i=0; i<2 ; i++) {
    		$("#34 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 41){
					$('body').css("background-image","url('img/caverne.jpg')");
					deleteItem("key");
					clef = false;
				} 
				else if (key == 39){
					WinLife(2);
				}
			});
		}

		$("#39 button:eq(0)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
			if(key == 41){
				$('body').css("background-image","url('img/caverne.jpg')");
				deleteItem("key");
				clef = false;
				if(broche== false){
					$("#41 button:eq(0)").hide();
				}
			}
		});

		for (var i=0; i<2 ; i++) {
    		$("#40 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 41){
					$('body').css("background-image","url('img/caverne.jpg')");
					deleteItem("key");
					clef = false;
					if(broche == false){
					$("#41 button:eq(0)").hide();
				}
				}
				else if(key == 39) {
					addItem("key");
					clef = true;
					WinLife(2);
				}
			});
		}

		/***************************** caverne */
		//remove clef
		//princesse des flammes recrutée
		for (var i=0; i<3 ; i++) {
    		$("#41 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 44){
					$('body').css("background-image","url('img/couloirPierre.jpg')");
				}
				else if(key == 42){
					deleteItem("broche");
					broche = false;
					WinLife(4);
				}
				princesse = true;
			});
		}

		for (var i=0; i<2 ; i++) {
    		$("#42 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 44){
					$('body').css("background-image","url('img/couloirPierre.jpg')");
				}
			});
		}

		$("#43 button:eq(0)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
			if(key == 30){
				$('body').css("background-image","url('img/couloirPierre.jpg')");
			}
		});

		/***************************** couloir pierre */
		$("#44 button:eq(0)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
			$('body').css("background-image","url('img/mur.jpg')");
			marceline = false;
			princesse = false;
		});

		/***************************** mur */
		for (var i=0; i<3 ; i++) {
    		$("#45 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 46){
					$('body').css("background-image","url('img/glace.jpg')");
					loseLife(1);
				}
			});
		}

		/***************************** glace */
		for (var i=0; i<2 ; i++) {
    		$("#46 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 47){
					loseLife(1);
				}
			});
		}

		for (var i=0; i<2 ; i++) {
    		$("#47 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 47){
					loseLife(1);
				}
			});
		}

		for (var i=0; i<3 ; i++) {
    		$("#48 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 46){
					loseLife(1);
				}
			});
		}

		$("#49 button:eq(0)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
			$("#container").hide();
			$(".section").css("margin-top", "0");
			$("#game button:eq(0)").hide(); //reset
			$("#game button:eq(2)").hide(); //victoire
			$("#game button:eq(3)").hide(); //defaite
		});


		/***************************** anor lando */
		//Marceline recrutée !
		for (var i=0; i<2 ; i++) {
    		$("#50 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if (key == 51){
					loseLife(1);
				}
				marceline = true;
			});
		}

		for (var i=0; i<2 ; i++) {
    		$("#51 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 21){
					$('body').css("background-image","url('img/couloir.jpg')");
				}
				else if(key == 52){
					loseLife(3);
				}
			});
		}

		for (var i=0; i<2 ; i++) {
    		$("#52 button:eq("+i+")").unbind().click(function()
			{
				var key = $(this).attr("go");
				gotoSection("#"+key);
				if(key == 21){
					$('body').css("background-image","url('img/couloir.jpg')");
				}
			});
		}

    	$("#53 button:eq(0)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
			$('body').css("background-image","url('img/grotte.jpg')");
			reset();
		});
		
		$("#death button:eq(0)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
			$('body').css("background-image","url('img/grotte.jpg')");
			reset();
		});

		$("#end button:eq(0)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
			$('body').css("background-image","url('img/grotte.jpg')");
			reset();
		});


		/****************************************************JEU*/
		/*JEU - JEU - JEU - JEU*/
		/*PLAY*/
		$("#game button:eq(1)").unbind().click(function()
		{
			playGame("game");
			$("#cry").css("margin-top","0px");
			$(this).hide();
		});
		/*RESET*/
		$("#game button:eq(0)").unbind().click(function()
		{
			resetGame();
			var cpt = getLife();
			setLife(cpt-1);
			$(this).hide();
		});
		/*Victoire*/
		$("#game button:eq(2)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
		}); //GO END
		/*Game Over*/
		$("#game button:eq(3)").unbind().click(function()
		{
			var key = $(this).attr("go");
			gotoSection("#"+key);
		}); //GO death
		/*JEU - JEU - JEU - JEU*/
		/****************************************************JEU*/
	});
	
	
	/*
	** Permet de cacher la section actuelle et d'afficher
	** la prochaine section
	*/
	function gotoSection(key) {
		$(".section").hide();
		$(key).show();
	}
	
	/*
	** Récupere la valeur de la span de classe value
	*/
	function getLife() {
		return $(".value").text(); 
	}
	
	/*
	** Change la valeur de la span de classe value
	*/
	function setLife(v) {
		 $(".value").text(v);
	}
	
	/*
	** Diminue la vie de 1;
	*/
	function loseLife(num) {
		var life = $(".value").text();
		setLife(life-parseInt(num));
		if((life-parseInt(num)) < 0){
			setLife(0);
		}
		if(getLife() <= 0)
		{
			endGame();
		}
	}

	/*
	** Augmente la vie de 1;
	*/
	function WinLife(num) {
		var life = $(".value").text();
		if ((parseInt(life)+parseInt(num)) > parseInt(MAXLIFE)) {
			setLife(MAXLIFE);
		}
		else if(life < MAXLIFE)
		{
			setLife(parseInt(life)+parseInt(num));
		}
	}
	
	/*
	** Début du jeu
	*/
	function startGame() {
		setLife(MAXLIFE);
	}
	
	/*
	** Fin du jeu 
	*/
	function endGame() {
		var life = getLife();
		if(getLife() <= 0)
		{
			gotoSection("#death");
		}
		else
		{
			gotoSection("#end");
		}
	}

	/*
	** Ajouter un objet à l'inventaire
	*/
	function addItem(item) {
		var img = ($("[empty='0']").first());
		img.attr("src","img/"+item+".png");
		$("[src='img/"+item+".png']").attr("empty", "1");
	}

	/*
	**
	*/
	function deleteItem(item){
		var img = ($("[src='img/"+item+".png'").first());
		img.attr("src","img/box.png");
		img.attr("empty","0");
	}

	/**
	**
	*/
	function reset(){
		WinLife(5);
		marceline = false;
		princesse = false;
		deleteItem("yoyo");
		yoyo = false;
		deleteItem("broche");
		broche = false;
		deleteItem("key");
		clef = false;
		$("#container").show();
		$(".section").css("margin-top", "300px");
	}

} );