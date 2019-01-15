const Figure = require('./figure');

class Polygon extends Figure {
    constructor(points) {
        super(points);
        this.elements.push(
            (elementFactory, origin) => elementFactory.polygon(this.points.map(p => p.toAbsolute(origin))));
    }
}

module.exports = Polygon;