// Artwork and layer geometry from Lilli's Figma MAIN frame (3615 × 1080).
// Layers are ordered back to front; positions are relative to the artwork stack.
export interface IllustrationLayer {
  nodeId: string;
  src: string;
  imageWidth: number;
  imageHeight: number;
  fit: 'cover' | 'fill';
  // Figma's normalized frame-to-image crop transform: a, b, c, d, x, y.
  crop?: [number, number, number, number, number, number];
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IllustrationProject {
  id: string;
  slug: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  layers: IllustrationLayer[];
  animatedSrc?: string;
}

export const gallerySize = { width: 3615, height: 1080 };

export const illustrations: IllustrationProject[] = [
  {
    "id": "1:30",
    "slug": "editorial-illustration",
    "title": "Editorial Illustration for FINK",
    "x": 111.7595443725586,
    "y": 245.8424072265625,
    "width": 608.4805908203125,
    "height": 365.01220703125,
    "layers": [
      {
        "nodeId": "1:28",
        "src": "/illustrations/editorial-illustration-1.webp",
        "imageWidth": 1800,
        "imageHeight": 1013,
        "fit": "cover",
        "x": 32.0784912109375,
        "y": 40.78602600097656,
        "width": 576.402099609375,
        "height": 324.2261657714844
      },
      {
        "nodeId": "1:26",
        "src": "/illustrations/editorial-illustration-2.webp",
        "imageWidth": 1800,
        "imageHeight": 1013,
        "fit": "cover",
        "x": 16.586181640625,
        "y": 20.221298217773438,
        "width": 576.402099609375,
        "height": 324.2261657714844
      },
      {
        "nodeId": "1:27",
        "src": "/illustrations/editorial-illustration-3.webp",
        "imageWidth": 1800,
        "imageHeight": 1013,
        "fit": "cover",
        "x": 0,
        "y": 0,
        "width": 576.402099609375,
        "height": 324.2261657714844
      }
    ]
  },
  {
    "id": "1:31",
    "slug": "holiday-card",
    "title": "Holiday Card for Bauer Media Group",
    "x": 477.6299133300781,
    "y": 721.8570556640625,
    "width": 348.9893493652344,
    "height": 196.48101806640625,
    "layers": [
      {
        "nodeId": "1:31",
        "src": "/illustrations/holiday-card-1.webp",
        "imageWidth": 1000,
        "imageHeight": 563,
        "fit": "cover",
        "x": 0,
        "y": 0,
        "width": 348.9893493652344,
        "height": 196.48101806640625
      }
    ],
    "animatedSrc": "/illustrations/holiday-card-loop.gif"
  },
  {
    "id": "2:43",
    "slug": "poster-design",
    "title": "Poster Design",
    "x": 847.8562622070312,
    "y": 148.88687133789062,
    "width": 331.7833251953125,
    "height": 391.1131286621094,
    "layers": [
      {
        "nodeId": "2:39",
        "crop": [0.9999999403953552,0,0,0.9594489932060242,6.801860408245375e-9,-1.1102230246251565e-16],
        "src": "/illustrations/poster-design-1.webp",
        "imageWidth": 1197,
        "imageHeight": 1496,
        "fit": "fill",
        "x": 19.75534439086914,
        "y": 16.956987380981445,
        "width": 312.0279846191406,
        "height": 374.1561279296875
      },
      {
        "nodeId": "2:40",
        "src": "/illustrations/poster-design-2.webp",
        "imageWidth": 1800,
        "imageHeight": 2158,
        "fit": "cover",
        "x": 0,
        "y": 0,
        "width": 312.0279235839844,
        "height": 374.1561279296875
      }
    ]
  },
  {
    "id": "2:63",
    "slug": "famous-portraits",
    "title": "Famous Portraits",
    "x": 1003.8702392578125,
    "y": 570.6331176757812,
    "width": 322.96630859375,
    "height": 447.7213134765625,
    "layers": [
      {
        "nodeId": "2:62",
        "src": "/illustrations/famous-portraits-1.webp",
        "imageWidth": 1555,
        "imageHeight": 2200,
        "fit": "cover",
        "x": 12.983527183532715,
        "y": 9.245654106140137,
        "width": 309.9827880859375,
        "height": 438.47564697265625
      },
      {
        "nodeId": "2:60",
        "src": "/illustrations/famous-portraits-2.webp",
        "imageWidth": 1555,
        "imageHeight": 2200,
        "fit": "cover",
        "x": 0,
        "y": 0,
        "width": 308.6314392089844,
        "height": 436.6681823730469
      }
    ]
  },
  {
    "id": "2:52",
    "slug": "reportage-guilty-pleasure",
    "title": "Reportage: Guilty Pleasure",
    "x": 1322.4603271484375,
    "y": 116.487548828125,
    "width": 324.4578857421875,
    "height": 406.555419921875,
    "layers": [
      {
        "nodeId": "2:46",
        "src": "/illustrations/reportage-guilty-pleasure-1.webp",
        "imageWidth": 1555,
        "imageHeight": 2200,
        "fit": "cover",
        "x": 0,
        "y": 39.5727424621582,
        "width": 259.4404296875,
        "height": 366.982666015625
      },
      {
        "nodeId": "2:47",
        "src": "/illustrations/reportage-guilty-pleasure-2.webp",
        "imageWidth": 1555,
        "imageHeight": 2200,
        "fit": "cover",
        "x": 16.25432014465332,
        "y": 29.679582595825195,
        "width": 259.4404296875,
        "height": 366.982666015625
      },
      {
        "nodeId": "2:48",
        "src": "/illustrations/reportage-guilty-pleasure-3.webp",
        "imageWidth": 1555,
        "imageHeight": 2200,
        "fit": "cover",
        "x": 32.50864028930664,
        "y": 19.78639030456543,
        "width": 259.4404296875,
        "height": 366.982666015625
      },
      {
        "nodeId": "2:49",
        "src": "/illustrations/reportage-guilty-pleasure-4.webp",
        "imageWidth": 1555,
        "imageHeight": 2200,
        "fit": "cover",
        "x": 48.762962341308594,
        "y": 9.893198013305664,
        "width": 259.4404296875,
        "height": 366.982666015625
      },
      {
        "nodeId": "2:50",
        "src": "/illustrations/reportage-guilty-pleasure-5.webp",
        "imageWidth": 1555,
        "imageHeight": 2200,
        "fit": "cover",
        "x": 65.01744842529297,
        "y": 0,
        "width": 259.4404296875,
        "height": 366.982666015625
      }
    ]
  },
  {
    "id": "2:35",
    "slug": "lifestyle-illustration",
    "title": "Lifestyle Illustration",
    "x": 1517.197998046875,
    "y": 579.8787841796875,
    "width": 320.2203369140625,
    "height": 395.29510498046875,
    "layers": [
      {
        "nodeId": "1:33",
        "src": "/illustrations/lifestyle-illustration-1.webp",
        "imageWidth": 1080,
        "imageHeight": 1350,
        "fit": "cover",
        "x": 16.904342651367188,
        "y": 16.150102615356445,
        "width": 303.3160095214844,
        "height": 379.1449890136719
      },
      {
        "nodeId": "1:34",
        "crop": [1,0,0,0.8836942911148071,8.881784197001252e-16,3.8021866544113436e-8],
        "src": "/illustrations/lifestyle-illustration-2.webp",
        "imageWidth": 1555,
        "imageHeight": 2200,
        "fit": "fill",
        "x": 0,
        "y": 0,
        "width": 303.3160705566406,
        "height": 379.1450500488281
      }
    ]
  },
  {
    "id": "2:56",
    "slug": "riso-prints",
    "title": "Riso Prints",
    "x": 1878.7786865234375,
    "y": 197.54373168945312,
    "width": 238.6485595703125,
    "height": 302.9373779296875,
    "layers": [
      {
        "nodeId": "2:53",
        "src": "/illustrations/riso-prints-1.webp",
        "imageWidth": 1131,
        "imageHeight": 1600,
        "fit": "cover",
        "x": 44.551273345947266,
        "y": -0.0000025468430067121517,
        "width": 194.0972900390625,
        "height": 274.58502197265625
      },
      {
        "nodeId": "2:54",
        "src": "/illustrations/riso-prints-2.webp",
        "imageWidth": 1131,
        "imageHeight": 1600,
        "fit": "cover",
        "x": 22.27556800842285,
        "y": 14.17618465423584,
        "width": 194.0972900390625,
        "height": 274.58502197265625
      },
      {
        "nodeId": "2:55",
        "src": "/illustrations/riso-prints-3.webp",
        "imageWidth": 1131,
        "imageHeight": 1600,
        "fit": "cover",
        "x": 0,
        "y": 28.352352142333984,
        "width": 194.0972900390625,
        "height": 274.58502197265625
      }
    ]
  },
  {
    "id": "2:38",
    "slug": "analogue-portraits",
    "title": "Analog Portrait Paintings",
    "x": 1975.827392578125,
    "y": 579.8787841796875,
    "width": 286.9670715332031,
    "height": 361.42987060546875,
    "layers": [
      {
        "nodeId": "2:36",
        "src": "/illustrations/analogue-portraits-1-upright.webp",
        "imageWidth": 1598,
        "imageHeight": 2200,
        "fit": "cover",
        "x": 29.688846588134766,
        "y": 7.293941974639893,
        "width": 257.2782287597656,
        "height": 354.13592529296875
      },
      {
        "nodeId": "2:37",
        "src": "/illustrations/analogue-portraits-2.webp",
        "imageWidth": 1571,
        "imageHeight": 2200,
        "fit": "cover",
        "x": -0.000049591064453125,
        "y": 0,
        "width": 252.872802734375,
        "height": 354.1083679199219
      }
    ]
  },
  {
    "id": "2:57",
    "slug": "screen-print-portrait",
    "title": "Screen Printing Portrait",
    "x": 2379.97216796875,
    "y": 126.38074493408203,
    "width": 491.6387023925781,
    "height": 614.4993896484375,
    "layers": [
      {
        "nodeId": "2:57",
        "src": "/illustrations/screen-print-portrait-1.webp",
        "imageWidth": 1760,
        "imageHeight": 2200,
        "fit": "cover",
        "x": 0,
        "y": 0,
        "width": 491.6387023925781,
        "height": 614.4993896484375
      }
    ]
  },
  {
    "id": "2:58",
    "slug": "sketchbook",
    "title": "Sketchbook",
    "x": 2988.788818359375,
    "y": 629.62353515625,
    "width": 276.3365783691406,
    "height": 319.70849609375,
    "layers": [
      {
        "nodeId": "2:58",
        "crop": [0.7531045079231262,-0.010584513656795025,0.016327716410160065,0.653480052947998,0.009867139160633087,0.16064155101776123],
        "src": "/illustrations/sketchbook-1.webp",
        "imageWidth": 1500,
        "imageHeight": 2000,
        "fit": "fill",
        "x": 0,
        "y": 0,
        "width": 276.3365783691406,
        "height": 319.70849609375
      }
    ]
  }
];
