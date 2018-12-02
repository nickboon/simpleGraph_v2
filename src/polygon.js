class Polygon {
    constructor(points) {
        this.points = points;
        this.elements = [
            (elementFactory, origin) => elementFactory.polygon(this.points.map(p => p.toAbsolute(origin)))
        ];
    }
}

module.exports = Polygon;