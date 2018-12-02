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

        const x = this.xIntercept;
        const getDivisionElementsForY = (y, elementFactory, origin) =>
            this.getDivisionElements(
                elementFactory,
                origin.copy(x, -y),
                origin.copy(x - this.textOptions.fontSize, -y),
                origin.copy(x - this.textOptions.fontSize, -y),
                y);

        const getDivisionElementsForYBetween0And = (limit, elementFactory, origin) =>
            Divisions.getIncrementsInRange(0, limit, increment)
            .map(y => getDivisionElementsForY(y, elementFactory, origin))
            .join('');

        this.elements.push(
            (elementFactory, origin) =>
            getDivisionElementsForYBetween0And(origin.y, elementFactory, origin) +
            getDivisionElementsForYBetween0And(origin.y - this.points[1].y, elementFactory, origin)
        );

        if (x != 0)
            this.elements.push((elementFactory, origin) =>
                getDivisionElementsForY(0, elementFactory, origin));

        return this;
    }
}

module.exports = VerticalLine;