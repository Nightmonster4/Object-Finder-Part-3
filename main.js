objects = [];
status = "";
obj = "";

function setup(){
   canvas = createCanvas(480, 300);
   canvas.center();
   video = createCapture(VIDEO);
   video.hide();
   //video.size(600, 300);
   objectdetector = ml5.objectDetector("cocossd", modelloaded)
}

function start(){
   document.getElementById("status").innerHTML = "Status: Detecting Objects";
   obj = document.getElementById("inputbox").value;
}

function modelloaded(){
   console.log("Model Loaded!");
   status = true;
}

function gotresults(error, results){
   if(error){
      console.error(error);
   }
      console.log(results);
      objects = results;
   }

function draw(){
   image(video, 0, 0, 480,300);
   if(status != ""){
      objectdetector.detect(video, gotresults);
       for(i=0; i<objects.length; i++){
         //document.getElementById("noofobjects").innerHTML = "Number of objects detected: "  + objects.length;
         fill("red");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
         noFill();
         stroke("red");
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         if(obj == objects[i].label){
         //video.stop();
         objectdetector.detect(gotresults);
         document.getElementById("status").innerHTML = "Status: Objects detected";
         synth = window.speechSynthesis;
         utterThis = new SpeechSynthesisUtterance("Object mentioned found");
         synth.speak(utterThis);
         }
         else{
         document.getElementById("status").innerHTML = "Status: Objects not detected";
         }
       }
      }
}