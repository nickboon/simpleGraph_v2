const Graph = require('../src/index');

new Graph().draw();
const graph2 = new Graph()
    .setHtmlContainerElement('simplegraph2')
    .setDefaults({
        colour: 'red',
        opacity: 0.1
    }).setOrigin(50, 210);

graph2.draw([
    graph2.line(graph2.point(100, 100)),
    graph2.polygon([
        graph2.point(50, 100),
        graph2.point(undefined, 100),
        graph2.point()
    ]),
    graph2.quadraticBezier(
        graph2.point(50, 100),
        graph2.point(undefined, 100),
        graph2.point()
    )
]);