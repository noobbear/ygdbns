var _YGDBNS = new Object();

_YGDBNS.initCanvas = function(canvas, n) {
	var ctx = canvas.getContext("2d");
	_YGDBNS.n = n;
	_YGDBNS.ctx = ctx;
	_YGDBNS.dom = canvas;
	_YGDBNS.width = ctx.canvas.width;
	_YGDBNS.height = ctx.canvas.height;
	_YGDBNS.createBorder();
	_YGDBNS.createLine(n);
	_YGDBNS.createRec(n);
	_YGDBNS.createNPC(n);
	_YGDBNS.status = false;

	//对电脑端浏览器绑定点击事件
	$(_YGDBNS.dom).on("click", function(e) {
		var offsetY = e.offsetY;
		var h = ctx.canvas.height / (n + 1);
		for(var i = n - 1; i >= 0; i--) {
			if(offsetY <= _YGDBNS.lines[i]) {
				_YGDBNS.jump(_YGDBNS.npcs, i, true, 20);
				break;
			}
		}
	});
}
_YGDBNS.bindTimerElement = function(e){
	_YGDBNS.timerElement = e;
}
_YGDBNS.createBorder = function() {
	_YGDBNS.ctx.strokeStyle = "#0f0f0f";
	_YGDBNS.ctx.strokeRect(0, 0, _YGDBNS.width, _YGDBNS.height);
}
_YGDBNS.createLine = function(n) {
		_YGDBNS.ctx.fillStyle = "#000000";
	_YGDBNS.lines = new Array();
	if(n && n >= 2 && n <= 5) {
		var h = _YGDBNS.height / (n + 1);
		for(var i = n; i > 0; i--) {
			_YGDBNS.ctx.fillRect(0, h * i, _YGDBNS.width, _YGDBNS.height / 250);
			_YGDBNS.lines.push(h * i);
		}

	} else {
		_YGDBNS.lines.push(_YGDBNS.height * 4 / 5);
		_YGDBNS.ctx.fillRect(0, _YGDBNS.height * 4 / 5, _YGDBNS.width, _YGDBNS.height / 250);
	}
}

_YGDBNS.createRec = function(n) {
		_YGDBNS.ctx.fillStyle = "#000000";
	_YGDBNS.cs = new Array();
	if(n && n >= 2 && n <= 5) {
		var block = _YGDBNS.height / (n + 1);
		for(var i = 0; i < n; i++) {
			var w = Math.round(Math.random() * 10 + 5) * 2;
			var h = Math.round(Math.random() * 10 + 5) * 3;
			var x = _YGDBNS.width - w + Math.random() * 299;
			var y = _YGDBNS.lines[i] - h;
			//_YGDBNS.ctx.fillRect(x, y+1, w, h);
			_YGDBNS.cs.push({
				"w": w,
				"h": h,
				"x": x,
				"y": y
			});
		}
	} else {
		var w = Math.round(Math.random() * 10 + 5) * 2;
		var h = Math.round(Math.random() * 10 + 5) * 3;
		var x = _YGDBNS.width - w + Math.random() * 299;
		var y = _YGDBNS.lines[0] - h;
		//_YGDBNS.ctx.fillRect(x, y+1, w, h);
		_YGDBNS.cs.push({
			"w": w,
			"h": h,
			"x": x,
			"y": y
		});
	}
}

_YGDBNS.createNPC = function(n) {
		_YGDBNS.ctx.fillStyle = "#000000";
	_YGDBNS.npcs = new Array();
	if(n && n >= 2 && n <= 5) {
		for(var i = 0; i < n; i++) {
			var x = 120;
			var y = _YGDBNS.lines[i] - 40;
			_YGDBNS.npcs.push({
				"x": x,
				"y": y,
				"n": 1
			});
			var imgurl = "../ygdbns/img/01.png";
			var img = document.createElement("img");
			img.src = imgurl;
			_YGDBNS.ctx.drawImage(img, x, y, 20, 40);
		}
	} else {
		var x = 120;
		var y = _YGDBNS.lines[0] - 40;
		_YGDBNS.npcs.push({
			"x": x,
			"y": y,
			"n": 1
		});
		var imgurl = "../ygdbns/img/01.png";
		var img = document.createElement("img");
		img.src = imgurl;
		_YGDBNS.ctx.drawImage(img, x, y, 20, 40);
	}
}

_YGDBNS.jump = function(npcs, indexOfNpc, up, h) {
		_YGDBNS.ctx.fillStyle = "#000000";
	if(!_YGDBNS.status)
		return;
	var npc = npcs[indexOfNpc];
	if(npc.jumping && npc.jumping == true && up == true && h ==20){//还未落地，再跳跃
		return;
	}
	if(up) {
		if(h >= 320) {
			_YGDBNS.jump(npcs, indexOfNpc, false, h - 20);
		} else {
			_YGDBNS.ctx.clearRect(npc.x, npc.y, 20, 40);
			npc.y -= 5;
			npc.jumping = true;
			npcs[indexOfNpc] = npc;
			var imgurl = "../ygdbns/img/0" + npc.n + ".png";
			var img = document.createElement("img");
			img.src = imgurl;
			_YGDBNS.ctx.drawImage(img, npc.x, npc.y, 20, 40);
			setTimeout(function() {
				_YGDBNS.jump(npcs, indexOfNpc, true, h + 20);
			}, 1000 / 30);
		}
	} else {
		if(h <= 0) {
			var npc = npcs[indexOfNpc];
			npc.jumping = false;
			npcs[indexOfNpc] = npc;
			return;
		} else {
			_YGDBNS.ctx.clearRect(npc.x, npc.y, 20, 40);
			npc.y += 5;
			npc.jumping = true;
			npcs[indexOfNpc] = npc;
			var imgurl = "../ygdbns/img/0" + npc.n + ".png";
			var img = document.createElement("img");
			img.src = imgurl;
			_YGDBNS.ctx.drawImage(img, npc.x, npc.y, 20, 40);
			setTimeout(function() {
				_YGDBNS.jump(npcs, indexOfNpc, false, h - 20);
			}, 1000 / 30);
		}
	}
}

_YGDBNS.run = function(cs, len, npcs) {
	//黑方块移动
		_YGDBNS.ctx.fillStyle = "#000000";
	_YGDBNS.rectimer = setInterval(function() {
		$.each(cs, function(index, rec) {
			//console.log("擦除：");
			//console.log(rec);
			_YGDBNS.ctx.clearRect(rec.x, rec.y - 10, 2 + rec.w, rec.h + 10);
			_YGDBNS.createBorder();
			if(rec.x + rec.w < 0) {
				//重新生成1个矩形
				rec.y = rec.y + rec.h;
				rec.w = Math.round(Math.random() * 10 + 5) * 2;
				rec.h = Math.round(Math.random() * 10 + 5) * 3;
				rec.x = _YGDBNS.width - rec.w + Math.random() * 299;
				rec.y = rec.y - rec.h;
			}
			rec.x -= len;
			_YGDBNS.ctx.fillRect(rec.x, rec.y, rec.w, rec.h);
			//console.log("新建：");
			//console.log(rec);
			cs[index] = rec;
			_YGDBNS.over(rec,_YGDBNS.npcs[index]);
		});
	}, 20);
	//npc图片替换
	_YGDBNS.npcTimer = setInterval(function() {
		_YGDBNS.ctx.fillStyle = "#000000";
		$.each(npcs, function(i, npc) {
			_YGDBNS.ctx.clearRect(npc.x, npc.y, 20, 40);
			npc.n = npc.n == 5 ? 1 : npc.n + 1;
			var imgurl = "../ygdbns/img/0" + npc.n + ".png";
			var img = document.createElement("img");
			img.src = imgurl;
			_YGDBNS.ctx.drawImage(img, npc.x, npc.y, 20, 40);;
		})
	}, 100);
}

_YGDBNS.over = function(rec, npc) {
	if(npc && rec && npc.x + 20 >= rec.x && npc.y + 40 >= rec.y && npc.x <= rec.x+rec.w) {
		//_YGDBNS.ctx.fillStyle = "red";
		//_YGDBNS.ctx.rect(rec.x,rec.y,rec.w,rec.h);
		//_YGDBNS.ctx.rect(npc.x,npc.y,20,40);
		_YGDBNS.pause();
		if(confirm("您输了，是否重新开始？")) {
			_YGDBNS.resetGame();
		}
	}
}
_YGDBNS.resetGame = function() {
			setTimeout(function(){
			_YGDBNS.ctx.clearRect(0, 0, _YGDBNS.ctx.canvas.width, _YGDBNS.ctx.canvas.height);
			_YGDBNS.createBorder();
			_YGDBNS.createLine(_YGDBNS.n );
			_YGDBNS.createRec(_YGDBNS.n );
			_YGDBNS.createNPC(_YGDBNS.n );
			_YGDBNS.start();
			_YGDBNS.status = true;
			if(_YGDBNS.timerElement){
				$(_YGDBNS.timerElement).html(0);
			}
			
			},200);
}
_YGDBNS.pause = function() {
	clearInterval(_YGDBNS.rectimer);
	clearInterval(_YGDBNS.npcTimer);
	clearInterval(_YGDBNS.timer);
	_YGDBNS.status = false;
}
_YGDBNS.start = function() {
	if(!_YGDBNS.status) {
		_YGDBNS.run(_YGDBNS.cs, 3, _YGDBNS.npcs);
		_YGDBNS.status = true;
		if(_YGDBNS.timerElement){
			_YGDBNS.timer = setInterval(function(){
				var t = parseFloat($(_YGDBNS.timerElement).html());
				$(_YGDBNS.timerElement).html((t+0.03).toFixed(3));
			},30);
		}
	}
}
_YGDBNS.pauseOrStart = function() {
	if(!_YGDBNS.status) {
		_YGDBNS.start();
	} else
		_YGDBNS.pause();
}
