const Label = require('./label');

const label = new WeakMap();

class Point {
    constructor(x = 0, y = 0, {
        fontSize,
        textAnchor,
        radius,
    } = {}) {
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.textAnchor = textAnchor;
        this.radius = radius;
        const newLabel = new Label(
            `${this.x}, ${this.y}`,
            [this], {
                offsetX: 0,
                offsetY: 0,
                fontSize,
                textAnchor,
                radius
            });
        label.set(this, newLabel);
        this.elements = newLabel.elements;
    }

    label(text = `${this.x}, ${this.y}`, {
        fontSize = this.fontSize,
        textAnchor = this.textAnchor,
        radius = this.radius,
        offsetX = 0,
        offsetY = 0
    } = {}) {
        const updatedLabel = label.get(this);
        updatedLabel.fontSize = fontSize;
        updatedLabel.textAnchor = textAnchor;
        updatedLabel.radius = radius;
        updatedLabel.elements.length = 0;
        if (!offsetX && !offsetY)
            updatedLabel.setCross();
        else
            updatedLabel.setOffset(offsetX, offsetY);

        updatedLabel.setText(text);

        return this;
    }

    offset(x = 0, y = 0) {
        const updatedLabel = label.get(this);
        updatedLabel.elements.length = 0;
        updatedLabel.setOffset(x, y);
        updatedLabel.setText();
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