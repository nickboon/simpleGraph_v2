class Figure {
    constructor(points, colour, opacity) {
        this.elements = [];
        this.points = points;
        this.colour = colour;
        this.opacity = opacity;
    }

    label(options) {
        this.points
            .map(p => p.label(undefined, options))
            .forEach(p => this.elements.push(...p.elements));
        return this;
    }

    withColour(colour) {
        this.colour = colour;
        return this;
    }

    withOpacity(opacity) {
        this.opacity = opacity;
        return this;
    }
}

module.exports = Figure;