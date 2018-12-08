class Cross {
    constructor(point, r) {
        this.points = [
            point.copy(r),
            point.copy(-r),
            point.copy(0, r),
            point.copy(0, -r),
        ];
        this.elements = [
            (elementFactory, origin) => elementFactory.line(this.points[0].toAbsolute(origin), this.points[1].toAbsolute(origin)),
            (elementFactory, origin) => elementFactory.line(this.points[2].toAbsolute(origin), this.points[3].toAbsolute(origin))
        ];
    }
}

module.exports = Cross;