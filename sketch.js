var tower,towerImage;
var door, doorImage, doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var Invisibleblock,InvisibleblockGroup;
var Play=1;
var End=0;
var gameState=Play;
var spookySound;

function preload() {
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300,600,600);
  tower.addImage(towerImage);
  tower.velocityY=2;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  
  doorGroup = new Group();
  climberGroup = new Group();
  InvisibleblockGroup = new Group();
  
  ghost.setCollider("circle",0,0,120);
  
  //ghost.debug=true;
}

function draw() {
  
  background("white");
  if (gameState===Play) {
    if (tower.y > 400) {
      tower.y=300;
    }

    if (keyDown(LEFT_ARROW)) {
      ghost.x=ghost.x-4;
    }

    if (keyDown(RIGHT_ARROW)) {
      ghost.x=ghost.x+4;
    }

    if (keyDown("space")) {
      ghost.velocityY=-5;
    }

    ghost.velocityY=ghost.velocityY+0.8;

    createDoor();

    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY=0;
    }

    if (InvisibleblockGroup.isTouching(ghost)||ghost.y>600)   {
      ghost.destroy();
      gameState=End;
    }

    console.log(frameCount);

    drawSprites();
  }
  if (gameState===End) {
    background("black");
    stroke("white");
    fill("white");
    textSize(25);
    text("Game Over",230,300);
  }
}

function createDoor() {
  if (frameCount%200===0) {
    door = createSprite(Math.round(random(120,400)),-50,25,25)
    door.addImage(doorImage);
    
    climber = createSprite(200,10);
    climber.addImage(climberImage);
    
    Invisibleblock = createSprite(200,15);
    Invisibleblock.width=climber.width;
    Invisibleblock.height=2;
    
    door.velocityY=2;
    
    climber.x=door.x;
    climber.velocityY=2;
    
    door.lifetime=350;
    climber.lifetime=350;
    
    Invisibleblock.x=door.x;
    Invisibleblock.velocityY=2;
    Invisibleblock.lifetime=350;
    Invisibleblock.visible=false;
    //Invisibleblock.debug=true;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    InvisibleblockGroup.add(Invisibleblock);
    
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
  }  
}