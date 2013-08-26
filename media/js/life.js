define('life', [], function () {

    var boards = [];

    var generation = 0;

    var width;
    var height;

    var currentGen = [];

    function advance () {
        var newGen = [];
        for (var i = 0; i < width * height; i++) {
            var cell = currentGen[i];
            var n = neighbors(i % width, i / width | 0);

            if (cell) {
                if (generation % cell.speed < 1) {
                    if (n.length >= 2 && n.length <= 3) {
                        newGen[i] = currentGen[i];
                    }
                } else {
                    newGen[i] = currentGen[i];
                }
            } else {
                if (n.length === 3) {
                    var o = offspring(n);
                    if (generation % o.speed < 1) {
                        newGen[i] = o;
                    }
                }
            }

        }
        currentGen = newGen;
        generation++;
    }

    function offspring (cells) {
        function inherit(prop, def) {
            if (cells[0][prop] === cells[1][prop] &&
                cells[1][prop] === cells[2][prop]) {
                return cells[0][prop];
            } else {
                return def;
            }
        }
        return {
            bias: inherit('bias', 0),
            speed: inherit('speed', 8)
        };
    }

    function neighbors (x, y) {
        var ret = [];
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (!i && !j) continue;
                var v = get(x + i, y + j);
                if (v) {
                    ret.push(v);
                }
            }
        }
        return ret;
    }

    function setDimensions (w, h) {
        generation = 0;
        boards[0] = [];
        currentGen = boards[0];
        width = w;
        height = h;
    }

    function map (x, y) {
        // wrap
        x = (x >= width ? x % width : x);
        x = (x < 0 ? x % width + width : x);
        y = (y >= height ? y % height : y);
        y = (y < 0 ? y % height + height : y);

        return y * width + x;
    }

    function unmap (i) {
        return [i % width | 0, i / width];
    }

    function set (x, y, v) {
        var o = {
            bias: v.bias || 0,
            speed: v.speed || 8
        };
        currentGen[map(x, y)] = o;
    }

    function get (x, y) {
        return currentGen[map(x, y)];
    }

    return {
        advance: advance,
        get board () { return boards[generation % 2] },
        get: get,
        set: set,
        setDimensions: setDimensions
    };

});
