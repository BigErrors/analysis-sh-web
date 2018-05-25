let setOption = (data, str) => {
  let option = {
    list: data || [['foo', 12], ['bar', 6]],
    fontFamily: '"Trebuchet MS", "Heiti TC", "微軟正黑體", ' +
                '"Arial Unicode MS", "Droid Fallback Sans", sans-serif',
    fontWeight: 'normal',
    color: 'random-dark',
    minSize: 0, // 0 to disable
    weightFactor: 1,
    clearCanvas: true,
    backgroundColor: 'rgba(255,0,0,0)', // opaque white = rgba(255, 255, 255, 1)

    gridSize: 8,
    drawOutOfBound: false,
    origin: null,

    drawMask: false,
    maskColor: 'rgba(255,0,0,0.3)',
    maskGapWidth: 0.3,

    wait: 0,
    abortThreshold: 0, // disabled
    abort: function noop () {},

    minRotation: -Math.PI / 2,
    maxRotation: Math.PI / 2,
    rotationSteps: 0,

    shuffle: true,
    rotateRatio: 0.1,

    shape: 'star',
    ellipticity: 0.65,

    classes: null,

    hover: null,
    click: null
  }
  return option
}

export default {setOption}
