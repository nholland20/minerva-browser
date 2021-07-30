const slideMedulla = require('./slideMedulla.json');
const slideCortex = require('./slideCortex.json');


function createSvgNode(){
    const svgNS = 'http://www.w3.org/2000/svg';
    const svgNode = document.createElementNS(svgNS, 'svg');
    svgNode.setAttribute('xmlns', svgNS);
    svgNode.setAttribute('preserveAspectRatio', 'xMinYMin meet');
    return svgNode
}

// Event listener for the SVGs - circles (or removes the ciricle of) the corresponding part on the slide when clicked.
// function svgClicked(polygonID, slidePolygon, osd){
//     if (!document.querySelector(`#${polygonID}`)) {
//         osd.addPolygon(polygonID, slidePolygon);
//     } else {
//         document.querySelector(`#${polygonID}`).remove();
//     }
// }

// extract functions to make different SVG's?

// Add cartoon image to a specific waypoint
// Change the number that HS.w is equal to based on which waypoint the image needs to appear on.
// If the waypoint is the first one after the Table of Contents HS.s must also be set, otherwise, it appears in the TOC too
document.addEventListener('waypointBuildEvent', function(e) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const {waypointNum, storyNum, domElement, osd} = e.detail;
    if (waypointNum === 0 && storyNum === 1) {
        const cartoonImgContainer = document.createElement("figure");
        cartoonImgContainer.id = 'kidneySvgContainer';
        const svgNode = createSvgNode();
        cartoonImgContainer.appendChild(svgNode);
        const cartoonImg = document.createElementNS(svgNS,'image');
        cartoonImg.setAttribute('width', '100%');
        cartoonImg.setAttribute('height', '100%');
        cartoonImg.setAttribute('href', 'img/kidney_cartoon.png')
        svgNode.appendChild(cartoonImg);
        // Create medulla svg
        const medullaSvg = document.createElementNS(svgNS,'ellipse');
        medullaSvg.id = 'medullaSvg';
        medullaSvg.setAttribute('cx', 300);
        medullaSvg.setAttribute('cy', 272);
        medullaSvg.setAttribute('rx', 32);
        medullaSvg.setAttribute('ry', 25);
        medullaSvg.setAttribute('fill','#95B3D7A0');
        // Event listener for the SVG - highlights corresponding image when hovered over.
        medullaSvg.addEventListener('click', function(e) {
            const tissueStructure = 'slideMedulla'
            if (!document.querySelector(`#${tissueStructure}`)) {
                osd.addPolygon(tissueStructure, slideMedulla);
            } else {
                document.querySelector(`#${tissueStructure}`).remove();
            }
        });
        svgNode.appendChild(medullaSvg);
        // Create cortex svg
        const cortexSvg = document.createElementNS(svgNS, 'path');
        cortexSvg.id = 'cortexSvg';
        cortexSvg.setAttribute('d', 'M 320 240 A 30, 30 0 1,1 320 300 A 5, 15 0 1,0 320 240');
        cortexSvg.setAttribute('fill', '#90EE90A0');
        // Event listener for the SVG
        cortexSvg.addEventListener('click', function(e) {
            const tissueStructure = 'slideCortex'
            if (!document.querySelector(`#${tissueStructure}`)) {
                osd.addPolygon(tissueStructure, slideCortex)
            } else {
                document.querySelector(`#${tissueStructure}`).remove();
            }
        });
        svgNode.appendChild(cortexSvg);
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