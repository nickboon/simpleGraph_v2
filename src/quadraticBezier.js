const Figure = require('./figure');

class QuadraticBezier extends Figure {
    constructor(points, colour, opacity) {
        super(points, colour, opacity);
        this.elements.push(
            (elementFactory, origin) => elementFactory.quadraticBezier(
                ...this.points.map(p => p.toAbsolute(origin)),
                this.colour,
                this.opacity));
    }
}

module.exports = QuadraticBezier;