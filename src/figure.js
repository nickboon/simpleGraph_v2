class Figure {
    constructor(points) {
        this.elements = [];
        this.points = points;
    }

    label(options) {
        this.points
            .map(p => p.label(undefined, options))
            .forEach(p => this.elements.push(...p.elements));
        return this;
    }
}

module.exports = Figure;