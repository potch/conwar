define('canvas', [], function() {

    function Canvas(w, h) {
        this.el = document.createElement('canvas');
        this.el.width = w;
        this.el.height = h;
    }
    Canvas.prototype = {
        get ctx () {
            return this.el.getContext('2d');
        },
        clear: function() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        },
        get width () {
            return this.el.width;
        },
        set width (w) {
            this.el.width = w;
        },
        get height () {
            return this.el.height;
        },
        set height (h) {
            this.el.height = h;
        }
    };

    return Canvas;
});
