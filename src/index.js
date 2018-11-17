const Elements = require('./elements');
const Vector = require('./vector');

const defaults = new WeakMap();
const dimensions = new WeakMap();
const elementFactory = new WeakMap();
const origin = new WeakMap();
const htmlContainerElement = new WeakMap();

class Graph {
    constructor(width, height) {
        this.setDefaults().setHtmlContainerElement();
        if (!width && !height && htmlContainerElement.get(this))
            this.setDimensionsToHtmlContainer();
        else
            this.setDimensions(width, height);

        this.setOrigin();
    }

    setDefaults({
        width = 600,
        height = 300,
        htmlContainerElementId = 'simplegraph',
        colour = '#000',
        opacity = '0.5'
    } = {}) {
        defaults.set(this, {
            width,
            height,
            htmlContainerElementId
        });
        elementFactory.set(this, new Elements({
            colour,
            opacity
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
        origin.set(this, new Vector(x, y));

        return this;
    }

    draw() {
        const create = elementFactory.get(this);
        const {
            width,
            height
        } = dimensions.get(this);
        const {
            x,
            y
        } = origin.get(this);

        const svg = `${create.openSvg(width,height)}
            ${create.line(new Vector(0, y), new Vector(width, y))}
            ${create.line(new Vector(x, 0), new Vector(x, height))}
        ${create.closeSvg()}`;

        const html = htmlContainerElement.get(this);
        if (html)
            html.innerHTML = svg;

        return svg;
    }
}

module.exports = Graph;