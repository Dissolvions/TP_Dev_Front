const img = new Image();
img.src = '600x450.jpg';
img.onload = () => {
	drawQ1();
	drawQ2();
	drawQ3();
	drawQ4();
};

function drawQ1(){
	const c = document.getElementById('c1');
	const ctx = c.getContext('2d');
	const x = Math.floor((c.width - img.width)/2);
	const y = Math.floor((c.height - img.height)/2);
	ctx.clearRect(0,0,c.width,c.height);
	ctx.drawImage(img, x, y);
}

function drawQ2(){
	const c = document.getElementById('c2');
	const ctx = c.getContext('2d');
	ctx.clearRect(0,0,c.width,c.height);
	ctx.drawImage(img, 0,0, c.width, c.height);
}

function drawQ3(){
	const c = document.getElementById('c3');
	const ctx = c.getContext('2d');
	ctx.clearRect(0,0,c.width,c.height);

	const scale = Math.max(c.width / img.width, c.height / img.height);
	const sw = c.width / scale;
	const sh = c.height / scale;
	const sx = Math.max(0, Math.floor((img.width - sw) / 2));
	const sy = Math.max(0, Math.floor((img.height - sh) / 2));

	ctx.drawImage(img, sx, sy, sw, sh, 0,0, c.width, c.height);

	const explain = document.getElementById('explain3');
	const imgAspect = img.width / img.height;
	const canvasAspect = c.width / c.height;
	if (Math.abs(imgAspect - canvasAspect) < 1e-6) {
		explain.textContent = 'Pas de rognage nécessaire — mêmes proportions.';
	} else if (imgAspect > canvasAspect) {
		explain.textContent = 'Oui : il faut rogner la largeur de l\'image (on coupe les bords gauche/droite).';
	} else {
		explain.textContent = 'Oui : il faut rogner la hauteur de l\'image (on coupe le haut/bas).';
	}
}

function drawQ4(){
	const c = document.getElementById('c4');
	const ctx = c.getContext('2d');
	ctx.clearRect(0,0,c.width,c.height);

	const w = img.width; const h = img.height;
	const rightX = w;
	ctx.drawImage(img, rightX, 0);

	ctx.save();
	ctx.translate(w, 0);
	ctx.scale(-1, 1);
	ctx.drawImage(img, 0, 0);
	ctx.restore();
}

