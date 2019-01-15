const Figure = require('./figure');

class Line extends Figure {
    constructor(points) {
        super(points);
        this.elements.push(
            (elementFactory, origin) => elementFactory.line(this.points[0].toAbsolute(origin), this.points[1].toAbsolute(origin))
        );
    }

    get dx() {
        return this.points[1].x - this.points[0].x;
    }

    get dy() {
        return this.points[1].y - this.points[0].y;
    }

    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    normalize() {
        return {
            x: this.x / this.length,
            y: this.y / this.length
        };
    }

    getDivisionElements(elementFactory, point, offsetPoint, textPoint, text) {
        // return `
        // ${elementFactory.text(text, textPoint, this.textOptions)}
        // ${elementFactory.line(point, offsetPoint)}`;
    }
}

module.exports = Line;