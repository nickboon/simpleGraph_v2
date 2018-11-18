class Polygon {
    constructor(points) {
        this.points = points;
    }

    elements(elementFactory) {
        return elementFactory.polygon(this.points);
    }
}

module.exports = Polygon;