const Vector = require('./vector');

class Line {
    constructor(points) {
        this.points = points;
    }

    elements(elementFactory) {
        return elementFactory.line(this.points[0], this.points[1]);
    }
}

module.exports = Line;