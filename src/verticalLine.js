const Line = require('./line');
const Point = require('./point');
const Divisions = require('./divisions');

class VerticalLine extends Line {
    constructor(height, xIntercept = 0, {
        fontSize = 10
    } = 0) {
        const points = [
            new Point(xIntercept, 0),
            new Point(xIntercept, height)
        ];

        super(points);

        this.xIntercept = xIntercept;
        this.elements = [
            (elementFactory, origin) =>
            elementFactory.line(this.points[0].toAbsoluteX(origin), this.points[1].toAbsoluteX(origin))
        ];
        this.textOptions = {
            textAnchor: 'end',
            fontSize
        };
    }

    setDivisions(increment = 0) {
        if (increment <= 0) return this;

        const x = this.points[0].x;
        const maxY = this.points[1].y;
        const labelOptions = {
            fontSize: this.textOptions.fontSize,
            textAnchor: this.textOptions.textAnchor,
            offsetX: -1
        };
        const label = (increments, elementFactory, origin) => {
            return increments
                .reduce((acc, y) => acc.concat(...new Point(x, y).label(y, labelOptions).elements), [])
                .map(f => f(elementFactory, origin)).join('\n\t');
        };

        this.elements.push(
            (elementFactory, origin) => label(
                Divisions.getIncrementsInRange(0, origin.y, increment),
                elementFactory,
                origin),
            (elementFactory, origin) => label(
                Divisions.getIncrementsInRange(0, origin.y - maxY, increment),
                elementFactory,
                origin)
        );

        return this;
    }
}

module.exports = VerticalLine;