	/**********  Grid Drawing ****************/
Raphael.fn.drawGrid = function (x, y, w, h, wv, hv, color) {
    color = color || "#000";
    var path = ["M", Math.round(x) + .5, Math.round(y) + .5, "L", Math.round(x + w) + .5, Math.round(y) + .5, Math.round(x + w) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y) + .5],
        rowHeight = h / hv,
        columnWidth = w / wv;
    for (var i = 1; i < hv; i++) {
        path = path.concat(["M", Math.round(x) + .5, Math.round(y + i * rowHeight) + .5, "H", Math.round(x + w) + .5]);
    }
    for (i = 1; i < wv; i++) {
        path = path.concat(["M", Math.round(x + i * columnWidth) + .5, Math.round(y) + .5, "V", Math.round(y + h) + .5]);
    }
    return this.path(path.join(",")).attr({stroke: color});
};

function drawVitals(holder, labels, values, bglUnits, tempUnits) {
    function getAnchors(p1x, p1y, p2x, p2y, p3x, p3y) {
        var l1 = (p2x - p1x) / 2,
            l2 = (p3x - p2x) / 2,
            a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
            b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));
        a = p1y < p2y ? Math.PI - a : a;
        b = p3y < p2y ? Math.PI - b : b;
        var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2,
            dx1 = l1 * Math.sin(alpha + a),
            dy1 = l1 * Math.cos(alpha + a),
            dx2 = l2 * Math.sin(alpha + b),
            dy2 = l2 * Math.cos(alpha + b);
        return {
            x1: p2x - dx1,
            y1: p2y + dy1,
            x2: p2x + dx2,
            y2: p2y + dy2
        };
    }

	/**********  Variables ****************/	
    var width = 300,
        height = 250,
        leftgutter = 30,
        bottomgutter = 20,
        topgutter = 60,
        colorhue = .6, // || Math.random(),
        color = "hsb(" + [colorhue, .5, 1] + ")",
        r,
        txt = {font: '12px Helvetica, Arial', fill: "#fff"},
        txt1 = {font: '10px Helvetica, Arial', fill: "#fff"},
        txt2 = {font: '12px Helvetica, Arial', fill: "#000"},
        X = (width - leftgutter) / labels.length,
		data = values[0],
        max,
        Y,
		e = [],
		clr = [],
		vital = ["HR", "Sys", "Dia", "FiO2", "SpO2", "Resp", "Level of C", "Left Eye", "Right Eye", "BGL", "EtCO2", "Temp", "Pain"],
		units = ["bpm", "mmHg", "mmHg", "%", "%", "/min", "", "mm", "mm", "mmol/L", "%", "Celsius", ""],
		now = 0,
		bg,
		month,
		rightc,
		right,
		leftc,
		left,
		path,
        bgp,
        label,
        is_label_visible,
        leave_timer,
        blanket,
		frame,
		p, 
		bgpp;
		
	// make color list
	for (var i = 0; i < 13; i++) {
		clr[i] = Raphael.getColor(1);
	}
	
	// To be run once at init
	function preInit(){
		//Check Device
		var isIphone = (navigator.userAgent.indexOf('iPhone') != -1) ? true : false;
		var isIpod = (navigator.userAgent.indexOf('iPod') != -1) ? true : false;
		var isIpad = (navigator.userAgent.indexOf('iPad') != -1) ? true : false;
		// Set the canvas
		if ((isIphone) || (isIpod)){
			//alert("iPhone or iPod");
			width = 300;
			height = 200;
			leftgutter = 10;
			
		}
		if (isIpad){
			//alert("iPad");
			width = 400;
			height = 300;
			leftgutter = 10;
		}
		X = (width - leftgutter) / labels.length;
		r = Raphael(holder, width, height);
	}
	
	function initChart(){

		// Clear before starting
		r.clear();
		// Back for month
		bg = r.rect(100, 14, 134, 26, 13).attr({fill: "#666", stroke: "none"});
		// Drawing Grid
		r.drawGrid(leftgutter + X * .5 + .5, topgutter + .5, width - leftgutter - X, height - topgutter - bottomgutter, 10, 10, "#333");
		// Init the Path
		path = r.path().attr({stroke: clr[now], "stroke-width": 4, "stroke-linejoin": "round"});
		bgp = r.path().attr({stroke: "none", opacity: .3, fill: clr[now]});
		label = r.set();
		is_label_visible = false;
		blanket = r.set();
			// Popup label	
		label.push(r.text(60, 12, "24 hits").attr(txt));
		label.push(r.text(60, 27, "22 September 2008").attr(txt1).attr({fill: clr[now]}));
		label.hide();
		frame = r.popup(100, 100, label, "right").attr({fill: "#000", stroke: "#666", "stroke-width": 2, "fill-opacity": .7}).hide();
		// Vital selector
		month = r.text(166, 27, vital[now]).attr({fill: "#fff", stroke: "none", "font": '100 18px "Helvetica Neue", Helvetica, "Arial Unicode MS", Arial, sans-serif'});
		rightc = r.circle(221, 27, 10).attr({fill: "#fff", stroke: "none"});
		right = r.path("M217,22l10,5 -10,5z").attr({fill: "#000"});
		leftc = r.circle(113, 27, 10).attr({fill: "#fff", stroke: "none"});
		left = r.path("M117,22l-10,5 10,5z").attr({fill: "#000"});
	}
		
	function renderPath(){
		initChart();
		for (var i = 0, ii = labels.length; i < ii; i++) {
			if ((now == 9) && (bglUnits[i] == "false")){
				data[i] = (data[i]/18).toFixed(1);
				bglUnits[i] = "true";
			}
			if ((now == 11) && (tempUnits[i] == "false")){
				data[i] = ((data[i] - 32) * (5/9)).toFixed(1);
				tempUnits[i] = "true";
			}
		}
		var unit = units[now];
		max = Math.max.apply(Math, data);
		if (max != "0")
			Y = (height - bottomgutter - topgutter) / max;
		else
			Y = "0";
		for (var i = 0, ii = labels.length; i < ii; i++) {
			var y = Math.round(height - bottomgutter - Y * data[i]),
				x = Math.round(leftgutter + X * (i + .5)),
				t = r.text(x, height - 6, labels[i]).attr(txt).toBack();
			if (!i) {
				p = ["M", x, y, "C", x, y];
				bgpp = ["M", leftgutter + X * .5, height - bottomgutter, "L", x, y, "C", x, y];
			}
			if (i && i < ii - 1) {
				var Y0 = Math.round(height - bottomgutter - Y * data[i - 1]),
					X0 = Math.round(leftgutter + X * (i - .5)),
					Y2 = Math.round(height - bottomgutter - Y * data[i + 1]),
					X2 = Math.round(leftgutter + X * (i + 1.5));
				var a = getAnchors(X0, Y0, x, y, X2, Y2);
				p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
				bgpp = bgpp.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
			}
			var dot = r.circle(x, y, 4).attr({fill: "#000", stroke: clr[now], "stroke-width": 2});
			blanket.push(r.rect(leftgutter + X * i, 0, X, height - bottomgutter).attr({stroke: "none", fill: "#fff", opacity: 0}));
			var rect = blanket[blanket.length - 1];
			(function (x, y, data, lbl, dot) {
				var timer, i = 0;
				rect.hover(function () {
					clearTimeout(leave_timer);
					var side = "right";
					if (x + frame.getBBox().width > width) {
						side = "left";
					}
					var ppp = r.popup(x, y, label, side, 1);
					frame.show().stop().animate({path: ppp.path}, 200 * is_label_visible);
					if (data == "")
						data = "0";
					label[0].attr({text: data + " " + unit}).show().stop().animateWith(frame, {translation: [ppp.dx, ppp.dy]}, 200 * is_label_visible);
					label[1].attr({text: lbl}).show().stop().animateWith(frame, {translation: [ppp.dx, ppp.dy]}, 200 * is_label_visible);
					dot.attr("r", 6);
					is_label_visible = true;
				}, function () {
					dot.attr("r", 4);
					leave_timer = setTimeout(function () {
						frame.hide();
						label[0].hide();
						label[1].hide();
						is_label_visible = false;
					}, 1);
				});
			})(x, y, data[i], labels[i], dot);
		}
		p = p.concat([x, y, x, y]);
		bgpp = bgpp.concat([x, y, x, y, "L", x, height - bottomgutter, "z"]);
		path.attr({path: p});
		bgp.attr({path: bgpp});
		frame.toFront();
		label[0].toFront();
		label[1].toFront();
		blanket.toFront();
		bg.toFront();
		month.toFront();
		rightc.toFront();
		right.toFront();
		leftc.toFront();
		left.toFront();
		
		/**********  Animation Function ****************/	
		var animation = function () {
			var time = 500;
			if (now == 13) {
				now = 0;
			}
			if (now == -1) {
				now = 12;
			}
			month.attr({text: vital[now]});
			data = values[now];
			renderPath();
		};
		
		rightc.node.onclick = right.node.onclick = function () {
			now++;
			animation();
		};
		leftc.node.onclick = left.node.onclick = function () {
			now--;
			animation();
		};
	}
	
	preInit();
	renderPath();

};