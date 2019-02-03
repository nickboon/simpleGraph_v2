const Figure = require('./figure');

class Polygon extends Figure {
    constructor(points, colour, opacity) {
        super(points, colour, opacity);
        this.elements.push(
            (elementFactory, origin) => elementFactory.polygon(
                this.points.map(p => p.toAbsolute(origin)),
                this.colour,
                this.opacity));
    }
}

module.exports = Polygon;