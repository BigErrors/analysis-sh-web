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
      color: '#4D84FE',
      fontSize: barMaxWidth < 16 ? barMaxWidth : 16,
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
      color: '#4D84FE',
      interval: 0,
      rotate: rotate || 0,
      fontSize: 15,
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
        }
      },
      label: {
        show: true,
        position: axisType === 'vertical' ? 'top' : 'right',
        color: color[1],
        fontSize: 13
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
      color: '#1194F8',
      fontSize: 12
    },
    splitLine: {
      show: false
    }
  }]
  let categoryAxis = [{
    type: 'category',
    boundaryGap: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#1F3490'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      color: '#1194F8',
      fontSize: 12,
      interval: 0,
      rotate: 0,
      formatter: function (value) {
        return value
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
    legend: {
      type: 'plain',
      orient: 'horizontal',
      top: 'top',
      right: '5%',
      textStyle: {
        color: '#7DA5FE',
        fontSize: 16
      },
      data: [{name: '新增'}, {name: '未完成'}]
    },
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
      name: '未完成',
      type: 'bar',
      stack: 'bar',
      z: 3,
      itemStyle: {
        color: '#1194F8'
      },
      label: {
        show: false
      },
      data: data.map(function (obj) {
        return obj.value2
      })
    },
    {
      name: '新增',
      type: 'bar',
      stack: 'bar',
      z: 3,
      itemStyle: {
        color: '#7CF7E7'
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
let setLine2 = (data, showYAxis) => {
  let option = {
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
        color: '#1194F8'
      },
      splitLine: {
        show: false
      },
      boundaryGap: false,
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
        show: showYAxis || false,
        color: '#1194F8'
      },
      splitLine: {
        show: false
      }
    },
    series: []
  }
  if (data[0] && data[0]['gankongzs_ls']) {
    option.color = ['#1254C2', '#00FFFF']
    option.xAxis.data = data.map(item => {
      return item['time']
    })
    option.yAxis.splitNumber = 1
    option.yAxis.max = 8
    option.yAxis.min = 6
    option.series[0] = {
      name: '历史同期',
      type: 'line',
      smooth: true,
      symbolSize: 1,
      lineStyle: {
        width: 1
      },
      data: data.map(item => {
        return item['gankongzs_ls']
      })
    }
    option.series[1] = {
      name: '和谐指数',
      type: 'line',
      smooth: true,
      symbolSize: 1,
      lineStyle: {
        width: 1
      },
      areaStyle: {
        opacity: 0.4
      },
      data: data.map(item => {
        return item['gankongzs']
      })
    }
  }
  if (data[0] && data[0]['value']) {
    option.color = ['#00FFFF']
    option.xAxis.data = data.map(item => {
      return item['name']
    })
    option.series[0] = {
      name: '数据',
      type: 'line',
      smooth: true,
      symbolSize: 1,
      lineStyle: {
        width: 1
      },
      areaStyle: {
        opacity: 0.4
      },
      data: data.map(item => {
        return item['value']
      })
    }
  }
  if (data[0] && data[0]['number']) {
    option.color = ['#00FFFF']
    option.xAxis.data = data.map(item => {
      return item['time']
    })
    option.series[0] = {
      name: '数量',
      type: 'line',
      smooth: true,
      symbolSize: 1,
      lineStyle: {
        width: 1
      },
      areaStyle: {
        opacity: 0.4
      },
      data: data.map(item => {
        return item['number']
      })
    }
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
          color: '#4D84FE'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        // interval: 0,
        color: '#4D84FE'
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        lineStyle: {
          color: '#4D84FE'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#4D84FE'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#4D84FE'
      }
    },
    dataZoom: [{
      start: 85,
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
      fillerColor: '#1F3490',
      dataBackground: {
        lineStyle: {
          color: '#7D7D7D',
          width: 1
        },
        areaStyle: {
          color: '#EEEEEE'
        }
      },
      borderColor: '#1F3490'
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
      containLabel: false
    },
    color: ['#30FF8D'],
    title: {
      show: function () { if (title !== undefined) { return true } else { return false } },
      left: '10%',
      text: title,
      textStyle: {
        color: '#FFC600',
        fontSize: 18
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
        color: '#4D84FE'
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
        show: false,
        color: '#4D84FE',
        formatter: dataType === 'integer' ? '{value}' : '{value} %'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#295086'
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
        color: '#4D84FE'
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
        color: '#4D84FE',
        formatter: dataType === 'integer' ? '{value}' : '{value} %'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#295086'
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
        radius: ['40%', '55%'],
        avoidLabelOverlap: true,
        label: {
          normal: {
            // formatter: '{c|{c}}\n {hr|}\n {b|{b}}',
            formatter: '{b|{b}}',
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
let setPie3 = (data, showRose) => {
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
        name: 'seriesName',
        type: 'pie',
        center: ['35%', '50%'],
        radius: ['40%', '55%'],
        roseType: showRose || false,
        avoidLabelOverlap: true,
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
  color = color || data.length > 4 ? ['#95B6FF', '#4D84FE', '#EC4050', '#FEC596', '#F59B5B', '#F18D47', '#F77C88'] : ['#FFBB50', '#00E767', '#35C4F9', '#FF4240']
  let option = {
    legend: {
      orient: 'center',
      top: 'middle',
      right: '5%',
      textStyle: {
        color: '#7DA5FE',
        fontSize: 16
      },
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
        radius: isPie ? ['0', '80%'] : ['65%', '80%'],
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

let setMapbox = (mapData) => {
  const osmUrl = urlConfig.osmUrl
  const option = {
    visualMap: [{
      type: 'continuous',
      show: false,
      max: 30,
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
              `${osmUrl}/styles/dark-matter/{z}/{x}/{y}.png`
            ],
            'tileSize': 256
          }
        },
        'layers': [{
          'id': 'dark-matter',
          'type': 'raster',
          'source': 'osm-tiles',
          'minzoom': 0,
          'maxzoom': 22
        }]
      },
      // 地图中心经纬度。经纬度用数组
      center: [121.5193, 31.163070],
      // 地图的缩放等级
      zoom: 9.5,
      // 视角俯视的倾斜角度
      pitch: 50,
      // 地图的旋转角度
      bearing: -10,
      boxHeight: 6,
      // 后处理特效的相关配置
      postEffect: {
        enable: true,
        // 环境光遮蔽
        SSAO: {
          enable: true,
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
        },
        ambientCubemap: {
          texture: './static/data-1491896094618-H1DmP-5px.hdr',
          exposure: 1,
          diffuseIntensity: 0.5
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
      data: mapData,
      silent: false,
      emphasis: {
        label: {
          show: true,
          zIndex: 10,
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
    },
    {
      name: '重点事件',
      type: 'bar3D',
      coordinateSystem: 'mapbox',
      shading: 'realistic',
      barSize: 0.5,
      data: [
        // {name: '重点事件1', value: [121.642938, 30.880678, 100000], type: '类别', date: '日期', address: '地址'},
        // {name: '重点事件2', value: [121.542938, 30.880678, 100000], type: '类别', date: '日期', address: '地址'},
        // {name: '重点事件3', value: [121.442938, 30.880678, 100000], type: '类别', date: '日期', address: '地址'},
        // {name: '重点事件4', value: [121.342938, 30.880678, 100000], type: '类别', date: '日期', address: '地址'},
        // {name: '重点事件5', value: [121.242938, 30.880678, 100000], type: '类别', date: '日期', address: '地址'}
      ],
      // symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAABRCAYAAABcxs+uAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUyMDNFQkVDNzlCOTExRThCMDgxRDE1NjA0MUE5NzQ2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUyMDNFQkVENzlCOTExRThCMDgxRDE1NjA0MUE5NzQ2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTIwM0VCRUE3OUI5MTFFOEIwODFEMTU2MDQxQTk3NDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTIwM0VCRUI3OUI5MTFFOEIwODFEMTU2MDQxQTk3NDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5eA6HCAAAMvUlEQVR42qxZ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',
      // symbolSize: [64, 128],
      silent: false
    }]
  }
  return option
}

export default {setBar, setBar3, setBar4, setRadar2, setLine, setLine2, setLine4, setLine5, setLine6, setLine7, setPie, setPie2, setPie3, setPie4, setPie6, setMapbox}
