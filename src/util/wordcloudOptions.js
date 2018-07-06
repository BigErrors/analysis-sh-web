let setOption = (data, shape) => {
  // 最大值
  let maxValue = data.map(item => {
    return item[1]
  }).reduce((max, current) => {
    return max > current ? max : current
  })
  // 最小值
  let minValue = data.map(item => {
    return item[1]
  }).reduce((min, current) => {
    return min < current ? min : current
  })
  // 转换系数
  let k = (maxValue - minValue) === 0 ? 1 : (20 - 10) / (maxValue - minValue)
  let option = {
    list: data,
    fontFamily: '微软雅黑',
    fontWeight: 3,
    color: function (word, weight) {
      let r = Math.random()
      let g = Math.random()
      let b = Math.random()
      let limit = 0.6
      return 'rgb(' + [
        Math.round((r < limit ? limit : r) * 255),
        Math.round((g < limit ? limit : g) * 255),
        Math.round((b < limit ? limit : b) * 255)
      ].join(',') + ')'
    },
    weightFactor: function (weight) {
      return 15 + k * (weight - minValue)
    },
    clearCanvas: false,
    backgroundColor: 'rgba(255,255,255,0)',
    gridSize: 10,
    rotationSteps: 30,
    rotateRatio: [-60, 60]
  }
  if (shape) {
    // Available presents are circle (default), cardioid (apple or heart shape curve, the most known polar equation), diamond, square, triangle-forward, triangle, (alias of triangle-upright, pentagon, and star).
    option.clearCanvas = true
    option.shape = 'circle'
  }
  return option
}

export default {setOption}
