class CubicBezier {
    constructor(points) {
        this.points = points;
    }

    elements(elementFactory) {
        return elementFactory.cubicBezier(...this.points);
    }
}

module.exports = CubicBezier;