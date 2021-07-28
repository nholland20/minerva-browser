import * as d3 from "d3"
// import {OpenSeadragonSvgOverlay} from './openseadragon-svg-overlay.js';
// OpenSeadragonSvgOverlay(OpenSeadragon);
const slideMedulla = require('./slideMedulla.json')


// Add cartoon image to a specific waypoint
// Change the number that HS.w is equal to based on which waypoint the image needs to appear on.
// If the waypoint is the first one after the Table of Contents HS.s must also be set, otherwise, it appears in the TOC too
// document.addEventListener('waypointBuildEvent', function(e) {
//     const {waypointNum, storyNum, domElement} = e.detail;
//     if (waypointNum === 0 && storyNum === 1) {
//         const cartoonImg = document.createElement("img");
//         cartoonImg.src = 'img/kidney_cartoon.png';
//         cartoonImg.id = 'kidneyCartoon';
//         domElement.appendChild(cartoonImg);
//       }
// })
function createSvg(){
    const svgNS = 'http://www.w3.org/2000/svg';
    const svgNode = document.createElementNS(svgNS, 'svg');
    svgNode.setAttribute('xmlns', svgNS);
    svgNode.setAttribute('preserveAspectRatio', 'xMinYMin meet');
    return svgNode
}

document.addEventListener('waypointBuildEvent', function(e) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const {waypointNum, storyNum, domElement, osd} = e.detail;
    if (waypointNum === 0 && storyNum === 1) {
        const cartoonImgContainer = document.createElement("figure");
        cartoonImgContainer.id = 'kidneySvgContainer';
        const svgNode = createSvg();
        cartoonImgContainer.appendChild(svgNode);
        const cartoonImg = document.createElementNS(svgNS,'image');
        cartoonImg.setAttribute('width', '100%');
        cartoonImg.setAttribute('height', '100%');
        cartoonImg.setAttribute('href', 'img/kidney_cartoon.png')
        svgNode.appendChild(cartoonImg);
        const ellipse = document.createElementNS(svgNS,'ellipse');
        ellipse.id = 'medullaSvg';
        ellipse.setAttribute('cx', 300);
        ellipse.setAttribute('cy', 272);
        ellipse.setAttribute('rx', 32);
        ellipse.setAttribute('ry', 25);
        ellipse.setAttribute('fill','#95B3D7A0');
        // Event listener for the SVG - highlights corresponding image when hovered over.
        ellipse.addEventListener('click', function(e){
            osd.addPolygon('slideMedulla', slideMedulla);
        })
        svgNode.appendChild(ellipse);
        domElement.appendChild(cartoonImgContainer);
      }
})

// ***********************************************************************************************************
// NEEDED: GETTING RID OF THE POLYGON WHEN IT'S ON THE SCREEN - MOVING WAYPOINTS &/OR CLICKING THE OTHER SVG
// ***********************************************************************************************************
      
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