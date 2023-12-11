som = "";

function preload() { som = loadSound("musica.mp3"); somA = loadSound("musica2.mp3"); somB = loadSound("HinoProerdDaMinhaEscola.mp3") }
scoreRightWrist = 0;
rightWristX = 0;
rightWristY = 0;

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

}
function modelLoaded() { console.log('PoseNet Is Initialized'); }

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("scoreRightWrist = " + scoreRightWrist);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

  }
}

function draw() {
  image(video, 0, 0, 600, 500);

  fill("#FF0000");
  stroke("#FF0000");

  if (scoreRightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20);

    if (rightWristY > 0 && rightWristY < 200) {
      som.rate(1);
      somA.rate(0);
      somB.rate(0);
    } else if (rightWristY > 200 && rightWristY < 300) {
      som.rate(0);
      somA.rate(1);
      somB.rate(0);
    } else if (rightWristY >= 300) {
      som.rate(0);
      somA.rate(0);
      somB.rate(1);
    }
  }

}


function play() {
  som.play();
  som.setVolume(1);
  som.rate(1);

  somA.play();
  somA.setVolume(1);
  somA.rate(0);

  somB.play();
  somB.setVolume(1);
  somB.rate(0);
}

