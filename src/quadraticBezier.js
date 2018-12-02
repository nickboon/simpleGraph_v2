class QuadraticBezier {
    constructor(points) {
        this.points = points;
        this.elements = [
            (elementFactory, origin) => elementFactory.quadraticBezier(...this.points.map(p => p.toAbsolute(origin)))
        ];
    }
}

module.exports = QuadraticBezier;