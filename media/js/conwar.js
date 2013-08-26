define('conwar', ['life', 'canvas'], function() {

    var life = require('life');
    var Canvas = require('canvas');

    life.setDimensions(40,40);

    life.set(0, 2, {bias: 1});
    life.set(1, 2, {bias: 1});
    life.set(2, 2, {bias: 1});
    life.set(2, 1, {bias: 1});
    life.set(1, 0, {bias: 1});

    life.set(10, 30, {bias: 1, speed: 4});
    life.set(11, 30, {bias: 1, speed: 4});
    life.set(12, 30, {bias: 1, speed: 4});
    life.set(10, 31, {bias: 1, speed: 4});
    life.set(11, 32, {bias: 1, speed: 4});

    life.set(20, 0, {bias: 2, speed: 1});
    life.set(21, 0, {bias: 2, speed: 1});
    life.set(22, 0, {bias: 2, speed: 1});
    life.set(20, 1, {bias: 2, speed: 1});
    life.set(23, 1, {bias: 2, speed: 1});
    life.set(20, 2, {bias: 2, speed: 1});
    life.set(20, 3, {bias: 2, speed: 1});
    life.set(21, 4, {bias: 2, speed: 1});
    life.set(23, 4, {bias: 2, speed: 1});

    var fx = new Canvas(400, 400);
    document.body.appendChild(fx.el);
    var c = new Canvas(400, 400);
    document.body.appendChild(c.el);
    var ctx = c.ctx;
    var fxCtx = fx.ctx;
    fxCtx.scale(10,10);
    ctx.scale(10,10);
    ctx.fillStyle = '#fff';

    function tick() {
        c.clear();
        fxCtx.globalCompositeOperation = 'source-over';
        fxCtx.fillStyle = 'rgba(0,0,0,.05)';
        fxCtx.fillRect(0, 0, 400, 400);
        fxCtx.globalCompositeOperation = 'lighter';
        for (var y = 0; y < 100; y++) {
            for (var x = 0; x < 100; x++) {
                var cell = life.get(x, y);
                if (cell) {
                    ctx.fillStyle = ['white', 'red', 'blue'][cell.bias || 0];
                    ctx.fillRect(x, y, 1, 1);
                    if (cell.speed < 16) {
                        fxCtx.fillStyle = 'rgba(192,48,192,.01)';
                        if (life.generation % cell.speed < 1) {
                            fxCtx.fillRect(x-1.5, y-1, 3, 3);
                            fxCtx.fillRect(x-.5, y-1, 3, 3);
                            fxCtx.fillRect(x-1, y-1.5, 3, 3);
                            fxCtx.fillRect(x-1, y-.5, 3, 3);
                        }
                    }
                }
            }
        }
        life.advance();
        setTimeout(tick, 0);
    }
    tick();

});
