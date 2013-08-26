define('conwar', ['life', 'canvas'], function() {

    var life = require('life');
    var Canvas = require('canvas');

    life.setDimensions(40,40);

    life.set(0, 2, {bias: 1});
    life.set(1, 2, {bias: 1});
    life.set(2, 2, {bias: 1});
    life.set(2, 1, {bias: 1});
    life.set(1, 0, {bias: 1});

    life.set(22, 2, {bias: 2, speed: 1});
    life.set(23, 2, {bias: 2, speed: 1});
    life.set(24, 2, {bias: 2, speed: 1});
    life.set(22, 1, {bias: 2, speed: 1});
    life.set(23, 0, {bias: 2, speed: 1});

    var c = new Canvas(400, 400);

    document.body.appendChild(c.el);

    var ctx = c.ctx;
    ctx.scale(10,10);
    ctx.fillStyle = '#fff';

    function tick() {
        c.clear();
        for (var y = 0; y < 100; y++) {
            for (var x = 0; x < 100; x++) {
                var cell = life.get(x, y);
                if (cell) {
                    ctx.fillStyle = ['white', 'red', 'blue'][cell.bias || 0];
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        }
        life.advance();
        setTimeout(tick, 10);
    }
    tick();

});
