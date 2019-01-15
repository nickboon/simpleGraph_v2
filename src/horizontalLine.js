const Line = require('./line');
const Point = require('./point');
const Divisions = require('./divisions');

class HorizontalLine extends Line {
    constructor(width, yIntercept, {
        fontSize = 10
    } = {}) {
        const points = [
            new Point(0, yIntercept),
            new Point(width, yIntercept)
        ];

        super(points);

        this.yIntercept = yIntercept;
        this.elements = [
            (elementFactory, origin) =>
            elementFactory.line(this.points[0].toAbsoluteY(origin), this.points[1].toAbsoluteY(origin))
        ];
        this.textOptions = {
            textAnchor: 'middle',
            fontSize
        };
    }

    setDivisions(increment = 0) {
        if (increment <= 0) return this;

        const y = this.points[0].y;
        const maxX = this.points[1].x;
        const labelOptions = {
            fontSize: this.textOptions.fontSize,
            textAnchor: this.textOptions.textAnchor,
            offsetY: -1
        };
        const label = (increments, elementFactory, origin) => {
            return increments
                .reduce((acc, x) => acc.concat(...new Point(-x, y).label(-x, labelOptions).elements), [])
                .map(f => f(elementFactory, origin)).join('\n\t');
        };

        this.elements.push(
            (elementFactory, origin) => label(
                Divisions.getIncrementsInRange(0, origin.x, increment),
                elementFactory,
                origin),
            (elementFactory, origin) => label(
                Divisions.getIncrementsInRange(0, origin.x - maxX, increment),
                elementFactory,
                origin)
        );

        return this;
    }
}

module.exports = HorizontalLine;