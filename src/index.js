const Elements = require('./elements');
const Point = require('./point');
const Line = require('./line');
const HorizontalLine = require('./horizontalLine');
const VerticalLine = require('./verticalLine');
const Polygon = require('./polygon');
const QuadraticBezier = require('./quadraticBezier');
const CubicBezier = require('./cubicBezier');
const Text = require('./text');

const defaults = new WeakMap();
const dimensions = new WeakMap();
const elementFactory = new WeakMap();
const htmlContainerElement = new WeakMap();
const axes = new WeakMap();

class Graph {
    constructor(width, height) {
        this.setDefaults().setHtmlContainerElement();
        if (!width && !height && htmlContainerElement.get(this))
            this.setDimensionsToHtmlContainer();
        else
            this.setDimensions(width, height);

        this.setOrigin().setAxes();
    }

    setDefaults({
        width = 600,
        height = 300,
        htmlContainerElementId = 'simplegraph',
        colour = '#000',
        opacity = '0.5',
        fontSize = 10,
        textAnchor = 'start'
    } = {}) {
        defaults.set(this, {
            width,
            height,
            htmlContainerElementId,
            fontSize
        });
        elementFactory.set(this, new Elements({
            colour,
            opacity,
            fontSize,
            textAnchor
        }));
        return this;
    }

    setHtmlContainerElement(id = defaults.get(this).htmlContainerElementId) {
        const document = global.document;
        if (document)
            htmlContainerElement.set(this, document.getElementById(id));

        return this;
    }

    setDimensionsToHtmlContainer() {
        const html = htmlContainerElement.get(this);
        if (!html)
            throw new Error('Html container element not found.');

        const {
            clientWidth,
            clientHeight
        } = html;
        this.setDimensions(clientWidth, clientHeight || clientWidth / 2);
        return this;
    }

    setDimensions(width = defaults.get(this).width, height = defaults.get(this).height) {
        dimensions.set(this, {
            width,
            height
        });
        return this;
    }

    setOrigin(x = dimensions.get(this).width / 2, y = dimensions.get(this).height / 2) {
        this.origin = new Point(x, y);
        return this;
    }

    setAxes(increment = 0) {
        axes.set(this, [
            this.horizontalLine().setDivisions(increment),
            this.verticalLine().setDivisions(increment)
        ]);
        return this;
    }

    text(text, point = this.point()) {
        return new Text(text, point);
    }

    point(x = 0, y = 0, {
        fontSize = defaults.get(this).fontSize,
        textAnchor
    } = {}) {
        return new Point(x, y, {
            fontSize,
            textAnchor
        });
    }

    line(pointA = this.point(), pointB = this.point()) {
        return new Line([pointA, pointB]);
    }

    horizontalLine(y = 0) {
        return new HorizontalLine(dimensions.get(this).width, y);
    }

    verticalLine(x = 0) {
        return new VerticalLine(dimensions.get(this).height, x);
    }

    polygon(points) {
        return new Polygon(points);
    }

    quadraticBezier(pointA = this.point(), pointB = this.point(), pointC = this.point()) {
        return new QuadraticBezier([pointA, pointB, pointC]);
    }

    cubicBezier(
        pointA = this.point(),
        pointB = this.point(),
        pointC = this.point(),
        pointD = this.point()
    ) {
        return new CubicBezier([pointA, pointB, pointC, pointD]);
    }

    draw(figures = []) {
        const create = elementFactory.get(this);
        const {
            width,
            height
        } = dimensions.get(this);
        const {
            x,
            y
        } = this.origin;
        const getFigureElements = (figuresArray) =>
            figuresArray.map(f => f.elements.map(e => e(create, this.origin))).join('\n\t');

        const svg = [
            create.openSvg(width, height),
            `\t${getFigureElements(axes.get(this))}`,
            `\t${getFigureElements(figures)}`,
            create.closeSvg()
        ].join('\n');

        const html = htmlContainerElement.get(this);
        if (html)
            html.innerHTML = svg;

        return svg;
    }
}

module.exports = Graph;