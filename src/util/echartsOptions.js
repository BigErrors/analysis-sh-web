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
        fontSize: 14
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
      containLabel: false
    },
    color: ['#30FF8D'],
    title: {
      show: function () { if (title !== undefined) { return true } else { return false } },
      left: 'center',
      top: '20',
      text: title,
      textStyle: {
        color: '#f1f1f1',
        fontSize: 14
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
          color: 'rgba(241,241,241,0.8)'
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

let setMapbox = (caseData) => {
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
        'sprite': 'http://7xu37n.com1.z0.glb.clouddn.com/sprite5',
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
          'id': 'background',
          'type': 'raster',
          'source': 'osm-tiles',
          'minzoom': 0,
          'maxzoom': 22
        }]
      },
      // 地图中心经纬度。经纬度用数组
      center: [121.5193, 31.163070],
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

// 区域分析桑吉图 graph echarts 3.8.5
let setGraph = (data) => {
  let categories = []
  let graph = data || {
    nodes: [{'id': '0', 'name': '银江研究院', 'itemStyle': {'normal': {}}, 'symbolSize': 28.685715, 'attributes': {'modularity_class': 0}}, {'id': '1', 'name': 'Napoleon', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 0}}, {'id': '2', 'name': 'MlleBaptistine', 'itemStyle': {'normal': {}}, 'symbolSize': 9.485714, 'attributes': {'modularity_class': 1}}, {'id': '3', 'name': 'MmeMagloire', 'itemStyle': {'normal': {}}, 'symbolSize': 9.485714, 'attributes': {'modularity_class': 1}}, {'id': '4', 'name': 'CountessDeLo', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 0}}, {'id': '5', 'name': 'Geborand', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 0}}, {'id': '6', 'name': 'Champtercier', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 0}}, {'id': '7', 'name': 'Cravatte', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 0}}, {'id': '8', 'name': 'Count', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 0}}, {'id': '9', 'name': 'OldMan', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 0}}, {'id': '10', 'name': 'Labarre', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 1}}, {'id': '11', 'name': 'Valjean', 'itemStyle': {'normal': {}}, 'symbolSize': 100, 'attributes': {'modularity_class': 1}}, {'id': '12', 'name': 'Marguerite', 'itemStyle': {'normal': {}}, 'symbolSize': 6.742859, 'attributes': {'modularity_class': 1}}, {'id': '13', 'name': 'MmeDeR', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 1}}, {'id': '14', 'name': 'Isabeau', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 1}}, {'id': '15', 'name': 'Gervais', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 1}}, {'id': '16', 'name': 'Tholomyes', 'itemStyle': {'normal': {}}, 'symbolSize': 25.942856, 'attributes': {'modularity_class': 2}}, {'id': '17', 'name': 'Listolier', 'itemStyle': {'normal': {}}, 'symbolSize': 20.457146, 'attributes': {'modularity_class': 2}}, {'id': '18', 'name': 'Fameuil', 'itemStyle': {'normal': {}}, 'symbolSize': 20.457146, 'attributes': {'modularity_class': 2}}, {'id': '19', 'name': 'Blacheville', 'itemStyle': {'normal': {}}, 'symbolSize': 20.457146, 'attributes': {'modularity_class': 2}}, {'id': '20', 'name': 'Favourite', 'itemStyle': {'normal': {}}, 'symbolSize': 20.457146, 'attributes': {'modularity_class': 2}}, {'id': '21', 'name': 'Dahlia', 'itemStyle': {'normal': {}}, 'symbolSize': 20.457146, 'attributes': {'modularity_class': 2}}, {'id': '22', 'name': 'Zephine', 'itemStyle': {'normal': {}}, 'symbolSize': 20.457146, 'attributes': {'modularity_class': 2}}, {'id': '23', 'name': 'Fantine', 'itemStyle': {'normal': {}}, 'symbolSize': 42.4, 'attributes': {'modularity_class': 2}}, {'id': '24', 'name': 'MmeThenardier', 'itemStyle': {'normal': {}}, 'symbolSize': 31.428574, 'attributes': {'modularity_class': 7}}, {'id': '25', 'name': 'Thenardier', 'itemStyle': {'normal': {}}, 'symbolSize': 45.142853, 'attributes': {'modularity_class': 7}}, {'id': '26', 'name': 'Cosette', 'itemStyle': {'normal': {}}, 'symbolSize': 31.428574, 'attributes': {'modularity_class': 6}}, {'id': '27', 'name': 'Javert', 'itemStyle': {'normal': {}}, 'symbolSize': 47.88571, 'attributes': {'modularity_class': 7}}, {'id': '28', 'name': 'Fauchelevent', 'itemStyle': {'normal': {}}, 'symbolSize': 12.228573, 'attributes': {'modularity_class': 4}}, {'id': '29', 'name': 'Bamatabois', 'itemStyle': {'normal': {}}, 'symbolSize': 23.2, 'attributes': {'modularity_class': 3}}, {'id': '30', 'name': 'Perpetue', 'itemStyle': {'normal': {}}, 'symbolSize': 6.742859, 'attributes': {'modularity_class': 2}}, {'id': '31', 'name': 'Simplice', 'itemStyle': {'normal': {}}, 'symbolSize': 12.228573, 'attributes': {'modularity_class': 2}}, {'id': '32', 'name': 'Scaufflaire', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 1}}, {'id': '33', 'name': 'Woman1', 'itemStyle': {'normal': {}}, 'symbolSize': 6.742859, 'attributes': {'modularity_class': 1}}, {'id': '34', 'name': 'Judge', 'itemStyle': {'normal': {}}, 'symbolSize': 17.714287, 'attributes': {'modularity_class': 3}}, {'id': '35', 'name': 'Champmathieu', 'itemStyle': {'normal': {}}, 'symbolSize': 17.714287, 'attributes': {'modularity_class': 3}}, {'id': '36', 'name': 'Brevet', 'itemStyle': {'normal': {}}, 'symbolSize': 17.714287, 'attributes': {'modularity_class': 3}}, {'id': '37', 'name': 'Chenildieu', 'itemStyle': {'normal': {}}, 'symbolSize': 17.714287, 'attributes': {'modularity_class': 3}}, {'id': '38', 'name': 'Cochepaille', 'itemStyle': {'normal': {}}, 'symbolSize': 17.714287, 'attributes': {'modularity_class': 3}}, {'id': '39', 'name': 'Pontmercy', 'itemStyle': {'normal': {}}, 'symbolSize': 9.485714, 'attributes': {'modularity_class': 6}}, {'id': '40', 'name': 'Boulatruelle', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 7}}, {'id': '41', 'name': 'Eponine', 'itemStyle': {'normal': {}}, 'symbolSize': 31.428574, 'attributes': {'modularity_class': 7}}, {'id': '42', 'name': 'Anzelma', 'itemStyle': {'normal': {}}, 'symbolSize': 9.485714, 'attributes': {'modularity_class': 7}}, {'id': '43', 'name': 'Woman2', 'itemStyle': {'normal': {}}, 'symbolSize': 9.485714, 'attributes': {'modularity_class': 6}}, {'id': '44', 'name': 'MotherInnocent', 'itemStyle': {'normal': {}}, 'symbolSize': 6.742859, 'attributes': {'modularity_class': 4}}, {'id': '45', 'name': 'Gribier', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 4}}, {'id': '46', 'name': 'Jondrette', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 5}}, {'id': '47', 'name': 'MmeBurgon', 'itemStyle': {'normal': {}}, 'symbolSize': 6.742859, 'attributes': {'modularity_class': 5}}, {'id': '48', 'name': 'Gavroche', 'itemStyle': {'normal': {}}, 'symbolSize': 61.600006, 'attributes': {'modularity_class': 8}}, {'id': '49', 'name': 'Gillenormand', 'itemStyle': {'normal': {}}, 'symbolSize': 20.457146, 'attributes': {'modularity_class': 6}}, {'id': '50', 'name': 'Magnon', 'itemStyle': {'normal': {}}, 'symbolSize': 6.742859, 'attributes': {'modularity_class': 6}}, {'id': '51', 'name': 'MlleGillenormand', 'itemStyle': {'normal': {}}, 'symbolSize': 20.457146, 'attributes': {'modularity_class': 6}}, {'id': '52', 'name': 'MmePontmercy', 'itemStyle': {'normal': {}}, 'symbolSize': 6.742859, 'attributes': {'modularity_class': 6}}, {'id': '53', 'name': 'MlleVaubois', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 6}}, {'id': '54', 'name': 'LtGillenormand', 'itemStyle': {'normal': {}}, 'symbolSize': 12.228573, 'attributes': {'modularity_class': 6}}, {'id': '55', 'name': 'Marius', 'itemStyle': {'normal': {}}, 'symbolSize': 53.37143, 'attributes': {'modularity_class': 6}}, {'id': '56', 'name': 'BaronessT', 'itemStyle': {'normal': {}}, 'symbolSize': 6.742859, 'attributes': {'modularity_class': 6}}, {'id': '57', 'name': 'Mabeuf', 'itemStyle': {'normal': {}}, 'symbolSize': 31.428574, 'attributes': {'modularity_class': 8}}, {'id': '58', 'name': 'Enjolras', 'itemStyle': {'normal': {}}, 'symbolSize': 42.4, 'attributes': {'modularity_class': 8}}, {'id': '59', 'name': 'Combeferre', 'itemStyle': {'normal': {}}, 'symbolSize': 31.428574, 'attributes': {'modularity_class': 8}}, {'id': '60', 'name': 'Prouvaire', 'itemStyle': {'normal': {}}, 'symbolSize': 25.942856, 'attributes': {'modularity_class': 8}}, {'id': '61', 'name': 'Feuilly', 'itemStyle': {'normal': {}}, 'symbolSize': 31.428574, 'attributes': {'modularity_class': 8}}, {'id': '62', 'name': 'Courfeyrac', 'itemStyle': {'normal': {}}, 'symbolSize': 36.91429, 'attributes': {'modularity_class': 8}}, {'id': '63', 'name': 'Bahorel', 'itemStyle': {'normal': {}}, 'symbolSize': 34.17143, 'attributes': {'modularity_class': 8}}, {'id': '64', 'name': 'Bossuet', 'itemStyle': {'normal': {}}, 'symbolSize': 36.91429, 'attributes': {'modularity_class': 8}}, {'id': '65', 'name': 'Joly', 'itemStyle': {'normal': {}}, 'symbolSize': 34.17143, 'attributes': {'modularity_class': 8}}, {'id': '66', 'name': 'Grantaire', 'itemStyle': {'normal': {}}, 'symbolSize': 28.685715, 'attributes': {'modularity_class': 8}}, {'id': '67', 'name': 'MotherPlutarch', 'itemStyle': {'normal': {}}, 'symbolSize': 4, 'attributes': {'modularity_class': 8}}, {'id': '68', 'name': 'Gueulemer', 'itemStyle': {'normal': {}}, 'symbolSize': 28.685715, 'attributes': {'modularity_class': 7}}, {'id': '69', 'name': 'Babet', 'itemStyle': {'normal': {}}, 'symbolSize': 28.685715, 'attributes': {'modularity_class': 7}}, {'id': '70', 'name': 'Claquesous', 'itemStyle': {'normal': {}}, 'symbolSize': 28.685715, 'attributes': {'modularity_class': 7}}, {'id': '71', 'name': 'Montparnasse', 'itemStyle': {'normal': {}}, 'symbolSize': 25.942856, 'attributes': {'modularity_class': 7}}, {'id': '72', 'name': 'Toussaint', 'itemStyle': {'normal': {}}, 'symbolSize': 9.485714, 'attributes': {'modularity_class': 1}}, {'id': '73', 'name': 'Child1', 'itemStyle': {'normal': {}}, 'symbolSize': 6.742859, 'attributes': {'modularity_class': 8}}, {'id': '74', 'name': 'Child2', 'itemStyle': {'normal': {}}, 'symbolSize': 6.742859, 'attributes': {'modularity_class': 8}}, {'id': '75', 'name': 'Brujon', 'itemStyle': {'normal': {}}, 'symbolSize': 20.457146, 'attributes': {'modularity_class': 7}}, {'id': '76', 'name': 'MmeHucheloup', 'itemStyle': {'normal': {}}, 'symbolSize': 20.457146, 'attributes': {'modularity_class': 8}}],
    links: [{'id': '0', 'name': null, 'source': '1', 'target': '0', 'lineStyle': {'normal': {}}}, {'id': '1', 'name': null, 'source': '2', 'target': '0', 'lineStyle': {'normal': {}}}, {'id': '2', 'name': null, 'source': '3', 'target': '0', 'lineStyle': {'normal': {}}}, {'id': '3', 'name': null, 'source': '3', 'target': '2', 'lineStyle': {'normal': {}}}, {'id': '4', 'name': null, 'source': '4', 'target': '0', 'lineStyle': {'normal': {}}}, {'id': '5', 'name': null, 'source': '5', 'target': '0', 'lineStyle': {'normal': {}}}, {'id': '6', 'name': null, 'source': '6', 'target': '0', 'lineStyle': {'normal': {}}}, {'id': '7', 'name': null, 'source': '7', 'target': '0', 'lineStyle': {'normal': {}}}, {'id': '8', 'name': null, 'source': '8', 'target': '0', 'lineStyle': {'normal': {}}}, {'id': '9', 'name': null, 'source': '9', 'target': '0', 'lineStyle': {'normal': {}}}, {'id': '13', 'name': null, 'source': '11', 'target': '0', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '11', 'target': '2', 'lineStyle': {'normal': {}}}, {'id': '11', 'name': null, 'source': '11', 'target': '3', 'lineStyle': {'normal': {}}}, {'id': '10', 'name': null, 'source': '11', 'target': '10', 'lineStyle': {'normal': {}}}, {'id': '14', 'name': null, 'source': '12', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '15', 'name': null, 'source': '13', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '16', 'name': null, 'source': '14', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '17', 'name': null, 'source': '15', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '18', 'name': null, 'source': '17', 'target': '16', 'lineStyle': {'normal': {}}}, {'id': '19', 'name': null, 'source': '18', 'target': '16', 'lineStyle': {'normal': {}}}, {'id': '20', 'name': null, 'source': '18', 'target': '17', 'lineStyle': {'normal': {}}}, {'id': '21', 'name': null, 'source': '19', 'target': '16', 'lineStyle': {'normal': {}}}, {'id': '22', 'name': null, 'source': '19', 'target': '17', 'lineStyle': {'normal': {}}}, {'id': '23', 'name': null, 'source': '19', 'target': '18', 'lineStyle': {'normal': {}}}, {'id': '24', 'name': null, 'source': '20', 'target': '16', 'lineStyle': {'normal': {}}}, {'id': '25', 'name': null, 'source': '20', 'target': '17', 'lineStyle': {'normal': {}}}, {'id': '26', 'name': null, 'source': '20', 'target': '18', 'lineStyle': {'normal': {}}}, {'id': '27', 'name': null, 'source': '20', 'target': '19', 'lineStyle': {'normal': {}}}, {'id': '28', 'name': null, 'source': '21', 'target': '16', 'lineStyle': {'normal': {}}}, {'id': '29', 'name': null, 'source': '21', 'target': '17', 'lineStyle': {'normal': {}}}, {'id': '30', 'name': null, 'source': '21', 'target': '18', 'lineStyle': {'normal': {}}}, {'id': '31', 'name': null, 'source': '21', 'target': '19', 'lineStyle': {'normal': {}}}, {'id': '32', 'name': null, 'source': '21', 'target': '20', 'lineStyle': {'normal': {}}}, {'id': '33', 'name': null, 'source': '22', 'target': '16', 'lineStyle': {'normal': {}}}, {'id': '34', 'name': null, 'source': '22', 'target': '17', 'lineStyle': {'normal': {}}}, {'id': '35', 'name': null, 'source': '22', 'target': '18', 'lineStyle': {'normal': {}}}, {'id': '36', 'name': null, 'source': '22', 'target': '19', 'lineStyle': {'normal': {}}}, {'id': '37', 'name': null, 'source': '22', 'target': '20', 'lineStyle': {'normal': {}}}, {'id': '38', 'name': null, 'source': '22', 'target': '21', 'lineStyle': {'normal': {}}}, {'id': '47', 'name': null, 'source': '23', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '46', 'name': null, 'source': '23', 'target': '12', 'lineStyle': {'normal': {}}}, {'id': '39', 'name': null, 'source': '23', 'target': '16', 'lineStyle': {'normal': {}}}, {'id': '40', 'name': null, 'source': '23', 'target': '17', 'lineStyle': {'normal': {}}}, {'id': '41', 'name': null, 'source': '23', 'target': '18', 'lineStyle': {'normal': {}}}, {'id': '42', 'name': null, 'source': '23', 'target': '19', 'lineStyle': {'normal': {}}}, {'id': '43', 'name': null, 'source': '23', 'target': '20', 'lineStyle': {'normal': {}}}, {'id': '44', 'name': null, 'source': '23', 'target': '21', 'lineStyle': {'normal': {}}}, {'id': '45', 'name': null, 'source': '23', 'target': '22', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '24', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '48', 'name': null, 'source': '24', 'target': '23', 'lineStyle': {'normal': {}}}, {'id': '52', 'name': null, 'source': '25', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '51', 'name': null, 'source': '25', 'target': '23', 'lineStyle': {'normal': {}}}, {'id': '50', 'name': null, 'source': '25', 'target': '24', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '26', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '26', 'target': '16', 'lineStyle': {'normal': {}}}, {'id': '53', 'name': null, 'source': '26', 'target': '24', 'lineStyle': {'normal': {}}}, {'id': '56', 'name': null, 'source': '26', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': '57', 'name': null, 'source': '27', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '58', 'name': null, 'source': '27', 'target': '23', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '27', 'target': '24', 'lineStyle': {'normal': {}}}, {'id': '59', 'name': null, 'source': '27', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': '61', 'name': null, 'source': '27', 'target': '26', 'lineStyle': {'normal': {}}}, {'id': '62', 'name': null, 'source': '28', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '63', 'name': null, 'source': '28', 'target': '27', 'lineStyle': {'normal': {}}}, {'id': '66', 'name': null, 'source': '29', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '64', 'name': null, 'source': '29', 'target': '23', 'lineStyle': {'normal': {}}}, {'id': '65', 'name': null, 'source': '29', 'target': '27', 'lineStyle': {'normal': {}}}, {'id': '67', 'name': null, 'source': '30', 'target': '23', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '31', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '31', 'target': '23', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '31', 'target': '27', 'lineStyle': {'normal': {}}}, {'id': '68', 'name': null, 'source': '31', 'target': '30', 'lineStyle': {'normal': {}}}, {'id': '72', 'name': null, 'source': '32', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '73', 'name': null, 'source': '33', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '74', 'name': null, 'source': '33', 'target': '27', 'lineStyle': {'normal': {}}}, {'id': '75', 'name': null, 'source': '34', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '76', 'name': null, 'source': '34', 'target': '29', 'lineStyle': {'normal': {}}}, {'id': '77', 'name': null, 'source': '35', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '35', 'target': '29', 'lineStyle': {'normal': {}}}, {'id': '78', 'name': null, 'source': '35', 'target': '34', 'lineStyle': {'normal': {}}}, {'id': '82', 'name': null, 'source': '36', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '83', 'name': null, 'source': '36', 'target': '29', 'lineStyle': {'normal': {}}}, {'id': '80', 'name': null, 'source': '36', 'target': '34', 'lineStyle': {'normal': {}}}, {'id': '81', 'name': null, 'source': '36', 'target': '35', 'lineStyle': {'normal': {}}}, {'id': '87', 'name': null, 'source': '37', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '88', 'name': null, 'source': '37', 'target': '29', 'lineStyle': {'normal': {}}}, {'id': '84', 'name': null, 'source': '37', 'target': '34', 'lineStyle': {'normal': {}}}, {'id': '85', 'name': null, 'source': '37', 'target': '35', 'lineStyle': {'normal': {}}}, {'id': '86', 'name': null, 'source': '37', 'target': '36', 'lineStyle': {'normal': {}}}, {'id': '93', 'name': null, 'source': '38', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '94', 'name': null, 'source': '38', 'target': '29', 'lineStyle': {'normal': {}}}, {'id': '89', 'name': null, 'source': '38', 'target': '34', 'lineStyle': {'normal': {}}}, {'id': '90', 'name': null, 'source': '38', 'target': '35', 'lineStyle': {'normal': {}}}, {'id': '91', 'name': null, 'source': '38', 'target': '36', 'lineStyle': {'normal': {}}}, {'id': '92', 'name': null, 'source': '38', 'target': '37', 'lineStyle': {'normal': {}}}, {'id': '95', 'name': null, 'source': '39', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': '96', 'name': null, 'source': '40', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': '97', 'name': null, 'source': '41', 'target': '24', 'lineStyle': {'normal': {}}}, {'id': '98', 'name': null, 'source': '41', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': '101', 'name': null, 'source': '42', 'target': '24', 'lineStyle': {'normal': {}}}, {'id': '100', 'name': null, 'source': '42', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': '99', 'name': null, 'source': '42', 'target': '41', 'lineStyle': {'normal': {}}}, {'id': '102', 'name': null, 'source': '43', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '103', 'name': null, 'source': '43', 'target': '26', 'lineStyle': {'normal': {}}}, {'id': '104', 'name': null, 'source': '43', 'target': '27', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '44', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '105', 'name': null, 'source': '44', 'target': '28', 'lineStyle': {'normal': {}}}, {'id': '107', 'name': null, 'source': '45', 'target': '28', 'lineStyle': {'normal': {}}}, {'id': '108', 'name': null, 'source': '47', 'target': '46', 'lineStyle': {'normal': {}}}, {'id': '112', 'name': null, 'source': '48', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '110', 'name': null, 'source': '48', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': '111', 'name': null, 'source': '48', 'target': '27', 'lineStyle': {'normal': {}}}, {'id': '109', 'name': null, 'source': '48', 'target': '47', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '49', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '113', 'name': null, 'source': '49', 'target': '26', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '50', 'target': '24', 'lineStyle': {'normal': {}}}, {'id': '115', 'name': null, 'source': '50', 'target': '49', 'lineStyle': {'normal': {}}}, {'id': '119', 'name': null, 'source': '51', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '118', 'name': null, 'source': '51', 'target': '26', 'lineStyle': {'normal': {}}}, {'id': '117', 'name': null, 'source': '51', 'target': '49', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '52', 'target': '39', 'lineStyle': {'normal': {}}}, {'id': '120', 'name': null, 'source': '52', 'target': '51', 'lineStyle': {'normal': {}}}, {'id': '122', 'name': null, 'source': '53', 'target': '51', 'lineStyle': {'normal': {}}}, {'id': '125', 'name': null, 'source': '54', 'target': '26', 'lineStyle': {'normal': {}}}, {'id': '124', 'name': null, 'source': '54', 'target': '49', 'lineStyle': {'normal': {}}}, {'id': '123', 'name': null, 'source': '54', 'target': '51', 'lineStyle': {'normal': {}}}, {'id': '131', 'name': null, 'source': '55', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '132', 'name': null, 'source': '55', 'target': '16', 'lineStyle': {'normal': {}}}, {'id': '133', 'name': null, 'source': '55', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '55', 'target': '26', 'lineStyle': {'normal': {}}}, {'id': '128', 'name': null, 'source': '55', 'target': '39', 'lineStyle': {'normal': {}}}, {'id': '134', 'name': null, 'source': '55', 'target': '41', 'lineStyle': {'normal': {}}}, {'id': '135', 'name': null, 'source': '55', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '127', 'name': null, 'source': '55', 'target': '49', 'lineStyle': {'normal': {}}}, {'id': '126', 'name': null, 'source': '55', 'target': '51', 'lineStyle': {'normal': {}}}, {'id': '129', 'name': null, 'source': '55', 'target': '54', 'lineStyle': {'normal': {}}}, {'id': '136', 'name': null, 'source': '56', 'target': '49', 'lineStyle': {'normal': {}}}, {'id': '137', 'name': null, 'source': '56', 'target': '55', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '57', 'target': '41', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '57', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '138', 'name': null, 'source': '57', 'target': '55', 'lineStyle': {'normal': {}}}, {'id': '145', 'name': null, 'source': '58', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '58', 'target': '27', 'lineStyle': {'normal': {}}}, {'id': '142', 'name': null, 'source': '58', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '141', 'name': null, 'source': '58', 'target': '55', 'lineStyle': {'normal': {}}}, {'id': '144', 'name': null, 'source': '58', 'target': '57', 'lineStyle': {'normal': {}}}, {'id': '148', 'name': null, 'source': '59', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '147', 'name': null, 'source': '59', 'target': '55', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '59', 'target': '57', 'lineStyle': {'normal': {}}}, {'id': '146', 'name': null, 'source': '59', 'target': '58', 'lineStyle': {'normal': {}}}, {'id': '150', 'name': null, 'source': '60', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '151', 'name': null, 'source': '60', 'target': '58', 'lineStyle': {'normal': {}}}, {'id': '152', 'name': null, 'source': '60', 'target': '59', 'lineStyle': {'normal': {}}}, {'id': '153', 'name': null, 'source': '61', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '158', 'name': null, 'source': '61', 'target': '55', 'lineStyle': {'normal': {}}}, {'id': '157', 'name': null, 'source': '61', 'target': '57', 'lineStyle': {'normal': {}}}, {'id': '154', 'name': null, 'source': '61', 'target': '58', 'lineStyle': {'normal': {}}}, {'id': '156', 'name': null, 'source': '61', 'target': '59', 'lineStyle': {'normal': {}}}, {'id': '155', 'name': null, 'source': '61', 'target': '60', 'lineStyle': {'normal': {}}}, {'id': '164', 'name': null, 'source': '62', 'target': '41', 'lineStyle': {'normal': {}}}, {'id': '162', 'name': null, 'source': '62', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '159', 'name': null, 'source': '62', 'target': '55', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '62', 'target': '57', 'lineStyle': {'normal': {}}}, {'id': '160', 'name': null, 'source': '62', 'target': '58', 'lineStyle': {'normal': {}}}, {'id': '161', 'name': null, 'source': '62', 'target': '59', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '62', 'target': '60', 'lineStyle': {'normal': {}}}, {'id': '165', 'name': null, 'source': '62', 'target': '61', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '63', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '174', 'name': null, 'source': '63', 'target': '55', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '63', 'target': '57', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '63', 'target': '58', 'lineStyle': {'normal': {}}}, {'id': '167', 'name': null, 'source': '63', 'target': '59', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '63', 'target': '60', 'lineStyle': {'normal': {}}}, {'id': '172', 'name': null, 'source': '63', 'target': '61', 'lineStyle': {'normal': {}}}, {'id': '169', 'name': null, 'source': '63', 'target': '62', 'lineStyle': {'normal': {}}}, {'id': '184', 'name': null, 'source': '64', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '64', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '175', 'name': null, 'source': '64', 'target': '55', 'lineStyle': {'normal': {}}}, {'id': '183', 'name': null, 'source': '64', 'target': '57', 'lineStyle': {'normal': {}}}, {'id': '179', 'name': null, 'source': '64', 'target': '58', 'lineStyle': {'normal': {}}}, {'id': '182', 'name': null, 'source': '64', 'target': '59', 'lineStyle': {'normal': {}}}, {'id': '181', 'name': null, 'source': '64', 'target': '60', 'lineStyle': {'normal': {}}}, {'id': '180', 'name': null, 'source': '64', 'target': '61', 'lineStyle': {'normal': {}}}, {'id': '176', 'name': null, 'source': '64', 'target': '62', 'lineStyle': {'normal': {}}}, {'id': '178', 'name': null, 'source': '64', 'target': '63', 'lineStyle': {'normal': {}}}, {'id': '187', 'name': null, 'source': '65', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '194', 'name': null, 'source': '65', 'target': '55', 'lineStyle': {'normal': {}}}, {'id': '193', 'name': null, 'source': '65', 'target': '57', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '65', 'target': '58', 'lineStyle': {'normal': {}}}, {'id': '192', 'name': null, 'source': '65', 'target': '59', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '65', 'target': '60', 'lineStyle': {'normal': {}}}, {'id': '190', 'name': null, 'source': '65', 'target': '61', 'lineStyle': {'normal': {}}}, {'id': '188', 'name': null, 'source': '65', 'target': '62', 'lineStyle': {'normal': {}}}, {'id': '185', 'name': null, 'source': '65', 'target': '63', 'lineStyle': {'normal': {}}}, {'id': '186', 'name': null, 'source': '65', 'target': '64', 'lineStyle': {'normal': {}}}, {'id': '200', 'name': null, 'source': '66', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '196', 'name': null, 'source': '66', 'target': '58', 'lineStyle': {'normal': {}}}, {'id': '197', 'name': null, 'source': '66', 'target': '59', 'lineStyle': {'normal': {}}}, {'id': '203', 'name': null, 'source': '66', 'target': '60', 'lineStyle': {'normal': {}}}, {'id': '202', 'name': null, 'source': '66', 'target': '61', 'lineStyle': {'normal': {}}}, {'id': '198', 'name': null, 'source': '66', 'target': '62', 'lineStyle': {'normal': {}}}, {'id': '201', 'name': null, 'source': '66', 'target': '63', 'lineStyle': {'normal': {}}}, {'id': '195', 'name': null, 'source': '66', 'target': '64', 'lineStyle': {'normal': {}}}, {'id': '199', 'name': null, 'source': '66', 'target': '65', 'lineStyle': {'normal': {}}}, {'id': '204', 'name': null, 'source': '67', 'target': '57', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '68', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '68', 'target': '24', 'lineStyle': {'normal': {}}}, {'id': '205', 'name': null, 'source': '68', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': '208', 'name': null, 'source': '68', 'target': '27', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '68', 'target': '41', 'lineStyle': {'normal': {}}}, {'id': '209', 'name': null, 'source': '68', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '213', 'name': null, 'source': '69', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '214', 'name': null, 'source': '69', 'target': '24', 'lineStyle': {'normal': {}}}, {'id': '211', 'name': null, 'source': '69', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '69', 'target': '27', 'lineStyle': {'normal': {}}}, {'id': '217', 'name': null, 'source': '69', 'target': '41', 'lineStyle': {'normal': {}}}, {'id': '216', 'name': null, 'source': '69', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '212', 'name': null, 'source': '69', 'target': '68', 'lineStyle': {'normal': {}}}, {'id': '221', 'name': null, 'source': '70', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '222', 'name': null, 'source': '70', 'target': '24', 'lineStyle': {'normal': {}}}, {'id': '218', 'name': null, 'source': '70', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': '223', 'name': null, 'source': '70', 'target': '27', 'lineStyle': {'normal': {}}}, {'id': '224', 'name': null, 'source': '70', 'target': '41', 'lineStyle': {'normal': {}}}, {'id': '225', 'name': null, 'source': '70', 'target': '58', 'lineStyle': {'normal': {}}}, {'id': '220', 'name': null, 'source': '70', 'target': '68', 'lineStyle': {'normal': {}}}, {'id': '219', 'name': null, 'source': '70', 'target': '69', 'lineStyle': {'normal': {}}}, {'id': '230', 'name': null, 'source': '71', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '233', 'name': null, 'source': '71', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': '226', 'name': null, 'source': '71', 'target': '27', 'lineStyle': {'normal': {}}}, {'id': '232', 'name': null, 'source': '71', 'target': '41', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '71', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '228', 'name': null, 'source': '71', 'target': '68', 'lineStyle': {'normal': {}}}, {'id': '227', 'name': null, 'source': '71', 'target': '69', 'lineStyle': {'normal': {}}}, {'id': '229', 'name': null, 'source': '71', 'target': '70', 'lineStyle': {'normal': {}}}, {'id': '236', 'name': null, 'source': '72', 'target': '11', 'lineStyle': {'normal': {}}}, {'id': '234', 'name': null, 'source': '72', 'target': '26', 'lineStyle': {'normal': {}}}, {'id': '235', 'name': null, 'source': '72', 'target': '27', 'lineStyle': {'normal': {}}}, {'id': '237', 'name': null, 'source': '73', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '238', 'name': null, 'source': '74', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '239', 'name': null, 'source': '74', 'target': '73', 'lineStyle': {'normal': {}}}, {'id': '242', 'name': null, 'source': '75', 'target': '25', 'lineStyle': {'normal': {}}}, {'id': '244', 'name': null, 'source': '75', 'target': '41', 'lineStyle': {'normal': {}}}, {'id': null, 'name': null, 'source': '75', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '241', 'name': null, 'source': '75', 'target': '68', 'lineStyle': {'normal': {}}}, {'id': '240', 'name': null, 'source': '75', 'target': '69', 'lineStyle': {'normal': {}}}, {'id': '245', 'name': null, 'source': '75', 'target': '70', 'lineStyle': {'normal': {}}}, {'id': '246', 'name': null, 'source': '75', 'target': '71', 'lineStyle': {'normal': {}}}, {'id': '252', 'name': null, 'source': '76', 'target': '48', 'lineStyle': {'normal': {}}}, {'id': '253', 'name': null, 'source': '76', 'target': '58', 'lineStyle': {'normal': {}}}, {'id': '251', 'name': null, 'source': '76', 'target': '62', 'lineStyle': {'normal': {}}}, {'id': '250', 'name': null, 'source': '76', 'target': '63', 'lineStyle': {'normal': {}}}, {'id': '247', 'name': null, 'source': '76', 'target': '64', 'lineStyle': {'normal': {}}}, {'id': '248', 'name': null, 'source': '76', 'target': '65', 'lineStyle': {'normal': {}}}, {'id': '249', 'name': null, 'source': '76', 'target': '66', 'lineStyle': {'normal': {}}}]
  }
  graph.nodes.forEach(function (node) {
    node.itemStyle = null
    node.value = node.symbolSize
    // 设置节点默认大小
    if (node.symbolSize / 1.5 > 50) {
      node.symbolSize = 50
    } else if (node.symbolSize / 1.5 > 10) {
      node.symbolSize /= 1.5
    } else if (node.symbolSize > 0) {
      node.symbolSize = 10
    }
    node.label = {
      normal: {
        show: node.symbolSize > 0
      }
    }
    // node.category = node.attributes.modularity_class
    node.category = node.name
  })
  for (let i = 0; i < graph.nodes.length; i++) {
    categories[i] = {
      name: graph.nodes[i].name
    }
  }
  let option = {
    tooltip: {},
    legend: [{
      show: false,
      // 图例的类型。可选值：'plain'：普通图例。缺省就是普通图例。'scroll'：可滚动翻页的图例。当图例数量较多时可以使用。
      type: 'scroll',
      // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。除此之外也可以设成 'single' 或者 'multiple' 使用单选或者多选模式。
      selectedMode: 'multiple',
      // 图例文字的颜色和大小
      textStyle: {color: '#55ba97', fontSize: 12},
      data: categories.map(function (a) {
        return a.name
      })
    }],
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [{
      name: 'graph',
      top: 50,
      type: 'graph',
      layout: 'circular',
      circular: {
        // 是否旋转标签，默认不旋转
        rotateLabel: true
      },
      data: graph.nodes,
      links: graph.links,
      categories: categories,
      // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
      roam: false,
      label: {
        normal: {
          position: 'right',
          formatter: '{b}'
        }
      },
      lineStyle: {
        normal: {
          color: 'source',
          curveness: 0.3
        }
      }
    }]
  }
  return option
}

export default {setBar, setBar3, setBar4, setRadar2, setLine, setLine2, setLine4, setLine5, setLine6, setLine7, setPie, setPie2, setPie3, setPie4, setPie6, setMapbox, setGraph}
