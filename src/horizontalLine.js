const Line = require('./line');
const Point = require('./point');
const Divisions = require('./divisions');

class HorizontalLine extends Line {
    constructor(width, yIntercept, {
        fontSize = 10
    } = 0) {
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
        const getDivisionElementsForX = (x, elementFactory, origin) =>
            this.getDivisionElements(
                elementFactory,
                origin.copy(-x, -y),
                origin.copy(-x, -y + this.textOptions.fontSize),
                origin.copy(-x, -y + this.textOptions.fontSize * 2),
                x);

        const getDivisionElementsForXBetween0And = (limit, elementFactory, origin) =>
            Divisions.getIncrementsInRange(0, limit, increment)
            .map(x => getDivisionElementsForX(x, elementFactory, origin))
            .join('');

        this.elements.push(
            (elementFactory, origin) =>
            getDivisionElementsForXBetween0And(origin.x, elementFactory, origin) +
            getDivisionElementsForXBetween0And(origin.x - this.points[1].x, elementFactory, origin)
        );

        if (y != 0)
            this.elements.push((elementFactory, origin) =>
                getDivisionElementsForX(0, elementFactory, origin));

        return this;
    }
}

module.exports = HorizontalLine;