import { index_name } from './state'

// Functions to build Rectangle, Ellipse, and Path SVGs
function buildRectSvg(osd, svgNS, rectObj, storyNum, waypointNum){
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
    addEListener(osd, rectObj, rectSvg, rectObj.eventTypes, storyNum, waypointNum)
    return rectSvg
}

function buildEllipseSvg(osd, svgNS, ellipseObj, storyNum, waypointNum){
    const ellipseSvg = document.createElementNS(svgNS, 'ellipse');
    ellipseSvg.id = ellipseObj.id;
    ellipseSvg.setAttribute('cx', ellipseObj.cx);
    ellipseSvg.setAttribute('cy', ellipseObj.cy);
    ellipseSvg.setAttribute('rx', ellipseObj.rx);
    ellipseSvg.setAttribute('ry', ellipseObj.ry);
    ellipseSvg.setAttribute('fill', ellipseObj.fill);
    ellipseSvg.setAttribute('stroke', ellipseObj.stroke);
    ellipseSvg.setAttribute('stroke-width', ellipseObj.strokeWidth)
    addEListener(osd, ellipseObj, ellipseSvg, ellipseObj.eventTypes, storyNum, waypointNum)
    return ellipseSvg
}

function buildPathSvg(osd, svgNS, pathObj, storyNum, waypointNum){
    const pathSvg = document.createElementNS(svgNS, 'path');
    pathSvg.id = pathObj.id;
    pathSvg.setAttribute('d', pathObj.d);
    pathSvg.setAttribute('fill', pathObj.fill);
    pathSvg.setAttribute('stroke', pathObj.stroke);
    pathSvg.setAttribute('stroke-width', pathObj.strokeWidth)
    addEListener(osd, pathObj, pathSvg, pathObj.eventTypes, storyNum, waypointNum)
    return pathSvg
}

// Event Listener to pan and zoom to a specific place.
export function panZoom(osd, svgObj, storyNum, waypointNum) {
    const id = 'ROIBox'
    // Pan and Zoom to the 'Best in Class' ROI
    osd.viewer.viewport.panTo(svgObj.panCoord)
    osd.viewer.viewport.zoomTo(svgObj.zoomRatio)
    //If a 'Best in Class ROI is already highlighted, remove it and add a box around the new one
    if (document.querySelector(`#${id}-1`)){
        const ROIBoxes = document.querySelectorAll(`[id^=${id}-`)
        for (let box of ROIBoxes){
          osd.viewer.removeOverlay(box.id)
          document.querySelector(`#${box.id}`).remove()
        }
    }
    for (let i=1; i <= (svgObj.ROIBox).length; i++){
        addROIBox(osd, svgObj.ROIBox[i-1], `${id}-${i}`, storyNum, waypointNum)
    }
}

// Event listener for the SVGs - circles (or removes the ciricle of) the corresponding part on the slide when clicked.
export function addSlidePolygon(polygonID, fileName, osd){
    if (!document.querySelector(`#${polygonID}`)) {
        osd.addPolygon(polygonID, fileName);
    } else {
        document.querySelector(`#${polygonID}`).remove();
    }
}

function addROIBox(osd, ROIBox, id, storyNum, waypointNum){
    const {overlay} = ROIBox
    osd.addOverlay(overlay, id, storyNum, waypointNum)
}

export function addMask(osd, maskNums) {
    if (maskNums >= 0) {
        osd.hashstate.m = maskNums;
    }
    window.testRender.newView(true);
}
//     // How can I use the render.js addMasks function??
//     const HS = osd.hashstate;
//     $('.minerva-mask-layers').empty();
//     if (HS.edit || HS.waypoint.Mode == 'explore') {
//         // Show as a multi-column
//         $('.minerva-mask-layers').addClass('flex');
//         $('.minerva-mask-layers').removeClass('flex-column');
//     }
//     else {
//         // Show as a single column
//         $('.minerva-mask-layers').addClass('flex-column');
//         $('.minerva-mask-layers').removeClass('flex');
//     }
//     const mask_names = HS.waypoint.Masks || [];
//     const masks = HS.masks.filter(mask => {
//       return mask_names.includes(mask.Name);
//     });
//     if (masks.length || HS.edit) {
//       $('.minerva-mask-label').show()
//     }
//     else {
//       $('.minerva-mask-label').hide()
//     }
//     // Add masks with indices
//     masks.forEach(function(mask) {
//       const m = index_name(HS.masks, mask.Name);
//       osd.addMask(mask, m);
//     });
//     // osd.newView(true);
//   }

// export function addMask(osd, maskNums) {
//     // const maskNums = svgObj.maskNum;
//     const numMasks = osd.hashstate.masks.length
//     //Add the mask to all the ROIs of the same structure
//     for (let i=0; i <= numMasks; i++){
//         if(osd.hashstate.m.includes(i)) {
//             osd.hashstate.m = osd.hashstate.m.filter(i => i != i)
//         }
//     }
//     osd.hashstate.pushState();
//     window.onpopstate();
//     for (let maskInd of maskNums){
//         osd.hashstate.m.push(maskInd);
//     }
//     osd.hashstate.pushState();
//     window.onpopstate();
// }


//Add Event Listeners to SVG elements based on attributes in their SVG object
export function addEListener(osd, svgObj, svg, eventTypes, storyNum, waypointNum) {
    svg.addEventListener('click', () => {
        eventTypes.forEach((eventType) => {
            switch (eventType) {
                case 'addPolygon':
                    addSlidePolygon(svgObj.polygonID, svgObj.file, osd)
                    break;
                case 'panZoom':
                    panZoom(osd, svgObj, storyNum, waypointNum)
                    break;
                case 'addMask':
                    addMask(osd, svgObj.maskNum);
                    break;
                default:
                    break;
            }
        })
    });   
}

// Build components on the waypoint: Cartoon image, SVG Node
function createSvgNode(){
    const svgNS = 'http://www.w3.org/2000/svg';
    const svgNode = document.createElementNS(svgNS, 'svg');
    svgNode.setAttribute('xmlns', svgNS);
    svgNode.setAttribute('preserveAspectRatio', 'xMinYMin meet');
    return svgNode
}

export function buildCartoonImage(osd, svgNS, id, imagePath, svgTypes, storyNum, waypointNum) {
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
            let ellipseSvg = buildEllipseSvg(osd, svgNS, svgTypes[i], storyNum, waypointNum);
            svgNode.appendChild(ellipseSvg);
        }
        else if (svgTypes[i].type === 'path'){
            let pathSvg = buildPathSvg(osd, svgNS, svgTypes[i], storyNum, waypointNum);
            svgNode.appendChild(pathSvg);
        }
        else if (svgTypes[i].type === 'rect'){
            let rectSvg = buildRectSvg(osd, svgNS, svgTypes[i], storyNum, waypointNum);
            svgNode.appendChild(rectSvg)
        }
    }
    cartoonImgContainer.appendChild(svgNode);
    return cartoonImgContainer
}