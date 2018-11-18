class QuadraticBezier {
    constructor(points) {
        this.points = points;
    }

    elements(elementFactory) {
        return elementFactory.quadraticBezier(...this.points);
    }
}

module.exports = QuadraticBezier;