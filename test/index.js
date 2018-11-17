const Graph = require('../src/index');

new Graph().draw();
new Graph()
    .setHtmlContainerElement('simplegraph2')
    .setDefaults({
        colour: 'red',
        opacity: 0.1
    }).setOrigin(50, 210)
    .draw();