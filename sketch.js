const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    /*var array1 = [21, "bhanu", 7898900605, "xyz"];
    console.log(array1);
    console.log(array1[1]);
    
    var rand = random(0, 10);
    array1.push(rand);
    console.log(array1);
    array1.pop();
    console.log(array1);

    var array2 = [[10, 20, 30, 40], [100, 200, 300, 400]]
    console.table(array2);
    console.log(array2);
    array2.push(array1);
    console.table(array2);*/

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    slingShot = new Slingshot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg) {
        background(backgroundImg);
    }
    
    Engine.update(engine);

    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    slingShot.display();    
}

function mouseDragged() {
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}

function mouseReleased() {
    slingShot.fly();
}

function keyPressed() {
    if(keyCode === 32) {
        slingShot.attach(bird.body);
    }
}

async function getBackgroundImg() {
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJson = await response.json();
    console.log(responseJson);
    var dt = responseJson.datetime;
    console.log(dt);
    var hour = dt.slice(11, 13);
    console.log(hour);

    if(hour >= 6 && hour < 19) {
        bg = "sprites/bg.png";
    } else {
        bg = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
    console.log(bg);
}