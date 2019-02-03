class Label {
    constructor(text, points, {
        offsetX,
        offsetY,
        fontSize,
        textAnchor,
        radius,
        colour,
        opacity
    }) {
        this.text = text;
        this.points = points;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.fontSize = fontSize;
        this.textAnchor = textAnchor || this.defaultTextAnchorForOffset;
        this.radius = radius;
        this.colour = colour;
        this.opacity = opacity;
        this.elements = [];
        this.setCross();
    }

    setText(text = this.text) {
        this.text = text;
        const fontSize = this.fontSize;
        const textAnchor = this.textAnchor;
        const colour = this.colour;
        const opacity = this.opacity;
        this.elements.push((elementFactory, origin) => elementFactory.text(
            this.text,
            this.points[0].copy(this.offsetX, this.offsetY).toAbsolute(origin), {
                fontSize,
                textAnchor,
                colour,
                opacity
            }
        ));
    }

    get defaultTextAnchorForOffset() {
        if (this.offsetX < 0) return 'end';
        if (this.offsetX == 0 && this.offsetY != 0) return 'middle';
        return 'start';
    }

    setOffset(x, y) {
        x *= this.fontSize;
        y *= this.fontSize;
        this.offsetX = x;
        this.offsetY = y;

        this.textAnchor = this.defaultTextAnchorForOffset;

        if (x == 0 && y == 0)
            return;

        if (y < 0 && this.textAnchor == 'middle')
            this.offsetY -= this.fontSize;

        const colour = this.colour;
        const opacity = this.opacity;
        this.elements.push((elementFactory, origin) => elementFactory.line(
            this.points[0].toAbsolute(origin),
            this.points[0].copy(x, y).toAbsolute(origin),
            colour,
            opacity
        ));
    }

    setCross() {
        this.offsetX = this.offsetY = 0;
        const r = this.radius;
        if (this.textAnchor == 'end')
            this.offsetX = -r;
        else if (this.textAnchor == 'middle')
            this.offsetY = -r - this.fontSize;
        else
            this.offsetX = r;

        const point = this.points[0];
        const colour = this.colour;
        const opacity = this.opacity;
        this.elements.push(...[
            (elementFactory, origin) => elementFactory.line(
                point.copy(r).toAbsolute(origin),
                point.copy(-r).toAbsolute(origin),
                colour,
                opacity),
            (elementFactory, origin) => elementFactory.line(
                point.copy(0, r).toAbsolute(origin),
                point.copy(0, -r).toAbsolute(origin),
                colour,
                opacity)
        ]);
    }
}

module.exports = Label;