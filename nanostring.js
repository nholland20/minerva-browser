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
    d: 'M 280 230 A 205,200 0 0,1 155 350 A5,5 0 1,0 280 230',
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
    d: 'M 330 240 C400,425 150,475 140,350 A50,50 0 0,1 155,350 C175,400 370,380 280 230 A50,50 0 0,1 330,240',
    eventType: 'addPolygon',
    fill: '#90EE90A0',
    strokeWidth: '2',
    stroke: 'red',
    eventTypes: ['addPolygon'],
    file: slideCortex,
    polygonID: 'slideCortex'
}

const mediumSlideMedullaPath = {
    type: 'path',
    id: 'medullaSvg',
    d: 'M240 215 A 180,130 0 0,1 140,315 A5,5 0 1,0 240 215',
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
    d: 'M290,220 C340,335 155,445 125,315 A50,50 0 0,1 140,315 C150,355 320,340 240 215 A50,50 0 0,1 290,220',
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
    d: 'M 120 130 A 180,130 0 0,1 70,180 A25,25 0 1,0 120,130',
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
    d: 'M148,133 C175,165 110,255 63,185 A50,50 0 0,1 70,180 C125,218 143,150 120 130 A50,50 0 0,1 148,133',
    fill: '#90EE90A0',
    stroke: 'red',
    strokeWidth: '2',
    eventTypes: ['addPolygon'],
    file: slideCortex,
    polygonID: 'slideCortex'
}

//SVG objects for the second waypoint of the story - based on different screen sizes
const largeCollectingDuctRect = {
    type: 'rect',
    id: 'tubulesSvg',
    x: 318,
    y: 190,
    width: 32,
    height: 150,
    rx: 25,
    stroke: 'red',
    strokeWidth: '2',
    fill: '#FFD580A0',
    eventType: ['panAndZoom', 'addMask'],
    panCoord:{x: 0.2068, y: 0.4028},
    zoomRatio: 10.3196,
    ROIBox: {overlay: {x: 0.1996, y: 0.3753, width: 0.03, height: 0.0341},
            storyNum: 1, waypointNum: 1},
    maskNum: 1
}
const largeDctRect = {
    type: 'rect',
    id: 'dctSvg',
    x: 203,
    y: 190,
    width: 32,
    height: 150,
    rx: 25,
    fill: '#90EE90A0',
    stroke: 'red',
    strokeWidth: '2',
    eventType: ['panAndZoom', 'addMask'],
    panCoord: {x: 0.3287, y: 0.2976},
    zoomRatio: 14.3333,
    ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
            storyNum:1, waypointNum: 1},
    maskNum: 4
}

const mediumCollectingDuctRect = {
    type: 'rect',
    id: 'tubulesSvg',
    x: 277,
    y: 177,
    width: 27,
    height: 120,
    rx: 25,
    fill: '#FFD580A0',
    stroke: 'red',
    strokeWidth: '2',
    eventType: ['panAndZoom', 'addMask'],
    panCoord:{x: 0.2068, y: 0.4028},
    zoomRatio: 10.3196,
    ROIBox: {overlay: {x: 0.1996, y: 0.3753, width: 0.03, height: 0.0341},
    storyNum: 1, waypointNum: 1},
    maskNum: 1
}
const mediumDctRect = {
    type: 'rect',
    id: 'dctSvg',
    x: 177,
    y: 177,
    width: 27,
    height: 120,
    rx: 25,
    fill: '#90EE90A0',
    stroke: 'red',
    strokeWidth: '2',
    eventType: ['panAndZoom', 'addMask'],
    panCoord: {x: 0.3287, y: 0.2976},
    zoomRatio: 14.3333,
    ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
    storyNum:1, waypointNum: 1},
    maskNum: 4
}

const smallCollectingDuctRect = {
    type: 'rect',
    id: 'tubulesSvg',
    x: 135,
    y: 110,
    width: 20,
    height: 70,
    rx: 25,
    fill: '#FFD580A0',
    stroke: 'red',
    strokeWidth: '2',
    eventType: ['panAndZoom', 'addMask'],
    panCoord:{x: 0.2068, y: 0.4028},
    zoomRatio: 10.3196,
    ROIBox: {overlay: {x: 0.1996, y: 0.3753, width: 0.03, height: 0.0341},
            storyNum: 1, waypointNum: 1},
    maskNum: 1
}
const smallDctRect = {
    type: 'rect',
    id: 'dctSvg',
    x: 85,
    y: 110,
    width: 20,
    height: 70,
    rx: 25,
    fill: '#90EE90A0',
    stroke: 'red',
    strokeWidth: '2',
    eventType: ['panAndZoom', 'addMask'],
    panCoord: {x: 0.3287, y: 0.2976},
    zoomRatio: 14.3333,
    ROIBox: {overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301},
            storyNum:1, waypointNum: 1},
    maskNum: 4
}

// Functions to build Rectangle, Ellipse, and Path SVGs
function buildRectSvg(osd, svgNS, rectObj, eventType){
    const rectSvg = document.createElementNS(svgNS,'rect');
    rectSvg.id = rectObj.id;
    rectSvg.setAttribute('x', rectObj.x);
    rectSvg.setAttribute('y', rectObj.y);
    rectSvg.setAttribute('width', rectObj.width);
    rectSvg.setAttribute('height', rectObj.height);
    rectSvg.setAttribute('rx', rectObj.rx);
    rectSvg.setAttribute('fill', rectObj.fill);
    rectSvg.setAttribute('stroke', rectObj.stroke);
    rectSvg.setAttribute('stroke-width', rectObj.strokeWidth)
    addEListener(osd, rectObj, rectSvg, eventType)
    return rectSvg
}

function buildEllipseSvg(osd, svgNS, ellipseObj, eventType){
    const ellipseSvg = document.createElementNS(svgNS, 'ellipse');
    ellipseSvg.id = ellipseObj.id;
    ellipseSvg.setAttribute('cx', ellipseObj.cx);
    ellipseSvg.setAttribute('cy', ellipseObj.cy);
    ellipseSvg.setAttribute('rx', ellipseObj.rx);
    ellipseSvg.setAttribute('ry', ellipseObj.ry);
    ellipseSvg.setAttribute('fill', ellipseObj.fill);
    ellipseSvg.setAttribute('stroke', ellipseObj.stroke);
    ellipseSvg.setAttribute('stroke-width', ellipseObj.strokeWidth)
    addEListener(osd, ellipseObj, ellipseSvg, eventType)
    return ellipseSvg
}

function buildPathSvg(osd, svgNS, pathObj, eventType){
    const pathSvg = document.createElementNS(svgNS, 'path');
    pathSvg.id = pathObj.id;
    pathSvg.setAttribute('d', pathObj.d);
    pathSvg.setAttribute('fill', pathObj.fill);
    pathSvg.setAttribute('stroke', pathObj.stroke);
    pathSvg.setAttribute('stroke-width', pathObj.strokeWidth)
    addEListener(osd, pathObj, pathSvg, eventType)
    return pathSvg
}

// Event Listener to pan and zoom to a specific place on the slide
function panZoom(osd, svgObj) {
    const id = 'ROIBox'
    osd.viewer.viewport.panTo(svgObj.panCoord)
    osd.viewer.viewport.zoomTo(svgObj.zoomRatio)
    //TO DO: Add something to make sure the person didn't just click on the same one so
    // it doesn't remove if they did (maybe compare x coord). Then debug remove logic.

    if (document.querySelector(`#${id}`)){
        osd.viewer.removeOverlay(`#${id}`)
    }
    addROIBox(osd, svgObj.ROIBox, id)
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
    const m = svgObj.maskNum;
    if(osd.hashstate.m.includes(m)) {
        osd.hashstate.m = osd.hashstate.m.filter(i => i != m)
    }
    else {
        osd.hashstate.m.push(m);
    }
    osd.hashstate.pushState();
    window.onpopstate();
}


//Add Event Listeners to SVG elements based on attributes in their SVG object
function addEListener(osd, svgObj, svg, eventType) {
    if (eventType === 'addPolygon') {
        svg.addEventListener('click', () => addSlidePolygon(svgObj.polygonID, svgObj.file, osd));
    }
    else if (eventType === 'panAndZoom') {
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

function buildCartoonImage(osd, svgNS, id, imagePath, svgTypes, eventType) {
    const cartoonImgContainer = document.createElement("figure");
    cartoonImgContainer.id = id;
    const svgNode = createSvgNode();
    const cartoonSvg = document.createElementNS(svgNS,'image');
    cartoonSvg.setAttribute('width', '95%');
    cartoonSvg.setAttribute('height', '95%');
    cartoonSvg.setAttribute('href', imagePath);
    svgNode.appendChild(cartoonSvg);
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
    const svgNS = 'http://www.w3.org/2000/svg';
    if (waypointNum === 0 && storyNum === 1 && windowInnerWidth >= scrnWBps[2]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'largeKidneySvgContainer', 'img/kidney_cartoon.png', [largeSlideMedullaPath, largeCortexPath], 'addPolygon')
        domElement.appendChild(cartoonImgContainer);
      }
    else if (waypointNum === 0 && storyNum === 1 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]){
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'mediumKidneySvgContainer', 'img/kidney_cartoon.png', [mediumSlideMedullaPath, mediumCortexPath], 'addPolygon')
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 0 && storyNum === 1 && windowInnerWidth < scrnWBps[1]){
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'smallKidneySvgContainer', 'img/kidney_cartoon.png', [smallSlideMedullaPath, smallCortexPath], 'addPolygon')
        domElement.appendChild(cartoonImgContainer);
    }

    else if (waypointNum === 1 && storyNum === 1 && windowInnerWidth >= scrnWBps[2]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'largeKidneySvgContainer', 'img/tubules.jpg', [largeCollectingDuctRect, largeDctRect], 'panAndZoom')
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 1 && storyNum === 1 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'mediumKidneySvgContainer', 'img/tubules.jpg', [mediumCollectingDuctRect, mediumDctRect], 'panAndZoom')
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 1 && storyNum === 1 && windowInnerWidth < scrnWBps[1]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'smallKidneySvgContainer', 'img/tubules.jpg', [smallCollectingDuctRect, smallDctRect], 'panAndZoom')
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 0 && storyNum === 0 && windowInnerWidth >= scrnWBps[2]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'largeKidneySvgContainer', 'img/tubules.jpg', [largeCollectingDuctRect, largeDctRect], 'addMask')
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 0 && storyNum === 0 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'mediumKidneySvgContainer', 'img/tubules.jpg', [mediumCollectingDuctRect, mediumDctRect], 'addMask')
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 0 && storyNum === 0 && windowInnerWidth < scrnWBps[1]) {
        cartoonImgContainer = buildCartoonImage(osd, svgNS, 'smallKidneySvgContainer', 'img/tubules.jpg', [smallCollectingDuctRect, smallDctRect], 'addMask')
        domElement.appendChild(cartoonImgContainer);
    }
}

// Add cartoon image to a specific waypoint
// Change the number that HS.w is equal to based on which waypoint the image needs to appear on.
// If the waypoint is the first one after the Table of Contents HS.s must also be set, otherwise, it appears in the TOC too
document.addEventListener('waypointBuildEvent', function(e) {
    const {waypointNum, storyNum, domElement, osd} = e.detail;
    width = window.innerWidth
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
    if (document.querySelector('#ROIBox')){
        osd.viewer.removeOverlay('ROIBox')
        document.querySelector('#ROIBox').remove()
    }    
})

window.addEventListener('resize', function (e){
    currW = e.target.window.innerWidth
    oldW = e.target.window.waypointAttr.width
    if ((currW < scrnWBps[1] && oldW >= scrnWBps[1]) || (currW < scrnWBps[2] && oldW >= scrnWBps[2]) || (currW > scrnWBps[2] && oldW <= scrnWBps[2]) || (currW > scrnWBps[1] && oldW <= scrnWBps[1])) {
        const {waypointNum, storyNum, domElement, osd} = e.target.window.waypointAttr;
        const svgCont = ['#largeKidneySvgContainer', '#mediumKidneySvgContainer', '#smallKidneySvgContainer']
        for (let id of svgCont) {
            if (document.querySelector(id)) {
                document.querySelector(id).remove();
            }
        }
        buildWaypointCartoon(waypointNum, storyNum, currW, domElement, osd);
    } 
    e.target.window.waypointAttr.width = currW
})

      
// Nanostring-specific
// Update the size of the description box to be bigger based on waypoint
// function changeDescriptionBoxSize() {
//       if (HS.w == 0 && HS.s == 1) {
//             const descriptionBox = document.querySelector('.minerva-sidebar-menu');
//             descriptionBox.style.setProperty('width', '800px')
//       } else {
//             const descriptionBox = document.querySelector('.minerva-sidebar-menu');
//             descriptionBox.style.setProperty('width', '400px')
//       }
// }

// module.exports = {}