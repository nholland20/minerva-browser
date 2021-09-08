// const slideMedulla = require('./slideMedulla.json');
// const slideCortex = require('./slideCortex.json');

import { svg } from "d3";

// // Breakpoints for when to resize the cartoon image and subsequently redraw the corresponding SVGs
// // Align with CSS breakpoints in main.js
const scrnWBps = [0, 675, 1100]

// // Objects for creating small, medium, and large SVGs - to be used with specific screensizes
// // For the first cartoon image:
// const largeSlideMedullaPath = {
//     svgXml: '<path id="medullaSvg" d="M 280 230 A 205,200 0 0,1 155 350 A5,5 0 1,0 280 230" fill="#95B3D7A0" stroke="red" strokeWidth="2"/>',
//     type: 'path',
//     id: 'medullaSvg',
//     d: 'M 219,245 A60,60 0 0,1 288,229 C330,333 175,479 124,383 A33,33 0 0,1 130,353 A95,95 0 0,0 219,245',
//     fill: '#95B3D7A0',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventTypes: ['addPolygon'],
//     file: slideMedulla,
//     polygonID: 'slideMedulla',
// }

// const largeCortexPath = {
//     svgXml: '<path id="cortexSvg" d="M 330 240 C400,425 150,475 140,350 A50,50 0 0,1 155,350 C175,400 370,380 280 230 A50,50 0 0,1 330,240" fill="#90EE90A0" stroke="red" strokeWidth="2"',
//     type: 'path',
//     id: 'cortexSvg',
//     d: 'M 288,229 A31,32 0 0,1 322,217 C352,473 103,518 86,363 A50,51 0 0,1 124,358 C122,497 339,353 288,229',
//     fill: '#90EE90A0',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventTypes: ['addPolygon'],
//     file: slideCortex,
//     polygonID: 'slideCortex'
// }

// const mediumSlideMedullaPath = {
//     type: 'path',
//     id: 'medullaSvg',
//     d: 'M192,219 A51,51 0 0,1 252,206 C276,313 143,423 107,348 A39,40 0 0,1 107,313 A79,84 0 0,0 192,219',
//     fill: '#95B3D7A0',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventTypes: ['addPolygon'],
//     file: slideMedulla,
//     polygonID: 'slideMedulla'
// }

// const mediumCortexPath = {
//     type: 'path',
//     id: 'cortexSvg',
//     d: 'M252,206 A30,30 0 0,1 283,202 C316,391 99,482 72,325 A40,40 0 0,1 106,313 C93,456 288,321 252,206',
//     fill: '#90EE90A0',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventTypes: ['addPolygon'],
//     file: slideCortex,
//     polygonID: 'slideCortex'
// }


// const smallSlideMedullaPath = {
//     type: 'path',
//     id: 'medullaSvg',
//     d: 'M92,130 A28,36 0 0,1 123,125 C137,163 74,239 47,194 A17,17 0 0,1 50,178 A43,43 0 0,0 92,130',
//     fill: '#95B3D7A0',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventTypes: ['addPolygon'],
//     file: slideMedulla,
//     polygonID: 'slideMedulla'
// }

// const smallCortexPath = {
//     type: 'path',
//     id: 'cortexSvg',
//     d: 'M123,125 A 12,17 0 0,1 138,119 C145,240 33,250 30,178 A18,19 0 0,1 48,178 C42,245 139,188 123,125',
//     fill: '#90EE90A0',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventTypes: ['addPolygon'],
//     file: slideCortex,
//     polygonID: 'slideCortex'
// }

// //SVG objects for the second waypoint of the story - based on different screen sizes
// const largeCollDuctPath = {
//     type: 'path',
//     id: 'collDuctSvg',
//     d: 'M257,185 A32,34 0 0,1 290,185 Q290,323 281,540 A40,40 0 0,1 243,537 Q258,324 257,185',
//     stroke: 'red',
//     strokeWidth: '2',
//     fill: '#30B2DE50',
//     eventType: ['panAndZoom', 'addMask'],
//     panCoord:{x: 0.2068, y: 0.4028},
//     zoomRatio: 10.3196,
//     ROIBox: {overlay: {x: 0.1996, y: 0.3753, width: 0.03, height: 0.0341},
//             storyNum: 1, waypointNum: 1},
//     maskNum: [1]
// }

const largeDctEllipse = {
    type: 'ellipse',
    id: 'dctSvg',
    svgXml: "<ellipse cx='240' cy='143' rx='31' ry='44' fill='#30B2DE50' stroke='red' strokeWidth='2' preserveAspectRatio='xMidYMid meet'/>",
    rx: 31,
    ry: 44,
    cx: 240,
    cy: 143,
    fill: '#30B2DE50',
    stroke: 'red',
    strokeWidth: '2',
    eventType: ['panAndZoom', 'addMask'],
    panCoord: {x: 0.3287, y: 0.2976},
    zoomRatio: 14.3333,
    ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
            storyNum:1, waypointNum: 1},
    maskNum: [4]
}

// const largePctEllipse = {
//     type: 'ellipse',
//     id: 'pctSvg',
//     rx: 33,
//     ry: 57,
//     cx: 170,
//     cy: 177,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventType: ['panAndZoom', 'addMask'],
//     // panCoord: {x: 0.3287, y: 0.2976},
//     // zoomRatio: 14.3333,
//     // ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     //         storyNum:1, waypointNum: 1},
//     maskNum: [10]
// }

// const largeLoopHEllipse = {
//     type: 'ellipse',
//     id: 'loopHSvg',
//     rx: 17,
//     ry: 110,
//     cx: 200,
//     cy: 397,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventType: ['panAndZoom', 'addMask'],
//     // panCoord: {x: 0.3287, y: 0.2976},
//     // zoomRatio: 14.3333,
//     // ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     //         storyNum:1, waypointNum: 1},
//     maskNum: [7]
// }

// const largeGlomEllipse = {
//     type: 'ellipse',
//     id: 'glomSvg',
//     rx: 21,
//     ry: 33,
//     cx: 125,
//     cy: 219,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventType: ['panAndZoom', 'addMask'],
//     // panCoord: {x: 0.3287, y: 0.2976},
//     // zoomRatio: 14.3333,
//     // ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     //         storyNum:1, waypointNum: 1},
//     maskNum: [5, 2, 8, 9]
// }

// const largeFiltMemEllipse = {
//     type: 'ellipse',
//     id: 'filtMemSvg',
//     rx: 10,
//     ry: 15,
//     cx: 125,
//     cy: 219,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventType: ['panAndZoom', 'addMask'],
//     // panCoord: {x: 0.3287, y: 0.2976},
//     // zoomRatio: 14.3333,
//     // ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     //         storyNum:1, waypointNum: 1},
//     maskNum: [3, 6]
// }

// const medCollDuctRect = {
//     type: 'path',
//     id: 'collDuctSvg',
//     d: 'M220,151 A25,27 0 0,1 250,151 Q250,297 243,442 A40,40 0 0,1 209,442 Q218,297 220,151',
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventType: ['panAndZoom', 'addMask'],
//     panCoord:{x: 0.2068, y: 0.4028},
//     zoomRatio: 10.3196,
//     ROIBox: {overlay: {x: 0.1996, y: 0.3753, width: 0.03, height: 0.0341},
//     storyNum: 1, waypointNum: 1},
//     maskNum: 1
// }

// const medDctRect = {
//     type: 'ellipse',
//     id: 'dctSvg',
//     rx: 27,
//     ry: 35,
//     cx: 211,
//     cy: 115,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventType: ['panAndZoom', 'addMask'],
//     panCoord: {x: 0.3287, y: 0.2976},
//     zoomRatio: 14.3333,
//     ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     storyNum:1, waypointNum: 1},
//     maskNum: 4
// }

// const medPctEllipse = {
//     type: 'ellipse',
//     id: 'pctSvg',
//     rx: 26,
//     ry: 45,
//     cx: 150,
//     cy: 145,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     // eventType: ['panAndZoom', 'addMask'],
//     // panCoord: {x: 0.3287, y: 0.2976},
//     // zoomRatio: 14.3333,
//     // ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     //         storyNum:1, waypointNum: 1},
//     // maskNum: 4
// }

// const medLoopHEllipse = {
//     type: 'ellipse',
//     id: 'loopHSvg',
//     rx: 15,
//     ry: 88,
//     cx: 176,
//     cy: 323,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     // eventType: ['panAndZoom', 'addMask'],
//     // panCoord: {x: 0.3287, y: 0.2976},
//     // zoomRatio: 14.3333,
//     // ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     //         storyNum:1, waypointNum: 1},
//     // maskNum: 4
// }

// const medGlomEllipse = {
//     type: 'ellipse',
//     id: 'glomSvg',
//     rx: 18,
//     ry: 26,
//     cx: 113,
//     cy: 179,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     // eventType: ['panAndZoom', 'addMask'],
//     // panCoord: {x: 0.3287, y: 0.2976},
//     // zoomRatio: 14.3333,
//     // ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     //         storyNum:1, waypointNum: 1},
//     // maskNum: 4
// }

// const medFiltMemEllipse = {
//     type: 'ellipse',
//     id: 'filtMemSvg',
//     rx: 9,
//     ry: 12,
//     cx: 113,
//     cy: 179,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     // eventType: ['panAndZoom', 'addMask'],
//     // panCoord: {x: 0.3287, y: 0.2976},
//     // zoomRatio: 14.3333,
//     // ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     //         storyNum:1, waypointNum: 1},
//     // maskNum: 4
// }

// const smallCollDuctPath = {
//     type: 'path',
//     id: 'collDuctSvg',
//     d: 'M115,93 A57,58 0 0,1 133,93 Q133,177 128,260 A60,60 0 0,1 108,260 Q112,135 115,93',
//     stroke: 'red',
//     strokeWidth: '2',
//     fill: '#30B2DE50',
//     eventType: ['panAndZoom', 'addMask'],
//     panCoord:{x: 0.2068, y: 0.4028},
//     zoomRatio: 10.3196,
//     ROIBox: {overlay: {x: 0.1996, y: 0.3753, width: 0.03, height: 0.0341},
//             storyNum: 1, waypointNum: 1},
//     maskNum: 1
// }

// const smallDctEll = {
//     type: 'ellipse',
//     id: 'dctSvg',
//     rx: 17,
//     ry: 22,
//     cx: 108,
//     cy: 71,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     eventType: ['panAndZoom', 'addMask'],
//     panCoord: {x: 0.3287, y: 0.2976},
//     zoomRatio: 14.3333,
//     ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//             storyNum:1, waypointNum: 1},
//     maskNum: 4
// }

// const smallPctEll = {
//     type: 'ellipse',
//     id: 'pctSvg',
//     rx: 15,
//     ry: 27,
//     cx: 75,
//     cy: 86,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     // eventType: ['panAndZoom', 'addMask'],
//     // panCoord: {x: 0.3287, y: 0.2976},
//     // zoomRatio: 14.3333,
//     // ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     //         storyNum:1, waypointNum: 1},
//     // maskNum: 4
// }

// const smallLoopHEll = {
//     type: 'ellipse',
//     id: 'loopHSvg',
//     rx: 7,
//     ry: 52,
//     cx: 90,
//     cy: 193,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     // eventType: ['panAndZoom', 'addMask'],
//     // panCoord: {x: 0.3287, y: 0.2976},
//     // zoomRatio: 14.3333,
//     // ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     //         storyNum:1, waypointNum: 1},
//     // maskNum: 4
// }

// const smallGlomEll = {
//     type: 'ellipse',
//     id: 'glomSvg',
//     rx: 11,
//     ry: 16,
//     cx: 53,
//     cy: 106,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     // eventType: ['panAndZoom', 'addMask'],
//     // panCoord: {x: 0.3287, y: 0.2976},
//     // zoomRatio: 14.3333,
//     // ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     //         storyNum:1, waypointNum: 1},
//     // maskNum: 4
// }

// const smallFiltMemEll = {
//     type: 'ellipse',
//     id: 'filtMemSvg',
//     rx: 5,
//     ry: 6,
//     cx: 53,
//     cy: 106,
//     fill: '#30B2DE50',
//     stroke: 'red',
//     strokeWidth: '2',
//     // eventType: ['panAndZoom', 'addMask'],
//     // panCoord: {x: 0.3287, y: 0.2976},
//     // zoomRatio: 14.3333,
//     // ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
//     //         storyNum:1, waypointNum: 1},
//     // maskNum: 4
// }

// // Functions to build Rectangle, Ellipse, and Path SVGs
// function buildRectSvg(osd, svgNS, rectObj, eventType){
//     const rectSvg = document.createElementNS(svgNS,'rect');
//     rectSvg.id = rectObj.id;
//     rectSvg.setAttribute('x', rectObj.x);
//     rectSvg.setAttribute('y', rectObj.y);
//     rectSvg.setAttribute('width', rectObj.width);
//     rectSvg.setAttribute('height', rectObj.height);
//     rectSvg.setAttribute('rx', rectObj.rx);
//     rectSvg.setAttribute('fill', rectObj.fill);
//     rectSvg.setAttribute('stroke', rectObj.stroke);
//     rectSvg.setAttribute('stroke-width', rectObj.strokeWidth)
//     addEListener(osd, rectObj, rectSvg, eventType)
//     return rectSvg
// }

function buildEllipseSvg(osd, svgNS, ellipseObj, eventType){
    const ellipseSvg = document.createElementNS(svgNS, 'ellipse');
    ellipseSvg.id = ellipseObj.id;
    
    // ellipseSvg.setAttribute('cx', ellipseObj.cx);
    // ellipseSvg.setAttribute('cy', ellipseObj.cy);
    // ellipseSvg.setAttribute('rx', ellipseObj.rx);
    // ellipseSvg.setAttribute('ry', ellipseObj.ry);
    // ellipseSvg.setAttribute('fill', ellipseObj.fill);
    // ellipseSvg.setAttribute('stroke', ellipseObj.stroke);
    // ellipseSvg.setAttribute('stroke-width', ellipseObj.strokeWidth)
    // addEListener(osd, ellipseObj, ellipseSvg, eventType)
    return ellipseSvg
}

// function buildPathSvg(osd, svgNS, pathObj, eventType){
//     const pathSvg = document.createElementNS(svgNS, 'path');
//     pathSvg.id = pathObj.id;
//     pathSvg.setAttribute('d', pathObj.d);
//     pathSvg.setAttribute('fill', pathObj.fill);
//     pathSvg.setAttribute('stroke', pathObj.stroke);
//     pathSvg.setAttribute('stroke-width', pathObj.strokeWidth)
//     addEListener(osd, pathObj, pathSvg, eventType)
//     return pathSvg
// }

// // Event Listener to pan and zoom to a specific place on the slide
// function panZoom(osd, svgObj) {
//     const id = 'ROIBox'
//     osd.viewer.viewport.panTo(svgObj.panCoord)
//     osd.viewer.viewport.zoomTo(svgObj.zoomRatio)
//     if (document.querySelector(`#${id}`)){
//         osd.viewer.removeOverlay(`#${id}`)
//     }
//     addROIBox(osd, svgObj.ROIBox, id)
// }

// // Event listener for the SVGs - circles (or removes the ciricle of) the corresponding part on the slide when clicked.
// function addSlidePolygon(polygonID, fileName, osd){
//     if (!document.querySelector(`#${polygonID}`)) {
//         osd.addPolygon(polygonID, fileName);
//     } else {
//         document.querySelector(`#${polygonID}`).remove();
//     }
// }

// function addROIBox(osd, ROIBox, id){
//     const {overlay, storyNum, waypointNum} = ROIBox
//     osd.addOverlay(overlay, id, storyNum, waypointNum)
// }

// function addMask(osd, svgObj) {
//     const maskNums = svgObj.maskNum;
//     for (const maskInd of maskNums) {
//         if(osd.hashstate.m.includes(maskInd)) {
//             osd.hashstate.m = osd.hashstate.m.filter(i => i != maskInd)
//         }
//         else {
//             osd.hashstate.m.push(maskInd);
//         }
//         osd.hashstate.pushState();
//         window.onpopstate();
// }
// }

// //Add Event Listeners to SVG elements based on attributes in their SVG object
// function addEListener(osd, svgObj, svg, eventType) {
//     if (eventType === 'addPolygon') {
//         svg.addEventListener('click', () => addSlidePolygon(svgObj.polygonID, svgObj.file, osd));
//     }
//     else if (eventType === 'panAndZoom') {
//         svg.addEventListener('click', () => panZoom(osd, svgObj))
//     }
//     else if (eventType === 'addMask') {
//         svg.addEventListener('click', () => addMask(osd, svgObj))
//     }
// }

// Build components on the waypoint: Cartoon image, SVG Node
function createSvgNode(){
    const svgNS = 'http://www.w3.org/2000/svg';
    const svgNode = document.createElementNS(svgNS, 'svg');
    svgNode.setAttribute('xmlns', svgNS);
    svgNode.setAttribute('preserveAspectRatio', 'xMinYMin meet');
    svgNode.style.height = '626px';
    svgNode.style.width = '350px';
    svgNode.style.verticalAlign = 'middle';
    svgNode.style.position = 'relative';
    svgNode.style.margin = 0;
    svgNode.style.overflow = 'hidden';
    svgNode.setAttribute('viewbox', '0 0 350 626');
    return svgNode
}

function buildCartoonImage(osd, id, imagePath, svgTypes, eventType) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const cartoonImgContainer = document.createElement("figure");
    cartoonImgContainer.id = id;
    const svgNode = createSvgNode();
    const staticImg = document.createElementNS(svgNS,'image');
    staticImg.setAttribute('width', '100%');
    staticImg.setAttribute('height', '100%');
    staticImg.setAttribute('href', imagePath);
    svgNode.appendChild(staticImg);
    for (let i = 0; i < svgTypes.length; i++) {
        if (svgTypes[i].type === 'ellipse') {
            let ellipseSvg = buildEllipseSvg(osd, svgNS, svgTypes[i], eventType);
            svgNode.appendChild(ellipseSvg);
        }
        else if (svgTypes[i].type === 'path'){
            let pathSvg = buildPathSvg(osd, svgNS, svgTypes[i], eventType);
            svgNode.appendChild(pathSvg);
        }
        else if (svgTypes[i].type === 'rect'){
            let rectSvg = buildRectSvg(osd, svgNS, svgTypes[i], eventType);
            svgNode.appendChild(rectSvg)
        }
    }
    cartoonImgContainer.appendChild(svgNode);
    return cartoonImgContainer
}

function buildWaypointCartoon(waypointNum, storyNum, windowInnerWidth, domElement, osd) {
    // if (waypointNum === 0 && storyNum === 1 && windowInnerWidth >= scrnWBps[2]) {
    //     cartoonImgContainer = buildCartoonImage(osd, 'largeKidneySvgContainer', 'img/finalKidney.jpeg', [largeSlideMedullaPath, largeCortexPath], 'addPolygon')
    //     domElement.appendChild(cartoonImgContainer);
    //   }
    // else if (waypointNum === 0 && storyNum === 1 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]){
    //     cartoonImgContainer = buildCartoonImage(osd, 'mediumKidneySvgContainer', 'img/finalKidney.jpeg', [mediumSlideMedullaPath, mediumCortexPath], 'addPolygon')
    //     domElement.appendChild(cartoonImgContainer);
    // }
    // else if (waypointNum === 0 && storyNum === 1 && windowInnerWidth < scrnWBps[1]){
    //     cartoonImgContainer = buildCartoonImage(osd, 'smallKidneySvgContainer', 'img/finalKidney.jpeg', [smallSlideMedullaPath, smallCortexPath], 'addPolygon')
    //     domElement.appendChild(cartoonImgContainer);
    // }

    // else if (waypointNum === 1 && storyNum === 1 && windowInnerWidth >= scrnWBps[2]) {
    //     cartoonImgContainer = buildCartoonImage(osd, 'largeSubstructureSvgContainer', 'img/kidneySubstructures.png', [largeCollDuctPath, largeDctEllipse, largePctEllipse, largeLoopHEllipse, largeGlomEllipse, largeFiltMemEllipse], 'panAndZoom')
    //     domElement.appendChild(cartoonImgContainer);
    // }
    // else if (waypointNum === 1 && storyNum === 1 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]) {
    //     cartoonImgContainer = buildCartoonImage(osd, 'mediumSubstructureSvgContainer', 'img/kidneySubstructures.png', [medCollDuctRect, medDctRect, medPctEllipse, medLoopHEllipse, medGlomEllipse, medFiltMemEllipse], 'panAndZoom')
    //     domElement.appendChild(cartoonImgContainer);
    // }
    // else if (waypointNum === 1 && storyNum === 1 && windowInnerWidth < scrnWBps[1]) {
    //     cartoonImgContainer = buildCartoonImage(osd, 'smallSubstructureSvgContainer', 'img/kidneySubstructures.png', [smallCollDuctPath, smallDctEll, smallPctEll, smallLoopHEll, smallGlomEll, smallFiltMemEll], 'panAndZoom')
    //     domElement.appendChild(cartoonImgContainer);
    // }
    if (waypointNum === 0 && storyNum === 0 && windowInnerWidth >= scrnWBps[2]) {
        const cartoonImgContainer = buildCartoonImage(osd, 'largeSubstructureSvgContainer', 'img/kidneySubstructures.png', [largeDctEllipse], 'addMask')
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 0 && storyNum === 0 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]) {
        const cartoonImgContainer = buildCartoonImage(osd, 'mediumSubstructureSvgContainer', 'img/kidneySubstructures.png', [medCollDuctRect, medDctRect, medPctEllipse, medLoopHEllipse, medGlomEllipse, medFiltMemEllipse], 'addMask')
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 0 && storyNum === 0 && windowInnerWidth < scrnWBps[1]) {
        const cartoonImgContainer = buildCartoonImage(osd, 'smallSubstructureSvgContainer', 'img/kidneySubstructures.png', [smallCollDuctPath, smallDctEll, smallPctEll, smallLoopHEll, smallGlomEll, smallFiltMemEll], 'addMask')
        domElement.appendChild(cartoonImgContainer);
    }
}

// Add cartoon image to a specific waypoint
// Change the number that HS.w is equal to based on which waypoint the image needs to appear on.
// If the waypoint is the first one after the Table of Contents HS.s must also be set, otherwise, it appears in the TOC too
document.addEventListener('waypointBuildEvent', function(e) {
    const {waypointNum, storyNum, domElement, osd} = e.detail;
    const width = window.innerWidth;
    window.waypointAttr = {
        waypointNum: waypointNum,
        storyNum: storyNum,
        domElement: domElement,
        osd: osd,
        width: width
    }
    //console.log(`waypoint Number: ${waypointNum}; story Number: ${storyNum}`)
    buildWaypointCartoon(waypointNum, storyNum, width, domElement, osd)
    })

// Remove polygons and overlays when the waypoint is changed
// document.addEventListener('waypointBuildEvent', function(e){
//     const {osd} = e.detail
//     const overlayIds = ['#slideMedulla', '#slideCortex']
//     for (let id of overlayIds) {
//         if (document.querySelector(id)) {
//             document.querySelector(id).remove();
//         }
//     }
//     if (document.querySelector('#ROIBox')){
//         osd.viewer.removeOverlay('ROIBox')
//         document.querySelector('#ROIBox').remove()
//     }    
// })

// window.addEventListener('resize', function (e){
//     currW = e.target.window.innerWidth
//     oldW = e.target.window.waypointAttr.width
//     if ((currW < scrnWBps[1] && oldW >= scrnWBps[1]) || (currW < scrnWBps[2] && oldW >= scrnWBps[2]) || (currW >= scrnWBps[2] && oldW <= scrnWBps[2]) || (currW >= scrnWBps[1] && oldW <= scrnWBps[1])) {
//         const {waypointNum, storyNum, domElement, osd} = e.target.window.waypointAttr;
//         const svgCont = ['#largeKidneySvgContainer', '#mediumKidneySvgContainer', '#smallKidneySvgContainer', '#largeSubstructureSvgContainer', '#mediumSubstructureSvgContainer', '#smallSubstructureSvgContainer']
//         for (let id of svgCont) {
//             if (document.querySelector(id)) {
//                 document.querySelector(id).remove();
//             }
//         }
//         buildWaypointCartoon(waypointNum, storyNum, currW, domElement, osd);
//     } 
//     e.target.window.waypointAttr.width = currW
// })