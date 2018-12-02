class CubicBezier {
    constructor(points) {
        this.points = points;
        this.elements = [
            (elementFactory, origin) => elementFactory.cubicBezier(...this.points.map(p => p.toAbsolute(origin)))
        ];
    }
}

module.exports = CubicBezier;