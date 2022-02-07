let apiurl = "https://www.thecolorapi.com/id?rgb="
let myurlstring;
let myapibool = false;
let oldcolor = "R,G,B";
let mycolor = "R,G,B";
let colorjson = null;
let mycolorname = "COLOR NAME";
let colorimage;
let colorimageurl = "hi";
let colorecttext = " COLOR NAME";
let capture;
let myCamera;
let rectcolor = null;
let textcolor = null;
let imgx = 10;
let imgy = 70;

function setup() {
  createCanvas(displayWidth, displayHeight);
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }    
  };
  myCamera = createCapture(constraints);
  
  myCamera.hide();
}

function draw() {
  background (220)
  image(myCamera, 0, 0);
  loadJSONs();
  if (rectcolor == null) {
    fill(255);
    stroke(0);
  } else {
    fill(rectcolor);
    stroke(textcolor);
  }
  strokeWeight(2);
  rect(imgx - 1, imgy - 1, 102, 102);
  rect(10, 10, 200, 50);
  noStroke();
  if (textcolor == null) {
    fill(0);
  } else {
    fill(textcolor);
  }
  text("RGB VALUE: " + mycolor, 20, 30);
  text("COLOR NAME: " + mycolorname, 20, 45);
  push();
  textAlign(CENTER);
  text(colorecttext, imgx, imgy + 38, 100);
  pop();
  if (oldcolor != mycolor) {
    myapibool = true;
  }
  if (colorimageurl != "hi") {
    image(colorimage, imgx, imgy);
  }
}

function loadJSONs() {
  if (myapibool == true) {
    colorjson = loadJSON(myurlstring, onFileload);
  }
}

  
function onFileload() {
  oldcolor = mycolor;
  myapibool = false;
  console.log("File loaded successfully...", colorimageurl);
  mycolorname = colorjson.name.value;
  colorimageurl = colorjson.image.named;
  if (colorimageurl != "hi") {
    colorimage = loadImage(colorimageurl);
  }
  rectcolor = colorjson.hex.value;
  textcolor = colorjson.contrast.value;
}

function touchStarted() {
  mycolorname = "Loading...";
  colorecttext = " "
  var pickedcolor = get(mouseX, mouseY);
  imgx = mouseX - 50;
  imgy = mouseY - 50;
  mycolor = subset(pickedcolor, 0, 3);
  myurlstring = str(apiurl + mycolor);
}
