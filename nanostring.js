const slideMedulla = require('./slideMedulla.json');
const slideCortex = require('./slideCortex.json');
const { path } = require('d3');


function createSvgNode(){
    const svgNS = 'http://www.w3.org/2000/svg';
    const svgNode = document.createElementNS(svgNS, 'svg');
    svgNode.setAttribute('xmlns', svgNS);
    svgNode.setAttribute('preserveAspectRatio', 'xMinYMin meet');
    return svgNode
}

// Event listener for the SVGs - circles (or removes the ciricle of) the corresponding part on the slide when clicked.
function addSlidePolygon(polygonID, fileName, osd){
    if (!document.querySelector(`#${polygonID}`)) {
        osd.addPolygon(polygonID, fileName);
    } else {
        document.querySelector(`#${polygonID}`).remove();
    }
}

function buildRectSvg(svgNS, rectObj){
    const rectSvg = document.createElementNS(svgNS,'rect');
    rectSvg.id = rectObj.id;
    rectSvg.setAttribute('x', rectObj.x);
    rectSvg.setAttribute('y', rectObj.y);
    rectSvg.setAttribute('width', rectObj.width);
    rectSvg.setAttribute('height', rectObj.height);
    rectSvg.setAttribute('rx', rectObj.rx);
    rectSvg.setAttribute('fill', rectObj.fill);
    return rectSvg
}

function panZoom(osd, panCoord, zoomRatio) {
    osd.viewer.viewport.panTo(panCoord)
    osd.viewer.viewport.zoomTo(zoomRatio)
}

function buildEllipseSvg(svgNS, ellipseObj){
    const ellipseSvg = document.createElementNS(svgNS, 'ellipse');
    ellipseSvg.id = ellipseObj.id;
    ellipseSvg.setAttribute('cx', ellipseObj.cx);
    ellipseSvg.setAttribute('cy', ellipseObj.cy);
    ellipseSvg.setAttribute('rx', ellipseObj.rx);
    ellipseSvg.setAttribute('ry', ellipseObj.ry);
    ellipseSvg.setAttribute('fill', ellipseObj.fill);
    ellipseSvg.addEventListener('click', () => addSlidePolygon(ellipseObj.polygonID, ellipseObj.file, ellipseObj.osd));
    return ellipseSvg
}

function addEListener(svgObj, svg) {
    if (svgObj.eventType === 'addPolygon') {
        svg.addEventListener('click', () => addSlidePolygon(svgObj.polygonID, svgObj.file, svgObj.osd));
}
    else if (svgObj.eventType === 'panAndZoom') {
        svg.addEventListener('click', () => panZoom(osd, {x: 0.2068, y: 0.4028}, 10.3196))
    }
}

function buildPathSvg(svgNS, pathObj){
    const pathSvg = document.createElementNS(svgNS, 'path');
    pathSvg.id = pathObj.id;
    pathSvg.setAttribute('d', pathObj.d);
    pathSvg.setAttribute('fill', pathObj.fill);
    if (pathObj.eventType) {
        addEListener(pathObj, pathSvg)
    }
    // if (pathObj.eventType === 'svgClicked') {
    //     pathSvg.addEventListener('click', () => svgClicked(pathObj.polygonID, pathObj.file, pathObj.osd));
    // }
    
    return pathSvg
}

function buildCartoonImage(svgNS, id, imagePath, svgTypes) {
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
            let ellipseSvg = buildEllipseSvg(svgNS, svgTypes[i]);
            svgNode.appendChild(ellipseSvg);
        }
        else if (svgTypes[i].type === 'path'){
            let pathSvg = buildPathSvg(svgNS, svgTypes[i]);
            svgNode.appendChild(pathSvg);
        }
        else if (svgTypes[i].type === 'rect'){
            let rectSvg = buildRectSvg(svgNS, svgTypes[i]);
            svgNode.appendChild(rectSvg)
        }
    }
    cartoonImgContainer.appendChild(svgNode);
    return cartoonImgContainer
}

// Add cartoon image to a specific waypoint
// Change the number that HS.w is equal to based on which waypoint the image needs to appear on.
// If the waypoint is the first one after the Table of Contents HS.s must also be set, otherwise, it appears in the TOC too
document.addEventListener('waypointBuildEvent', function(e) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const {waypointNum, storyNum, domElement, osd} = e.detail;
    const screenWidths = [0, 675, 1100]
    if (waypointNum === 0 && storyNum === 1 && window.innerWidth >= screenWidths[2]) {
        const slideMedullaEllipse = {
            type: 'ellipse', 
            id: 'medullaSvg', 
            cx: 289, 
            cy: 258, 
            rx: 29, 
            ry: 25, 
            fill: '#95B3D7A0',
            eventType: 'addPolygon',
            osd: osd,
            file: slideMedulla,
            polygonID: 'slideMedulla'
        }
        // const slideMedullaPath = {
        //     type: 'path',
        //     id: 'medullaSvg',
        //     d: 'M 280 230 A 35, 30 0 1,1 150 350 A 5, 15 0 1,0 280 230',
        //     fill: '#95B3D7A0',
        //     osd: osd,
        //     file: slideMedulla,
        //     polygonID: 'slideMedulla'
        // }
        const cortexMedullaPath = {
            type: 'path',
            id: 'cortexSvg',
            d: 'M 305 230 A 30, 30 0 1,1 305 290 A 5, 15 0 1,0 305 230',
            fill: '#90EE90A0',
            eventType: 'addPolygon',
            osd: osd,
            file: slideCortex,
            polygonID: 'slideCortex'
        }
        cartoonImgContainer = buildCartoonImage(svgNS, 'largeKidneySvgContainer', 'img/kidney_cartoon.png', [slideMedullaEllipse, cortexMedullaPath])
        domElement.appendChild(cartoonImgContainer);
      }
    else if (waypointNum === 0 && storyNum === 1 && window.innerWidth >= screenWidths[1] && window.innerWidth < screenWidths[2]){
        const slideMedullaEllipse = {
            type: 'ellipse', 
            id: 'medullaSvg', 
            cx: 289, 
            cy: 258, 
            rx: 29, 
            ry: 25, 
            fill: '#95B3D7A0',
            osd: osd,
            file: slideMedulla,
            polygonID: 'slideMedulla'
        }
        const cortexMedullaPath = {
            type: 'path',
            id: 'cortexSvg',
            d: 'M 305 230 A 30, 30 0 1,1 305 290 A 5, 15 0 1,0 305 230',
            fill: '#90EE90A0',
            osd: osd,
            file: slideCortex,
            polygonID: 'slideCortex'
        }
        cartoonImgContainer = buildCartoonImage(svgNS, 'mediumKidneySvgContainer', 'img/kidney_cartoon.png', [slideMedullaEllipse, cortexMedullaPath])
        domElement.appendChild(cartoonImgContainer);
    }
    else if (waypointNum === 1 && storyNum === 1) {
        const tubulesRect = {
            type: 'rect',
            id: 'tubulesSvg',
            x: 300,
            y: 180,
            width: 32,
            height: 150,
            rx: 25,
            fill: '#FFD580A0',
            osd: osd,
            panCoord:{x: 0.2068, y: 0.4028},
            zoomRatio: 10.3196
        }
        const dctRect = {
            type: 'rect',
            id: 'dctSvg',
            x: 192,
            y: 180,
            width: 32,
            height: 150,
            rx: 25,
            fill: '#90EE90A0',
            osd: osd,
            panCoord: {x: 0.3287, y: 0.2976},
            zoomRatio: 14.3333
        }
        cartoonImgContainer = buildCartoonImage(svgNS, 'largeKidneySvgContainer', 'img/tubules.jpg', [tubulesRect, dctRect] )
        // const cartoonImgContainer = document.createElement("figure");
        // cartoonImgContainer.id = 'largeKidneySvgContainer';
        // const svgNode = createSvgNode();
        // cartoonImgContainer.appendChild(svgNode);
        // const cartoonImg = document.createElementNS(svgNS,'image');
        // cartoonImg.setAttribute('width', '90%');
        // cartoonImg.setAttribute('height', '90%');
        // cartoonImg.setAttribute('href', 'img/tubules.jpg')
        // svgNode.appendChild(cartoonImg);
        // Create tubules svg
        // const tubulesSvg = rectSvg(svgNS, 'tubulesSvg', 300, 180, 32, 150, 25, '#FFD580A0')

        // Event listener for the SVG - zooms and pans when an svg is clicked on. activateViewport in OSD.js
        // tubulesSvg.addEventListener('click', (e) => panZoom(osd, {x: 0.2068, y: 0.4028}, 10.3196))
        // svgNode.appendChild(tubulesSvg);

        // Create DCT SVG
        // const dctSvg = document.createElementNS(svgNS, 'rect');
        // dctSvg.id = 'dctSvg';
        // dctSvg.setAttribute('x', 192);
        // dctSvg.setAttribute('y', 180);
        // dctSvg.setAttribute('width', 32);
        // dctSvg.setAttribute('height', 150);
        // dctSvg.setAttribute('rx', 25);
        // dctSvg.setAttribute('fill','#90EE90A0');
        // dctSvg.addEventListener('click', (e) => panZoom(osd, {x: 0.3287, y: 0.2976}, 14.3333))
        // svgNode.appendChild(dctSvg);
        domElement.appendChild(cartoonImgContainer);
      }
    })

// Remove polygons when the waypoint is changed
document.addEventListener('waypointBuildEvent', function(e){
    if (document.querySelector('#slideMedulla')) {
        document.querySelector('#slideMedulla').remove();
    }
    if (document.querySelector('#slideCortex')) {
        document.querySelector('#slideCortex').remove();
    }
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