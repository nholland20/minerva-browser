import { addEListener } from './nanostringUtils';

const allROIs = {
    // // best-in-class Ependymal cells
    // r019: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [20]
    // },
    // // best-in-class Thalamus (Full ROI)
    // r023: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [32]
    // },
    // // best-in-class Thalamic paraventricular nucleus/PVT (Full ROI)
    // r025: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [33]
    // },
    // // best-in-class Mediodorsal thalamus/Thalamus (Full ROI)
    // r027: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [30]
    // },
    // // best-in-class Hippocampus dentate gyrus/Hippocampus (NeuN+) 
    // r030: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [24]
    // },
    // // best-in-class Hippocampus CA1 (Full ROI)
    // r033: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [21]
    // },
    // // best-in-class Hippocamus CA3 (Full ROI)
    // r038: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [23]
    // },
    // // best-in-class Hippocampus CA2 (Full ROI)
    // r039: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [22]
    // },
    // // best-in-class Amygdala (Full ROI)
    // r040: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [1]
    // },
    // best-in-class Cortical layer I (Full ROI)
    r043: {
        panCoord: {x: 0.1800, y: 0.6544},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.1554, y: 0.6333, width: 0.0492, height: 0.0421}}],
        maskNum: [4]
    },
    // best-in-class Cortical layer II/III (Full ROI)
    r044: {
        panCoord: {x: 0.1857, y: 0.6425},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.1609, y: 0.6202, width: 0.0496, height: 0.0447}}],
        maskNum: [5]
    },
    // best-in-class Cortical layer IV (Full ROI)
    r045: {
        panCoord: {x: 0.1991, y: 0.6291},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.1816, y: 0.6139, width: 0.0351, height: 0.0305}}],
        maskNum: [8]
    },
    // best-in-class Cortical layer V (Full ROI)
    r046: {
        panCoord: {x: 0.2108, y: 0.6177},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.1894, y: 0.5997, width: 0.0428, height: 0.0361}}],
        maskNum: [11]
    },
    // best-in-class Cortical layer VI (Full ROI)
    r047: {
        panCoord: {x: 0.2274, y: 0.6035},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.2053, y: 0.5841, width: 0.0443, height: 0.0387}}],
        maskNum: [14]
    },
    // // best-in-class Cortical layer II/III (NeuN+)
    // r049: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [9]
    // },
    // // best-in-class Cortical layer II/III (DNA)
    // r049: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [10]
    // },
    // best-in-class Cortical layer IV (NeuN+)
    // r050: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [12]
    // },
    // // best-in-class Cortical layer IV (DNA)
    // r050: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [13]
    // },
    // best-in-class Cortical layer V (NeuN+)
    r051NeuN: {
        panCoord: {x: 0.1830, y: 0.5872},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.1621, y: 0.5646, width: 0.0418, height: 0.0452}}],
        maskNum: [12]
    },
    // best-in-class Cortical layer V (DNA)
    r051Neuropil: {
        panCoord: {x: 0.1830, y: 0.5872},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.1621, y: 0.5646, width: 0.0418, height: 0.0452}}],
        maskNum: [13]
    },
    // // best-in-class Cortical layer VI (NeuN+)
    // r052: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [18]
    // },
    // // best-in-class Cortical layer VI (DNA)
    // r052: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [19]
    // },
    // best-in-class Amygdala (NeuN+)
    // r068: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [2]
    // },
    // // best-in-class Amygdala (DNA)
    // r068: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [3]
    // },
    // // best-in-class Caudoputamen (NeuN+)
    // r075: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [5]
    // },
    // // best-in-class Caudoputamen (DNA)
    // r075: {
    //     panCoord: {x: , y: },
    //     zoomRatio: ,
    //     ROIBox: [{overlay: {x: , y: , width: , height: }}],
    //     maskNum: [6]
    // }
}

function buildWaypoint(waypointNum, storyNum, domElement, osd, finish_waypoint) {
    const showdown_text = new showdown.Converter({tables: true});

    if (waypointNum === 1 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/muBrainDetail.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'detailImage'
        // Add interactivity to the clickable regions in the cartoon image SVG
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            Object.entries(allROIs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    addEListener(osd, val, el, ['addMask', 'panZoom'], storyNum, waypointNum);
                }
            });
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);
    }
}

// Add cartoon image or text to a specific waypoint
// Change the number that HS.w is equal to based on which waypoint the image needs to appear on.
// If the waypoint is the first one after the Table of Contents HS.s must also be set, otherwise, it appears in the TOC too
document.addEventListener('waypointBuildEvent', function(e) {
    const {waypointNum, storyNum, domElement, osd, finish_waypoint} = e.detail;
    const width = window.innerWidth;
    window.waypointAttr = {
        waypointNum: waypointNum,
        storyNum: storyNum,
        domElement: domElement,
        osd: osd,
        width: width
    }
    if (document.querySelector('[id^=ROIBox]')){
        const ROIBoxes = document.querySelectorAll('[id^=ROIBox]')
        for (let box of ROIBoxes){
            osd.viewer.removeOverlay(box.id)  
            document.querySelector(`#${box.id}`).remove()
        }
    }
    buildWaypoint(waypointNum, storyNum, domElement, osd, finish_waypoint)
    }
);




const css = `
@media (min-width: 1100px) {
    .minerva-root .minerva-sidebar-menu {
        width: 455px !important;
    }
    .minerva-root .minerva-sidebar-menu.toggled {
        margin-left: -420px !important;
    }
    .minerva-root .openseadragon-canvas {
        left: 100px !important;
    }
}


@media (max-width: 1099px) {
    .minerva-root .openseadragon-canvas {
        left: 50px !important;
    }
}

@media (max-width: 674px) {
    .minerva-root .minerva-sidebar-menu {
        width: 250px !important;
    }
    .minerva-root .minerva-sidebar-menu.toggled {
        margin-left: -185px !important;
    }

`;

export const story = {
    'css': css
};

const styleElement = document.createElement('style');
styleElement.innerText = css;
document.head.appendChild(styleElement);