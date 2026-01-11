    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');

    const statusW = document.getElementById('sW');
    const statusH = document.getElementById('sH');
    const statusC = document.getElementById('sC');
    const statusS = document.getElementById('sS');
    const statusV = document.getElementById('sV');

    const btnW = document.getElementById('bw');
    const btnH = document.getElementById('bh');
    const btnC = document.getElementById('bc');
    const btnS = document.getElementById('bs');
    const btnV = document.getElementById('bv');

    
    const rect = {
      x:50, y:50,
      w:50, h:50,
      colors:['jaune','rouge','bleu','vert'],
      colorIndex:0,
      filled:true,
      visible:true
    };

    function colorNameToCSS(name){
      switch(name){
        case 'jaune': return 'yellow';
        case 'rouge': return 'red';
        case 'bleu': return 'blue';
        case 'vert': return 'green';
        default: return name;
      }
    }

    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if (!rect.visible) return;

      const cssColor = colorNameToCSS(rect.colors[rect.colorIndex]);
      ctx.lineWidth = 3;
      if (rect.filled){
        ctx.fillStyle = cssColor;
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
      } else {
        ctx.strokeStyle = cssColor;
        ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
      }
    }

    function updateStatus(){
      statusW.textContent = rect.w;
      statusH.textContent = rect.h;
      statusC.textContent = rect.colors[rect.colorIndex];
      statusS.textContent = rect.filled ? 'plein' : 'contour';
      statusV.textContent = rect.visible ? 'oui' : 'non';
    }

    btnW.addEventListener('click', ()=>{
      rect.w += 10;
      if (rect.w > 200) rect.w = 10;
      updateStatus(); draw();
    });

    btnH.addEventListener('click', ()=>{
      rect.h += 10;
      if (rect.h > 200) rect.h = 10;
      updateStatus(); draw();
    });

    btnC.addEventListener('click', ()=>{
      rect.colorIndex = (rect.colorIndex + 1) % rect.colors.length;
      updateStatus(); draw();
    });

    btnS.addEventListener('click', ()=>{
      rect.filled = !rect.filled;
      updateStatus(); draw();
    });

    btnV.addEventListener('click', ()=>{
      rect.visible = !rect.visible;
      updateStatus(); draw();
    });

    
    updateStatus(); draw();