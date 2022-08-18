 Status = "";
 object = [];
 
 function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 380);

    if(Status != "")
    {
        objectDetector.detect(video, gotResult);

        for(i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Detecting objects";
                            

            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            noFill();
            text(object[i].label + " " + percent + " %", object[i].x, object[i].y);
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[1].width, object[i].height);

            if(object[i].label == object_name)
          {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = object_name + " Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
          }
          else
          {
            document.getElementById("object_status").innerHTML = object_name + " Not Found";
          }          
        }

        
         }
      }



function start()
{
     objectDetector = ml5.objectDetector('cocossd', modelLoaded);
     document.getElementById("status").innerHTML = "Status : Detecting Objects";
     Object_name = document.getElementById("text_input").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    Status = true;
    
}
 
function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }

    console.log(results);
    object = results;
}