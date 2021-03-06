self.addEventListener('message', messageEvent => {
  computeMandelbrotSet(messageEvent.data);
});

function computeMandelbrotSet({ width, height, maxIteration }) {
  for (let iy = 0; iy < height; iy++) {
    for (let ix = 0; ix < width; ix++) {
      const cRe = (ix - width / 2.0) * 4.0 / width;
      const cIm = (iy - height / 2.0) * 4.0 / width;
      let x = 0;
      let y = 0;

      let iteration = 0;
      while (x * x + y * y <= 4 && iteration < maxIteration) {
        const xNew = x * x - y * y + cRe;
        y = 2 * x * y + cIm;
        x = xNew;
        iteration++;
      }
      if (iteration >= maxIteration) {
        postMessage([ix, iy]);
      }
    }
  }
  postMessage(null);
}


