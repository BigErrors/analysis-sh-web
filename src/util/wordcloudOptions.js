let setOption = (data) => {
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
  let k = (40 - 10) / (maxValue - minValue)
  let option = {
    list: data || [['foo', 12], ['bar', 6]],
    fontFamily: '微软雅黑',
    fontWeight: 3,
    color: function (word, weight) {
      return 'rgb(' + [
        Math.round(Math.random() * 160),
        Math.round(Math.random() * 160),
        Math.round(Math.random() * 160)
      ].join(',') + ')'
    },
    weightFactor: function (weight) {
      // console.log(10 + k * (weight - minValue))
      return 10 + k * (weight - minValue)
    },
    clearCanvas: false,
    backgroundColor: 'rgba(255,255,255,0)',
    gridSize: 10,
    rotationSteps: 30,
    rotateRatio: [-60, 60]
  }
  return option
}

export default {setOption}
