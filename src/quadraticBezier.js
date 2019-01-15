const Figure = require('./figure');

class QuadraticBezier extends Figure {
    constructor(points) {
        super(points);
        this.elements.push(
            (elementFactory, origin) => elementFactory.quadraticBezier(...this.points.map(p => p.toAbsolute(origin))));
    }
}

module.exports = QuadraticBezier;