window.addEventListener('load', () => {

  var canvas = document.getElementById("achievement-canvas");
  var ctx = canvas.getContext("2d");
  
  var bgImage = new Image();
  bgImage.src = "assets/achievement-bg.png";
  // For the icon
  var img = new Image;
  
  var titleInput = document.getElementById("title");
  var descInput = document.getElementById("desc");
  var fileInput = document.getElementById("file");

  var isImageLoaded = false;
  
  function drawText() {
    clearCanvas()
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    if (isImageLoaded) {
      ctx.drawImage(img, 10, 10, 184.96, 184.96)
    }

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";

    const maxWidth = canvas.width - 210;
    const wrappedText = wrapText(ctx, titleInput.value, maxWidth)

    var height = 45

    wrappedText.forEach(line => {
      ctx.fillText(line, 210, height);
      height += 22
    });

    ctx.fillStyle = "lightgrey"

    const wrappedDescText = wrapText(ctx, descInput.value, maxWidth)

    wrappedDescText.forEach(line => {
      ctx.fillText(line, 210, height);
      height += 22
    });
  }
  
  function handleFiles(e) {
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = function() {
      ctx.drawImage(img, 10, 10, 184.96, 184.96)
    }
    isImageLoaded = true;
  }

  bgImage.onload = function() {
    drawText()
  }

  titleInput.addEventListener('input', drawText)
  descInput.addEventListener('input', drawText)
  fileInput.addEventListener('change', handleFiles)
  
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function wrapText(ctx, text, maxWidth) {
    let words = text.split(' ');
    let lines = []
    let currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
      var word = words[i];
      var width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word
      }
    }

    lines.push(currentLine);
    return lines;
  }
})


function downloadImage() {
  var canvas = document.getElementById("achievement-canvas");
  console.log(canvas);
  
  var bgImage = new Image();
  bgImage.src = "assets/achievement-bg.png";
  
  var titleInput = document.getElementById("title");
  
  var imageToDownload = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  if (titleInput.value != "") {
    link.download = titleInput.value + ".png";
  }
  else {
    link.download = "achievement.png";
  }
  link.href = imageToDownload;
  link.click();
}