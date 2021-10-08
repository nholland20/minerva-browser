// const slideMedulla = require('./slideMedulla.json');
// const slideCortex = require('./slideCortex.json');
import { getConfig } from './nanostringStoryConfig';
import { addMask, addEListener, buildCartoonImage, addHintText} from './nanostringUtils';

// Breakpoints for when to resize the cartoon image and subsequently redraw the corresponding SVGs
// Align with CSS breakpoints (or TO DO: set description box width dynamically with JavaScript)
const scrnWBps = [0, 675, 1100]

const allROIs = 
    {r001Alpha: {
        panCoord: {x: 0.6624, y: 0.4602},
        zoomRatio: 7.8648,
        ROIBox: [{overlay: {x: 0.6568, y: 0.4514, width: 0.017, height: 0.0208}}],
        maskNum: [1]
    },
    r001Beta: {
        panCoord: {x: 0.6624, y: 0.4602},
        zoomRatio: 7.8648,
        ROIBox: [{overlay: {x: 0.6568, y: 0.4514, width: 0.017, height: 0.0208}}],
        maskNum: [2]
    },
    r002Alpha: {
        panCoord: {x: 0.7596, y: 0.429},
        zoomRatio: 10.8415,
        ROIBox: [{overlay: {x: 0.7449, y: 0.419, width: 0.018, height: 0.0164}}],
        maskNum: [1]
    },
    r002Beta: {
        panCoord: {x: 0.7596, y: 0.429},
        zoomRatio: 10.8415,
        ROIBox: [{overlay: {x: 0.7449, y: 0.419, width: 0.018, height: 0.0164}}],
        maskNum: [2]
    },
    r003Alpha: {
        panCoord: {x: 0.5324, y: 0.5199},
        zoomRatio: 10.8415,
        ROIBox: [{overlay: {x: 0.5157, y: 0.5188, width: 0.025, height: 0.0125}}],
        maskNum: [1]
    },
    r003Beta: {
        panCoord: {x: 0.5324, y: 0.5199},
        zoomRatio: 10.8415,
        ROIBox: [{overlay: {x: 0.5157, y: 0.5188, width: 0.025, height: 0.0125}}],
        maskNum: [2]
    },
    r006Alpha: {
        panCoord: {x: 0.6395, y: 0.7144},
        zoomRatio: 15.9741,
        ROIBox: [{overlay: {x: 0.6261, y: 0.7058, width: 0.0183, height: 0.015}}],
        maskNum: [1]
    },
    r006Beta: {
        panCoord: {x: 0.6395, y: 0.7144},
        zoomRatio: 15.9741,
        ROIBox: [{overlay: {x: 0.6261, y: 0.7058, width: 0.0183, height: 0.015}}],
        maskNum: [2]
    },
    r007: {
        panCoord: {x: 0.1778, y: 0.4728},
        zoomRatio: 11.4179,
        ROIBox: [{overlay: {x: 0.1647, y: 0.4632, width: 0.015, height: 0.0177}}],
        maskNum: [4]
    },
    r008: {
        panCoord: {x: 0.3851, y: 0.662},
        zoomRatio: 11.4183,
        ROIBox: [{overlay: {x: 0.3752, y: 0.6541, width: 0.014, height: 0.0147}}],
        maskNum: [4]
    },
    r009Alpha: {
        panCoord: {x: 0.4019, y: 0.5911},
        zoomRatio: 11.4179,
        ROIBox: [{overlay: {x: 0.3911, y: 0.584, width: 0.019, height: 0.0158}}],
        maskNum: [1]
    },
    r009Beta: {
        panCoord: {x: 0.4019, y: 0.5911},
        zoomRatio: 11.4179,
        ROIBox: [{overlay: {x: 0.3911, y: 0.584, width: 0.019, height: 0.0158}}],
        maskNum: [2]
    },
    r010: {
        panCoord: {x: 0.605, y: 0.8154},
        zoomRatio: 13.7014,
        ROIBox: [{overlay: {x: 0.6001, y: 0.8056, width: 0.016, height: 0.0141}}],
        maskNum: [4]
    },
    r011Alpha: {
        panCoord: {x: 0.6032, y: 0.5092},
        zoomRatio: 11.4179,
        ROIBox: [{overlay: {x: 0.5909, y: 0.4995, width: 0.02, height: 0.0188}}],
        maskNum: [1]
    },
    r011Beta: {
        panCoord: {x: 0.6032, y: 0.5092},
        zoomRatio: 11.4179,
        ROIBox: [{overlay: {x: 0.5909, y: 0.4995, width: 0.02, height: 0.0188}}],
        maskNum: [2]
    },
    r012: {
        panCoord: {x: 0.5971, y: 0.4761},
        zoomRatio: 13.7014,
        ROIBox: [{overlay: {x: 0.5878, y: 0.4669, width: 0.012, height: 0.0161}}],
        maskNum: [4]
    },
    r013Acini: {
        panCoord: {x: 0.2085, y: 0.5782},
        zoomRatio: 6.6075,
        ROIBox: [{overlay: {x: 0.1823, y: 0.5643, width: 0.037, height: 0.0359}}],
        maskNum: [5]
    },
    r013Duct: {
        panCoord: {x: 0.2085, y: 0.5782},
        zoomRatio: 6.6075,
        ROIBox: [{overlay: {x: 0.1823, y: 0.5643, width: 0.037, height: 0.0359}}],
        maskNum: [3]
    },
    r014Acini: {
        panCoord: {x: 0.3895, y: 0.4685},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.3697, y: 0.4562, width: 0.037, height: 0.0338}}],
        maskNum: [5]
    },
    r014Duct: {
        panCoord: {x: 0.3895, y: 0.4685},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.3697, y: 0.4562, width: 0.037, height: 0.0338}}],
        maskNum: [3]
    },
    r015Acini: {
        panCoord: {x: 0.5535, y: 0.5097},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.5392, y: 0.4963, width: 0.035, height: 0.0346}}],
        maskNum: [5]
    },
    r015Duct: {
        panCoord: {x: 0.5535, y: 0.5097},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.5392, y: 0.4963, width: 0.035, height: 0.0346}}],
        maskNum: [3]
    },
    r016Duct: {
        panCoord: {x: 0.7127, y: 0.5062},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.6822, y: 0.4872, width: 0.043, height: 0.0355}}],
        maskNum: [3]
    },
    r016Acini: {
        panCoord: {x: 0.7127, y: 0.5062},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.6822, y: 0.4872, width: 0.043, height: 0.0355}}],
        maskNum: [5]
    },
    r017Acini: {
        panCoord: {x: 0.355, y: 0.6452},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.3303, y: 0.6282, width: 0.035, height: 0.0347}}],
        maskNum: [5]
    },
    r017Duct: {
        panCoord: {x: 0.355, y: 0.6452},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.3303, y: 0.6282, width: 0.035, height: 0.0347}}],
        maskNum: [3]
    },
    r018Acini: {
        panCoord: {x: 0.3522, y: 0.4545},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.3304, y: 0.4393, width: 0.037, height: 0.0336}}],
        maskNum: [5]
    },
    r018Duct: {
        panCoord: {x: 0.3522, y: 0.4545},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.3304, y: 0.4393, width: 0.037, height: 0.0336}}],
        maskNum: [3]
    },
    r019: {
        panCoord: {x: 0.2585, y: 0.5937},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.2291, y: 0.5786, width: 0.037, height: 0.0355}}],
        maskNum: [6]
    },
    r020: {
        panCoord: {x: 0.481, y: 0.6211},
        zoomRatio: 7.9288,
        ROIBox: [{overlay: {x: 0.4614, y: 0.604, width: 0.037, height: 0.0355}}],
        maskNum: [6]
    },
    r021: {
        panCoord: {x: 0.336, y: 0.7258},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.3062, y: 0.7061, width: 0.038, height: 0.0365}}],
        maskNum: [6]
    },
    r022: {
        panCoord: {x: 0.4734, y: 0.4669},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.4533, y: 0.4488, width: 0.035, height: 0.0318}}],
        maskNum: [6]
    },
    r023: {
        panCoord: {x: 0.6141, y: 0.2222},
        zoomRatio: 9.4378,
        ROIBox: [{overlay: {x: 0.5879, y: 0.2057, width: 0.037, height: 0.0355}}],
        maskNum: [6]
    },
    r024: {
        panCoord: {x: 0.2243, y: 0.6477},
        zoomRatio: 6.6073,
        ROIBox: [{overlay: {x: 0.1994, y: 0.6333, width: 0.038, height: 0.0354}}],
        maskNum: [6]
    }
}

const largePancreas ={
    type: 'rect',
    id: 'pancreasSlide',
    x: 182,
    y: 160,
    width: 40,
    height: 40,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '1',
    eventTypes: ['panZoom'],
    panCoord:{x: 0.5, y: 0.5},
    zoomRatio: 0.6128,
    ROIBox: [{overlay: {x: 0.1345, y: 0.0899, width: 0.731, height: 0.7891}}],
}

const medPancreas ={
    type: 'rect',
    id: 'pancreasSlide',
    x: 158,
    y: 127,
    width: 35,
    height: 35,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '1',
    eventTypes: ['panZoom'],
    panCoord:{x: 0.5, y: 0.5},
    zoomRatio: 0.6128,
    ROIBox: [{overlay: {x: 0.1345, y: 0.0899, width: 0.731, height: 0.7891}}],
}

const smallPancreas ={
    type: 'rect',
    id: 'pancreasSlide',
    x: 70,
    y: 57,
    width: 17,
    height: 17,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '1',
    eventTypes: ['panZoom'],
    panCoord:{x: 0.5, y: 0.5},
    zoomRatio: 0.6128,
    ROIBox: [{overlay: {x: 0.1345, y: 0.0899, width: 0.731, height: 0.7891}}],
}

const largeVPlotAlpha ={
    type: 'rect',
    id: 'corGlomSvg',
    x: 32,
    y: 5,
    width: 129,
    height: 253,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '1',
    eventTypes: ['addMask'],
    maskNum: [1]
}

const largeVPlotBeta ={
    type: 'rect',
    id: 'corGlomSvg',
    x: 231,
    y: 5,
    width: 110,
    height: 253,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '1',
    eventTypes: ['addMask'],
    maskNum: [2]
}

const medVPlotAlpha ={
    type: 'rect',
    id: 'corGlomSvg',
    x: 27,
    y: 15,
    width: 123,
    height: 240,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '1',
    eventTypes: ['addMask'],
    maskNum: [3]
}

const medVPlotBeta ={
    type: 'rect',
    id: 'corGlomSvg',
    x: 217,
    y: 15,
    width: 103,
    height: 240,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '1',
    eventTypes: ['addMask'],
    maskNum: [6]
}

const smallVPlotAlpha ={
    type: 'rect',
    id: 'corGlomSvg',
    x: 15,
    y: 3,
    width: 56,
    height: 110,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '.75',
    eventTypes: ['addMask'],
    maskNum: [3]
}

const smallVPlotBeta ={
    type: 'rect',
    id: 'corGlomSvg',
    x: 103,
    y: 3,
    width: 48,
    height: 110,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '.75',
    eventTypes: ['addMask'],
    maskNum: [6]
}



function buildWaypointCartoon(waypointNum, storyNum, windowInnerWidth, domElement, osd, finish_waypoint) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const showdown_text = new showdown.Converter({tables: true});

    if (waypointNum === 0 && storyNum === 0){
        // remove the home button
        document.querySelector('.minerva-home-button').style.display = 'none';

        // insert the logo
        const logoDiv = document.createElement('div');
        logoDiv.id = 'logoDiv'
        const logo = document.createElement('img');
        logo.id = 'logo'
        logo.src = 'img/SOA_logo.png'
        logoDiv.appendChild(logo)
        domElement.appendChild(logoDiv);
         // insert the text
         const tocTextDiv = document.createElement('div');
         tocTextDiv.id = 'tocText'
         const tocText = "Welcome to the [**Spatial Organ Atlas (SOA)**](https://www.nanostring.com/spatial-organ-atlas) Pancreas Demonstration.\n\nThe SOA is a database for spatial profiles of non-diseased tissues from human and mouse generated with the GeoMx® Digital Spatial Profiler. All the data in the SOA is downloadable, including [**this pancreas sample (#001)**](https://www.nanostring.com/products/geomx-digital-spatial-profiler/spatial-organ-atlas/human-pancreas/).\
         \n\nUsing [**Minerva**](https://github.com/labsyspharm/minerva-story/wiki), we will show you how the imaging and molecular data combine to give you a comprehensive profile of the tissue architecture and biology.\n\nClick around to explore on your own.\n\nHints:\n* Zoom and pan the image via the mouse/trackpad.\n* Open and close the left- and right-hand menus\
          by clicking on < or >.\n* See results in the left-hand menu and click on the selectable regions to zoom to the featured area of the tissue.\n* Turn channels on and off with the right-hand menu."
         tocTextDiv.innerHTML = showdown_text.makeHtml(tocText)
         document.querySelector('.minerva-story-container').appendChild(tocTextDiv)
    }

    if (waypointNum === 0 && storyNum === 1 && windowInnerWidth >= scrnWBps[2]) {
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'largeSvgContainer', 'img/pancreas.png', [largePancreas], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = `Hint:   
        Select the nuclei channel to easily see all ROIs.`
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
      }
    else if (waypointNum === 0 && storyNum === 1 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]){
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'mediumSvgContainer', 'img/pancreas.png', [medPancreas], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = `Hint:   
        Select the nuclei layer to easily see all ROI.`
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
    }
    else if (waypointNum === 0 && storyNum === 1 && windowInnerWidth < scrnWBps[1]){
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'smallSvgContainer', 'img/pancreas.png', [smallPancreas], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = `Hint:   
        Select the nuclei layer to easily see all ROI.`
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
    }

    else if (waypointNum === 1 && storyNum === 1){
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/pancreasDetail.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'substructures'
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            const alpha = doc.querySelector('#alpha');
            addEListener(osd, allROIs.r006Alpha, alpha, ['addMask', 'panZoom'], storyNum, waypointNum);
            const beta = doc.querySelector('#beta');
            addEListener(osd, allROIs.r006Beta, beta, ['addMask', 'panZoom'], storyNum, waypointNum);
            const duct = doc.querySelector('#duct');
            addEListener(osd, allROIs.r016Duct, duct, ['addMask', 'panZoom'], storyNum, waypointNum);
            const islet = doc.querySelector('#islet');
            addEListener(osd, allROIs.r010, islet, ['addMask', 'panZoom'], storyNum, waypointNum);
            const acini = doc.querySelector('#acini');
            addEListener(osd, allROIs.r016Acini, acini, ['addMask', 'panZoom'], storyNum, waypointNum);
            const aciniDuct = doc.querySelector('#aciniDuct');
            addEListener(osd, allROIs.r023, aciniDuct, ['addMask', 'panZoom'], storyNum, waypointNum);
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);
        const hintText = "Hints:\n* Toggle the different channels to easily see all ROI.\n* Select Alpha cell on the diagram above, then toggle between Alpha Cell Enriched and Beta Cell Enriched to see the segmentation possible with GeoMx DSP. Toggling between Insulin, Glucagon, and All markers channels will aid in visualizing.\n* Select Acinar cells on diagram above, then toggle between the Acini cells and Duct data layers to see the segmentation possible with GeoMx DSP. Toggling between PanCK and All markers channels will aid in visualizing."
        const hintId = 'hintText';
        addHintText(hintText, hintId, showdown_text);
    }

    else if (waypointNum === 2 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/LOQPlot.svg';
        svgContainer.type = 'image/svg+xml';
        svgContainer.id = 'plotSvg';
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            const acini = doc.querySelector('#acini');
            acini.addEventListener('click', () => addMask(osd, [5]));
            const islet = doc.querySelector('#islet');
            islet.addEventListener('click', () => addMask(osd, [4]));
            const aciniDuct = doc.querySelector('#aciniDuct');
            aciniDuct.addEventListener('click', () => addMask(osd, [6]));
            const duct = doc.querySelector('#duct');
            duct.addEventListener('click', () => addMask(osd, [3]));
            const beta = doc.querySelector('#beta');
            beta.addEventListener('click', () => addMask(osd, [2]));
            const alpha = doc.querySelector('#alpha');
            alpha.addEventListener('click', () => addMask(osd, [1]));
            Object.entries(allROIs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el){
                   addEListener(osd, val, el, ['addMask', 'panZoom'], storyNum, waypointNum); 
                }
            });
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer)
        const hintText = `Hint:   
        Select a single data point to be taken to that ROI.`
        const hintId = 'hintText';
        addHintText(hintText, hintId, showdown_text);
    }

    else if (waypointNum === 3 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/cellDecon.svg';
        svgContainer.type = 'image/svg+xml';
        svgContainer.id = 'plotSvg';
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            const alpha = doc.querySelector('#alpha');
            alpha.addEventListener('click', () => addMask(osd, [1]));
            const beta = doc.querySelector('#beta');
            beta.addEventListener('click', () => addMask(osd, [2]));
            const duct = doc.querySelector('#duct');
            duct.addEventListener('click', () => addMask(osd, [3]));
            const islet = doc.querySelector('#islet');
            islet.addEventListener('click', () => addMask(osd, [4]));
            const acini = doc.querySelector('#acini');
            acini.addEventListener('click', () => addMask(osd, [5]));
            const aciniDuct = doc.querySelector('#aciniDuct');
            aciniDuct.addEventListener('click', () => addMask(osd, [6]));
            Object.entries(allROIs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el){
                    addEListener(osd, val, el, ['addMask', 'panZoom'], storyNum, waypointNum)
                }
            })
            finish_waypoint('')
        };
        domElement.appendChild(svgContainer)
        const hintText = `Hint:   
        Select a single row of the figure to be taken to that ROI in the image.`
        const hintId = 'hintText';
        addHintText(hintText, hintId, showdown_text);
    }

    else if (waypointNum === 4 && storyNum === 1) {
        const svgLegend1 = document.createElement('object');
        svgLegend1.data = 'svg/maskTypeLegend.svg';
        svgLegend1.type = 'image/svg+xml';
        svgLegend1.id = 'legend1Svg';
        domElement.appendChild(svgLegend1)

        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/heatmap.svg';
        svgContainer.type = 'image/svg+xml';
        svgContainer.id = 'plotSvg';
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            Object.entries(allROIs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el){
                    addEListener(osd, val, el, ['addMask', 'panZoom'], storyNum, waypointNum)
                }
            })
            finish_waypoint('')
        };

        domElement.appendChild(svgContainer)

        //insert table that matches the heatmap pathways to their abbreviation below the heatmap in the waypoint.
        const tableDiv = document.createElement('div');
        tableDiv.id = 'pathwayTable'
        const table_showdown = new showdown.Converter({tables: true});
        const pathways = "| Abbr. | Full Gene Set Name |\n|---------|-----------------------------------------------------------|\n| 1 | Pancreatic secretion  |\n| 2 | AGE-RAGE signaling pathway in diabetic complications  |\n| 3 | Pancreatic cancer |\n| 4 | Type I diabetes mellitus |\n| 5 | RTK class II (Insulin receptor family) |\n| 6 | Insulin signaling pathway |\n| 7 | Insulin resistance |\n| 8 | Maturity onset diabetes of the young |\n| 9 | Glucagon |\n| 10 | Glucagon signaling pathway |\n| 11 | Endocrine and other factor-regulated calcium reabsorption |\n| 12 | Insulin secretion |\n| 13 | Type II diabetes mellitus |";
        const table_html = table_showdown.makeHtml(pathways)
        tableDiv.innerHTML = table_html
        domElement.appendChild(tableDiv)

        const hintText = `Hint:   
        Select a single column of the figure to be taken to that ROI in the image.`
        const hintId = 'hintText';
        addHintText(hintText, hintId, showdown_text);
    }

    else if (waypointNum === 5 && storyNum === 1 && windowInnerWidth >= scrnWBps[2]) {
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'largeVolcanoPlot', 'img/AlphaVsBetaCells.png', [largeVPlotAlpha, largeVPlotBeta], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = `Hint:   
        Select the regions on the graph with the genes that are differentially expressed (in yellow and orange) to see all the ROIs where they are more highly expressed. Turning on only the nuclei channel may help you see smaller ROIs.`
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
    }
    else if (waypointNum === 5 && storyNum === 1 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]) {
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'mediumVolcanoPlot', 'img/AlphaVsBetaCells.png', [medVPlotAlpha, medVPlotBeta], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = `Hint:   
        Select the regions on the graph with the genes that are differentially expressed (in yellow and orange) to see all the ROIs where they are more highly expressed. Turning on only the nuclei channel may help you see smaller ROIs.`
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
    }
    else if (waypointNum === 5 && storyNum === 1 && windowInnerWidth < scrnWBps[1]) {
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'smallVolcanoPlot', 'img/AlphaVsBetaCells.png', [smallVPlotAlpha, smallVPlotBeta], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = `Hint:   
        Select the regions on the graph with the genes that are differentially expressed (in yellow and orange) to see all the ROIs where they are more highly expressed. Turning on only the nuclei channel may help you see smaller ROIs.`
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);

    }
    else if (storyNum === 1 && (waypointNum === 6 || waypointNum === 7 || waypointNum === 8 || waypointNum === 9)) {
        const svgLegend1 = document.createElement('object');
        svgLegend1.data = 'svg/maskTypeLegend.svg';
        svgLegend1.type = 'image/svg+xml';
        svgLegend1.id = 'legend1Svg';
        domElement.appendChild(svgLegend1)

        const hintText = `Hint:   
        Select an individual point on the graph to be taken to that ROI in the image.`
        const hintId = 'hintText';
        addHintText(hintText, hintId, showdown_text);
    }

    else if (waypointNum === 0 && storyNum === 2){
        const lastpageTextDiv = document.createElement('div');
        lastpageTextDiv.id = 'lastPageText'
        const lastPageText = `For more information on NanoString GeoMx technology visit [**our website**](https://www.nanostring.com/products/geomx-digital-spatial-profiler/geomx-dsp-overview/).   
        \nDetails of the performance of WTA have been [**published**](https://doi.org/10.1101/2021.09.29.462442).   
        \Minerva is an open source software package that was developed by Laboratory of Systems Pharmacology at Harvard University and is available [**here**](https://github.com/labsyspharm/minerva-story/wiki).   
        We would like to thank Jeremy Muhlich and John Thomas Hoffer for assistance in enabling Minerva features to support the Spatial Organ Atlas.  
        \nSources:   
        Rashid R, Chen YA, Hoffer J, Muhlich JL, Lin JR, Krueger R, Pfister H, Mitchell R, Santagata S, and Sorger PK. Interpretative guides for interacting with tissue atlas and digital pathology data using the Minerva browser. BioRxiv. (2020) [https://doi.org/10.1101/2020.03.27.001834](https://doi.org/10.1101/2020.03.27.001834)
        \nHoffer J, Rashid R, Muhlich JL, Chen, YA, Russell D, Ruokonen J, Krueger R, Pfister H, Santagata S, Sorger PK. (2020). Minerva: a light-weight, narrative image browser for multiplexed tissue images. Journal of Open Source Software, 5(54), 2579, [https://doi.org/10.21105/joss.02579](https://doi.org/10.21105/joss.02579)
        \n\nIllustrations  by Dave Carlson/[CarlsonStockArt.com](https://www.carlsonstockart.com/)   
        \n\nFOR RESEARCH USE ONLY. Not for use in diagnostic procedures.`
        lastpageTextDiv.innerHTML = showdown_text.makeHtml(lastPageText);
        domElement.appendChild(lastpageTextDiv);
    }
};

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
    // Remove polygons and overlays when the waypoint is changed
    if (document.querySelector('[id^=ROIBox]')){
        const ROIBoxes = document.querySelectorAll('[id^=ROIBox]');
        ROIBoxes.forEach((box) => {
            osd.viewer.removeOverlay(box.id)  
            document.querySelector(`#${box.id}`).remove()
        });  
    }

    buildWaypointCartoon(waypointNum, storyNum, width, domElement, osd, finish_waypoint);
});




window.addEventListener('resize', function (e){
    const currW = e.target.window.innerWidth
    const oldW = e.target.window.waypointAttr.width
    if ((currW < scrnWBps[1] && oldW >= scrnWBps[1]) || (currW < scrnWBps[2] && oldW >= scrnWBps[2]) || (currW >= scrnWBps[2] && oldW < scrnWBps[2]) || (currW >= scrnWBps[1] && oldW < scrnWBps[1])) {
        const {waypointNum, storyNum, domElement, osd} = e.target.window.waypointAttr;
        const svgCont = ['#largeSvgContainer', '#mediumSvgContainer', '#smallSvgContainer', '#largeVolcanoPlot', '#mediumVolcanoPlot', '#smallVolcanoPlot', '#hintTextRemove'];
        svgCont.forEach((id) => {
            if (document.querySelector(id)) {
                document.querySelector(id).remove();
            }
        });
        // The waypoints that have images that need resizing via buildWaypointCartoon
        const waypointsToRebuild = [0, 5]
        // For this story, all storyNums, except the Table of Contents page, which doesn't need rebuilding, are 1
        waypointsToRebuild.forEach((waypoint) => {
            if (waypointNum === waypoint && storyNum === 1) {
                buildWaypointCartoon(waypointNum, storyNum, currW, domElement, osd);
            }
        });
    } 
    e.target.window.waypointAttr.width = currW
});


const css = `
#logoDiv {
    display: flex;
    align-items: center;
    justify-content: center;
}
#logoDiv img {
    width:50%;
}
@media (min-width: 1100px) {
    .minerva-root .minerva-sidebar-menu {
        width: 450px !important;
    }
    .minerva-root .minerva-sidebar-menu.toggled {
        margin-left: -420px !important;
    }
    .minerva-root .openseadragon-canvas {
        left: 100px !important;
    }
    #largeSvgContainer {
    position: relative;
    width: 380px;
    height: 350px;
    vertical-align: middle;
    margin: 0;
    overflow: hidden;
    }
    #largeSvgContainer svg {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
    }
    #largeSubstructureSvgContainer {
        position: relative;
        width: 380px;
        height: 550px;
        vertical-align: middle;
        margin: 0;
        overflow: hidden;
    }
    #largeSubstructureSvgContainer svg {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    #largeVolcanoPlot svg {
        width: 350px;
        height: 400px;
    }
}

@media (max-width: 1099px) {
    .minerva-root .openseadragon-canvas {
        left: 50px !important;
    }

    #mediumSvgContainer {
    position: relative;
    width: 330px;
    height: 280px;
    vertical-align: middle;
    margin: 0;
    overflow: hidden;
    }
    #mediumSvgContainer svg {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
    }
    #mediumSubstructureSvgContainer {
    position: relative;
    width: 310px;
    height: 510px;
    vertical-align: middle;
    margin: 0;
    overflow: hidden;
    }
    #mediumSubstructureSvgContainer svg {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
    }
    #mediumVolcanoPlot svg {
    width: 325px;
    height: 400px;
    }
}

@media (max-width: 674px) {
    .minerva-root .minerva-sidebar-menu {
        width: 200px !important;
    }
    .minerva-root .minerva-sidebar-menu.toggled {
        margin-left: -185px !important;
    }
    #smallSvgContainer {
    position: relative;
    width: 150px;
    height: 125px;
    vertical-align: middle;
    margin: 0;
    overflow: hidden;
    }
    #smallSvgContainer svg {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
    }
    #smallSubstructureSvgContainer {
    position: relative;
    width: 155px;
    height: 300px;
    vertical-align: middle;
    margin: 0;
    overflow: hidden;
    }
    #smallSubstructureSvgContainer svg {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
    }
    #smallVolcanoPlot svg {
    width: 155px;
    height: 175px;
    }
}
`;

export const story = {
    'css': css,
    // other story config
};

const styleElement = document.createElement('style');
styleElement.innerText = css;
document.head.appendChild(styleElement);