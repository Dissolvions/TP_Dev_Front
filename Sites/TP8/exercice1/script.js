const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;

const bgName = 'pelouse.png';
const sheetName = 'sprites.png';

const bgImg = new Image();
const sheet = new Image();
let ready = 0;

bgImg.src = bgName;
sheet.src = sheetName;
bgImg.onload = () => { ready++; tryStart(); };
sheet.onload = () => { ready++; tryStart(); };
bgImg.onerror = () => { ready++; tryStart(); };
sheet.onerror = () => { ready++; tryStart(); };

let spriteX = Math.floor((W - 32) / 2);
let spriteY = Math.floor((H - 32) / 2);
const STEP = 16;
let frameIndex = 0;
let frames = 1;
let frameW = 32, frameH = 32;


let direction = 'down';

function tryStart() {
  if (ready < 2) return;

  if (!sheet.complete || sheet.width === 0) {
    frameW = 32; frameH = 32; frames = 1;
  } else {
    const cols = 4;
    frameW = Math.floor(sheet.width / cols);
    frameH = frameW;
    const rows = Math.round(sheet.height / frameH) || 1;
    frames = cols * rows;
  }

  spriteX = Math.max(0, Math.min(W - frameW, spriteX));
  spriteY = Math.max(0, Math.min(H - frameH, spriteY));

  draw();
  window.addEventListener('keydown', onKeyDown);
}

function onKeyDown(e) {
  const key = e.key;
  if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(key)) return;
  e.preventDefault();

  if (key === 'ArrowUp') { spriteY -= STEP; direction = 'up'; }
  if (key === 'ArrowDown') { spriteY += STEP; direction = 'down'; }
  if (key === 'ArrowLeft') { spriteX -= STEP; direction = 'left'; }
  if (key === 'ArrowRight') { spriteX += STEP; direction = 'right'; }

  spriteX = Math.max(0, Math.min(W - frameW, spriteX));
  spriteY = Math.max(0, Math.min(H - frameH, spriteY));

  frameIndex = (frameIndex + 1) % 4; 
  draw();
}

function draw() {
  if (bgImg.complete && bgImg.width) {
    for (let y = 0; y < H; y += bgImg.height) {
      for (let x = 0; x < W; x += bgImg.width) {
        ctx.drawImage(bgImg, x, y);
      }
    }
  } else {
    ctx.fillStyle = '#9c6'; ctx.fillRect(0,0,W,H);
  }

  
  if (sheet.complete && sheet.width && frames > 1) {
    const cols = 4; 
    const rowMap = { 'down':0, 'left':2, 'right':3, 'up':1 }; 
    const row = rowMap[direction] || 0;

    const sx = frameIndex * frameW;
    const sy = row * frameH;

    ctx.drawImage(sheet, sx, sy, frameW, frameH, spriteX, spriteY, frameW, frameH);
  } else if (sheet.complete && sheet.width) {
    ctx.drawImage(sheet, 0, 0, frameW, frameH, spriteX, spriteY, frameW, frameH);
  } else {
    ctx.fillStyle = '#c44'; ctx.fillRect(spriteX, spriteY, frameW, frameH);
  }
}
