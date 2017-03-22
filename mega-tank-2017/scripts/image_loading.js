var tankPic = document.createElement('img');
var cannonPic = document.createElement('img');

var picsToLoad = 0; // set default to 0

function loadImg(imgElem, fileName) {
    imgElem.src = "img/" + fileName;
}

function loadGraphics() {
    let imgList = [
        { name: tankPic, file: "tank.png" },
        { name: cannonPic, file: "cannon.png" }
    ];

    picsToLoad = imgList.length;

    for (let i = 0; i < imgList.length; i += 1) {
        loadImg(imgList[i].name, imgList[i].file);
    }
}