
status="";
objects="";



function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function draw(){
    image(video,0,0,480,380);

    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status:objects detected";
            document.getElementById("number_of_objects").innerHTML="number of objects dtected are :"+ objects.length;
            fill("#FF0100");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }

}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting Objects";
}

function modelLoaded(){
console.log("modelLoaded");
status=true;
}

function gotResult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}