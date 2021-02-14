Webcam.set({
    width: 397,
    height: 298,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach(camera);

function takeSnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capturedImage" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5ROmuq2Ou/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function check() {
    img = document.getElementById("capturedImage");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("objectName").innerHTML = results[0].label;
        document.getElementById("objectAccuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}