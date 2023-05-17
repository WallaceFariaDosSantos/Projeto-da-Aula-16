//Estados de Jogo
var PLAY = 1;
var END = 0;
var gameState = 1;
//variáveis gerais
var knife, fruit, monster, fruitGroup, monsterGroup, score, r, randomFruit, position;
var knifeImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;
var gameOverSound, knifeSwoosh;

function preload(){
  knifeImage = loadImage("ESPADADEFOGO.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("fimdeJogo.png")
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("SwordSlash.mp3")
}

function setup() {
  createCanvas(1680, 800);
  
//criando espada
   knife = createSprite(40, 200, 20, 20);
   knife.addImage(knifeImage);
   knife.scale = 0.2;

//definir colisor para espada
  knife.setCollider("rectangle", 0, 0, 150, 800);
 
//Variáveis de pontuação e Grupos
  score = 0;
  fruitGroup = createGroup();
  monsterGroup = createGroup();
}

function draw(){
  background("black");

  if(gameState === PLAY){
//Chamar função de frutas e função de monstro
    fruits();
    Monster();
//mover espada com o mouse
    knife.y = World.mouseY-70;
    knife.x = World.mouseX;

//
  if(gameState = PLAY){
    if(score >= 100 && World.frameCount % 80 === 0){
      monster = createSprite(1630, 200, 20, 20);
      monster.x = 0
      monster.addAnimation("moving", monsterImage);    
      monster.velocityX = (7+(score/4));
      monster.y = Math.round(random(50,750));
      monster.velocityX = (8+(score/10));
      monsterGroup.add(monster);
    }
    if(score >= 150 && World.frameCount % 70 === 0){
      monster = createSprite(1630, 200, 20, 20);
      monster.x = 1680
      monster.addAnimation("moving", monsterImage);    
      monster.velocityX = (7+(score/4));
      monster.y = Math.round(random(50,750));
      monster.velocityX = -(8+(score/10));
      monsterGroup.add(monster);
    }
    if(score >= 200 && World.frameCount % 60 === 0){
      monster = createSprite(1630, 200, 20, 20);
      monster.x = 0
      monster.addAnimation("moving", monsterImage);    
      monster.velocityX = (7+(score/4));
      monster.y = Math.round(random(50,750));
      monster.velocityX = (8+(score/10));
      monsterGroup.add(monster);
    }
    if(score >= 250 && World.frameCount % 5 === 0){
      monster = createSprite(1630, 200, 20, 20);
      monster.x = 0
      monster.addAnimation("moving", monsterImage);    
      monster.velocityX = (7+(score/4));
      monster.y = Math.round(random(50,750));
      monster.velocityX = (8+(score/10));
      monsterGroup.add(monster);
    }
    if(score >= 250 && World.frameCount % 5 === 0){
      monster = createSprite(1630, 200, 20, 20);
      monster.x = 1680
      monster.addAnimation("moving", monsterImage);    
      monster.velocityX = (7+(score/4));
      monster.y = Math.round(random(50,750));
      monster.velocityX = -(8+(score/10));
      monsterGroup.add(monster);
    }
  } 

//Aumenta a pontuação se a espada tocar na fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score +5;
    }
    else
    {
      //Vá para o estado final se a espada tocar o inimigo
      if(monsterGroup.isTouching(knife)){
        gameState = END;
        //som de fim de jogo/gameover
        gameOverSound.play()
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        //Mude a animação da espada para fim de jogo e redefina sua posição
        knife.addImage(gameOverImage);
        knife.scale = 1;
        knife.x = 840;
        knife.y = 400;
      }
    }
  }
  
  drawSprites();
//exibir pontuação
  textSize(25);
  text("Pontuação: "+ score,710,50);
}

function Monster(){
  if(World.frameCount % 100 === 0){
    monster = createSprite(1630, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(50, 750));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount % 40 === 0){
    fruit = createSprite(400, 200, 20, 20);
    fruit.x = 0    
//aumentar a velocidade das frutas após a pontuação 4 
    fruit.velocityX = (7+(score/4));
    fruit.scale = 0.2;
    fruit.setCollider("circle", 0, 0, 150);
    fruit.debug = false;
    r = Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
      fruit.scale = 0.3;
    } else if (r == 2) {
      fruit.addImage(fruit2);
      fruit.scale = 0.2;
    } else if (r == 3) {
      fruit.addImage(fruit3);
      fruit.scale = 0.2;
      fruit.debug = true;
    } else {
      fruit.addImage(fruit4);
      fruit.scale = 0.4;
    }
    fruit.y = Math.round(random(50,750));
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
  }
}
