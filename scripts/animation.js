var Animation = (function() {

  var width, height, largeHeader, canvas, ctx, points, target, colors = {}, animateHeader = true;

  function initHeader() {
    largeHeader = document.getElementById('header');

    width = window.getComputedStyle(largeHeader).width.slice(0, -2);
    height = window.getComputedStyle(largeHeader).height.slice(0, -2);
    target = { x: width / 2, y: height / 2 };

    canvas = document.getElementById('header-canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    // Create points.
    points = [];
    for (var x = 0; x < width; x += 72) {
      for (var y = 0; y < height; y += 25) {
        var px = x + Math.random() * 72;
        var py = y + Math.random() * 25;
        var p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // For each point, find the 5 closest points.
    points.forEach(function(point) {
      var closest = [];

      points.forEach(function(otherPoint) {
        if (point !== otherPoint) {
          var placed = false;

          for (var i = 0; i < 5; i++) {
            if (!placed) {
              if (!closest[i] || getDistance(point, otherPoint) < getDistance(point, closest[i])) {
                closest[i] = otherPoint;
                placed = true;
              }
            }
          }
        }
      });

      point.closest = closest;
    });

    // Assign a circle to each point.
    points.forEach(function(point) {
      var c = new Circle(point, 2 + Math.random() * 2, colors.circle);
      point.circle = c;
    });
  }

  function addListeners() {
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', animateCheck);
    document.addEventListener('visibilitychange', animateCheck);
  }

  function resize() {
    width = window.getComputedStyle(largeHeader).width.slice(0, -2);
    height = window.getComputedStyle(largeHeader).height.slice(0, -2);
    canvas.width = width;
    canvas.height = height;
    target = { x: width / 2, y: height / 2 };
  }

  function animateCheck() {
    if (document.hidden || document.body.scrollTop > height) {
      animateHeader = false;
    } else {
      animateHeader = true;
    }
  }

  function initAnimation() {
    animate();

    points.forEach(function(point) {
      shiftPoint(point);
    });
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);

      points.forEach(function(point) {
        // Detect points in range.
        if (Math.abs(getDistance(target, point)) < 4000) {
          point.active = 0.3;
          point.circle.active = 0.6;
        } else if (Math.abs(getDistance(target, point)) < 20000) {
          point.active = 0.1;
          point.circle.active = 0.3;
        } else if (Math.abs(getDistance(target, point)) < 40000) {
          point.active = 0.02;
          point.circle.active = 0.1;
        } else {
          point.active = 0;
          point.circle.active = 0;
        }

        drawLines(point);
        point.circle.draw();
      });
    }

    requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Circ.easeInOut,
      onComplete: shiftPoint.bind(null, p)
    });
  }

  // Canvas manipulation.
  function drawLines(p) {
    if (!p.active) return;
    p.closest.forEach(function(point) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(point.x, point.y);
      ctx.strokeStyle = 'rgba(' + colors.line + ',' + p.active + ')';
      ctx.stroke();
    });
  }

  function Circle(pos, rad, color) {
    this.pos = pos || null;
    this.radius = rad || null;
    this.color = color || null;
  }

  Circle.prototype.draw = function() {
    if (!this.active) return;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(' + this.color + ',' + this.active + ')';
    ctx.fill();
  };

  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

  return {
    run: function(opts) {
      colors.line = opts && opts.lineColor ? opts.lineColor : '127,140,141';
      colors.circle = opts && opts.circleColor ? opts.circleColor : '127,140,141';
      initHeader();
      initAnimation();
      addListeners();
    }
  };
})();

Animation.run({ lineColor: '127,140,141', circleColor: '41,128,185' });
