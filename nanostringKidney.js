const slideMedulla = require('./slideMedulla.json');
const slideCortex = require('./slideCortex.json');
import * as d3 from "d3"
import { addMask, addEListener, buildCartoonImage, addHintText} from './nanostringUtils';

// Breakpoints for when to resize the cartoon image and subsequently redraw the corresponding SVGs
// Align with CSS breakpoints (or TO DO: set description box width dynamically with JavaScript)
const scrnWBps = [0, 675, 1100]

// ROI coordinates
const allROIs = 
    {r001: {
        panCoord: {x: 0.4086, y: 0.4338},
        zoomRatio: 28.7133,
        ROIBox: [{overlay: {x: 0.4056, y: 0.429, width: 0.0085, height: 0.0077}}],
        maskNum: [3]
    },
    r002: {
        panCoord: {x: 0.3698, y: 0.271},
        zoomRatio: 38.3376,
        ROIBox: [{overlay: {x: 0.3673, y: 0.2665, width: 0.008, height: 0.008}}],
        maskNum: [3]
    },
    r003: {
        panCoord: {x: 0.3988, y: 0.362},
        zoomRatio: 26.8993,
        ROIBox: [{overlay: {x: 0.3942, y: 0.3567, width: 0.008, height: 0.0088}}],
        maskNum: [3]
    },
    r004: {
        panCoord: {x: 0.3991, y: 0.572},
        zoomRatio: 29.3777,
        ROIBox: [{overlay: {x: 0.3961, y: 0.5668, width: 0.009, height: 0.0089}}],
        maskNum: [3]
    },
    r005: {
        panCoord: {x: 0.3959, y: 0.5238},
        zoomRatio: 20.6127,
        ROIBox: [{overlay: {x: 0.3946, y: 0.5179, width: 0.008, height: 0.008}}],
        maskNum: [3]
    },
    r006: {
        panCoord: {x: 0.3736, y: 0.6929},
        zoomRatio: 20.6127,
        ROIBox: [{overlay: {x: 0.3693, y: 0.6877, width: 0.009, height: 0.0105}}],
        maskNum: [3]
    },
    r011: {
        panCoord: {x: 0.3943, y: 0.3033},
        zoomRatio: 17.1773,
        ROIBox: [{overlay: {x: 0.385, y: 0.2935, width: 0.019, height: 0.0254}}],
        maskNum: [3]
    },
    r012: {
        panCoord: {x: 0.3433, y: 0.1979},
        zoomRatio: 14.3144,
        ROIBox: [{overlay: {x: 0.3314, y: 0.1871, width: 0.021, height: 0.0166}}],
        maskNum: [3]
    },
    r014: {
        panCoord: {x: 0.3412, y: 0.1624},
        zoomRatio: 20.6128,
        ROIBox: [{overlay: {x: 0.3303, y: 0.1519, width: 0.019, height: 0.0214}}],
        maskNum: [3]
    },
    r015: {
        panCoord: {x: 0.3183, y: 0.1757},
        zoomRatio: 11.9287,
        ROIBox: [{overlay: {x: 0.3046, y: 0.1645, width: 0.023, height: 0.0217}}],
        maskNum: [3]
    },
    r016: {
        panCoord: {x: 0.3769, y: 0.3061},
        zoomRatio: 14.3144,
        ROIBox: [{overlay: {x: 0.3647, y: 0.2945, width: 0.024, height: 0.0255}}],
        maskNum: [3]
    },
    r018: {
        panCoord: {x: 0.3525, y: 0.6435},
        zoomRatio: 14.3144,
        ROIBox: [{overlay: {x: 0.34, y: 0.6306, width: 0.021, height: 0.0263}}],
        maskNum: [3]
    },
    r021: {
        panCoord: {x: 0.3099, y: 0.3611},
        zoomRatio: 12.8392,
        ROIBox: [{overlay: {x: 0.2946, y: 0.3499, width: 0.028, height: 0.0154}}],
        maskNum: [6]
    },
    r022: {
        panCoord: {x: 0.2691, y: 0.2307},
        zoomRatio: 12.8392,
        ROIBox: [{overlay: {x: 0.2555, y: 0.2155, width: 0.021, height: 0.0225}}],
        maskNum: [6]
    },
    r024: {
        panCoord: {x: 0.3071, y: 0.542},
        zoomRatio: 18.4884,
        ROIBox: [{overlay: {x: 0.3024, y: 0.5324, width: 0.01, height: 0.0172}}],
        maskNum: [6]
    },
    r028: {
        panCoord: {x: 0.1638, y: 0.6154},
        zoomRatio: 22.1861,
        ROIBox: [{overlay: {x: 0.1574, y: 0.61, width: 0.01, height: 0.0087}}],
        maskNum: [6]
    },
    r029: {
        panCoord: {x: 0.0982, y: 0.6192},
        zoomRatio: 18.4885,
        ROIBox: [{overlay: {x: 0.0938, y: 0.6121, width: 0.01, height: 0.0097}}],
        maskNum: [6]
    },
    r030: {
        panCoord: {x: 0.0795, y: 0.6121},
        zoomRatio: 18.4884,
        ROIBox: [{overlay: {x: 0.0756, y: 0.6047, width: 0.01, height: 0.0086}}],
        maskNum: [6]
    },
    r031: {
        panCoord: {x: 0.2565, y: 0.5855},
        zoomRatio: 22.1862,
        ROIBox: [{overlay: {x: 0.2489, y: 0.5804, width: 0.011, height: 0.0087}}],
        maskNum: [6]
    },
    r032: {
        panCoord: {x: 0.3115, y: 0.5631},
        zoomRatio: 15.4071,
        ROIBox: [{overlay: {x: 0.2978, y: 0.5536, width: 0.0284, height: 0.0173}}],
        maskNum: [6]
    },
    r033: {
        panCoord: {x: 0.2695, y: 0.348},
        zoomRatio: 15.4071,
        ROIBox: [{overlay: {x: 0.2598, y: 0.3365, width: 0.018, height: 0.0173}}],
        maskNum: [6]
    },
    r034: {
        panCoord: {x: 0.2765, y: 0.3176},
        zoomRatio: 18.4885,
        ROIBox: [{overlay: {x: 0.2696, y: 0.3109, width: 0.01, height: 0.0107}}],
        maskNum: [6]
    },
    r035: {
        panCoord: {x: 0.2358, y: 0.3005},
        zoomRatio: 22.1862,
        ROIBox: [{overlay: {x: 0.2304, y: 0.2946, width: 0.008, height: 0.0075}}],
        maskNum: [6]
    },
    r036: {
        panCoord: {x: 0.1732, y: 0.6612},
        zoomRatio: 18.4885,
        ROIBox: [{overlay: {x: 0.1624, y: 0.6517, width: 0.018, height: 0.0159}}],
        maskNum: [6]
    },
    r055: {
        panCoord: {x: 0.2312, y: 0.5238},
        zoomRatio: 12.8392,
        ROIBox: [{overlay: {x: 0.2154, y: 0.5079, width: 0.027, height: 0.0315}}],
        maskNum: [1]
    },
    r056: {
        panCoord: {x: 0.2156, y: 0.3925},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.2008, y: 0.3764, width: 0.031, height: 0.0312}}],
        maskNum: [1]
    },
    r057: {
        panCoord: {x: 0.0898, y: 0.5291},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.073, y: 0.5112, width: 0.027, height: 0.0318}}],
        maskNum: [1]
    },
    r058: {
        panCoord: {x: 0.2384, y: 0.4912},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.2189, y: 0.4724, width: 0.026, height: 0.031}}],
        maskNum: [1]
    },
    r059: {
        panCoord: {x: 0.1895, y: 0.2892},
        zoomRatio: 8.9161,
        ROIBox: [{overlay: {x: 0.1684, y: 0.2699, width: 0.027, height: 0.0305}}],
        maskNum: [1]
    },
    r060: {
        panCoord: {x: 0.1874, y: 0.2095},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.1705, y: 0.1931, width: 0.0321, height: 0.0317}}],
        maskNum: [1]
    },
    r007: {
        panCoord: {x: 0.3449, y: 0.6931},
        zoomRatio: 15.4069,
        ROIBox: [{overlay: {x: 0.3357, y: 0.6807, width: 0.019, height: 0.0232}}],
        maskNum: [2]
    },
    r008: {
        panCoord: {x: 0.3734, y: 0.6164},
        zoomRatio: 12.8391,
        ROIBox: [{overlay: {x: 0.3598, y: 0.6027, width: 0.027, height: 0.0241}}],
        maskNum: [2]
    },
    r009: {
        panCoord: {x: 0.3877, y: 0.4701},
        zoomRatio: 12.8391,
        ROIBox: [{overlay: {x: 0.3741, y: 0.4552, width: 0.029, height: 0.028}}],
        maskNum: [2]
    },
    r010: {
        panCoord: {x: 0.379, y: 0.4412},
        zoomRatio: 12.8391,
        ROIBox: [{overlay: {x: 0.3637, y: 0.4324, width: 0.027, height: 0.0143}}],
        maskNum: [2]
    },
    r013: {
        panCoord: {x: 0.3399, y: 0.2463},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.3271, y: 0.2311, width: 0.024, height: 0.0248}}],
        maskNum: [2]
    },
    r017: {
        panCoord: {x: 0.4162, y: 0.3814},
        zoomRatio: 12.8392,
        ROIBox: [{overlay: {x: 0.4001, y: 0.372, width: 0.026, height: 0.0199}}],
        maskNum: [2]
    },
    r043: {
        panCoord: {x: 0.3285, y: 0.1621},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.3155, y: 0.1489, width: 0.0231, height: 0.0244}}],
        maskNum: [4]
    },
    r044: {
        panCoord:  {x: 0.4145, y: 0.4864},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.4011, y: 0.4759, width: 0.0321, height: 0.029}}],
        maskNum: [4]
    },
    r045: {
        panCoord: {x: 0.4295, y: 0.4459},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.4133, y: 0.4284, width: 0.0313, height: 0.0313}}],
        maskNum: [4]
    },
    r046: {
        panCoord: {x: 0.3321, y: 0.2974},
        zoomRatio: 8.9161,
        ROIBox: [{overlay: {x: 0.3187, y: 0.2807, width: 0.0325, height: 0.0322}}],
        maskNum: [4]
    },
    r047: {
        panCoord: {x: 0.344, y: 0.3815},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.3283, y: 0.3662, width: 0.0321, height: 0.0306}}],
        maskNum: [4]
    },
    r048: {
        panCoord: {x: 0.4025, y: 0.6146},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.3928, y: 0.5993, width: 0.0308, height: 0.0307}}],
        maskNum: [4]
    },
    r019: {
        panCoord: {x: 0.2894, y: 0.5011},
        zoomRatio: 8.9161,
        ROIBox: [{overlay: {x: 0.2754, y: 0.4891, width: 0.027, height: 0.0226}}],
        maskNum: [5]
    },
    r020: {
        panCoord: {x: 0.2888, y: 0.3332},
        zoomRatio: 12.8392,
        ROIBox: [{overlay: {x: 0.2753, y: 0.3218, width: 0.024, height: 0.0221}}],
        maskNum: [5]
    },
    r023: {
        panCoord: {x: 0.108, y: 0.6487},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.0929, y: 0.6431, width: 0.026, height: 0.0138}}],
        maskNum: [5]
    },
    r025: {
        panCoord: {x: 0.3408, y: 0.5064},
        zoomRatio: 8.9161,
        ROIBox: [{overlay: {x: 0.3329, y: 0.4911, width: 0.018, height: 0.0293}}],
        maskNum: [5]
    },
    r026: {
        panCoord: {x: 0.3042, y: 0.3865},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.2871, y: 0.373, width: 0.027, height: 0.026}}],
        maskNum: [5]
    },
    r027: {
        panCoord: {x: 0.2822, y: 0.2895},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.2699, y: 0.274, width: 0.024, height: 0.0296}}],
        maskNum: [5]
    },
    r049: {
        panCoord: {x: 0.0789, y: 0.4513},
        zoomRatio: 10.6993,
        ROIBox: [{overlay: {x: 0.0614, y: 0.4353, width: 0.027, height: 0.0315}}],
        maskNum: [7]
    },
    r050: {
        panCoord: {x: 0.0843, y: 0.4796},
        zoomRatio: 8.9161,
        ROIBox: [{overlay: {x: 0.0681, y: 0.4669, width: 0.027, height: 0.0315}}],
        maskNum: [7]
    },
    r051: {
        panCoord: {x: 0.0886, y: 0.414},
        zoomRatio: 8.9161,
        ROIBox: [{overlay: {x: 0.071, y: 0.3958, width: 0.029, height: 0.0318}}],
        maskNum: [7]
    },
    r052: {
        panCoord: {x: 0.1158, y: 0.2595},
        zoomRatio: 12.3835,
        ROIBox: [{overlay: {x: 0.0998, y: 0.2438, width: 0.027, height: 0.0311}}],
        maskNum: [7]
    },
    r053: {
        panCoord: {x: 0.0722, y: 0.3048},
        zoomRatio: 10.3196,
        ROIBox: [{overlay: {x: 0.0566, y: 0.2907, width: 0.027, height: 0.0323}}],
        maskNum: [7]
    },
    r054: {
        panCoord: {x: 0.1095, y: 0.4946},
        zoomRatio: 10.3196,
        ROIBox: [{overlay: {x: 0.0972, y: 0.4788, width: 0.027, height: 0.0318}}],
        maskNum: [7]
    },
    r037: {
        panCoord: {x: 0.2669, y: 0.6152},
        zoomRatio: 10.3196,
        ROIBox: [{overlay: {x: 0.2513, y: 0.6011, width: 0.026, height: 0.0258}}],
        maskNum: [8]
    },
    r038: {
        panCoord: {x: 0.2853, y: 0.6512},
        zoomRatio: 10.3196,
        ROIBox: [{overlay: {x: 0.2714, y: 0.637, width: 0.0312, height: 0.0317}}],
        maskNum: [8]
    },
    r039: {
        panCoord: {x: 0.2567, y: 0.6588},
        zoomRatio: 10.3196,
        ROIBox: [{overlay: {x: 0.2426, y: 0.6502, width: 0.028, height: 0.0219}}],
        maskNum: [8]
    },
    r040: {
        panCoord: {x: 0.3269, y: 0.2029},
        zoomRatio: 8.5997,
        ROIBox: [{overlay: {x: 0.3094, y: 0.1851, width: 0.025, height: 0.0256}}],
        maskNum: [8]
    },
    r041: {
        panCoord: {x: 0.3132, y: 0.2196},
        zoomRatio: 14.3333,
        ROIBox: [{overlay: {x: 0.3019, y: 0.2095, width: 0.025, height: 0.0258},
                storyNum:1, waypointNum: 1}],
        maskNum: [8]
    },
    r042: {
        panCoord: {x: 0.3531, y: 0.2351},
        zoomRatio: 10.3196,
        ROIBox: [{overlay: {x: 0.3458, y: 0.2272, width: 0.025, height: 0.016}}],
        maskNum: [8]
    }
}

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
    ROIBox: [{overlay: {x: 0.2003, y: 0.3763, width: 0.028, height: 0.0316}}],
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
    ROIBox: [{overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301}}],
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
    ROIBox: [{overlay: {x: 0.3019, y: 0.2095, width: 0.025, height: 0.0258}}],
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
    ROIBox: [{overlay: {x: 0.0666, y: 0.4669, width: 0.029, height: 0.0325}}],
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
    panCoord: {x: 0.1646, y: 0.6141},
    zoomRatio: 19.9398,
    ROIBox: [{overlay: {x: 0.1579, y: 0.6106, width: 0.0084, height: 0.008}}],
    maskNum: [6]
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
    panCoord: {x: 0.2855, y: 0.3292},
    zoomRatio: 14.6104,
    ROIBox: [{overlay: { x: 0.275, y: 0.3217, width: 0.0235, height: 0.0224}}],
    maskNum: [5]
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
    ROIBox: [{overlay: {x: 0.2003, y: 0.3763, width: 0.028, height: 0.0316}}],
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
    ROIBox: [{overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301}}],
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
    ROIBox: [{overlay: {x: 0.3019, y: 0.2095, width: 0.025, height: 0.0258}}],
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
    ROIBox: [{overlay: {x: 0.0666, y: 0.4669, width: 0.029, height: 0.0325}}],
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
    panCoord: {x: 0.1646, y: 0.6141},
    zoomRatio: 19.9398,
    ROIBox: [{overlay: {x: 0.1579, y: 0.6106, width: 0.0084, height: 0.008}}],
    maskNum: [6]
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
    panCoord: {x: 0.2855, y: 0.3292},
    zoomRatio: 14.6104,
    ROIBox: [{overlay: { x: 0.275, y: 0.3217, width: 0.0235, height: 0.0224}}],
    maskNum: [5]
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
    ROIBox: [{overlay: {x: 0.2003, y: 0.3763, width: 0.028, height: 0.0316}}],
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
    ROIBox: [{overlay: {x: 0.3141, y: 0.2802, width: 0.0382, height: 0.0301}}],
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
    ROIBox: [{overlay: {x: 0.3019, y: 0.2095, width: 0.025, height: 0.0258}}],
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
    ROIBox: [{overlay: {x: 0.0666, y: 0.4669, width: 0.029, height: 0.0325}}],
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
    panCoord: {x: 0.1646, y: 0.6141},
    zoomRatio: 19.9398,
    ROIBox: [{overlay: {x: 0.1579, y: 0.6106, width: 0.0084, height: 0.008}}],
    maskNum: [6]
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
    panCoord: {x: 0.2855, y: 0.3292},
    zoomRatio: 14.6104,
    ROIBox: [{overlay: { x: 0.275, y: 0.3217, width: 0.0235, height: 0.0224}}],
    maskNum: [5]
}

const largeVPlotCor ={
    type: 'rect',
    id: 'corGlomSvg',
    x: 32,
    y: 5,
    width: 99,
    height: 211,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '1',
    eventTypes: ['addMask'],
    maskNum: [3]
}

const largeVPlotMed ={
    type: 'rect',
    id: 'corGlomSvg',
    x: 208,
    y: 5,
    width: 133,
    height: 211,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '1',
    eventTypes: ['addMask'],
    maskNum: [6]
}

const medVPlotCor ={
    type: 'rect',
    id: 'corGlomSvg',
    x: 27,
    y: 15,
    width: 93,
    height: 200,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '1',
    eventTypes: ['addMask'],
    maskNum: [3]
}

const medVPlotMed ={
    type: 'rect',
    id: 'corGlomSvg',
    x: 194,
    y: 15,
    width: 125,
    height: 200,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '1',
    eventTypes: ['addMask'],
    maskNum: [6]
}

const smallVPlotCor ={
    type: 'rect',
    id: 'corGlomSvg',
    x: 15,
    y: 3,
    width: 43,
    height: 92,
    fill: '#30B2DE00',
    stroke: 'red',
    strokeWidth: '.75',
    eventTypes: ['addMask'],
    maskNum: [3]
}

const smallVPlotMed ={
    type: 'rect',
    id: 'corGlomSvg',
    x: 93,
    y: 3,
    width: 58,
    height: 92,
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
        const tocText = "Welcome to the Spatial Organ Atlas (SOA) Kidney Demonstration.\n\nThe SOA is a database for spatial profiles of non-diseased tissues from human and mouse generated with the GeoMx® Digital Spatial Profiler.\nAll the data in the [**SOA is downloadable**](https://www.nanostring.com/spatial-organ-atlas), including this kidney sample (#001).\n\nUsing [**Minerva**](https://github.com/labsyspharm/minerva-story/wiki), we will show you how the imaging and molecular data combine to give you a comprehensive profile of the tissue architecture and biology.\
        \n\nClick around to explore on your own.\n\nHints:\n* Zoom and pan the image via the mouse/trackpad.\n* Open and close the left- and right-hand menus by clicking on < or >.\n* See results in the left-hand menu and click on the selectable regions to zoom to the featured area of the tissue.\n* Turn channels on and off with the right-hand menu."
        tocTextDiv.innerHTML = showdown_text.makeHtml(tocText)
        document.querySelector('.minerva-story-container').appendChild(tocTextDiv)
    }
    
    else if (waypointNum === 0 && storyNum === 1 && windowInnerWidth >= scrnWBps[2]) {
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'largeSvgContainer', 'img/finalKidney.jpeg', [largeSlideMedullaPath, largeCortexPath], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = `Hint:   
        Select the nuclei layer to easily see all ROIs.`
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
      }
    else if (waypointNum === 0 && storyNum === 1 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]){
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'mediumSvgContainer', 'img/finalKidney.jpeg', [mediumSlideMedullaPath, mediumCortexPath], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = `Hint:   
        Select the nuclei layer to easily see all ROI.`
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
    }
    else if (waypointNum === 0 && storyNum === 1 && windowInnerWidth < scrnWBps[1]){
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'smallSvgContainer', 'img/finalKidney.jpeg', [smallSlideMedullaPath, smallCortexPath], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = `Hint:   
        Select the nuclei layer to easily see all ROIs.`
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
    }

    else if (waypointNum === 1 && storyNum === 1 && windowInnerWidth >= scrnWBps[2]) {
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'largeSubstructureSvgContainer', 'img/kidneySubstructures.png', [largeCollDuctPath, largeDctEllipse, largePctEllipse, largeLoopHEllipse, largeGlomEllipse, largeFiltMemEllipse], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = "Hints:\n* Click a structure in the cartoon to see a representative ROI on the image.\n* Add a data layer to see all the corresponding ROIs on the image.\n* Toggle data layers and channels to see how compartments were selected."
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
    }
    else if (waypointNum === 1 && storyNum === 1 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]) {
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'mediumSubstructureSvgContainer', 'img/kidneySubstructures.png', [medCollDuctPath, medDctEllipse, medPctEllipse, medLoopHEllipse, medGlomEllipse, medFiltMemEllipse], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = "Hints:\n* Click a structure in the cartoon to see a representative ROI on the image.\n* Add a data layer to see all the corresponding ROIs on the image.\n* Toggle data layers and channels to see how compartments were selected."
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
    }
    else if (waypointNum === 1 && storyNum === 1 && windowInnerWidth < scrnWBps[1]) {
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'smallSubstructureSvgContainer', 'img/kidneySubstructures.png', [smallCollDuctPath, smallDctEll, smallPctEll, smallLoopHEll, smallGlomEll, smallFiltMemEll], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = "Hints:\n* Click a structure in the cartoon to see a representative ROI on the image.\n* Add a data layer to see all the corresponding ROIs on the image.\n* Toggle data layers and channels to see how compartments were selected."
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
    }

    else if (waypointNum === 2 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/GenesDetected.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'plotSvg'
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            const collDuct = doc.querySelector('#collDuct');
            collDuct.addEventListener('click', () => addMask(osd, [1]));
            const loop = doc.querySelector('#loop');
            loop.addEventListener('click', () => addMask(osd, [7]));
            const dct = doc.querySelector('#dct');
            dct.addEventListener('click', () => addMask(osd, [4]));
            const pct = doc.querySelector('#pct');
            pct.addEventListener('click', () => addMask(osd, [8]));
            const corGlom = doc.querySelector('#corGlom');
            corGlom.addEventListener('click', () => addMask(osd, [3]));
            const medGlom = doc.querySelector('#medGlom');
            medGlom.addEventListener('click', () => addMask(osd, [6]));
            const medFiltMem = doc.querySelector('#medFiltMem');
            medFiltMem.addEventListener('click', () => addMask(osd, [5]));
            const corFiltMem = doc.querySelector('#corFiltMem');
            corFiltMem.addEventListener('click', () => addMask(osd, [2]));
            Object.entries(allROIs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if(el){
                   addEListener(osd, val, el, ['addMask', 'panZoom'], storyNum, waypointNum) ;
                }
            });
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);
        const hintText = `Hint:   
        Select a data point to see the corresponding ROI.`
        const hintId = 'hintText';
        addHintText(hintText, hintId, showdown_text);
    }

    else if (waypointNum === 3 && storyNum === 1) {
        const svgLegend2 = document.createElement('object');
        svgLegend2.data = 'svg/maskType.svg';
        svgLegend2.type = 'image/svg+xml';
        svgLegend2.id = 'legend2Svg';
        svgLegend2.onload = function (){
            const doc = this.getSVGDocument();
            const collDuct = doc.querySelector('#collDuct');
            collDuct.addEventListener('click', () => addMask(osd, [1]));
            const loop = doc.querySelector('#loop');
            loop.addEventListener('click', () => addMask(osd, [7]));
            const dct = doc.querySelector('#dct');
            dct.addEventListener('click', () => addMask(osd, [4]));
            const pct = doc.querySelector('#pct');
            pct.addEventListener('click', () => addMask(osd, [8]));
            const corGlom = doc.querySelector('#corGlom');
            corGlom.addEventListener('click', () => addMask(osd, [3]));
            const medGlom = doc.querySelector('#medGlom');
            medGlom.addEventListener('click', () => addMask(osd, [6]));
            const medFiltMem = doc.querySelector('#medFiltMem');
            medFiltMem.addEventListener('click', () => addMask(osd, [5]));
            const corFiltMem = doc.querySelector('#corFiltMem');
            corFiltMem.addEventListener('click', () => addMask(osd, [2]));
            finish_waypoint('')
        };
        domElement.appendChild(svgLegend2);
        
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/cellTypeDeconPlot.svg';
        svgContainer.type = 'image/svg+xml';
        svgContainer.id = 'plotSvg';
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            const collDuct = doc.querySelector('#collDuctPlot');
            collDuct.addEventListener('click', () => addMask(osd, [1]));
            const loop = doc.querySelector('#loopPlot');
            loop.addEventListener('click', () => addMask(osd, [7]));
            const dct = doc.querySelector('#dctPlot');
            dct.addEventListener('click', () => addMask(osd, [4]));
            const pct = doc.querySelector('#pctPlot');
            pct.addEventListener('click', () => addMask(osd, [8]));
            const corGlom = doc.querySelector('#corGlomPlot');
            corGlom.addEventListener('click', () => addMask(osd, [3]));
            const medGlom = doc.querySelector('#medGlomPlot');
            medGlom.addEventListener('click', () => addMask(osd, [6]));
            const medFiltMem = doc.querySelector('#medFiltMemPlot');
            medFiltMem.addEventListener('click', () => addMask(osd, [5]));
            const corFiltMem = doc.querySelector('#corFiltMemPlot');
            corFiltMem.addEventListener('click', () => addMask(osd, [2]));
            Object.entries(allROIs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if(el){
                   addEListener(osd, val, el, ['addMask', 'panZoom'], storyNum, waypointNum) ;
                }
            });
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);
        
        const svgLegend1 = document.createElement('object');
        svgLegend1.data = 'svg/cellTypeDeconLegend1.svg';
        svgLegend1.type = 'image/svg+xml';
        svgLegend1.id = 'legend1Svg';
        domElement.appendChild(svgLegend1);

        const hintText = `Hint:   
        Select a single row of the figure to be taken to that ROI in the image.`
        const hintId = 'hintText';
        addHintText(hintText, hintId, showdown_text);
    }

    else if (waypointNum === 4 && storyNum === 1) {
        const svgLegend1 = document.createElement('object');
        svgLegend1.data = 'svg/heatmapLegend.svg';
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
                   addEListener(osd, val, el, ['addMask', 'panZoom'], storyNum, waypointNum); 
                }
            });
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);
        
        //insert table that matches the heatmap pathways to their abbreviation below the heatmap in the waypoint.
        const tableDiv = document.createElement('div');
        tableDiv.id = 'pathwayTable'
        const pathways = "| Abbr. | Full Gene Set Name |\n|:---------|:---------------------------------------------|\n| ABC| ABC transporters |\n|SLC13   | Human Na+-sulfate/carboxylate cotransporter|\n| SLC22| Organic cation/anion/zwitterion transporter|\n| OCT| Organic cation transporter (OCT) family|\n|SLC17| Vesicular glutamate transporter|\n| SLC5 | Sodium glucose cotransporter|\n| SLC36 | Proton-coupled amino acid transporter|\n| SLC2 | Facilitative GLUT transporter|\
        \n| SLC34 | Type II Na+-phosphate cotransporter |\n|SLC16| Monocarboxylate transporter|\n| SLC6 | Sodium- and chloride-dependent neurotransmitter transporter |\n| SLC23 | Na+-dependent ascorbic acid transporter|\n| SLC4 | Bicarbonate transporter |\n| SLC38| System A and System N sodium-coupled neutral amino acid transporter |\n| SLC42 | Rh ammonium transporter|\n| SLC21 | SLC21/ASLCO: Organic anion transporter |\n| SLC44 | Choline-like transporter|\n| SLC39 | Metal ion transporter";
        const table_html = showdown_text.makeHtml(pathways)
        tableDiv.innerHTML = table_html
        domElement.appendChild(tableDiv)

        const hintText = `Hint:   
        Select a single column of the figure to be taken to that ROI in the image.`
        const hintId = 'hintText';
        addHintText(hintText, hintId, showdown_text);
    }
    else if (waypointNum === 5 && storyNum === 1 && windowInnerWidth >= scrnWBps[2]) {
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'largeVolcanoPlot', 'img/corGlomVsMedGlom.png', [largeVPlotCor, largeVPlotMed], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = `Hint:   
        Select the regions on the graph with the genes that are differentially expressed (in blue) to see all the ROIs where they are more highly expressed. Turning on only the nuclei channel may help you see smaller ROIs.`
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
    }
    else if (waypointNum === 5 && storyNum === 1 && windowInnerWidth >= scrnWBps[1] && windowInnerWidth <= scrnWBps[2]) {
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'mediumVolcanoPlot', 'img/corGlomVsMedGlom.png', [medVPlotCor, medVPlotMed], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = `Hint:   
        Select the regions on the graph with the genes that are differentially expressed (in blue) to see all the ROIs where they are more highly expressed. Turning on only the nuclei channel may help you see smaller ROIs.`
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
    }
    else if (waypointNum === 5 && storyNum === 1 && windowInnerWidth < scrnWBps[1]) {
        const cartoonImgContainer = buildCartoonImage(osd, svgNS, 'smallVolcanoPlot', 'img/corGlomVsMedGlom.png', [smallVPlotCor, smallVPlotMed], storyNum, waypointNum)
        domElement.appendChild(cartoonImgContainer);
        const hintText = `Hint:   
        Select the regions on the graph with the genes that are differentially expressed (in blue) to see all the ROIs where they are more highly expressed. Turning on only the nuclei channel may help you see smaller ROIs.`
        const hintId = 'hintTextRemove';
        addHintText(hintText, hintId, showdown_text);
    }

    else if ((waypointNum === 6 || waypointNum === 7) && storyNum === 1) {
        const svgLegend1 = document.createElement('object');
        svgLegend1.data = 'svg/maskType.svg';
        svgLegend1.type = 'image/svg+xml';
        svgLegend1.id = 'legend1Svg';
        svgLegend1.onload = function (){
            const doc = this.getSVGDocument();
            const collDuct = doc.querySelector('#collDuct');
            collDuct.addEventListener('click', () => addMask(osd, [1]));
            const loop = doc.querySelector('#loop');
            loop.addEventListener('click', () => addMask(osd, [7]));
            const dct = doc.querySelector('#dct');
            dct.addEventListener('click', () => addMask(osd, [4]));
            const pct = doc.querySelector('#pct');
            pct.addEventListener('click', () => addMask(osd, [8]));
            const corGlom = doc.querySelector('#corGlom');
            corGlom.addEventListener('click', () => addMask(osd, [3]));
            const medGlom = doc.querySelector('#medGlom');
            medGlom.addEventListener('click', () => addMask(osd, [6]));
            const medFiltMem = doc.querySelector('#medFiltMem');
            medFiltMem.addEventListener('click', () => addMask(osd, [5]));
            const corFiltMem = doc.querySelector('#corFiltMem');
            corFiltMem.addEventListener('click', () => addMask(osd, [2]));
            finish_waypoint('')
        };

        domElement.appendChild(svgLegend1);
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
        \n\nKidney Illustrations: ©Dave Carlson/ [CarlsonStockArt.com](https://www.carlsonstockart.com/)   
        \n\nFOR RESEARCH USE ONLY. Not for use in diagnostic procedures.`
        lastpageTextDiv.innerHTML = showdown_text.makeHtml(lastPageText);
        domElement.appendChild(lastpageTextDiv);
    }
}

// Add cartoon image to a specific waypoint
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
    // Remove polygons and overlays when the waypoint is changed
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
    buildWaypointCartoon(waypointNum, storyNum, width, domElement, osd, finish_waypoint)
    }
);


window.addEventListener('resize', function (e){
    const currW = e.target.window.innerWidth
    const oldW = e.target.window.waypointAttr.width
    if ((currW < scrnWBps[1] && oldW >= scrnWBps[1]) || (currW < scrnWBps[2] && oldW >= scrnWBps[2]) || (currW >= scrnWBps[2] && oldW < scrnWBps[2]) || (currW >= scrnWBps[1] && oldW < scrnWBps[1])) {
        const {waypointNum, storyNum, domElement, osd} = e.target.window.waypointAttr;
        const svgCont = ['#largeSvgContainer', '#mediumSvgContainer', '#smallSvgContainer', '#largeSubstructureSvgContainer', '#mediumSubstructureSvgContainer', '#smallSubstructureSvgContainer',
    '#largeVolcanoPlot', '#mediumVolcanoPlot', '#smallVolcanoPlot', '#hintTextRemove']
    svgCont.forEach((id) => {
        if (document.querySelector(id)) {
            document.querySelector(id).remove();
        }
    });
        // The waypoints that have images that need resizing via buildWaypointCartoon
        const waypointsToRebuild = [0, 1, 5]
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
    height: 480px;
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
        width: 350px;
        height: 626px;
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
    height: 430px;
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
    height: 175px;
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