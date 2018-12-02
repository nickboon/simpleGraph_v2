const Point = require('./point');

class Text {
    constructor(text, point) {
        this.text = text;
        this.points = [point];
        this.elements = [
            (elementFactory, origin) => elementFactory.text(this.text, this.points[0].toAbsolute(origin))
        ];
    }
}

module.exports = Text;