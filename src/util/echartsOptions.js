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
let setBar2 = (data) => {
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
    color: ['#0847D6', '#1763F2', '#5D9BFF'],
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
      name: '法律服务',
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
    }]
  }
  return option
}

// 柱图
let setBar3 = (data, color, axisType, dataType, barMaxWidth, portrait) => {
  barMaxWidth = barMaxWidth || 43
  // 找出value中的最大值
  let maxValue = Math.max(...data.map(function (obj) { return obj.value }))
  if (portrait) {
    maxValue = data.reduce(function (total, item) {
      return total + item.value
    }, 0)
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
      show: axisType === 'vertical',
      interval: 'auto',
      color: '#4D84FE',
      fontSize: 16,
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
      color: '#4D84FE',
      fontSize: 15,
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
    tooltip: {
      show: false
    },
    grid: {
      left: 120
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
        fontSize: 20
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

// 雷达图
let setRadar = (data) => {
  let option = {
    title: {},
    tooltip: {},
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
      indicator: data.map(item => {
        return {name: item.mingcheng, max: 10}
      })
    },
    series: [{
      name: 'radar',
      type: 'radar',
      itemStyle: {
        color: '#26CEFF',
        opacity: 1
      },
      areaStyle: {
        color: '#1669EE'
      },
      data: [
        {
          value: data.map(item => {
            return Number(item.shuzhi)
          }),
          name: '处理效率'
        }
      ]
    }]
  }
  return option
}

// 雷达图
let setRadar2 = (data, indicator) => {
  let option = {
    title: {},
    tooltip: {},
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
      left: '3%',
      right: '4%',
      bottom: '3%',
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
    title: {},
    tooltip: {
      trigger: 'axis'
    },
    color: ['#1254C2', '#00FFFF'],
    grid: {
      left: 15,
      top: 0,
      bottom: 0,
      containLabel: true
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
        color: '#1194F8'
      },
      splitLine: {
        show: false
      },
      boundaryGap: false,
      data: [0, 3, 6, 9, 12, 15, 18, 21, 24]
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
        show: false
      },
      splitLine: {
        show: false
      },
      splitNumber: 1,
      max: 8,
      min: 6
    },
    series: [
      {
        name: '历史同期',
        type: 'line',
        // smooth: true,
        symbolSize: 1,
        lineStyle: {
          width: 1
        },
        data: []
      }, {
        name: '和谐指数',
        type: 'line',
        // smooth: true,
        symbolSize: 1,
        lineStyle: {
          width: 1
        },
        areaStyle: {
          opacity: 0.4
        },
        data: []
      }
    ]
  }
  // 数据动态更新
  // let i = 1
  // .slice(0, i)
  option.xAxis.data = data.map(item => {
    return item['time']
  })
  option.series[0].data = data.map(item => {
    return item['gankongzs_ls']
  })
  option.series[1].data = data.map(item => {
    return item['gankongzs']
  })
  // setInterval(() => {
  //   i++
  //   option.xAxis.data = data.slice(0, i).map(item => {
  //     return item['time']
  //   })
  //   option.series[0].data = data.slice(0, i).map(item => {
  //     return item['gankongzs_ls']
  //   })
  //   option.series[1].data = data.slice(0, i).map(item => {
  //     return item['gankongzs']
  //   })
  // }, 5000)
  return option
}
// 折线图--有area属性
let setLine3 = (data) => {
  let maxValue = data.map(function (item) { return item.value })
  let option = {
    color: ['#1254C2'],
    grid: {
      left: 15,
      right: 15,
      top: 60,
      bottom: 30,
      containLabel: true
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
        show: true,
        color: '#1194F8'
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
        color: '#1194F8'
      },
      splitLine: {
        show: false
      },
      splitNumber: 7,
      max: maxValue,
      min: 0
    },
    series: [{
      name: name,
      type: 'line',
      smooth: true,
      symbolSize: 8,
      lineStyle: {
        width: 1
      },
      areaStyle: {
        opacity: 0.8,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0, color: '#495AFF' // 0% 处的颜色
          }, {
            offset: 1, color: '#0ACFFE' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      },
      label: {
        show: true,
        position: 'top',
        color: '#0AAAD9',
        fontSize: 20
      },
      data: []
    }]
  }
  option.xAxis.data = data.map(function (item) { return item.name })
  option.series[0].data = data.map(function (item) { return item.value })
  return option
}
// 折线图--没有area属性
let setLine4 = (data, dataType, legend, color) => {
  let option = {
    grid: {
      left: 15,
      right: 15,
      top: 15,
      bottom: 15,
      containLabel: true
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
        color: '#4D84FE'
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
        color: '#4D84FE',
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

// 液体填充配置项
let fillOption = (center, data, color, fillData, fillFontSize, borderColor) => {
  color = color || '#3699F1'
  return {
    type: 'liquidFill',
    radius: '75%',
    center: center,
    color: [color],
    itemStyle: {
      opacity: 1
    },
    emphasis: {
      itemStyle: {
        opacity: 0.5
      }
    },
    outline: {
      borderDistance: 1,
      itemStyle: {
        borderColor: borderColor || color,
        borderWidth: 2,
        shadowBlur: 8
      }
    },
    backgroundStyle: {
      color: 'transparent'
    },
    label: {
      color: '#ffffff',
      fontSize: fillFontSize || 13,
      fontWeight: 'normal',
      formatter: function () {
        return data <= 1 ? data * 100 + '%' : data
      }
    },
    animationDuration: 1000,
    animationDurationUpdate: 1000,
    period: 3000,
    data: fillData || [0.25, 0.1]
  }
}

// 液体填充
let setFill = (data, color, text, fillData, fillFontSize, borderColor) => {
  let option = {
    title: {
      text: text,
      // textAlign: 'center',
      textStyle: {
        color: '#1194F8',
        fontSize: 12
      },
      bottom: -5,
      left: 0
    },
    series: [fillOption(['50%', '38%'], data, color, fillData, fillFontSize, borderColor)]
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
    series: [
      {
        name: '调解',
        type: 'pie',
        radius: ['40%', '55%'],
        label: {
          normal: {
            formatter: '{c|{c}}\n {hr|}\n {b|{b}}',
            rich: {
              c: {
                color: '#FFC600',
                fontSize: 20,
                lineHeight: 21,
                align: 'center'
              },

              hr: {
                borderColor: '#4D84FE',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              b: {
                color: '#B8CEFF',
                fontSize: 16,
                lineHeight: 20
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

// 圆环图
let setPie3 = (data) => {
  let option = {
    legend: {
      orient: 'vertical',
      bottom: '35%',
      right: 30,
      textStyle: {
        color: '#7DA5FE',
        fontSize: 16
      },
      data: data.map(item => {
        return item.name
      })
    },
    color: ['#4D84FE', '#F4A869', '#9979CC', '#854DB5', '#EF5665', '#EF5665', '#F77C88'],
    series: [
      {
        name: '',
        type: 'pie',
        center: ['35%', '50%'],
        radius: ['25%', '40%'],
        label: {
          normal: {
            formatter: '{d|{d}%}\n {hr|}\n',
            rich: {
              c: {
                color: '#FFC600',
                fontSize: 17,
                lineHeight: 12,
                align: 'center'
              },
              d: {
                color: '#FFC600',
                fontSize: 17,
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

// 漏斗图
let setFunnel = (data) => {
  let option = {
    color: ['rgba(11,83,243,1)', 'rgba(11,83,243,0.8)', 'rgba(11,83,243,0.6)', 'rgba(11,83,243,0.4)', 'rgba(11,83,243,0.2)'],
    series: [
      {
        name: '1',
        type: 'funnel',
        maxSize: '55%',
        label: {
          position: 'right',
          formatter: function (t) {
            return `{b|${t.data.name}}\n{c|${t.data.other}}`
          },
          padding: [5, 5, 5, 5],
          rich: {
            b: {
              fontSize: 19,
              align: 'center',
              color: '#0134A5'
            },
            c: {
              fontSize: 25,
              align: 'center',
              color: '#001F77'
            }
          },
          width: 120,
          heitht: 60,
          backgroundColor: {
            image: 'static/renmintj/icon_label.png'
          }
        },
        labelLine: {
          show: true,
          length: 40,
          lineStyle: {
            color: '#5C8EFE',
            type: 'dotted'
          }
        },
        data: data
      },
      {
        name: '2',
        type: 'funnel',
        maxSize: '55%',
        label: {
          position: 'inside',
          formatter: '{b}',
          color: '#B1C5FF',
          fontSize: 16
        },
        data: data
      }
    ]
  }
  console.log(option)
  return option
}

let setWordcloud = (data, maskImage) => {
  let option = {
    series: [{
      type: 'wordCloud',

      // The shape of the "cloud" to draw. Can be any polar equation represented as a
      // callback function, or a keyword present. Available presents are circle (default),
      // cardioid (apple or heart shape curve, the most known polar equation), diamond (
      // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

      shape: 'diamond',
      maskImage: maskImage,

      // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
      // Default to be put in the center and has 75% x 80% size.

      width: '100%',
      height: '100%',

      // Text size range which the value in data will be mapped to.
      // Default to have minimum 12px and maximum 60px size.

      sizeRange: [10, 40],

      // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

      rotationRange: [-60, 60],
      rotationStep: 30,

      // size of the grid in pixels for marking the availability of the canvas
      // the larger the grid size, the bigger the gap between words.

      gridSize: 2,

      // Global text style
      textStyle: {
        normal: {
          color: function () {
            return 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')'
          }
        }
      },

      // Data is an array. Each array item must have name and value property.
      data: data
    }]
  }
  return option
}

// 地图
let setMap = (pointData) => {
  // let geoCoordMap = {
  //   '闵行': [121.368, 31.172],
  //   '奉贤': [121.481, 30.924],
  //   '黄浦': [121.491, 31.237],
  //   '宝山': [121.496, 31.266],
  //   '虹口': [121.512, 31.27],
  //   '长宁': [121.43, 31.227],
  //   '青浦': [121.131, 31.156],
  //   '杨浦': [121.532, 31.266],
  //   '浦东': [121.666, 31.214],
  //   '静安': [121.454, 31.234],
  //   '嘉定': [121.381, 31.272],
  //   '松江': [121.234, 31.038],
  //   '徐汇': [121.443, 31.195],
  //   '崇明': [121.406, 31.654],
  //   '金山': [121.317, 30.741]
  // }
  let geoCoordMap = {
    '闵行': [121.394878, 31.072511],
    '奉贤': [121.555854, 30.8803],
    '黄浦': [121.491, 31.237],
    '宝山': [121.440296, 31.401281],
    '虹口': [121.512, 31.27],
    '长宁': [121.43, 31.227],
    '青浦': [121.07968, 31.141832],
    '杨浦': [121.541702, 31.270352],
    '浦东': [121.736377, 31.088346],
    '静安': [121.454, 31.234],
    '嘉定': [121.20573, 31.372673],
    '松江': [121.178709, 30.992306],
    '徐汇': [121.43452, 31.170563],
    '崇明': [121.563184, 31.631849],
    '金山': [121.233758, 30.816867]
  }
  let convertData = function (data) {
    let res = []
    for (var i = 0; i < data.length; i++) {
      let geoCoord = geoCoordMap[data[i].name]
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        })
      }
    }
    return res
  }
  let getPointDataByTime = function (time) {
    return pointData.filter((item) => {
      if (item.riqi === time) {
        return true
      }
    }).map((item) => {
      return {
        name: item.diqu,
        value: item.shuliang
      }
    })
  }

  let sum = function (list) {
    let s = list.map(item => {
      return parseInt(item.value)
    }).reduce((total, current) => {
      return total + current
    })
    // console.log(s)
    return s
  }

  let maxAndMin = function (list) {
    list = list.map(item => {
      return parseInt(item.value)
    })
    return {max: list.reduce((v1, v2) => {
      return v1 < v2 ? v2 : v1
    }),
    min: list.reduce((v1, v2) => {
      return v1 < v2 ? v1 : v2
    })}
  }

  const sum1 = sum(getPointDataByTime('18-01'))
  const sum2 = sum(getPointDataByTime('18-02'))
  const sum3 = sum(getPointDataByTime('18-03'))
  const sum4 = sum(getPointDataByTime('18-04'))
  const sum5 = sum(getPointDataByTime('18-05'))
  console.log(sum1, sum2, sum3, sum4, sum5)

  let option = {
    baseOption: {
      timeline: {
        data: ['2018/01', '2018/02', '2018/03', '2018/04', '2018/05'],
        axisType: 'category',
        lineStyle: {
          width: 3,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
              offset: 0, color: '#007adf'
            }, {
              offset: 0.5, color: '#621ad9'
            }, {
              offset: 1, color: '#00ecbc'
            }]
          },
          opacity: 0.9
        },
        symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAPCAYAAAA/I0V3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFBQjlCMEU4NTk3MTExRThCMkZEREU2MzkzOEUyNzg1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFBQjlCMEU5NTk3MTExRThCMkZEREU2MzkzOEUyNzg1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUFCOUIwRTY1OTcxMTFFOEIyRkRERTYzOTM4RTI3ODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUFCOUIwRTc1OTcxMTFFOEIyRkRERTYzOTM4RTI3ODUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Or62fAAABBklEQVR42rzSvWoCQRDA8b3LIQi29wYSbUVjoiApRBFfwVpBJBAUfIgQQZRAsPchkjRa+QGa1oBvYCsBweTyX5iT9WIRUjjwY2/3ZnaXZSzP85QZsXflMNRwhz4GHwm1N3Mss4iCPEMPYUyQxScaFI6OikiO8v2AW7xhZWwcRwFjtCleW5dLTyfXZecZvtTvuMCNeNJF+n4dbCXBRhJpzLHAt/yLoOXIxC/Q1yzClXkZV3jF2s+zA9eoGAV+uLJ+CFv9I85fFJFxiE0gZyPrhzxHnruKqTzxM1K4ljX95BYy0iEdsyMekftTRwR6ryQnh+RUfdoOTZJfTjZsoMvv0T3V5T8CDADeNVMn4qZDZQAAAABJRU5ErkJggg==',
        symbolSize: [13, 15],
        label: {
          color: '#1194F8',
          fontSize: 14
        },
        emphasis: {
          label: {
            color: '#00F6FF',
            fontSize: 14
          }
        },
        checkpointStyle: {
          symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAApCAYAAACyXOB4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFFN0M0OEQ5NTk3MTExRTg5OUQzRUREODlDNzU4RjU3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFFN0M0OERBNTk3MTExRTg5OUQzRUREODlDNzU4RjU3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUU3QzQ4RDc1OTcxMTFFODk5RDNFREQ4OUM3NThGNTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUU3QzQ4RDg1OTcxMTFFODk5RDNFREQ4OUM3NThGNTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ZgMPXAAAE10lEQVR42syY228bRRTGvfY6cdw0TQuh3CVoG4FCRYAiAkjwxAsPvBSB+Af7gniiEgiJB5CABokKUCmFchGiQJM04LiOY2e9NmfQb6zPk1k3dRXgSJ9m43HmfD73nWTx4qB0B5KM2Zv44HRCEkmAGCHFbZFMb5NMWZAEz0qoD/S5v19y6T4JecUVkMqqxJREz5DLmsv+YFJS6h5PpgqmQJUz9JweyAy7IAN5xL37IhW6ylvEkZg21FhnWKfEYt5CjkjXsMPaYd0VyxW6NC1wlRLyVpkBh0AdTGMxTyqDhCPUNmyDHeCtV+jStICQd9W0WGUWzIHD/D0DaU9qF+Utw01DE7Q4cwe93cClQ2JphFAqhOpYxSk/Ypg3HGU9Ajm39zj4FrQgsmVoGP5inWJvW+I1w6VDYiEpT6gWIXPMcBc4xmfu+QzWWTWcNpw0fGHYhMgmZ2kMViKlpOeDPxXGnpS30GFRfLdhQeAULBuOGz43XOXgnw2nDC8arhu+EmvOBPGXBFnoAz9JJdMqgZXmIOQU38s6j9Ilw/eGjzC/iiP4i+Fpw6uGS5xd4/yKuEpr2DAj0wLXzUJgAUL3Gx4xPEOgvkucFIlz5wXDd1jtBC6toK8vtSsLSkWSBgVSM20etzkyL/HsFP0UEHA/6DHDE1jlitQfR/w8pFaIt48h0ZYy0eGzf7iUC9xXx30u094iYN+OEHrAcNbwpOEG61ksq/Ij/9/gvKOcX0efBn9J3VcJSoHPvCrBrDLHL7/PcA1lJUqAs/Arhj+wbJO9jHOWOXc2KL7DjNSSUCmoUaE8R6C77Pom0r8akHOJ8TouDX/UoYBQKvE2TM3QWr7PxWYl56LLhjUIJSTEEqtP9et8b7mgv05LU9e6lcTajE4DRZKJGx8iLpw8bLjH8Ctuy8acUY0QGgZ4rBGXpZ6Mk1NCyEuNz28llYjOJCQVm6MOUmJ6RkgNCubrg5SYnkFIqh8gP2BSeUTnCCkllkv5Hxekvs91gr2ONOhbJUsm5EaGvEGEkB9nY/I1s5MrCeuk/QJZt0ZlL1GnjvP9mOu6Mr8rseE8NZA3j4x/aDOQhXIBIivUpmuQW2ffVfQHqejvSEVX2eb8rgx5uU6eGk+ZDPwtKnOPQe5LmRCdog+oUStYah1rucM/hGz4PvAUZ2xxfjsYi0cmz75YqcMvadLlzxleNrxh+IxBzosrkr8xJZzGVToleHGTxvNMoec4twmpTkBqJKbywEoN+tMUnz9qeJZ4+lSacB93Xo64yU0DL9DrVpkyfifuGujxr2G5xtQgYqmW9KWypPCGYdHwGgPcxYIsrTIQLtK0r0JijZ64IS7sSFztcV8upCratdnbZS9n3HWN+U0C/wchdJI4c8rfw0Ubghu4cYswGes+b61uUP7DBNhmdl9lGj2DSy8xfbre94m46E9IbPLciAR6r6gk9CW7ShG3Kqkmg9omgb7EnHWF2Cp672vyghorCXteRgeSMb2gL+ndgGamviE7d74/5g35JtDADkvBHlIhsZilfLz5olqXGTu84PDfK7pLUOv0x90lhI25LAnQCyzWhkxNxtlyJIsVE9+66BfCm7hciHXu4H4qn+R+Kpx3NAtDS/zrN3mxWNNp4j+98wxd2v+/3A6H5AYHeY/+twADALmfTNaHVS4/AAAAAElFTkSuQmCC',
          symbolSize: [21, 23]
        },
        controlStyle: {
          showPlayBtn: false,
          showPrevBtn: false,
          showNextBtn: false
        }
      },
      geo: {
        map: 'shanghai',
        zoom: 1.3,
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#00467F',
            borderColor: '#111'
          },
          emphasis: {
            areaColor: '#2B91B7'
          }
        }
      },
      series: [{
        name: '散点',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: function (component) {
              return component.value[2]
            },
            top: 'center',
            left: 'center',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#FDCD0F',
            shadowBlur: 10,
            shadowColor: '#FDCD0F'
          }
        },
        zlevel: 1
      }]
    },
    options: [
      {
        series: [{
          symbolSize: function (val) {
            return (val[2] - maxAndMin(getPointDataByTime('18-01')).min) / (maxAndMin(getPointDataByTime('18-01')).max - maxAndMin(getPointDataByTime('18-01')).min) * 100
          },
          data: convertData(getPointDataByTime('18-01'))
        }
        ]
      },
      {
        series: [{
          symbolSize: function (val) {
            return (val[2] - maxAndMin(getPointDataByTime('18-02')).min) / (maxAndMin(getPointDataByTime('18-02')).max - maxAndMin(getPointDataByTime('18-02')).min) * 100
          },
          data: convertData(getPointDataByTime('18-02'))
        } ]
      },
      {
        series: [{
          symbolSize: function (val) {
            return (val[2] - maxAndMin(getPointDataByTime('18-03')).min) / (maxAndMin(getPointDataByTime('18-03')).max - maxAndMin(getPointDataByTime('18-03')).min) * 100
          },
          data: convertData(getPointDataByTime('18-03'))
        }]
      },
      {
        series: [{
          symbolSize: function (val) {
            return (val[2] - maxAndMin(getPointDataByTime('18-04')).min) / (maxAndMin(getPointDataByTime('18-04')).max - maxAndMin(getPointDataByTime('18-04')).min) * 100
          },
          data: convertData(getPointDataByTime('18-04'))
        }]
      },
      {
        series: [{
          symbolSize: function (val) {
            return (-(val[2] - sum5) / sum5) * 40
          },
          data: convertData(getPointDataByTime('18-05'))
        }]
      }
    ]
  }
  return option
}

export default {setBar, setBar2, setBar3, setRadar, setRadar2, setLine, setLine2, setLine3, setLine4, setFill, setPie, setPie2, setPie3, setFunnel, setWordcloud, setMap}
