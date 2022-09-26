var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score=0 

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale= 0.3

  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()

}

function draw() {
  background("black");
  
  if(gameState=="play"){
  if(tower.y > 400){
      tower.y = 300
    }
    score = score + Math.round(getFrameRate()/60)

    
  if(keyDown("space")){
    ghost.velocityY= -5 
  }
ghost.velocityY+=0.5 

if(keyDown("left")){
  ghost.x-=3    
}

if(keyDown("right")){
  ghost.x+=3    
}
if(invisibleBlockGroup.isTouching(ghost)){
gameState="over" 
}
if(climbersGroup.isTouching(ghost)){
ghost.velocityY=0 
}
spawnDoors()

drawSprites()
  } 

  if(gameState=="over"){
fill("red")
textSize(30)
text("Game Over",300,300)
  }

  textSize(20);
  fill("black")
  text("Score: "+ score,400,50) 
}

function spawnDoors(){
  if(frameCount%250===0){
door=createSprite(Math.round(random(100,500)),-50) 
door.addImage(doorImg)
door.velocityY=1
door.lifetime= 600
ghost.depth=door.depth+=1
doorsGroup.add(door)

climber=createSprite(door.x,door.y+60) 
climber.addImage(climberImg)
climber.velocityY=1
climber.lifetime= 600
climbersGroup.add(climber)

invisibleBlock=createSprite(door.x,door.y+70,climber.width,5)
invisibleBlock.debug=true 
invisibleBlock.velocityY=1
invisibleBlock.lifetime= 600
invisibleBlockGroup.add(invisibleBlock)
  }
}

function reset(){
  gameState = "play"

  doorsGroup.destroyEach()
  climbersGroup.destroyEach()
  invisibleBlockGroup.destroyEach()
   
  score = 0
}