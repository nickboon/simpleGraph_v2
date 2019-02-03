const Figure = require('./figure');

class CubicBezier extends Figure {
    constructor(points, colour, opacity) {
        super(points, colour, opacity);
        this.elements.push(
            (elementFactory, origin) => elementFactory.cubicBezier(...this.points.map(p => p.toAbsolute(origin)), this.colour, this.opacity));
    }
}

module.exports = CubicBezier;