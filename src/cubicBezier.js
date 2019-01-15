const Figure = require('./figure');

class CubicBezier extends Figure {
    constructor(points) {
        super(points);
        this.elements.push(
            (elementFactory, origin) => elementFactory.cubicBezier(...this.points.map(p => p.toAbsolute(origin))));
    }
}

module.exports = CubicBezier;