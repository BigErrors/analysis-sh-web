// 设置柱图
let setBar = (color, axisType, dataType, name, updateTime, data) => {
  // 找出value中的最大值
  let maxValue = Math.max(...data.map(function (obj) {
    return obj.value
  }))
  let valueAxis = [{
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      interval: 'auto',
      formatter: dataType === 'percent' ? '{value} %' : '{value}'
    },
    // value最大值的类型：percent，integer
    // max: Number.parseInt(dataType === 'percent' ? (1.0 * maxValue * 100) : (1.0 * maxValue)),
    max: Number.parseInt(dataType === 'percent' ? (100) : (1.0 * maxValue)),
    splitLine: {
      show: false
    }
  }]
  let categoryAxis = [{
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      formatter: function (value) {
        if (value.length < 6) {
          return value
        }
        return value.substring(0, 6) + '...'
      }
    },
    data: data.map(function (obj) {
      return obj.name
    }),
    splitLine: {
      show: false
    }
  }]
  let option = {
    title: {
      text: name,
      textStyle: {
        color: color,
        fontSize: 14,
        align: 'left'
      },
      subtext: '(更新于: ' + updateTime + ')',
      subtextStyle: {
        color: '#b4b5b5',
        fontSize: 12,
        align: 'right'
      },
      left: 32
    },
    tooltip: {
      show: true,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: color,
      formatter: dataType === 'percent' ? '{a} ({b}): {c}%' : '{a} ({b}): {c}',
      textStyle: {
        color: color,
        fontSize: 12
      }
    },
    // axisType有两种：vertical，xAxis显示类目，yAxis显示数值；horizon，xAxis显示数值，yAxis显示类目
    // x轴配置项
    xAxis: axisType === 'vertical' ? categoryAxis : valueAxis,
    // y轴配置项
    yAxis: axisType === 'vertical' ? valueAxis : categoryAxis,
    // bar配置项
    series: {
      type: 'bar',
      name: name,
      barWidth: 12,
      itemStyle: {
        color: color,
        borderColor: color,
        borderWidth: 2,
        barBorderRadius: 20
      },
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt(obj.value * 100)) : (obj.value)
      })
    }
  }
  return option
}

// 设置饼图
let setPie = (color, data) => {
  let option = {
    color: color,
    title: {
      text: (data[0].value * 100).toFixed(1) + '%',
      x: 'center',
      y: 'center',
      textStyle: {
        color: color[0],
        fontSize: 14
      }
    },
    series: [{
      type: 'pie',
      legendHoverLink: false,
      hoverAnimation: false,
      radius: ['55%', '70%'],
      clockwise: false,
      label: {
        show: false
      },
      data: data
    }]
  }
  return option
}

export default {setBar, setPie}
