# Visualize your array changed history

It compares changed history between two arrays.  
It is wriiten in vanilla script so that you use it in any other UI framework and the browser.

~[Image](https://postfiles.pstatic.net/MjAyMjAxMTFfMjA0/MDAxNjQxODgyMjg3MjI0.DxHPK4nGZEGL09HnRVrJdI9T7dWG7YVJoLca9-ZBgrog.doVPVHJ67v7KCZ9h1gbeE6M60bP8B-UTEvYGyLPX6YUg.PNG.mansoo1500/devnology.png?type=w580)  

# Installation
```
npm install visualized-array-compare
```

or

```
yarn add visualized-array-compare
```

### Usage
```
import VisualizedArrayCompare from 'visualized-array-compare';
```

when after mounted
```js
const prev = [ "a", "b", "c", "d", "e" ];
const current = [ "a", "b", "c", "d", "e" ];
const container = document.querySelector('#array-compare-canvas');
const options = {
  lineWidth: 1,
  fillArrow: true,
  arrowStart: false,
  arrowEnd: true
};
const visualizedArrayCompare = new VisualizedArrayCompare({ canvas: container, prev, current, options });
const visualizedArrayCompare.draw();

this.visualizedArrayCompare = visualizedArrayCompare; // In order to redraw
```

in order to redraw
```
this.visualizedArrayCompare.options.arrowStart = true;
this.visualizedArrayCompare.redraw();
```
