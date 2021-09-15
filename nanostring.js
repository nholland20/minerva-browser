const slideMedulla = require('./slideMedulla.json');
const slideCortex = require('./slideCortex.json');
const { path } = require('d3');

// Breakpoints for when to resize the cartoon image and subsequently redraw the corresponding SVGs
// Align with CSS breakpoints (or TO DO: set description box width dynamically with JavaScript)
const scrnWBps = [0, 675, 1100]

// Objects for creating small, medium, and large SVGs - to be used with specific screensizes
// For the first cartoon image:
const largeSlideMedullaPath = {
    type: 'path',
    id: 'medullaSvg',
    d: 'M 219,245 A60,60 0 0,1 288,229 C330,333 175,479 124,383 A33,33 0 0,1 130,353 A95,95 0 0,0 219,245',
    fill: '#95B3D7A0',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addPolygon'],
    file: slideMedulla,
    polygonID: 'slideMedulla',
}

const largeCortexPath = {
    type: 'path',
    id: 'cortexSvg',
    d: 'M 288,229 A31,32 0 0,1 322,217 C352,473 103,518 86,363 A50,51 0 0,1 124,358 C122,497 339,353 288,229',
    fill: '#90EE90A0',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addPolygon'],
    file: slideCortex,
    polygonID: 'slideCortex'
}

const mediumSlideMedullaPath = {
    type: 'path',
    id: 'medullaSvg',
    d: 'M192,219 A51,51 0 0,1 252,206 C276,313 143,423 107,348 A39,40 0 0,1 107,313 A79,84 0 0,0 192,219',
    fill: '#95B3D7A0',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addPolygon'],
    file: slideMedulla,
    polygonID: 'slideMedulla'
}

const mediumCortexPath = {
    type: 'path',
    id: 'cortexSvg',
    d: 'M252,206 A30,30 0 0,1 283,202 C316,391 99,482 72,325 A40,40 0 0,1 106,313 C93,456 288,321 252,206',
    fill: '#90EE90A0',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addPolygon'],
    file: slideCortex,
    polygonID: 'slideCortex'
}


const smallSlideMedullaPath = {
    type: 'path',
    id: 'medullaSvg',
    d: 'M87,89 A28,36 0 0,1 110,83 C120,150 55,178 50,130 A35,35 0 0,0 87,89',
    fill: '#95B3D7A0',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addPolygon'],
    file: slideMedulla,
    polygonID: 'slideMedulla'
}

const smallCortexPath = {
    type: 'path',
    id: 'cortexSvg',
    d: 'M110,83 A 17,17 0 0,1 125,83 C125,200 25,165 40,130 A19,19 0 0,1 50,130 C40,155 115,180 110,83',
    fill: '#90EE90A0',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addPolygon'],
    file: slideCortex,
    polygonID: 'slideCortex'
}

//SVG objects for the second waypoint of the story - based on different screen sizes
const largeCollDuctPath = {
    type: 'path',
    id: 'collDuctSvg',
    d: 'M257,185 A32,34 0 0,1 290,185 Q290,323 281,540 A40,40 0 0,1 243,537 Q258,324 257,185',
    stroke: 'red',
    strokeWidth: '2',
    fill: '#30B2DE50',
    eventTypes: ['addMask', 'panZoom'],
    panCoord:{x: 0.21, y: 0.3904},
    zoomRatio: 12.3835,
    ROIBox: [{overlay: {x: 0.2003, y: 0.3763, width: 0.028, height: 0.0316},
            storyNum: 1, waypointNum: 1}],
    maskNum: [1]
}
const largeDctEllipse = {
    type: 'ellipse',
    id: 'dctSvg',
    rx: 31,
    ry: 44,
    cx: 240,
    cy: 143,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.3287, y: 0.2976},
    zoomRatio: 14.3333,
    ROIBox: [{overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
            storyNum:1, waypointNum: 1}],
    maskNum: [4]
}

const largePctEllipse = {
    type: 'ellipse',
    id: 'pctSvg',
    rx: 33,
    ry: 57,
    cx: 170,
    cy: 177,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.3132, y: 0.2196},
    zoomRatio: 14.3333,
    ROIBox: [{overlay: {x: 0.3019, y: 0.2095, width: 0.025, height: 0.0258},
            storyNum:1, waypointNum: 1}],
    maskNum: [8]
}

const largeLoopHEllipse = {
    type: 'ellipse',
    id: 'loopHSvg',
    rx: 17,
    ry: 110,
    cx: 200,
    cy: 397,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.0779, y: 0.4822},
    zoomRatio: 14.3333,
    ROIBox: [{overlay: {x: 0.0666, y: 0.4669, width: 0.029, height: 0.0325},
            storyNum:1, waypointNum: 1}],
    maskNum: [7]
}

const largeGlomEllipse = {
    type: 'ellipse',
    id: 'glomSvg',
    rx: 21,
    ry: 33,
    cx: 125,
    cy: 219,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.2518, y: 0.4838},
    zoomRatio: 1.0785,
    ROIBox: [{overlay: {x: 0.4056, y: 0.429, width: 0.0085, height: 0.0077},
            storyNum:1, waypointNum: 1}, {overlay: {x: 0.1579, y: 0.6106, width: 0.0084, height: 0.008},
                storyNum:1, waypointNum: 1}],
    maskNum: [3, 6]
}

const largeFiltMemEllipse = {
    type: 'ellipse',
    id: 'filtMemSvg',
    rx: 10,
    ry: 15,
    cx: 125,
    cy: 219,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.3235, y: 0.3758},
    zoomRatio: 2.8316,
    ROIBox: [{overlay: {x: 0.3635, y: 0.4326, width: 0.0269, height: 0.0139},
        storyNum:1, waypointNum: 1}, {overlay: { x: 0.275, y: 0.3217, width: 0.0235, height: 0.0224},
            storyNum:1, waypointNum: 1}],
    maskNum: [2, 5]
}

const medCollDuctPath = {
    type: 'path',
    id: 'collDuctSvg',
    d: 'M220,151 A25,27 0 0,1 250,151 Q250,297 243,442 A40,40 0 0,1 209,442 Q218,297 220,151',
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord:{x: 0.21, y: 0.3904},
    zoomRatio: 12.3835,
    ROIBox: [{overlay: {x: 0.2003, y: 0.3763, width: 0.028, height: 0.0316},
            storyNum: 1, waypointNum: 1}],
    maskNum: [1]
}
const medDctEllipse = {
    type: 'ellipse',
    id: 'dctSvg',
    rx: 27,
    ry: 35,
    cx: 211,
    cy: 115,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.3287, y: 0.2976},
    zoomRatio: 14.3333,
    ROIBox: [{overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
            storyNum:1, waypointNum: 1}],
    maskNum: [4]
}

const medPctEllipse = {
    type: 'ellipse',
    id: 'pctSvg',
    rx: 26,
    ry: 45,
    cx: 150,
    cy: 145,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.3132, y: 0.2196},
    zoomRatio: 14.3333,
    ROIBox: [{overlay: {x: 0.3019, y: 0.2095, width: 0.025, height: 0.0258},
            storyNum:1, waypointNum: 1}],
    maskNum: [8]
}

const medLoopHEllipse = {
    type: 'ellipse',
    id: 'loopHSvg',
    rx: 15,
    ry: 88,
    cx: 176,
    cy: 323,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.0779, y: 0.4822},
    zoomRatio: 14.3333,
    ROIBox: [{overlay: {x: 0.0666, y: 0.4669, width: 0.029, height: 0.0325},
            storyNum:1, waypointNum: 1}],
    maskNum: [7]
}

const medGlomEllipse = {
    type: 'ellipse',
    id: 'glomSvg',
    rx: 18,
    ry: 26,
    cx: 113,
    cy: 179,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.2518, y: 0.4838},
    zoomRatio: 1.0785,
    ROIBox: [{overlay: {x: 0.4056, y: 0.429, width: 0.0085, height: 0.0077},
            storyNum:1, waypointNum: 1}, {overlay: {x: 0.1579, y: 0.6106, width: 0.0084, height: 0.008},
                storyNum:1, waypointNum: 1}],
    maskNum: [3, 6]
}

const medFiltMemEllipse = {
    type: 'ellipse',
    id: 'filtMemSvg',
    rx: 9,
    ry: 12,
    cx: 113,
    cy: 179,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.3235, y: 0.3758},
    zoomRatio: 2.8316,
    ROIBox: [{overlay: {x: 0.3635, y: 0.4326, width: 0.0269, height: 0.0139},
        storyNum:1, waypointNum: 1}, {overlay: { x: 0.275, y: 0.3217, width: 0.0235, height: 0.0224},
            storyNum:1, waypointNum: 1}],
    maskNum: [2, 5]
}

const smallCollDuctPath = {
    type: 'path',
    id: 'collDuctSvg',
    d:'M115,93 A57,58 0 0,1 133,93 Q133,177 128,260 A60,60 0 0,1 108,260 Q112,135 115,93',
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord:{x: 0.21, y: 0.3904},
    zoomRatio: 12.3835,
    ROIBox: [{overlay: {x: 0.2003, y: 0.3763, width: 0.028, height: 0.0316},
            storyNum: 1, waypointNum: 1}],
    maskNum: [1]
}

const smallDctEll = {
    type: 'ellipse',
    id: 'dctSvg',
    rx: 17,
    ry: 22,
    cx: 108,
    cy: 71,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.3287, y: 0.2976},
    zoomRatio: 14.3333,
    ROIBox: [{overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
            storyNum:1, waypointNum: 1}],
    maskNum: [4]
}

const smallPctEll = {
    type: 'ellipse',
    id: 'pctSvg',
    rx: 15,
    ry: 27,
    cx: 75,
    cy: 86,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.3132, y: 0.2196},
    zoomRatio: 14.3333,
    ROIBox: [{overlay: {x: 0.3019, y: 0.2095, width: 0.025, height: 0.0258},
            storyNum:1, waypointNum: 1}],
    maskNum: [8]
}

const smallLoopHEll = {
    type: 'ellipse',
    id: 'loopHSvg',
    rx: 7,
    ry: 52,
    cx: 90,
    cy: 193,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.0779, y: 0.4822},
    zoomRatio: 14.3333,
    ROIBox: [{overlay: {x: 0.0666, y: 0.4669, width: 0.029, height: 0.0325},
            storyNum:1, waypointNum: 1}],
    maskNum: [7]
}

const smallGlomEll = {
    type: 'ellipse',
    id: 'glomSvg',
    rx: 11,
    ry: 16,
    cx: 53,
    cy: 106,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.2518, y: 0.4838},
    zoomRatio: 1.0785,
    ROIBox: [{overlay: {x: 0.4056, y: 0.429, width: 0.0085, height: 0.0077},
            storyNum:1, waypointNum: 1}, {overlay: {x: 0.1579, y: 0.6106, width: 0.0084, height: 0.008},
                storyNum:1, waypointNum: 1}],
    maskNum: [3, 6]
}

const smallFiltMemEll = {
    type: 'ellipse',
    id: 'filtMemSvg',
    rx: 5,
    ry: 6,
    cx: 53,
    cy: 106,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask', 'panZoom'],
    panCoord: {x: 0.3235, y: 0.3758},
    zoomRatio: 2.8316,
    ROIBox: [{overlay: {x: 0.3635, y: 0.4326, width: 0.0269, height: 0.0139},
        storyNum:1, waypointNum: 1}, {overlay: { x: 0.275, y: 0.3217, width: 0.0235, height: 0.0224},
            storyNum:1, waypointNum: 1}],
    maskNum: [2, 5]
}

// For the Genes Detected Box Plot
const largeCollDuctBox = {
    type: 'rect',
    id: 'collDuctBox',
    x: 72,
    y: 92,
    width: 30,
    height: 52,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [1]
}
const largeDctBox = {
    type: 'rect',
    id: 'dctBox',
    x: 148,
    y: 121,
    width: 28,
    height: 58,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [4]
}

const largePctBox = {
    type: 'rect',
    id: 'pctBox',
    x: 185,
    y: 283,
    width: 29,
    height: 28,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [8]
}

const largeLoopHBox = {
    type: 'rect',
    id: 'loopHBox',
    x: 111,
    y: 125,
    width: 28,
    height: 25,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [7]
}

const largeCortGlomBox = {
    type: 'rect',
    id: 'cortglomBox',
    x: 223,
    y: 255,
    width: 28,
    height: 73,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [3]
}

const largeMedGlomBox = {
    type: 'rect',
    id: 'medglomBox',
    x: 261,
    y: 298,
    width: 28,
    height: 35,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [6]
}

const largeCorFiltMemBox = {
    type: 'rect',
    id: 'corFiltMemBox',
    x: 336,
    y: 304,
    width: 28,
    height: 48,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [2]
}

const largeMedFiltMemBox = {
    type: 'rect',
    id: 'corMedMemBox',
    x: 299,
    y: 277,
    width: 27,
    height: 64,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [5]
}

const medCollDuctBox = {
    type: 'rect',
    id: 'collDuctBox',
    x: 64,
    y: 77,
    width: 25,
    height: 43,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [1]
}
const medDctBox = {
    type: 'rect',
    id: 'dctBox',
    x: 129,
    y: 101,
    width: 24,
    height: 49,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [4]
}

const medPctBox = {
    type: 'rect',
    id: 'pctBox',
    x: 161,
    y: 243,
    width: 24,
    height: 23,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [8]
}

const medLoopHBox = {
    type: 'rect',
    id: 'loopHBox',
    x: 96,
    y: 105,
    width: 25,
    height: 21,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [7]
}

const medCortGlomBox = {
    type: 'rect',
    id: 'cortglomBox',
    x: 194,
    y: 218,
    width: 25,
    height: 62,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [3]
}

const medMedGlomBox = {
    type: 'rect',
    id: 'medglomBox',
    x: 226,
    y: 255,
    width: 25,
    height: 32,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [6]
}

const medCorFiltMemBox = {
    type: 'rect',
    id: 'corFiltMemBox',
    x: 292,
    y: 260,
    width: 25,
    height: 41,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [2]
}

const medMedFiltMemBox = {
    type: 'rect',
    id: 'corMedMemBox',
    x: 259,
    y: 237,
    width: 25,
    height: 55,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [5]
}

const smallCollDuctBox = {
    type: 'rect',
    id: 'collDuctBox',
    x: 29,
    y: 45,
    width: 12,
    height: 21,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [1]
}
const smallDctBox = {
    type: 'rect',
    id: 'dctBox',
    x: 60,
    y: 57,
    width: 12,
    height: 21,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [4]
}

const smallPctBox = {
    type: 'rect',
    id: 'pctBox',
    x: 75,
    y: 122,
    width: 12,
    height: 11,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [8]
}

const smallLoopHBox = {
    type: 'rect',
    id: 'loopHBox',
    x: 45,
    y: 58,
    width: 11,
    height: 11,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [7]
}

const smallCortGlomBox = {
    type: 'rect',
    id: 'cortglomBox',
    x: 91,
    y: 110,
    width: 12,
    height: 30,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [3]
}

const smallMedGlomBox = {
    type: 'rect',
    id: 'medglomBox',
    x: 106,
    y: 128,
    width: 11,
    height: 16,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [6]
}

const smallCorFiltMemBox = {
    type: 'rect',
    id: 'corFiltMemBox',
    x: 137,
    y: 131,
    width: 11,
    height: 20,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [2]
}

const smallMedFiltMemBox = {
    type: 'rect',
    id: 'corMedMemBox',
    x: 122,
    y: 120,
    width: 11,
    height: 26,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addMask'],
    maskNum: [5]
}


// Functions to build Rectangle, Ellipse, and Path SVGs
function buildRectSvg(osd, svgNS, rectObj){
    const rectSvg = document.createElementNS(svgNS,'rect');
    rectSvg.id = rectObj.id;
    rectSvg.setAttribute('x', rectObj.x);
    rectSvg.setAttribute('y', rectObj.y);
    rectSvg.setAttribute('width', rectObj.width);
    rectSvg.setAttribute('height', rectObj.height);
    if (rectObj.rx){
        rectSvg.setAttribute('rx', rectObj.rx);
    }
    rectSvg.setAttribute('fill', rectObj.fill);
    rectSvg.setAttribute('stroke', rectObj.stroke);
    rectSvg.setAttribute('stroke-width', rectObj.strokeWidth)
    for (let eType of rectObj.eventTypes){
        addEListener(osd, rectObj, rectSvg, eType)
    }
    return rectSvg
}

function buildEllipseSvg(osd, svgNS, ellipseObj){
    const ellipseSvg = document.createElementNS(svgNS, 'ellipse');
    ellipseSvg.id = ellipseObj.id;
    ellipseSvg.setAttribute('cx', ellipseObj.cx);
    ellipseSvg.setAttribute('cy', ellipseObj.cy);
    ellipseSvg.setAttribute('rx', ellipseObj.rx);
    ellipseSvg.setAttribute('ry', ellipseObj.ry);
    ellipseSvg.setAttribute('fill', ellipseObj.fill);
    ellipseSvg.setAttribute('stroke', ellipseObj.stroke);
    ellipseSvg.setAttribute('stroke-width', ellipseObj.strokeWidth)
    for (let eType of ellipseObj.eventTypes){
        addEListener(osd, ellipseObj, ellipseSvg, eType)
    }
    return ellipseSvg
}

function buildPathSvg(osd, svgNS, pathObj){
    const pathSvg = document.createElementNS(svgNS, 'path');
    pathSvg.id = pathObj.id;
    pathSvg.setAttribute('d', pathObj.d);
    pathSvg.setAttribute('fill', pathObj.fill);
    pathSvg.setAttribute('stroke', pathObj.stroke);
    pathSvg.setAttribute('stroke-width', pathObj.strokeWidth)
    for (let eType of pathObj.eventTypes){
        addEListener(osd, pathObj, pathSvg, eType)
    }
    return pathSvg
}

// Event Listener to pan and zoom to a specific place.
function panZoom(osd, svgObj) {
    const id = 'ROIBox'
    // Pan and Zoom to the 'Best in Class' ROI
    osd.viewer.viewport.panTo(svgObj.panCoord)
    osd.viewer.viewport.zoomTo(svgObj.zoomRatio)
    //If a 'Best in Class ROI is already highlighted, remove it and add a box around the new one
    if (document.querySelector(`#${id}-1`)){
        console.log(document.querySelectorAll(`[id^=${id}-`))
        const ROIBoxes = document.querySelectorAll(`[id^=${id}-`)
        for (let box of ROIBoxes){
          osd.viewer.removeOverlay(`#${box.id}`)
          document.querySelector(`#${box.id}`).remove()
        }
    }
    for (let i=1; i <= (svgObj.ROIBox).length; i++){
        addROIBox(osd, svgObj.ROIBox[i-1], `${id}-${i}`)
    }
}

// Event listener for the SVGs - circles (or removes the ciricle of) the corresponding part on the slide when clicked.
function addSlidePolygon(polygonID, fileName, osd){
    if (!document.querySelector(`#${polygonID}`)) {
        osd.addPolygon(polygonID, fileName);
    } else {
        document.querySelector(`#${polygonID}`).remove();
    }
}

function addROIBox(osd, ROIBox, id){
    const {overlay, storyNum, waypointNum} = ROIBox
    osd.addOverlay(overlay, id, storyNum, waypointNum)
}

function addMask(osd, svgObj) {
    const maskNums = svgObj.maskNum;
    const numMasks = osd.hashstate.masks.length
    //Add the mask to all the ROIs of the same structure
    for (let i=0; i <= numMasks; i++){
        if(osd.hashstate.m.includes(i)) {
            osd.hashstate.m = osd.hashstate.m.filter(i => i != i)
        }
    }
    osd.hashstate.pushState();
    window.onpopstate();
    for (let maskInd of maskNums){
        osd.hashstate.m.push(maskInd);
    }
    osd.hashstate.pushState();
    window.onpopstate();
}


//Add Event Listeners to SVG elements based on attributes in their SVG object
function addEListener(osd, svgObj, svg, eventType) {
    if (eventType === 'addPolygon') {
        svg.addEventListener('click', () => addSlidePolygon(svgObj.polygonID, svgObj.file, osd));
    }
    else if (eventType === 'panZoom') {
        svg.addEventListener('click', () => panZoom(osd, svgObj))
    }
    else if (eventType === 'addMask') {
        svg.addEventListener('click', () => addMask(osd, svgObj))
    }
}

// Build components on the waypoint: Cartoon image, SVG Node
function createSvgNode(){
    const svgNS = 'http://www.w3.org/2000/svg';
    const svgNode = document.createElementNS(svgNS, 'svg');
    svgNode.setAttribute('xmlns', svgNS);
    svgNode.setAttribute('preserveAspectRatio', 'xMinYMin meet');
    return svgNode
}

function buildCartoonImage(osd, svgNS, id, imagePath, svgTypes) {
    const cartoonImgContainer = document.createElement("figure");
    cartoonImgContainer.id = id;
    const svgNode = createSvgNode();
    const cartoonSvg = document.createElementNS(svgNS,'image');
    cartoonSvg.setAttribute('width', '100%');
    cartoonSvg.setAttribute('height', '100%');
    cartoonSvg.setAttribute('href', imagePath);
    svgNode.appendChild(cartoonSvg);
    for (let i = 0; i < svgTypes.length; i++) {
        if (svgTypes[i].type === 'ellipse') {
            let ellipseSvg = buildEllipseSvg(osd, svgNS, svgTypes[i]);
            svgNode.appendChild(ellipseSvg);
        }
        else if (svgTypes[i].type === 'path'){
            let pathSvg = buildPathSvg(osd, svgNS, svgTypes[i]);
            svgNode.appendChild(pathSvg);
        }
        else if (svgTypes[i].type === 'rect'){
            let rectSvg = buildRectSvg(osd, svgNS, svgTypes[i]);
            svgNode.appendChild(rectSvg)
        }
    }
    cartoonImgContainer.appendChild(svgNode);
    return cartoonImgContainer
}

function buildWaypointCartoon(waypointNum, storyNum, windowInnerWidth, domElement, osd) {
    const svgNS = 'http://www.w3.org/2000/svg';
    if (waypointNum === 0 && storyNum === 1 && windowInnerWidth >= scrnWBps[2]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'largeKidneySvgContainer', 'img/finalKidney.jpeg', [largeSlideMedullaPath, largeCortexPath])
        domElement.appendChild(cartoonImgContainer);
      }
    else if (waypointNum === 0 && storyNum === 1 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]){
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'mediumKidneySvgContainer', 'img/finalKidney.jpeg', [mediumSlideMedullaPath, mediumCortexPath])
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 0 && storyNum === 1 && windowInnerWidth < scrnWBps[1]){
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'smallKidneySvgContainer', 'img/finalKidney.jpeg', [smallSlideMedullaPath, smallCortexPath])
        domElement.appendChild(cartoonImgContainer);
    }

    else if (waypointNum === 1 && storyNum === 1 && windowInnerWidth >= scrnWBps[2]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'largeSubstructureSvgContainer', 'img/kidneySubstructures.png', [largeCollDuctPath, largeDctEllipse, largePctEllipse, largeLoopHEllipse, largeGlomEllipse, largeFiltMemEllipse])
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 1 && storyNum === 1 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'mediumSubstructureSvgContainer', 'img/kidneySubstructures.png', [medCollDuctPath, medDctEllipse, medPctEllipse, medLoopHEllipse, medGlomEllipse, medFiltMemEllipse])
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 1 && storyNum === 1 && windowInnerWidth < scrnWBps[1]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'smallSubstructureSvgContainer', 'img/kidneySubstructures.png', [smallCollDuctPath, smallDctEll, smallPctEll, smallLoopHEll, smallGlomEll, smallFiltMemEll])
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 2 && storyNum === 1 && windowInnerWidth >= scrnWBps[2]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'largeBoxPlotGenes', 'img/genesDetected.png', [largeCollDuctBox, largeDctBox, largePctBox, largeLoopHBox, largeCortGlomBox, largeMedGlomBox, largeCorFiltMemBox, largeMedFiltMemBox])
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 2 && storyNum === 1 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'medBoxPlotGenes', 'img/genesDetected.png', [medCollDuctBox, medDctBox, medPctBox, medLoopHBox, medCortGlomBox, medMedGlomBox, medCorFiltMemBox, medMedFiltMemBox])
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 2 && storyNum === 1 && windowInnerWidth < scrnWBps[1]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'smallBoxPlotGenes', 'img/genesDetected.png', [smallCollDuctBox, smallDctBox, smallPctBox, smallLoopHBox, smallCortGlomBox, smallMedGlomBox, smallCorFiltMemBox, smallMedFiltMemBox])
        domElement.appendChild(cartoonImgContainer);
    }
}

// Add cartoon image to a specific waypoint
// Change the number that HS.w is equal to based on which waypoint the image needs to appear on.
// If the waypoint is the first one after the Table of Contents HS.s must also be set, otherwise, it appears in the TOC too
document.addEventListener('waypointBuildEvent', function(e) {
    const {waypointNum, storyNum, domElement, osd} = e.detail;
    const width = window.innerWidth
    window.waypointAttr = {
        waypointNum: waypointNum,
        storyNum: storyNum,
        domElement: domElement,
        osd: osd,
        width: width
    }
    buildWaypointCartoon(waypointNum, storyNum, width, domElement, osd)
    })

// Remove polygons and overlays when the waypoint is changed
document.addEventListener('waypointBuildEvent', function(e){
    const {osd} = e.detail
    const overlayIds = ['#slideMedulla', '#slideCortex']
    for (let id of overlayIds) {
        if (document.querySelector(id)) {
            document.querySelector(id).remove();
        }
    }
    if (document.querySelector('[id^=ROIBox]')){
        const ROIBoxes = document.querySelectorAll('[id^=ROIBox]')
        for (let box of ROIBoxes){
            osd.viewer.removeOverlay(box.id)  
            document.querySelector(`#${box.id}`).remove()
        }    
    }
})

window.addEventListener('resize', function (e){
    const currW = e.target.window.innerWidth
    const oldW = e.target.window.waypointAttr.width
    if ((currW < scrnWBps[1] && oldW >= scrnWBps[1]) || (currW < scrnWBps[2] && oldW >= scrnWBps[2]) || (currW >= scrnWBps[2] && oldW < scrnWBps[2]) || (currW >= scrnWBps[1] && oldW < scrnWBps[1])) {
        const {waypointNum, storyNum, domElement, osd} = e.target.window.waypointAttr;
        const svgCont = ['#largeKidneySvgContainer', '#mediumKidneySvgContainer', '#smallKidneySvgContainer', '#largeSubstructureSvgContainer', '#mediumSubstructureSvgContainer', '#smallSubstructureSvgContainer','#largeBoxPlotGenes', '#medBoxPlotGenes', '#smallBoxPlotGenes']
        for (let id of svgCont) {
            if (document.querySelector(id)) {
                document.querySelector(id).remove();
            }
        }
        buildWaypointCartoon(waypointNum, storyNum, currW, domElement, osd);
    } 
    e.target.window.waypointAttr.width = currW
})
