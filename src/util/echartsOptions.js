import urlConfig from '@/util/urlConfig'
// 柱图
let setBar = (data) => {
  // 找出value中的最大值
  let maxValue = Math.max(...data.map(item => {
    return Number.parseInt(item['110']) + Number.parseInt(item['renmintj']) + Number.parseInt(item['falvzx'])
  }))
  let valueAxis = [{
    type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        color: '#1194F8'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      interval: 'auto',
      formatter: '{value}'
    },
    max: Number.parseInt((1.1 * maxValue)),
    splitLine: {
      show: false
    }
  }]
  let categoryAxis = [{
    type: 'category',
    axisLine: {
      show: false,
      lineStyle: {
        color: '#1194F8'
      }
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
    data: data.map(item => {
      return item.qu
    }),
    splitLine: {
      show: false
    }
  }]
  let option = {
    title: {},
    tooltip: {
      show: true
    },
    color: ['#0847D6', '#1763F2', '#5D9BFF', '#FFFF00'],
    legend: {
      x: 'right',
      top: 20,
      textStyle: {
        color: '#FFFFFF',
        fontSize: 13
      },
      data: ['人民调解', '法律咨询', '110', '历史平均值']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    // axisType有两种：vertical，xAxis显示类目，yAxis显示数值；horizon，xAxis显示数值，yAxis显示类目
    // x轴配置项
    xAxis: categoryAxis,
    // y轴配置项
    yAxis: valueAxis,
    // bar配置项
    series: [{
      type: 'bar',
      name: '人民调解',
      stack: 'one',
      barWidth: 30,
      data: data.map(item => {
        return item['renmintj']
      })
    }, {
      type: 'bar',
      name: '法律咨询',
      stack: 'one',
      barWidth: 30,
      data: data.map(item => {
        return item['falvzx']
      })
    }, {
      type: 'bar',
      name: '110',
      stack: 'one',
      barWidth: 30,
      data: data.map(item => {
        return item['110']
      })
    }, {
      type: 'line',
      name: '历史平均值',
      data: data.map(item => {
        return item['pingjunz']
      })
    }]
  }
  return option
}

// 柱图
let setBar3 = (data, color, axisType, dataType, barMaxWidth, portrait, showValueAxis, rotate) => {
  barMaxWidth = 6
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
      color: 'rgba(241,241,241,0.8)',
      fontSize: barMaxWidth < 6 ? barMaxWidth : 6,
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
      color: 'rgba(241,241,241,0.8)',
      interval: 0,
      rotate: rotate || 0,
      fontSize: 14,
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
      right: 50,
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
        },
        barBorderRadius: 3
      },
      label: {
        show: true,
        position: axisType === 'vertical' ? 'top' : 'right',
        color: '#f1f1f1',
        fontSize: 14
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

// 柱图
let setBar4 = (data) => {
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
      color: 'rgba(241,241,241,0.8)',
      fontSize: 14
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#2A2F3D'
      }
    }
  }]
  let categoryAxis = [{
    type: 'category',
    boundaryGap: true,
    axisLine: {
      show: false,
      lineStyle: {
        color: 'rgba(241,241,241,0.8)'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      color: 'rgba(241,241,241,0.8)',
      fontSize: 14,
      interval: 0,
      rotate: 0,
      formatter: function (value) {
        return value.slice(0, 2) + '年' + value.slice(2, 4) + '月'
      }
    },
    data: data.map(function (obj) {
      return obj.name.slice(2, 4) + obj.name.slice(4, 6)
    }),
    splitLine: {
      show: false
    }
  }]
  let option = {
    grid: {
      containLabel: true,
      top: 20,
      left: 20,
      right: 20,
      bottom: 20
    },
    // x轴配置项
    xAxis: categoryAxis,
    // y轴配置项
    yAxis: valueAxis,
    // bar配置项
    series: [{
      name: '新增',
      type: 'bar',
      stack: 'bar',
      z: 3,
      barMaxWidth: 25,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#B2CAFF'
          }, {
            offset: 1,
            color: '#4E84FE'
          }],
          globalCoord: false
        }
      },
      label: {
        show: false
      },
      data: data.map(function (obj) {
        return obj.value1
      })
    }]
  }
  return option
}

// 雷达图
let setRadar2 = (data, indicator) => {
  let option = {
    title: {},
    tooltip: {
      show: false
    },
    radar: {
      radius: '65%',
      name: {
        textStyle: {
          color: '#1194F8'
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
  return option
}

// 折线图
let setLine = (data) => {
  let option = {
    title: {},
    tooltip: {
      trigger: 'axis'
    },
    color: ['#FFF225', '#30FF8D', '#26CEFF'],
    legend: {
      x: 'right',
      top: 20,
      textStyle: {
        color: '#FFFFFF',
        fontSize: 13
      },
      data: ['人民调解', '法律服务', '110']
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 10,
      containLabel: true
    },
    toolbox: {},
    xAxis: {
      type: 'category',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#1194F8'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      boundaryGap: false,
      data: data.map(item => {
        let date = item.month.split('-')
        return `${date[0]}年${date[1]}月`
      })
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#1194F8'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: '人民调解',
        type: 'line',
        data: data.map(item => {
          return item['renmintj'] || item['tiaojieaj']
        })
      },
      {
        name: '法律服务',
        type: 'line',
        data: data.map(item => {
          return item['falvzx'] || item['jicengggflfw']
        })
      },
      {
        name: '110',
        type: 'line',
        data: data.map(item => {
          return item['110']
        })
      }
    ]
  }
  return option
}
// 折线图
let setLine2 = (data) => {
  let option = {
    color: ['#00FFFF'],
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      containLabel: false
    },
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
        color: 'rgba(241,241,241,0.8)',
        fontSize: 14
      },
      splitLine: {
        show: false
      },
      boundaryGap: false,
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
        show: true,
        color: 'rgba(241,241,241,0.8)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#2a2f3d'
        }
      }
    },
    series: [{
      name: '数据',
      type: 'line',
      smooth: true,
      symbolSize: 4,
      lineStyle: {
        width: 1
      },
      areaStyle: {
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
      },
      data: data.map(item => {
        return item['value']
      })
    }]
  }
  return option
}

// 折线图--没有area属性
let setLine4 = (data, dataType, legend, color) => {
  let option = {
    grid: {
      containLabel: false
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
        color: 'rgba(241,241,241,0.8)'
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
        color: 'rgba(241,241,241,0.8)',
        formatter: dataType === 'integer' ? '{value}' : '{value} %'
      },
      splitLine: {
        show: false
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
        width: 1
      },
      label: {
        show: true,
        fontSize: 18,
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
        fontSize: 16
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

// 折线图--dataZoom属性
let setLine5 = (data, callback) => {
  let date = []
  data.map((item) => {
    date.push(item.name)
    return {name: item.name, value: item.value}
  })
  callback(date)
  let option = {
    tooltip: {
      show: false,
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%']
      }
    },
    title: {
      show: false,
      position: 'left',
      text: '',
      textStyle: {
        color: '#00C6FF',
        fontSize: 16
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date,
      axisLine: {
        lineStyle: {
          color: '#2a2f3d'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        // interval: 0,
        color: '#F1F1F1',
        fontSize: 14
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        lineStyle: {
          color: '#2a2f3d'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#2a2f3d'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#F1F1F1',
        fontSize: 14
      }
    },
    dataZoom: [{
      start: 0,
      end: 100,
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
        color: '#157BD3',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      },
      // 是否显示detail，即拖拽时候显示详细数值信息。
      showDetail: false,
      // 拖动时，是否实时更新系列的视图。如果设置为 false，则只在拖拽结束的时候更新。
      realtime: false,
      fillerColor: 'rgba(51, 51, 51, 0.6)',
      dataBackground: {
        lineStyle: {
          color: '#7D7D7D',
          width: 1
        },
        areaStyle: {
          color: '#EEEEEE'
        }
      },
      borderColor: '#2A2F3D'
    }],
    series: [
      {
        name: '模拟数据',
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            color: 'rgb(255, 70, 131)'
          }
        },
        areaStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgb(255, 158, 68)'
              }, {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }],
              globalCoord: false
            }
          }
        },
        data: data
      }
    ]
  }
  return option
}

// 折线图
let setLine6 = (data, dataType, title) => {
  let option = {
    grid: {
      containLabel: false,
      left: 70
    },
    color: ['#30FF8D'],
    title: {
      show: function () { if (title !== undefined) { return true } else { return false } },
      left: 'center',
      top: '20',
      text: title,
      textStyle: {
        color: '#f1f1f1',
        fontSize: 14,
        fontWeight: 350
      }
    },
    tooltip: {
      show: true,
      trigger: 'item',
      position: 'right',
      formatter: '{c}',
      backgroundColor: '#FFB20C'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(241,241,241,0.8)'
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
        show: true,
        color: 'rgba(241,241,241,0.8)',
        formatter: dataType === 'integer' ? '{value}' : '{value} %'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#2a2f3d'
        }
      }
    },
    series: [{
      name: 'seriesname',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 1
      },
      areaStyle: {
        color: 'rgba(76, 241, 157, 0.2)'
      },
      data: data.map(item => {
        return item['value']
      })
    }]
  }
  return option
}

// 折线图
let setLine7 = (data, dataType) => {
  let option = {
    grid: {
      containLabel: false
    },
    color: ['#30FF8D'],
    tooltip: {
      show: true,
      trigger: 'item',
      position: 'right',
      formatter: function (t) {
        return data[t.dataIndex].type
      },
      backgroundColor: '#FFB20C'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(241,241,241,0.8)'
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
        show: true,
        color: 'rgba(241,241,241,0.8)',
        formatter: dataType === 'integer' ? '{value}' : '{value} %'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#2a2f3d'
        }
      }
    },
    series: [{
      name: 'seriesname',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 1
      },
      data: data.map(item => {
        return item['value']
      })
    }]
  }
  return option
}

// 圆环图
let setPie = (data1, data2) => {
  let option = {
    color: ['#1C53B3', '#3E79DF', '#FF936D', '#45FFA9', '#FDBF5E', '#FFF281', '#FF7279'],
    series: [
      {
        name: '调解',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],

        label: {
          normal: {
            position: 'inner'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: data1
      },
      {
        name: '调解',
        type: 'pie',
        radius: ['40%', '55%'],
        label: {
          normal: {
            formatter: '{c|{c}}\n {hr|}\n {b|{b}}',
            rich: {
              c: {
                fontSize: 20,
                lineHeight: 21,
                align: 'center'
              },

              hr: {
                borderColor: '#fff',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              b: {
                color: '#1194F8',
                fontSize: 16,
                lineHeight: 20
              }
            }
          }
        },
        data: data2
      }
    ]
  }
  return option
}

// 圆环图
let setPie2 = (data) => {
  let option = {
    color: ['#7DA5FE', '#F24848', '#FFC400', '#0E57FC', '#3674FF'],
    tooltip: {
      show: true
    },
    series: [
      {
        name: '调解',
        type: 'pie',
        center: ['55%', '55%'],
        radius: ['40%', '55%'],
        avoidLabelOverlap: true,
        label: {
          normal: {
            // formatter: '{c|{c}}\n {hr|}\n {b|{b}}',
            formatter: '{b|{b}}',
            rich: {
              c: {
                color: '#FFC600',
                fontSize: 12,
                lineHeight: 16,
                align: 'center'
              },

              hr: {
                borderColor: 'rgba(241,241,241,0.8)',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              b: {
                color: '#f1f1f1',
                fontSize: 12,
                lineHeight: 16
              }
            }
          }
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(241,241,241,0.8)'
          }
        },
        data: data
      }
    ]
  }
  return option
}

// 圆环图
let setPie3 = (data, showRose) => {
  let newdata = data
  let maxValIndex = 0
  let maxVal = parseInt(newdata[0].value)
  for (let i = 0; i < newdata.length; i++) {
    if (parseInt(newdata[i].value) > maxVal) {
      maxVal = parseInt(newdata[i].value)
      maxValIndex = i
    }
  }
  newdata[maxValIndex]['labelLine'] = {
    show: true,
    lineStyle: {
      color: 'rgba(241,241,241,0.8)'
    }
  }
  newdata[maxValIndex]['label'] = {
    normal: {
      show: true,
      formatter: '{d|{b}}\n{d|{d}%}\n',
      rich: {
        c: {
          color: '#f1f1f1',
          fontSize: 14,
          lineHeight: 16,
          align: 'center'
        },
        d: {
          color: '#f1f1f1',
          fontSize: 14,
          lineHeight: 16,
          align: 'center'
        }
      }
    }
  }
  let option = {
    legend: {
      orient: 'vertical',
      top: '20%',
      right: 10,
      textStyle: {
        color: 'rgba(241,241,241,0.8)',
        fontSize: 12
      },
      itemWidth: 12,
      itemHeight: 6,
      data: data.map(item => {
        return item.name
      })
    },
    color: ['#F77C88', '#854DB5', '#9979CC', '#FED481', '#D9A701', '#D9A701', '#FBD939'],
    series: [
      {
        name: 'seriesName',
        type: 'pie',
        center: ['42%', '50%'],
        radius: ['40%', '55%'],
        roseType: showRose || false,
        avoidLabelOverlap: true,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: newdata
      }
    ]
  }
  return option
}

// 圆环图
let setPie4 = (data, title, bgColorOpacity, titlePosition) => {
  let color = ['#00ECF6', '#0A4179']
  let option = {
    title: {
      x: 'center',
      y: titlePosition || 'bottom',
      // bottom: 6,
      text: title || '标题',
      textStyle: {
        color: '#1194F8',
        fontSize: 12
      }
    },
    color: color,
    series: [{
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['65%', '75%'],
      label: {
        show: false
      },
      data: data
    }, {
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['0%', '65%'],
      data: [{
        value: 0,
        name: data[0] + '%',
        label: {
          show: true,
          position: 'center',
          fontSize: 16,
          color: color[0]
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

// 圆环图
let setPie6 = (data, dataType, isPie, color) => {
  isPie = isPie || false
  color = color || ['#95B6FF', 'rgba(241,241,241,0.8)', '#EC4050', '#FEC596', '#F59B5B', '#F18D47', '#F77C88']
  let option = {
    legend: {
      orient: 'center',
      top: 'middle',
      right: '5%',
      textStyle: {
        color: 'rgba(241,241,241,0.8)',
        fontSize: 12
      },
      itemWidth: 12,
      itemHeight: 6,
      data: data.map(item => {
        return item.name
      })
    },
    tooltip: {
      show: true,
      formatter: function (params) {
        if (dataType === 'percent') {
          return params.name + ': ' + params.percent + '%'
        } else {
          return params.name + ': ' + params.value + '件'
        }
      }
    },
    color: color,
    series: [
      {
        name: '饼图',
        type: 'pie',
        center: ['35%', '50%'],
        radius: isPie ? ['0', '70%'] : ['65%', '80%'],
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  }
  return option
}

let setMapbox = (caseData, centerPoint) => {
  const osmUrl = urlConfig.osmUrl
  const option = {
    visualMap: [{
      type: 'continuous',
      show: false,
      max: 100,
      calculable: true,
      realtime: false,
      inRange: {
        color: ['#1122a5', '#2939f8', '#2737ff', '#2c3dfd', '#408bff', '#3180ff', '#89ffff', '#e6ffff']
      },
      outOfRange: {
        colorAlpha: 0
      },
      seriesIndex: [0]
    }],
    mapbox: {
      // style: 'mapbox://styles/mapbox/dark-v9',
      style: {
        'version': 8,
        'glyphs': `${osmUrl}/fonts/{fontstack}/{range}.pbf`,
        'sources': {
          'osm-tiles': {
            'type': 'raster',
            'tiles': [
              `${osmUrl}/styles/customDarkStyle/{z}/{x}/{y}.png`
            ],
            'tileSize': 256
          }
        },
        'layers': [{
          'id': 'background',
          'type': 'raster',
          'source': 'osm-tiles',
          'minzoom': 0,
          'maxzoom': 22
        }]
      },
      // 地图中心经纬度。经纬度用数组
      // center: [121.5193, 31.163070],
      center: centerPoint,
      // 地图的缩放等级
      zoom: 9,
      // 视角俯视的倾斜角度
      pitch: 60,
      // 地图的旋转角度
      bearing: -10,
      boxHeight: 7,
      // 后处理特效的相关配置
      postEffect: {
        enable: true,
        // 环境光遮蔽
        SSAO: {
          enable: false,
          // 质量，支持'low', 'medium', 'high', 'ultra'
          quality: 'medium',
          // 采样半径。半径越大效果越自然，但是需要设置较高的'quality'。
          radius: 2,
          // 强度。值越大颜色越深。
          intensity: 1.5
        }
      },
      // 光照相关的设置
      light: {
        // 场景主光源的设置
        main: {
          // 主光源的强度
          intensity: 1,
          // 主光源是否投射阴影
          shadow: false,
          // 阴影的质量
          shadowQuality: 'medium'
        },
        // 全局的环境光设置。
        ambient: {
          // 环境光的强度。
          intensity: 0
        }
      }
    },
    series: [{
      name: '分布',
      type: 'bar3D',
      coordinateSystem: 'mapbox',
      // 三维柱状图中三维图形的着色效果：'color' 只显示颜色，不受光照等其它因素的影响。'lambert' 通过经典的 lambert 着色表现光照带来的明暗。'realistic' 真实感渲染，配合 light.ambientCubemap 和 postEffect 使用可以让展示的画面效果和质感有质的提升。
      shading: 'realistic',
      barSize: 0.3,
      minHeight: 2,
      data: caseData,
      silent: false,
      zlevel: -10,
      emphasis: {
        label: {
          show: false,
          formatter: function (component) {
            return `名称: ${component.name}\n数量: ${component.value[2]}件`
          },
          textStyle: {
            color: '#000000',
            borderWidth: 0,
            fontSize: 20,
            fontWeight: 'bold'
          }
        }
      }
    }]
  }
  return option
}

// 区域分析 sankey
let setSankey = (data) => {
  let option = {
    series: {
      type: 'sankey',
      draggable: false,
      data: [{
        name: 'a'
      }, {
        name: 'b'
      }, {
        name: 'a1'
      }, {
        name: 'a2'
      }],
      links: [{
        source: 'a',
        target: 'a1',
        value: 5
      }, {
        source: 'a',
        target: 'a2',
        value: 3
      }, {
        source: 'b',
        target: 'a1',
        value: 5
      }, {
        source: 'b',
        target: 'a2',
        value: 3
      }]
    }
  }
  return option
}

let setBar5 = (dateRange, data) => {
  dateRange = dateRange || ''
  let xLabel = []
  let value1 = []
  let value2 = []
  if (data) {
    xLabel = data.map(item => { return item.shortname })
    value1 = data.map(item => { return item.login })
    value2 = data.map(item => { return (item.hot * 100).toFixed(1) })
  }
  let maxValue1 = value1.length === 0 ? 1000 : (10 - (parseInt(1.1 * Math.max(...value1)) % 10) + parseInt(1.1 * Math.max(...value1)))
  let interval1 = maxValue1 / 10
  let option = {
    tooltip: {
      trigger: 'axis'
      // formatter: '{b}<br/>{a0}: {c0}次<br/>{a1}: {c1}%'
    },
    title: {
      left: 'center',
      text: dateRange,
      textStyle: {
        color: '#F1F1F1'
      }
    },
    legend: {
      right: 30,
      data: ['登录人次', '热度'],
      textStyle: {
        color: '#F1F1F1'
      }
    },
    grid: {
      left: 80,
      right: 80,
      bottom: 30
    },
    xAxis: [
      {
        type: 'category',
        data: xLabel,
        axisLabel: {
          color: '#F1F1F1'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [{
      type: 'value',
      name: '登录人次',
      nameTextStyle: {
        color: '#F1F1F1'
      },
      min: 0,
      max: maxValue1,
      // splitNumber: 10,
      interval: interval1,
      axisLabel: {
        formatter: '{value} 次',
        color: '#F1F1F1'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#2A2F3D'
        }
      }
    }, {
      type: 'value',
      name: '热度',
      nameTextStyle: {
        color: '#F1F1F1'
      },
      min: 0,
      max: 100,
      splitNumber: 10,
      axisLabel: {
        formatter: '{value} %',
        color: '#F1F1F1'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#2A2F3D'
        }
      }
    }],
    series: [
      {
        name: '登录人次',
        type: 'bar',
        data: value1,
        yAxisIndex: 0,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#4D92E0'
            }, {
              offset: 1,
              color: '#1167CC'
            }],
            globalCoord: false
          }
        }
      },
      {
        name: '热度',
        type: 'bar',
        data: value2,
        yAxisIndex: 1,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#FFDA8A'
            }, {
              offset: 1,
              color: '#FFAF3C'
            }],
            globalCoord: false
          }
        }
      }
    ]
  }
  return option
}

export default {setBar, setBar3, setBar4, setRadar2, setLine, setLine2, setLine4, setLine5, setLine6, setLine7, setPie, setPie2, setPie3, setPie4, setPie6, setMapbox, setSankey, setBar5}
