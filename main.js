status = "";
video = "";
object_name = document.getElementById("object_name").value;
objects = [results];

function setup(){
    canvas = createCanvas(480,380);
    canvas.center()
    video = createCapture(VIDEO);
    video.hide()
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
} 
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}
function draw(){
    image(video, 0, 0, 480, 380);
    if (status!= ""){
        for(i=0; i < objects.length; i++){
            fill("black")
            percent = objects[i].confidence * 100 ;
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
           stroke("black")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if(object_name = objects[i].label){
    video.stop();
    objectDetector.detect(gotResult);
    document.getElementById("status").innerHTML = "Object is found";
    document.getElementById("statement").innerHTML = objects[i].label +" is found";
    Speech = window.SpeechSynthesis;
    utterance = new SpeechSynthesisUtterance(objects[i].label + " is found");
    Speech.speak(utterance)
}else{
    document.getElementById("status").innerHTML = "Object is not found";
    document.getElementById("statement").innerHTML = object_name +" is not found";
    Speech = window.SpeechSynthesis;
    utterance = new SpeechSynthesisUtterance(object_name +" is not found");
    Speech.speak(utterance)
}
}
        }

    }
function gotResult(error, results){
    if (error){
        console.log(error);
    }else{
        console.log(results);
        }
    }
    
