class Label {
    constructor(text, points, {
        offsetX,
        offsetY,
        fontSize,
        textAnchor
    }) {
        this.text = text;
        this.points = points;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.fontSize = fontSize;
        this.textAnchor = textAnchor || this.defaultTextAnchorForOffset;

        this.elements = [];

        this.setTextElement();
        this.setOffsetElements(offsetX, offsetY);
    }

    setTextElement() {
        const fontSize = this.fontSize;
        const textAnchor = this.textAnchor;
        this.elements[0] = (elementFactory, origin) => elementFactory.text(
            this.text,
            this.points[0].copy(this.offsetX, this.offsetY).toAbsolute(origin), {
                fontSize,
                textAnchor
            }
        );
    }

    get defaultTextAnchorForOffset() {
        if (this.offsetX > 0) return 'start';
        if (this.offsetX < 0) return 'end';
        if (this.offsetX == 0 && this.offsetY != 0) return 'middle';
        return 'start';
    }

    setOffsetElements(x, y) {
        this.offsetX = x;
        this.offsetY = y;

        if (y < 0 && this.textAnchor == 'middle')
            this.offsetY -= this.fontSize;

        this.setTextElement();
        this.elements.length = 1;
        this.elements[1] = (elementFactory, origin) => elementFactory.line(
            this.points[0].toAbsolute(origin),
            this.points[0].copy(x, y).toAbsolute(origin)
        );
    }
}

module.exports = Label;