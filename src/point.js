const Label = require('./label');

const label = new WeakMap();

class Point {
    constructor(x = 0, y = 0, {
        fontSize,
        textAnchor
    } = {}) {
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.textAnchor = textAnchor;
        this.label();
    }

    label(text = `${this.x}, ${this.y}`, {
        fontSize = this.fontSize,
        textAnchor,
        offsetX = 0,
        offsetY = 0
    } = {}) {
        const newLabel = new Label(
            text,
            [this], {
                fontSize,
                textAnchor,
                offsetX,
                offsetY
            });
        label.set(this, newLabel);
        this.elements = newLabel.elements;
        return this;
    }

    offset(x, y) {
        label.get(this).setOffsetElements(x, y);
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