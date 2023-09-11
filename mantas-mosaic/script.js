const canvas = document.getElementById('mosaic');
const ctx = canvas.getContext('2d');
const randomizeButton = document.getElementById('randomize');
const saveButton = document.getElementById('saveImage');

const gridSize = 3;
let cellWidth = canvas.width / gridSize;
let cellHeight = canvas.height / gridSize;
let loadedImages = [];

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

function drawRandomGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
        const x = col * cellWidth;
        const y = row * cellHeight;

        const randomImage = loadedImages[Math.floor(Math.random() * loadedImages.length)];
        const randomRotation = Math.floor(Math.random() * 4) * (Math.PI / 2); // Random rotation in 90-degree increments

        ctx.save();
        ctx.translate(x + cellWidth / 2, y + cellHeight / 2);
        ctx.rotate(randomRotation);
        ctx.drawImage(randomImage, -cellWidth / 2, -cellHeight / 2, cellWidth, cellHeight);
        ctx.restore();
        }
    }
}

function resizeCanvas() {
    let w = Math.min(window.innerWidth, window.innerHeight) / 1.5;
    canvas.width = w;
    canvas.height = w;
    cellWidth = canvas.width / gridSize;
    cellHeight = canvas.height / gridSize;
    drawRandomGrid();
}

function saveCanvasAsImage() {
    const imageDataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = imageDataURL;
    a.download = 'canvas_image.png'; // You can specify the desired filename here.
    a.click();
}

randomizeButton.addEventListener('click', drawRandomGrid);
saveButton.addEventListener('click', saveCanvasAsImage);
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.multiple = true;
  fileInput.addEventListener('change', async (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (const file of files) {
        const imageURL = URL.createObjectURL(file);
        const image = await loadImage(imageURL);
        loadedImages.push(image);
      }
      drawRandomGrid();
    }
  });
  fileInput.click();
});

//resizeCanvas();