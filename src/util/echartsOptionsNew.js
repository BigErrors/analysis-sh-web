// 折线图_首页趋势分析
let setLine = (data, showYAxis, containLabel) => {
  let option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      containLabel: containLabel || false,
      left: 10,
      right: 0,
      top: '15%',
      bottom: '10%'
    },
    color: ['#00FFFF'],
    toolbox: {},
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#BABABA'
      },
      splitLine: {
        show: false
      },
      boundaryGap: true,
      data: data.map(item => {
        return item['name']
      })
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: showYAxis || false,
        color: '#BABABA',
        fontSize: 12
      },
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '数据',
      type: 'line',
      smooth: true,
      symbolSize: 1,
      lineStyle: {
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#49EAEE' // 0% 处的颜色
          }, {
            offset: 1, color: '#000000' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      },
      data: data.map(item => {
        return item['value']
      })
    }]
  }
  return option
}
// 圆环图_首页协议书占比
let setPie = (data, title, bgColorOpacity, color) => {
  color = color || ['#495BFF', '#12BFFE']
  let option = {
    title: {
      x: 'center',
      bottom: 'center',
      text: title || '标题',
      textStyle: {
        color: '#BABABA',
        fontSize: 10
      }
    },
    'color': [{
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0.4,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: color[0] // 0% 处的颜色
      }, {
        offset: 1,
        color: color[1] // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    }, 'none'],
    series: [{
      type: 'pie',
      center: ['50%', '40%'],
      radius: ['70%', '80%'],
      label: {
        show: false
      },
      data: data,
      hoverAnimation: false
    }, {
      type: 'pie',
      center: ['50%', '40%'],
      radius: ['0%', '70%'],
      data: [{
        value: 0,
        name: data[0] + '%',
        label: {
          show: true,
          position: 'center',
          fontSize: 14,
          color: '#FEFEFE'
        },
        itemStyle: {
          color: color[1],
          opacity: bgColorOpacity === 0 ? 0 : 1
        }
      }]
    }]
  }
  return option
}
// 柱状图_首页业务类型
let setBar = (data) => {
  let option = {
    grid: {
      containLabel: true,
      left: 10,
      right: 20,
      top: '10%',
      bottom: '5%'
    },
    xAxis: {
      show: false
    },
    yAxis: {
      type: 'category',
      data: data.map(item => item['name']),
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#BABABA',
        fontSize: 14
      },
      splitLine: {
        show: false
      },
      boundaryGap: true
    },
    series: [{
      type: 'bar',
      data: data.map(item => item['value']),
      barMinHeight: 20,
      barMaxWidth: 8,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#4366FF' // 0% 处的颜色
          }, {
            offset: 1, color: '#12BFFE' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        barBorderRadius: 3
      },
      label: {
        show: true,
        position: 'right',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14
      }

    }]
  }
  return option
}
// 圆环图_人员属性页学历类型
let setPie2 = (data) => {
  let option = {
    legend: {
      orient: 'vertical',
      bottom: '25%',
      right: '6%',
      textStyle: {
        color: 'rgba(241,241,241,0.4)',
        fontSize: 12
      },
      data: data.map(item => {
        return item.name
      })
    },
    color: ['#4D84FE', '#F4A869', '#9979CC', '#854DB5', '#EF5665', '#F77C88'],
    series: [
      {
        name: 'seriesName',
        type: 'pie',
        center: ['39%', '50%'],
        radius: ['30%', '45%'],
        roseType: false,
        avoidLabelOverlap: true,
        label: {
          normal: {
            formatter: '{d|{d}%}\n {hr|}\n',
            rich: {
              c: {
                color: '#FFC600',
                fontSize: 13,
                lineHeight: 12,
                align: 'center'
              },
              d: {
                color: '#f1f1f1',
                fontSize: 12,
                lineHeight: 12,
                align: 'center'
              },
              hr: {
                borderColor: '#4D84FE',
                width: '100%',
                borderWidth: 1,
                height: 0
              }
            }
          }
        },
        labelLine: {
          lineStyle: {
            color: '#4D84FE'
          }
        },
        data: data
      }
    ]
  }
  return option
}
// 柱状图_人员属性政治面貌
let setBar2 = (data, color, axisType, dataType, barMaxWidth, portrait, showValueAxis) => {
  barMaxWidth = barMaxWidth || 43
  // 找出value中的最大值
  let maxValue = Math.max(...data.map(function (obj) { return obj.value }))
  if (portrait) {
    maxValue = data.reduce(function (total, item) {
      return total + item.value
    }, 0)
  }
  let displayValueAxis = function () {
    let result = false
    if (axisType === 'vertical') {
      if (showValueAxis === false) {
        result = false
      } else {
        result = true
      }
    }
    return result
  }
  let valueAxis = [{
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: displayValueAxis(),
      interval: 0,
      color: 'rgba(241,241,241,0.4)',
      fontSize: barMaxWidth < 16 ? barMaxWidth : 12,
      formatter: dataType === 'percent' ? '{value} %' : '{value}'
    },
    // value最大值的类型：percent，integer
    // max: Number.parseInt(dataType === 'percent' ? (1.0 * maxValue * 100) : (1.0 * maxValue)),
    max: Number.parseInt(dataType === 'percent' ? (100) : (1.0 * maxValue)),
    splitNumber: 5,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#2a2f3d'
      }
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
      color: 'rgba(241,241,241,0.4)',
      fontSize: 12,
      interval: 0,
      formatter: function (value) {
        if (value.length <= 6) {
          return value
        }
        return value.substring(0, 5) + '..'
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
    tooltip: {
      show: false
    },

    grid: {
      containLabel: true
    },
    // axisType有两种：vertical，xAxis显示类目，yAxis显示数值；horizon，xAxis显示数值，yAxis显示类目
    // x轴配置项
    xAxis: axisType === 'vertical' ? categoryAxis : valueAxis,
    // y轴配置项
    yAxis: axisType === 'vertical' ? valueAxis : categoryAxis,
    // bar配置项
    series: [{
      type: 'bar',
      name: name,
      stack: 'bar',
      z: 3,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: axisType === 'vertical' ? 0 : 1,
          y2: axisType === 'vertical' ? 1 : 0,
          colorStops: [{
            offset: 0, color: color[0] // 0% 处的颜色
          }, {
            offset: 1, color: color[1] // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      },
      label: {
        show: true,
        position: axisType === 'vertical' ? 'top' : 'right',
        color: '#f1f1f1',
        fontSize: 12
      },
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt(obj.value * 100)) : (obj.value)
      })
    }]
  }
  if (axisType === 'vertical') {
    option.series.push({
      type: 'bar',
      name: name,
      stack: 'bar',
      itemStyle: {
        color: 'rgba(56,62,78,0.5)'
      },
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt((maxValue - obj.value) * 100)) : (maxValue - obj.value)
      })
    })
  }
  if (barMaxWidth) {
    option.series[0].barMaxWidth = barMaxWidth
    if (axisType === 'vertical') {
      option.series[1].barMaxWidth = barMaxWidth
    }
  }
  if (portrait) {
    option.series.push({
      type: 'bar',
      name: name,
      stack: 'bar',
      itemStyle: {
        color: '#132665'
      },
      barMaxWidth: barMaxWidth,
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt((maxValue - obj.value) * 100)) : (maxValue - obj.value)
      })
    })
  }
  return option
}
// 折线图_人员属性年龄段
let setLine2 = (data, dataType, legend, color) => {
  let option = {
    grid: {
      containLabel: true,
      left: '5%',
      top: '15%',
      bottom: '10%',
      right: '5%'
    },
    tooltip: {
      trigger: 'axis'
    },
    color: color || ['#2989f7', '#50f79d', '#A3A3A3'],
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(241,241,241,0.4)'
      },
      splitLine: {
        show: false
      },
      boundaryGap: true,
      data: []
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        color: 'rgba(241,241,241,0.4)',
        formatter: dataType === 'integer' ? '{value}' : '{value} %'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#2a2f3d'
        }
      }
    },
    series: []
  }
  // 设置category对应数据
  data[0].map(item => {
    option.xAxis.data.push(item['name'])
  })
  // 添加系列并设置对应数据
  data.map((series, index) => {
    option.series.push({
      name: legend && legend[index] ? legend[index] : 'seriesname',
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 1,
        color: index === 0 ? '#2987f7' : '#50f79d'
      },
      label: {
        show: false,
        fontSize: 12,
        formatter: dataType === 'integer' ? '{c}' : '{c} %'
      },
      areaStyle: index === 1 ? {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(80,247,157,0.4)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(80,247,157,0.6)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      } : {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(41,137,247,0.4)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(41,137,247,0.6)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      },
      data: data[index].map(item => {
        return item['value']
      })
    })
  })
  if (legend && legend.length > 0) {
    option.legend = {
      orient: 'horizontal',
      right: '20px',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 12
      },
      data: legend.map(item => {
        return item
      })
    }
  }
  if (data.length === 1) {
    option.series[0].label.color = '#FFC400'
  }
  return option
}
// 折线图_人员数量 调解员变化趋势 和 历年新增人员
let setLine3 = (data, dataType, legend, color) => {
  let option = {
    grid: {
      containLabel: true,
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: '10%'
    },
    color: color || ['#6F9BFD', '#FDCB35', '#A3A3A3'],
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(241,241,241,0.4)'
      },
      splitLine: {
        show: false
      },
      boundaryGap: true,
      data: []
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        color: 'rgba(241,241,241,0.4)',
        formatter: dataType === 'integer' ? '{value}' : '{value} %'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#2a2f3d'
        }
      }
    },
    series: []
  }
  // 设置category对应数据
  data[0].map(item => {
    option.xAxis.data.push(item['name'])
  })
  // 添加系列并设置对应数据
  data.map((series, index) => {
    option.series.push({
      name: legend && legend[index] ? legend[index] : 'seriesname',
      type: 'line',
      symbol: 'circle',
      symbolSize: 12,
      lineStyle: {
        width: 2
      },
      label: {
        show: true,
        fontSize: 12,
        formatter: dataType === 'integer' ? '{c}' : '{c} %'
      },
      data: data[index].map(item => {
        return item['value']
      })
    })
  })
  if (legend && legend.length > 0) {
    option.legend = {
      orient: 'horizontal',
      left: 'center',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 12
      },
      data: legend.map(item => {
        return item
      })
    }
  }
  if (data.length === 1) {
    option.series[0].label.color = '#f1f1f1'
  }
  return option
}
// 柱状图_人员数量 各区调解员人数 和 新增调解员
let setBar3 = (data, color, axisType, dataType, barMaxWidth, portrait, showValueAxis) => {
  barMaxWidth = barMaxWidth || 43
  // 找出value中的最大值
  let maxValue = Math.max(...data.map(function (obj) { return obj.value }))
  if (portrait) {
    maxValue = data.reduce(function (total, item) {
      return total + item.value
    }, 0)
  }
  let displayValueAxis = function () {
    let result = false
    if (axisType === 'vertical') {
      if (showValueAxis === false) {
        result = false
      } else {
        result = true
      }
    }
    return result
  }
  let valueAxis = [{
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0,
      show: displayValueAxis(),
      color: '#4D84FE',
      fontSize: barMaxWidth < 12 ? barMaxWidth : 12,
      formatter: dataType === 'percent' ? '{value} %' : '{value}'
    },
    // value最大值的类型：percent，integer
    // max: Number.parseInt(dataType === 'percent' ? (1.0 * maxValue * 100) : (1.0 * maxValue)),
    max: Number.parseInt(dataType === 'percent' ? (100) : (1.0 * maxValue)),
    splitNumber: 4,
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
      color: 'rgba(241,241,241,0.4)',
      fontSize: 12,
      interval: 0,
      formatter: function (value) {
        if (value.length <= 6) {
          return value
        }
        return value.substring(0, 5) + '..'
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
    tooltip: {
      show: false
    },
    grid: {
      containLabel: true,
      left: '5%',
      right: '10%',
      bottom: '10%',
      top: '10%'
    },
    // axisType有两种：vertical，xAxis显示类目，yAxis显示数值；horizon，xAxis显示数值，yAxis显示类目
    // x轴配置项
    xAxis: axisType === 'vertical' ? categoryAxis : valueAxis,
    // y轴配置项
    yAxis: axisType === 'vertical' ? valueAxis : categoryAxis,
    // bar配置项
    series: [{
      type: 'bar',
      name: name,
      stack: 'bar',
      z: 3,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: axisType === 'vertical' ? 0 : 1,
          y2: axisType === 'vertical' ? 1 : 0,
          colorStops: [{
            offset: 0, color: color[0] // 0% 处的颜色
          }, {
            offset: 1, color: color[1] // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      },
      label: {
        show: true,
        position: axisType === 'vertical' ? 'top' : 'right',
        color: color[1],
        fontSize: 12
      },
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt(obj.value * 100)) : (obj.value)
      })
    }]
  }
  if (axisType === 'vertical') {
    option.series.push({
      type: 'bar',
      name: name,
      stack: 'bar',
      itemStyle: {
        color: '#132665'
      },
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt((maxValue - obj.value) * 100)) : (maxValue - obj.value)
      })
    })
  }
  if (barMaxWidth) {
    option.series[0].barMaxWidth = barMaxWidth
    if (axisType === 'vertical') {
      option.series[1].barMaxWidth = barMaxWidth
    }
  }
  if (portrait) {
    option.series.push({
      type: 'bar',
      name: name,
      stack: 'bar',
      itemStyle: {
        color: '#132665'
      },
      barMaxWidth: barMaxWidth,
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt((maxValue - obj.value) * 100)) : (maxValue - obj.value)
      })
    })
  }
  return option
}
// 柱状图_人员详情 类型对比
let setBar4 = (data, color, axisType, dataType, barMaxWidth, portrait, showValueAxis) => {
  barMaxWidth = barMaxWidth || 43
  // 找出value中的最大值
  let maxValue = Math.max(...data.map(function (obj) { return obj.value }))
  if (portrait) {
    maxValue = data.reduce(function (total, item) {
      return total + item.value
    }, 0)
  }
  let displayValueAxis = function () {
    let result = false
    if (axisType === 'vertical') {
      if (showValueAxis === false) {
        result = false
      } else {
        result = true
      }
    }
    return result
  }
  let valueAxis = [{
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0,
      show: displayValueAxis(),
      color: 'rgba(241,241,241,0.4)',
      fontSize: barMaxWidth < 12 ? barMaxWidth : 12,
      formatter: dataType === 'percent' ? '{value} %' : '{value}'
    },
    // value最大值的类型：percent，integer
    // max: Number.parseInt(dataType === 'percent' ? (1.0 * maxValue * 100) : (1.0 * maxValue)),
    max: Number.parseInt(dataType === 'percent' ? (100) : (1.0 * maxValue)),
    splitNumber: 4,
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
      color: 'rgba(241,241,241,0.4)',
      fontSize: 12,
      interval: 0,
      formatter: function (value) {
        if (value.length <= 6) {
          return value
        }
        return value.substring(0, 5) + '..'
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
    tooltip: {
      show: false
    },
    grid: {
      containLabel: true,
      top: 20,
      bottom: 20,
      left: 30,
      right: 40
    },
    // axisType有两种：vertical，xAxis显示类目，yAxis显示数值；horizon，xAxis显示数值，yAxis显示类目
    // x轴配置项
    xAxis: axisType === 'vertical' ? categoryAxis : valueAxis,
    // y轴配置项
    yAxis: axisType === 'vertical' ? valueAxis : categoryAxis,
    // bar配置项
    series: [{
      type: 'bar',
      name: name,
      stack: 'bar',
      z: 3,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: axisType === 'vertical' ? 0 : 1,
          y2: axisType === 'vertical' ? 1 : 0,
          colorStops: [{
            offset: 0, color: color[0] // 0% 处的颜色
          }, {
            offset: 1, color: color[1] // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      },
      label: {
        show: true,
        position: axisType === 'vertical' ? 'top' : 'right',
        color: '#f1f1f1',
        fontSize: 12
      },
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt(obj.value * 100)) : (obj.value)
      })
    }]
  }
  if (axisType === 'vertical') {
    option.series.push({
      type: 'bar',
      name: name,
      stack: 'bar',
      itemStyle: {
        color: '#132665'
      },
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt((maxValue - obj.value) * 100)) : (maxValue - obj.value)
      })
    })
  }
  if (barMaxWidth) {
    option.series[0].barMaxWidth = barMaxWidth
    if (axisType === 'vertical') {
      option.series[1].barMaxWidth = barMaxWidth
    }
  }
  if (portrait) {
    option.series.push({
      type: 'bar',
      name: name,
      stack: 'bar',
      itemStyle: {
        color: '#2E3441'
      },
      barMaxWidth: barMaxWidth,
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt((maxValue - obj.value) * 100)) : (maxValue - obj.value)
      })
    })
  }
  return option
}
// 柱状图_业务类型 年龄分析 和 赔偿金额变化
let setBar5 = (data, color, axisType, dataType, barMaxWidth, portrait, showValueAxis, rotate) => {
  barMaxWidth = barMaxWidth || 43
  // 找出value中的最大值
  let maxValue = Math.max(...data.map(function (obj) { return obj.value }))
  if (portrait) {
    maxValue = data.reduce(function (total, item) {
      return total + item.value
    }, 0)
  }
  let displayValueAxis = function () {
    let result = false
    if (axisType === 'vertical') {
      if (showValueAxis === false) {
        result = false
      } else {
        result = true
      }
    }
    return result
  }
  let valueAxis = [{
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: displayValueAxis(),
      interval: 'auto',
      color: 'rgba(241,241,241,0.4)',
      fontSize: barMaxWidth < 12 ? barMaxWidth : 12,
      formatter: dataType === 'percent' ? '{value} %' : '{value}'
    },
    // value最大值的类型：percent，integer
    // max: Number.parseInt(dataType === 'percent' ? (1.0 * maxValue * 100) : (1.0 * maxValue)),
    max: Number.parseInt(dataType === 'percent' ? (100) : (1.0 * maxValue)),
    splitNumber: 4,
    splitLine: {
      show: false,
      lineStyle: {
        color: '#4D84FE'
      }
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
      color: 'rgba(241,241,241,0.4)',
      interval: 0,
      rotate: rotate || 0,
      fontSize: 12,
      formatter: function (value) {
        if (axisType === 'horizon') {
          return value
        } else {
          if (value.length <= 6) {
            return value
          } else {
            return value.substring(0, 5) + '..'
          }
        }
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
    tooltip: {
      show: true
    },
    grid: {
      containLabel: function () { if (axisType === 'horizon') { return true } else { return false } },
      top: '15%',
      left: '10%',
      right: '10%',
      bottom: '10%'
    },
    // axisType有两种：vertical，xAxis显示类目，yAxis显示数值；horizon，xAxis显示数值，yAxis显示类目
    // x轴配置项
    xAxis: axisType === 'vertical' ? categoryAxis : valueAxis,
    // y轴配置项
    yAxis: axisType === 'vertical' ? valueAxis : categoryAxis,
    // bar配置项
    series: [{
      type: 'bar',
      name: name,
      stack: 'bar',
      z: 3,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: axisType === 'vertical' ? 0 : 1,
          y2: axisType === 'vertical' ? 1 : 0,
          colorStops: [{
            offset: 0, color: color[0] // 0% 处的颜色
          }, {
            offset: 1, color: color[1] // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      },
      label: {
        show: false,
        position: axisType === 'vertical' ? 'top' : 'right',
        color: color[1],
        fontSize: 12
      },
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt(obj.value * 100)) : (obj.value)
      })
    }]
  }
  if (axisType === 'vertical') {
    option.series.push({
      type: 'bar',
      name: name,
      stack: 'bar',
      itemStyle: {
        color: '#383E4E'
      },
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt((maxValue - obj.value) * 100)) : (maxValue - obj.value)
      })
    })
  }
  if (barMaxWidth) {
    option.series[0].barMaxWidth = barMaxWidth
    if (axisType === 'vertical') {
      option.series[1].barMaxWidth = barMaxWidth
    }
  }
  if (portrait) {
    option.series.push({
      type: 'bar',
      name: name,
      stack: 'bar',
      itemStyle: {
        color: '#132665'
      },
      barMaxWidth: barMaxWidth,
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt((maxValue - obj.value) * 100)) : (maxValue - obj.value)
      })
    })
  }
  return option
}
// 圆环图_业务类型 占比
let setPie3 = (data, title, bgColorOpacity, titlePosition) => {
  let option = {
    title: {
      show: false,
      x: 'center',
      y: titlePosition || 'bottom',
      // bottom: 6,
      text: title || '标题',
      textStyle: {
        color: '#1194F8',
        fontSize: 12
      }
    },
    color: ['rgba(0, 236, 246, 1)', '#383E4E'],
    series: [{
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['45%', '60%'],
      label: {
        show: false
      },
      data: data
    }, {
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['0%', '45%'],
      data: [{
        value: 0,
        name: data[0] + '%',
        label: {
          show: true,
          position: 'center',
          fontSize: 22,
          color: '#f1f1f1',
          fontWeight: 'bold'
        },
        itemStyle: {
          color: '#171c26',
          opacity: bgColorOpacity === 0 ? 0 : 1
        }
      }]
    }]
  }
  return option
}
// 柱状图_业务类型 案件处理状态 和 处置情况
let setBar6 = (data, color, axisType, dataType, barMaxWidth, portrait, showValueAxis, rotate) => {
  barMaxWidth = 25
  // 找出value中的最大值
  let maxValue = Math.max(...data.map(function (obj) { return obj.value }))
  if (portrait) {
    maxValue = data.reduce(function (total, item) {
      return total + item.value
    }, 0)
  }
  let displayValueAxis = function () {
    let result = false
    if (axisType === 'vertical') {
      if (showValueAxis === false) {
        result = false
      } else {
        result = true
      }
    }
    return result
  }
  let valueAxis = [{
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: displayValueAxis(),
      interval: 'auto',
      color: 'rgba(241,241,241,0.4)',
      fontSize: barMaxWidth < 12 ? barMaxWidth : 2,
      formatter: dataType === 'percent' ? '{value} %' : '{value}'
    },
    // value最大值的类型：percent，integer
    // max: Number.parseInt(dataType === 'percent' ? (1.0 * maxValue * 100) : (1.0 * maxValue)),
    max: Number.parseInt(dataType === 'percent' ? (100) : (1.0 * maxValue)),
    splitNumber: 4,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#2a2f3d'
      }
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
      color: 'rgba(241,241,241,0.4)',
      interval: 0,
      rotate: 0,
      fontSize: 11,
      formatter: function (value) {
        if (axisType === 'horizon') {
          return value
        } else {
          if (value.length <= 6) {
            return value
          } else {
            return value.substring(0, 5) + '..'
          }
        }
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
    tooltip: {
      show: false
    },
    grid: {
      containLabel: function () { if (axisType === 'horizon') { return true } else { return false } },
      top: 20,
      left: 20,
      right: 20,
      bottom: 20
    },
    // axisType有两种：vertical，xAxis显示类目，yAxis显示数值；horizon，xAxis显示数值，yAxis显示类目
    // x轴配置项
    xAxis: axisType === 'vertical' ? categoryAxis : valueAxis,
    // y轴配置项
    yAxis: axisType === 'vertical' ? valueAxis : categoryAxis,
    // bar配置项
    series: [{
      type: 'bar',
      name: name,
      stack: 'bar',
      z: 3,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: axisType === 'vertical' ? 0 : 1,
          y2: axisType === 'vertical' ? 1 : 0,
          colorStops: [{
            offset: 0, color: color[0] // 0% 处的颜色
          }, {
            offset: 1, color: color[1] // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      },
      label: {
        show: true,
        position: axisType === 'vertical' ? 'top' : 'right',
        color: '#f1f1f1',
        fontSize: 12
      },
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt(obj.value * 100)) : (obj.value)
      })
    }]
  }
  if (axisType === 'vertical') {
    option.series.push({
      type: 'bar',
      name: name,
      stack: 'bar',
      itemStyle: {
        color: '#383E4E'
      },
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt((maxValue - obj.value) * 100)) : (maxValue - obj.value)
      })
    })
  }
  if (barMaxWidth) {
    option.series[0].barMaxWidth = barMaxWidth
    if (axisType === 'vertical') {
      option.series[1].barMaxWidth = barMaxWidth
    }
  }
  if (portrait) {
    option.series.push({
      type: 'bar',
      name: name,
      stack: 'bar',
      itemStyle: {
        color: '#132665'
      },
      barMaxWidth: barMaxWidth,
      data: data.map(function (obj) {
        return dataType === 'percent' ? (Number.parseInt((maxValue - obj.value) * 100)) : (maxValue - obj.value)
      })
    })
  }
  return option
}
// 雷达图_人员详情 综合能力
let setRadar = (data, indicator, page) => {
  let option = {
    title: {},
    tooltip: {
      show: false
    },
    radar: {
      radius: '65%',
      name: {
        textStyle: {
          color: 'rgba(241,241,241,0.4)',
          fontSize: 14
        }
      },
      axisLine: {
        show: true
      },
      splitNumber: 2,
      splitLine: {
        show: true
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: 'rgba(255,255,255,0)'
        }
      },
      indicator: indicator
    },
    series: [{
      name: 'radar',
      type: 'radar',
      itemStyle: {
        color: '#FDCD0F',
        opacity: 0
      },
      areaStyle: {
        color: '#FDCD0F'
      },
      data: data
    }]
  }
  // 雷达图_文书质量
  if (page === 'documqua') {
    option.title = {
      left: 'center',
      text: '协议书质量维度',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#f1f1f1'
      }
    }
    option.radar.center = ['50%', '60%']
  }
  return option
}
// 热力图_文书质量
let setheatmap = (data) => {
  var ydata = data.dengji
  var xdata = data.location
  var values = data.values
  xdata = xdata.map((item) => {
    return {
      value: item,
      textStyle: {
        color: '#rgba(241,241,241,0.4)'
      }
    }
  })
  ydata = ydata.map((item) => {
    return {
      value: item,
      textStyle: {
        color: '#rgba(241,241,241,0.4)'
      }
    }
  })
  let option = {
    tooltip: {
      position: 'top'
    },
    animation: false,
    grid: {
      containLabel: true,
      left: '24',
      right: '10%',
      top: '10%',
      bottom: '10%'
    },
    xAxis: {
      type: 'category',
      data: xdata,
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: ydata,
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 200,
      show: false,
      color: ['#0F62B2', '#137BE1', '#51A1F0']
    },
    series: [{
      name: '协议书数量',
      type: 'heatmap',
      data: values,
      label: {
        normal: {
          show: true
        }
      },
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      tooltip: {}
    }]
  }
  return option
}
// 树图_赔偿金额
let setTreemap = (_this, data) => {
  return {
    tooltip: {
      formatter: function (info) {
        var value = info.value
        var treePathInfo = info.treePathInfo
        var treePath = []
        for (var i = 1; i < treePathInfo.length; i++) {
          treePath.push(treePathInfo[i].name)
        }
        return [
          '<div class="tooltip-title">' + _this.$echarts.format.encodeHTML(treePath.join('/')) + '</div>',
          '赔偿金额: ' + _this.$echarts.format.addCommas(value) + ' 元'
        ].join('')
      }
    },
    series: [
      {
        name: '赔偿金额',
        type: 'treemap',
        width: '90%',
        height: '90%',
        visibleMin: 300,
        label: {
          show: true,
          formatter: function (params) {
            return '￥' + _this.$echarts.format.addCommas(params.data.value) + '\n\n' + params.data.name
          },
          fontSize: 14
        },
        upperLabel: {
          normal: {
            show: true,
            height: 40,
            formatter: function (params) {
              return params.data.name + ':￥' + _this.$echarts.format.addCommas(params.data.value)
            },
            fontSize: 14
          }
        },
        itemStyle: {
          normal: {
            borderColor: '#fff'
          }
        },
        levels: [
          {
            itemStyle: {
              normal: {
                borderColor: '#777',
                borderWidth: 0,
                gapWidth: 1
              }
            },
            upperLabel: {
              normal: {
                show: false
              }
            }
          },
          {
            itemStyle: {
              normal: {
                borderColor: '#555',
                borderWidth: 5,
                gapWidth: 1
              },
              emphasis: {
                borderColor: '#ddd'
              }
            }
          },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
              normal: {
                borderWidth: 5,
                gapWidth: 1,
                borderColorSaturation: 0.6
              }
            }
          }
        ],
        data: data
      }
    ]
  }
}
// 圆环图_业务数量案件来源分布
let setPie4 = (data) => {
  let newdata = data
  let maxValIndex = 0
  let maxVal = parseInt(newdata[0].value)
  for (let i = 0; i < newdata.length; i++) {
    if (parseInt(newdata[i].value) > maxVal) {
      maxVal = parseInt(newdata[i].value)
      maxValIndex = i
    }
  }
  console.log(data)
  console.log(maxVal)
  newdata[maxValIndex]['labelLine'] = {
    show: true,
    lineStyle: {
      color: 'rgba(241,241,241,0.4)'
    }
  }
  newdata[maxValIndex]['label'] = {
    normal: {
      show: true,
      formatter: '{d|{b}}\n{d|{d}%}\n',
      rich: {
        c: {
          color: '#f1f1f1',
          fontSize: 12,
          lineHeight: 16,
          align: 'center'
        },
        d: {
          color: '#f1f1f1',
          fontSize: 12,
          lineHeight: 16,
          align: 'center'
        }
      }
    }
  }
  let option = {
    legend: {
      orient: 'horizontal',
      top: '5%',
      left: '5%',
      right: '5%',
      textStyle: {
        color: 'rgba(241,241,241,0.4)',
        fontSize: 12
      },
      data: data.map(item => {
        return item.name
      })
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    color: ['#F77C88', '#854DB5', '#9979CC', '#FED481', '#D9A701', '#D9A701', '#FBD939'],
    series: [
      {
        name: 'seriesName',
        type: 'pie',
        center: ['50%', '65%'],
        radius: ['35%', '55%'],
        roseType: false,
        avoidLabelOverlap: true,
        labelLine: {
          show: false,
          lineStyle: {
            color: 'rgba(241,241,241,0.4)'
          }
        },
        label: {
          normal: {
            show: false
          }
        },
        data: newdata
      }
    ]
  }
  return option
}
export default {setLine, setPie, setBar, setPie2, setBar2, setLine2, setLine3, setBar3, setBar4, setRadar, setBar5, setPie3, setBar6, setheatmap, setTreemap, setPie4}
