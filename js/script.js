function getRandomInt(min, max) {
    			return Math.floor(Math.random() * (max - min + 1)) + min;
			}  //Got randomFunction from stackOverflow
			var rockImg1X = getRandomInt(0,2);
			var rockImg1Y= getRandomInt(0,2);
			var rockImg2X= getRandomInt(0,2);
			var rockImg2Y= getRandomInt(0,2);
			var rockImg3X= getRandomInt(0,2);
			var rockImg3Y= getRandomInt(0,2); // rock img coordinates
			var rock1coord = [rockImg1X, rockImg1Y];
			var rock2coord = [rockImg2X, rockImg2Y];
			var rock3coord = [rockImg3X, rockImg3Y]; //array coord

			checkImgCordDuple(rock1coord[0], rock1coord[1], rock2coord[0], rock2coord[1], rock3coord[0], rock3coord[1]);

			var currentCoord= [0,0];  //cordinate clicked
			var missImg = "images/wrong.png";   //location for miss img
			var stoneImg = "images/stone.png";
			var misses=0; //number of misses
			var score= 0;
			var level = 1;

			function getXCoord(x){  //gets X coord form location on table clicked
				numX =  Number(x.cellIndex);
				currentCoord[0] =numX;
				//alert("Cord X: "+ x.cellIndex);
			}

			function getYCoord(y){ //gets Ycoord
				numY = Number(y.rowIndex)
				currentCoord[1]= numY;
				//alert("Cord Y: "+ y.rowIndex);
			}
			function upDateCoord(xArray, yArray){
				xArray[0] =numX;
				yArray[1]= numY;
			}
			function clickImg(img){  //click img to see under
				//alert("Cord:"+ currentCoord[0] + ", "+ currentCoord[1] +" || " +" R1: " + rock1coord[0] +", "+rock1coord[1]+ " R2: " + rock2coord[0] +", "+rock2coord[1]+"    " + " R3: " + rock3coord[0] +", "+rock3coord[1]);  //test current location picked
				upDateCoord(currentCoord, currentCoord);

				if(currentCoord[0] == rock1coord[0] && currentCoord[1] ==rock1coord[1]){ //|| was creating bugs
					img.src = stoneImg;
					score+= 1;
					document.getElementById('score').innerHTML = "Score: "+ score;
					setTimeout(function(){
							newLevel(score);
						}, 800);				} 
				else if(currentCoord[0] == rock2coord[0] && currentCoord[1] ==rock2coord[1]){
					img.src = stoneImg;
					score+= 1;
					document.getElementById('score').innerHTML = "Score: "+ score;
					setTimeout(function(){
							newLevel(score);
						}, 800);				}
				else if(currentCoord[0] == rock3coord[0] && currentCoord[1] ==rock3coord[1]){
					img.src = stoneImg;
					score+= 1;
					document.getElementById('score').innerHTML = "Score: "+ score;
					
					setTimeout(function(){
							newLevel(score);
						}, 800);
					

				}
				else{
					img.src = "images/wrong.png";
					misses+=1;
					document.getElementById('misses').innerHTML = "Misses: "+ misses;
					if(misses>= 3){
						 setTimeout(function(){
							gameOver(misses, score);
						}, 800);
					}
				}
			}

			function checkImgCordDuple(x1,y1,x2,y2,x3,y3){    //checks tomakesure rock img cordinates dont match
				while(x1==x2 && y1==y2 || x1==x3 && y1==y3 || x2==x3 && y2==y3){
					if(x1==x2 && y1==y2){
						x2= getRandomInt(0,2);
						y2 = getRandomInt(0,2);
					}
					if(x1==x3 && y1==y3){
						x3= getRandomInt(0,2);
						y3 = getRandomInt(0,2);
					}
					if(x2==x3 && y2==y3){
						x2= getRandomInt(0,2);
						y2 = getRandomInt(0,2);
					}
				}
			}

			function scoreSave(){  //saves score
				var scoreSavor= score;
				localStorage.setItem("GameScore", scoreSavor);

				// var levelSavor= level;
				// localStorage.setItem("LevelScore", levelSavor);
				//alert("Save score Handler called");
			}

			function scoreLoader(){  //loads score
				if(level>1){
					var score = localStorage.getItem("GameScore");
					document.getElementById('score').innerHTML = "Score: "+ score;
				}
				//var level = localStorage.getItem("LevelScore");
			}

			function gameOver(cMisses, cScore){  //ends game when 3 misses = true
				document.getElementById('misses').innerHTML = "Misses: "+ misses;
				if(cMisses >=3){
					var gameOverWindow = window.confirm("Game Over! Your score was: "+ cScore+". Do you want to start a new game?");
					if(gameOverWindow ==true){
						location.reload();
					}
				}
			}

			function newLevel(cScore){ //starts new level
				if(cScore>=3){
					 //level += 1;
					scoreSave();
					var NewGameWindow = alert("Nice Job! Get Ready for the next round!");
					location.reload();
				}
			}

			function showAnswer(){alert("R1: " + rock1coord[0] +", "+rock1coord[1] +"   " + "R2: " + rock2coord[0] +", "+rock2coord[1]+"    " + "R3: " + rock3coord[0] +", "+rock3coord[1] ); //shows answer
			}
