class Point {
    constructor(x = 0, y = 0, {
        fontSize,
        textAnchor
    } = {}) {
        this.x = x;
        this.y = y;
        this.textOptions = {
            fontSize,
            textAnchor
        };
        this.elements = [];

        this.label();
    }

    label(text = `${this.x}, ${this.y}`, {
        fontSize = this.textOptions.fontSize,
        textAnchor = this.textOptions.textAnchor
    } = {}) {


        this.elements[0] = (elementFactory, origin) => elementFactory.text(
            text,
            this.toAbsolute(origin), {
                fontSize,
                textAnchor
            }
        );
        return this;
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