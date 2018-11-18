const Point = require('./point');

class Text {
    constructor(text, point) {
        this.text = text;
        this.point = point;
    }

    elements(elementFactory) {
        return elementFactory.text(this.text, this.point);
    }
}

module.exports = Text;