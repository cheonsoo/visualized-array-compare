function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
    throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

const DEFAULT_OPTIONS = {
  // Canvas Options
  container1Width: 300,
  container2Width: 200,
  container3Width: 300,
  canvasPadding: 20,
  elementGap: 20,
  rectWidth: 200,
  rectHeight: 30,
  margin: 20,

  // Line Options
  lineWidth: 1,
  lineStyle: 'RGBA(57, 150, 250, 1.00)',
  lineStyleStayed: '#000000',
  lineStyleMoved: 'RGBA(57, 150, 250, 1.00)',
  lineStyleAdded: 'green',
  lineStyleRemoved: 'red',

  // Arrow Options
  fillArrow: true,
  fillStyle: '#000000',
  arrowSize: 10,
  arrowStart: true,
  arrowEnd: true,

  // Graph Options
  showModuleMove: true,
  showGroupMove: false
};

function ModuleCompare({ id = "", prev = [], current = [], options = {} }) {
  this.id = id;
  this.container = null;
  this.ctx = null;
  this.options = {};
  this.prev = prev;
  this.current = current;
  this.prevModules = [];
  this.currentModules = [];
  this.data = [];
  this.options = { ...DEFAULT_OPTIONS, ...options };
  this.groups = [];

  this.initialize();
}

ModuleCompare.prototype.initialize = function() {
  this.container = document.querySelector(`${this.id}`);
  this.ctx = this.container.getContext('2d');

  this.ctx.imageSmoothingEnabled = true;
  this.ctx.lineWidth = 5;
  this.ctx.strokeStyle = "#3996FA";

  this.initData();

  const opt = this.options;
  const largestLength = this.prevModules.length >= this.currentModules.length ? this.prevModules.length : this.currentModules.length;
  const width = opt.margin + opt.container1Width + opt.container2Width + opt.container3Width + opt.margin;
  const height = (opt.elementGap + opt.rectHeight) * largestLength + opt.elementGap;
  this.container.setAttribute("width", width);
  this.container.setAttribute("height", height);

  this.container.addEventListener('click', (event) => {
    let p = this.ctx.getImageData(event.x, event.y, 1, 1).data;
    let hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

    if (hex === '#3996fa') {
      this.options.showModuleMove = false;
      this.options.showGroupMove = true;
      this.initialize();
      this.draw();
    }
  });
};

ModuleCompare.prototype.initOptions = function() {
  this.optionsContainer = document.querySelector('#options');
  this.optionsCtx = this.optionsContainer.getContext('2d');
};

ModuleCompare.prototype.draw = function() {
  this.drawPrevModules();
  this.drawCurrentModules();
  if (this.options.showModuleMove)
    this.drawChangedInfoArrow();
  if (this.options.showGroupMove)
    this.drawChangedGroupArrow();
};

ModuleCompare.prototype.redraw = function() {
  this.initialize();
  this.draw();
};

ModuleCompare.prototype.initData = function() {
  this.convertDataType();

  this.data = [];
  this.prevModules = this.prevModules.sort((a, b) => a.order - b.order).
    // filter(m => m.name !== 'ComponentGap' && m.name !== 'EmptyComponent').
    map((m, idx) => ({
    ...m,
    _id: `${m.name}_${idx}`,
    id: m.name,
    order: idx
  }));
  this.currentModules = this.currentModules.sort((a, b) => a.order - b.order).
  // filter(m => m.name !== 'ComponentGap' && m.name !== 'EmptyComponent').
  map((m, idx) => ({
    ...m,
    _id: `${m.name}_${idx}`,
    id: m.name,
    order: idx
  }));

  // Prev
  for (let i=0; i<this.prevModules.length; i++) {
    const item = this.prevModules[i];
    const module = new ModuleInfo({ id: item.id, name: item.name, order: item.order });
    this.data.push(module);
  }

  // Current
  for (let i=0; i<this.currentModules.length; i++) {
    const item = this.currentModules[i];
    const module = this.getModule(item.id);

    if (module) {
      module.to = item.order;
      if (module.order === module.to)
        module.flag = 'stayed';
      else
        module.flag = 'moved';
    } else {
      const newModule = new ModuleInfo({ id: item.id, name: item.name, to: item.order, flag: 'new' });
      this.data.push(newModule);
    }
  }

  const notFlagged = this.data.filter(m => m.flag === "");
  notFlagged.forEach(m => m.flag = 'removed');

  this.setGroups();
};

ModuleCompare.prototype.convertDataType = function() {
  const prevModules = this.prev.map((item, idx) => ({
    _id: `${item}_${idx}`,
    id: item,
    name: item,
    order: idx
  }));
  const currentModules = this.current.map((item, idx) => ({
    _id: `${item}_${idx}`,
    id: item,
    name: item,
    order: idx
  }));
  this.prevModules = prevModules;
  this.currentModules = currentModules;
};

ModuleCompare.prototype.setGroups = function() {
  const groups = [];
  let groupIdx = 1;
  for (let i=0; i<this.data.length; i++) {
    const group = [];
    let m1 = this.data[i];
    let diff1 = m1.order - m1.to;
    group.push(m1);
    m1.groupId = `group${groupIdx}`;

    for (let k=i+1; k<this.data.length; k++) {
      const m2 = this.data[k];
      const diff2 = m2.order - m2.to;
      if (Math.abs(m1.order - m2.order) === 1 && diff1 === diff2) {
        group.push(m2);
        m2.groupId = m1.groupId;
        m1 = m2;
      } else {
        i = k - 1;
        break;
      }
    }

    if (group.length > 1) {
      groups.push(group);
      groupIdx++;
    } else {
      group[0].groupId = '';
    }
  }
  this.groups = groups;
};

ModuleCompare.prototype.getModule = function(id) {
  return this.data.find(module => module.id === id);
};

ModuleCompare.prototype.drawModule = function(info) {
  if (info.flag === 'moved') {
    this.ctx.strokeStyle = this.options.lineStyleMoved;
  } else if (info.flag === 'removed') {
    this.ctx.strokeStyle = this.options.lineStyleRemoved;
  } else if (info.flag === 'new') {
    this.ctx.strokeStyle = this.options.lineStyleAdded;
  } else {
    this.ctx.strokeStyle = this.options.lineStyleStayed;
  }

  if (info.groupId)
    this.ctx.strokeStyle = this.options.lineStyleStayed;

  const opt = this.options;
  this.ctx.strokeRect(info.x, info.y, opt.container1Width, opt.rectHeight);

  this.ctx.font = '16px verdana';
  this.ctx.fillStyle = 'black';
  // this.ctx.fillStyle = 'black';
  this.ctx.fillText(info.name, info.x + 20, info.y + 20);
};

ModuleCompare.prototype.drawLine = function(from, to) {
  const self = this;

  function pointsToNormalisedVec(p, pp) {
    let len;
    const norm = {};
    norm.y = pp.x - p.x;
    norm.x = -(pp.y - p.y);
    len = Math.sqrt(norm.x * norm.x + norm.y * norm.y);
    norm.x /= len;
    norm.y /= len;
    return norm;
  }

  // Get specific coord in the Bezier curve
  // B(t) = (1 - t)^3*P0 + (3(1 - t)^2 * t * P1) + (3 * (1 - t) * t^2 * P2) + (t^3 * P3)
  // 0 <= t <= 1
  function getBezierCoord(p0, p1, p2, p3, t = 0) {
    const bx = (Math.pow((1 - t), 3) * p0.x) + (3 * Math.pow((1 - t), 2) * t * p1.x) + (3 * (1 - t) * Math.pow(t, 2) * p2.x) + (Math.pow(t, 3) * p3.x);
    const by = (Math.pow((1 - t), 3) * p0.y) + (3 * Math.pow((1 - t), 2) * t * p1.y) + (3 * (1 - t) * Math.pow(t, 2) * p2.y) + (Math.pow(t, 3) * p3.y);
    return { x: bx, y: by }
  }

  function drawArrow(vertex, t) {
    const arrowLength = self.options.arrowSize;
    const arrowWidth = arrowLength / 2;

    let bezierCoord = getBezierCoord(from, cp1, cp2, to, t);
    let norm = pointsToNormalisedVec(vertex, bezierCoord);

    const p1 = {
      x: vertex.x + (arrowWidth * norm.x - arrowLength * -norm.y),
      y: vertex.y + (arrowWidth * norm.y - arrowLength * norm.x)
    };
    const p2 = {
      x: vertex.x + (arrowWidth * -norm.x - arrowLength * -norm.y),
      y: vertex.y + (arrowWidth * -norm.y - arrowLength * norm.x)
    };
    self.ctx.beginPath();
    self.ctx.moveTo(p1.x, p1.y);
    self.ctx.lineTo(vertex.x, vertex.y);
    self.ctx.lineTo(p2.x, p2.y);
    if (self.options.fillArrow) {
      self.ctx.fillStyle = self.options.fillStyle;
      self.ctx.fill();
    }

    self.ctx.lineWidth = self.options.lineWidth;
    self.ctx.strokeStyle = self.options.lineStyle;
    self.ctx.stroke();
  }

  const cp1 = {
    x: (from.x + to.x) / 2,
    y: from.y
  };
  const cp2 = {
    x: (from.x + to.x) / 2,
    y: to.y
  };
  this.ctx.beginPath();
  this.ctx.moveTo(from.x, from.y); // From X, From Y
  this.ctx.bezierCurveTo(
    cp1.x, // Bezier Point 1 X
    cp1.y,// Bezier Point 1 Y
    cp2.x, // Bezier Point 2 X
    cp2.y, // Bezier Point 2 Y
    to.x, // To X
    to.y // To Y
  );
  this.ctx.strokeStyle = 'RGBA(57, 150, 250, 1.00)';
  this.ctx.stroke();

  // Draw Arrow
  if (this.options.arrowStart) {
    drawArrow(from, 0.03);
  }

  if (this.options.arrowEnd) {
    drawArrow(to, 0.97);
  }
};

ModuleCompare.prototype.drawPrevModules = function() {
  const opt = this.options;
  const prev = this.data.filter(m => m.flag !== 'new');
  prev.sort((a, b) => a.order - b.order);

  for (let i=0; i<prev.length; i++) {
    const module = prev[i];
    const x = opt.elementGap;
    const y = opt.elementGap + ((opt.rectHeight + opt.margin) * i);
    module.setXY(x, y);
    module.x1 = x;
    module.y1 = y;
    this.drawModule(module);
  }
};

ModuleCompare.prototype.drawCurrentModules = function() {
  const opt = this.options;
  const current = this.data.filter(item => item.flag !== 'removed');
  current.sort((a, b) => a.to - b.to);

  for (let i=0; i<current.length; i++) {
    const module = current[i];
    const x = opt.elementGap + opt.container1Width + opt.container2Width;
    const y = opt.elementGap + ((opt.rectHeight + opt.margin) * i);
    module.setXY(x, y);
    module.x2 = x;
    module.y2 = y;
    this.drawModule(module);
  }
};

ModuleCompare.prototype.drawChangedInfoArrow = function() {
  const opt = this.options;
  const changed = this.data.filter(item => item.flag === 'moved' || item.flag === 'removed');
  for (let i=0; i<changed.length; i++) {
    const module = changed[i];
    if (module.groupId)
      continue;

    const from = {
      x: opt.elementGap + opt.container1Width + opt.elementGap,
      y: (opt.elementGap + opt.rectHeight) * (module.order + 1) - (opt.rectHeight / 2)
    };
    const to = {
      x: opt.elementGap + opt.container1Width + opt.container2Width - opt.elementGap,
      y: (opt.elementGap + opt.rectHeight) * (module.to + 1) - (opt.rectHeight / 2)
    };
    if (module.flag === 'moved') {
      this.drawLine(from, to);
    }
  }
};

ModuleCompare.prototype.drawChangedGroupArrow = function() {
  const opt = this.options;
  this.ctx.strokeStyle = opt.lineStyle;
  this.ctx.lineWidth = opt.lineWidth;

  const drawGroupMove = (group) => {
    const m1 = group[0];
    const m2 = group[group.length - 1];
    const leftStart = { x: m1.x1 + opt.container1Width + opt.elementGap, y: m1.y1 + opt.rectHeight / 2 };
    const leftEnd = { x: m2.x1 + opt.container1Width + opt.elementGap, y: m2.y1 + opt.rectHeight / 2 };
    const rightStart = { x: m1.x2 - opt.elementGap, y: m1.y2 + opt.rectHeight / 2 };
    const rightEnd = { x: m2.x2 - opt.elementGap, y: m2.y2 + opt.rectHeight / 2 };

    // Left Grouping
    this.ctx.beginPath();
    this.ctx.moveTo(leftStart.x, leftStart.y);
    this.ctx.lineTo(leftStart.x + 10, leftStart.y);
    this.ctx.lineTo(leftEnd.x + 10, leftEnd.y);
    this.ctx.lineTo(leftEnd.x, leftEnd.y);
    this.ctx.stroke();

    // Right Grouping
    this.ctx.beginPath();
    this.ctx.moveTo(rightStart.x, rightStart.y);
    this.ctx.lineTo(rightStart.x - 10, rightStart.y);
    this.ctx.lineTo(rightEnd.x - 10, rightEnd.y);
    this.ctx.lineTo(rightEnd.x, rightEnd.y);
    this.ctx.stroke();

    // Draw Line
    const from = {
      x: leftStart.x + 10,
      y: (leftEnd.y + leftStart.y) / 2
    };
    const to = {
      x: rightStart.x - 10,
      y: (rightEnd.y + rightStart.y) / 2
    };
    this.drawLine(from, to);
  }

  for (let i=0; i<this.groups.length; i++) {
    drawGroupMove(this.groups[i]);
  }
};

function ModuleInfo({ id = "", name = "", order = -1, to = -1, flag = "" }) {
  this.id = id;
  this.name = name;
  this.order = order;
  this.to = to;
  this.flag = flag;
  this.x = -1;
  this.y = -1;
  this.x1 = -1;
  this.y1 = -1;
  this.x2 = -1;
  this.y2 = -1;
  this.groupId = '';
}

ModuleInfo.prototype.setXY = function(x, y) {
  this.x = x;
  this.y = y;
};

const options = {
  lineWidth: 1,
  lineStyle: 'RGBA(57, 150, 250, 1.00)',
  lineStyleStayed: '#000000',
  lineStyleMoved: 'RGBA(57, 150, 250, 1.00)',
  lineStyleAdded: 'green',
  lineStyleRemoved: 'red',

  fillArrow: true,
  fillStyle: 'RGBA(57, 150, 250, 1.00)',
  arrowStart: false,
  arrowEnd: true,
  showModuleMove: true,
  showGroupMove: false
};

(function() {
  const moduleCompare = new ModuleCompare({ id: "#canvas", prev, current, options });
  moduleCompare.draw();
  window.MODULE_COMPARE = moduleCompare;
})();