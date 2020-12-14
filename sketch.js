var dog,happydog;
var database;
var FoodS,FoodStock;
var fedtime,lastfed;
var foodObj;

function preload()
{
  dogImage=loadImage("images/dogImg.png");
  happydogImage=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500,500);
  dog= createSprite(250,250,10,10);
  dog.addImage(dogImage);
  FoodStock=database.ref('Food');
  FoodStock.on("value",readStock);

food=createButton("feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
writeStock(FoodS);
dog.addImage(happydogImage);
}
drawSprites();
text("Note: Press UP_ARROW Key To Feed Dargo Milk!")
  textSize(15);
  fill("white");
stroke("black")

fill(255,255,254);
textSize(15);
if(lastfed>=12){
text("Last Feed :"+ lastFed%12 +"PM",350,30);
}else if (LastFed==0){
text("Last Feed : 12 AM",350,30);
}else {
  text("Last Feed:"+ lastFed + "AM",350,30);
}
}

function readStock(data){
FoodS=data.val();
}

function writeStock(x){
if(x<=0){
x=0;
}
else{
x=-1
}
database.ref('/').update({
  Food:x
})
}

function feedDog(){
dog.addImage(happydog);


foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()
})
}

function addFoods(){
foodS++;
database.ref('/').update({
Food:foodS
})
}
