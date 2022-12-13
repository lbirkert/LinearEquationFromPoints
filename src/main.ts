import './style.css';

export const addForm: HTMLFormElement = document.querySelector('#add')!;
export const addInput: HTMLInputElement = document.querySelector(
  '#add input[type=text]'
)!;

export const graphPoints: SVGPathElement = document.querySelector('#points')!;
export const graphLine: SVGLineElement = document.querySelector('#line')!;

export const equationM: HTMLParagraphElement =
  document.querySelector('#equation-m')!;
export const equationC: HTMLParagraphElement =
  document.querySelector('#equation-c')!;

export const clearBtn: HTMLButtonElement = document.querySelector('#clear')!;
export const randomBtn: HTMLButtonElement = document.querySelector('#random')!;

export let points: [number, number][] = [];
export let pointsEl: SVGCircleElement[] = [];

addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const segments = addInput.value.split(';');

  if (segments.length === 2) {
    const coords = segments.map((s) => parseInt(s.trim())) as [number, number];
    points.push(coords);
    pointsEl.push(make(coords));
    update();
  }
});

clearBtn.addEventListener('click', clear);

randomBtn.addEventListener('click', random);

export function clear() {
  pointsEl.forEach((p) => p.remove());
  points = [];
  pointsEl = [];
}

export function make(coords: [number, number]): SVGCircleElement {
  const svgns = 'http://www.w3.org/2000/svg';
  const el = document.createElementNS(svgns, 'circle');
  el.setAttribute('cx', coords[0].toString());
  el.setAttribute('cy', coords[1].toString());
  el.setAttribute('r', '0.3');
  el.setAttribute('fill', 'orange');
  el.setAttribute('stroke', 'rgba(0, 0, 0, 0.4)');
  el.setAttribute('stroke-width', '0.2');
  return graphPoints.appendChild(el);
}

export function random() {
  clear();
  let y = 10;
  for (let x = 1; x < 20; x += 2) {
    y += (Math.random() - 0.5) * 4;
    const coords: [number, number] = [x, y];
    points.push(coords);
    pointsEl.push(make(coords));
  }
  update();
}

export function update() {
  const _points = points.slice(1);
  if (_points.length === 0) return;
  const m = _points.map(([x, y], i) => {
    const [nx, ny] = points[i];
    const dx = x - nx;
    const dy = y - ny;
    return dy / dx;
  });
  const c = _points.map(([x, y], i) => y - x * m[i]);
  const mAvg = m.reduce((p, v) => p + v, 0) / m.length;
  const cAvg = c.reduce((p, v) => p + v, 0) / c.length;
  const graph = (x: number) => x * mAvg + cAvg;
  graphLine.setAttribute('y1', graph(0).toFixed(2));
  graphLine.setAttribute('y2', graph(20).toFixed(2));
  equationM.innerText = mAvg.toFixed(2);
  equationC.innerText = cAvg.toFixed(2);
}

random();
