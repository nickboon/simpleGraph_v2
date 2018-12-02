class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    toAbsolute(origin) {
        return new Point(origin.x + this.x, origin.y - this.y);
    }

    toAbsoluteX(origin) {
        return new Point(origin.x + this.x, this.y);
    }

    toAbsoluteY(origin) {
        return new Point(this.x, origin.y - this.y);
    }

    shift(x = 0, y = 0) {
        this.x += x;
        this.y += y;
    }

    copy(offsetX = 0, offsetY = 0) {
        return new Point(this.x + offsetX, this.y + offsetY);
    }
}

module.exports = Point;