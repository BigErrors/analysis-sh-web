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
      data: ['人民调解', '法律咨询', '110']
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
      name: '调解案件',
      stack: 'one',
      barWidth: 30,
      data: data.map(item => {
        return item['renmintj']
      })
    }, {
      type: 'bar',
      name: '基层法律服务',
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
let setBar3 = (data, color, axisType, dataType, name, updateTime, barMaxWidth) => {
  barMaxWidth = barMaxWidth || 43
  // 找出value中的最大值
  let maxValue = Math.max(...data.map(function (obj) { return obj.value }))
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
      fontSize: 16,
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
    // title: {
    //   text: '|  ' + (name || '标题'),
    //   textStyle: {
    //     color: '#7DA5FE',
    //     fontSize: 22,
    //     align: 'left'
    //   },
    //   subtext: '(更新于: ' + (updateTime || '更新时间') + ')',
    //   subtextStyle: {
    //     color: '#7DA5FE',
    //     fontSize: 18,
    //     align: 'right'
    //   },
    //   left: 0
    // },
    tooltip: {
      show: true
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
      data: ['人民调解', '法律咨询', '110']
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
          return item['renmintj']
        })
      },
      {
        name: '法律咨询',
        type: 'line',
        data: data.map(item => {
          return item['falvzx']
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
let setLine3 = (data, name, updateTime) => {
  let option = {
    // title: {
    //   text: '|  ' + (name || '标题'),
    //   textStyle: {
    //     color: '#7DA5FE',
    //     fontSize: 22,
    //     align: 'left'
    //   },
    //   subtext: '(更新于: ' + (updateTime || '更新时间') + ')',
    //   subtextStyle: {
    //     color: '#7DA5FE',
    //     fontSize: 18,
    //     align: 'right'
    //   },
    //   left: 0
    // },
    tooltip: {
      trigger: 'axis'
    },
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
      max: 300,
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
  option.xAxis.data = data.map(function (item) { return item.month })
  option.series[0].data = data.map(function (item) { return item.num })
  return option
}
// 折线图--没有area属性
let setLine4 = (data, dataType, color) => {
  let option = {
    grid: {
      left: 15,
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
  option.xAxis.data = data[0].map(item => {
    return item['name']
  })
  // 添加系列并设置对应数据
  data.map((series, index) => {
    option.series.push({
      name: index,
      type: 'line',
      symbolSize: 1,
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
let setPie2 = (data, name, updateTime) => {
  let option = {
    // title: {
    //   text: '|  ' + (name || '标题'),
    //   textStyle: {
    //     color: '#7DA5FE',
    //     fontSize: 22,
    //     align: 'left'
    //   },
    //   subtext: '(更新于: ' + (updateTime || '更新时间') + ')',
    //   subtextStyle: {
    //     color: '#7DA5FE',
    //     fontSize: 18,
    //     align: 'right'
    //   },
    //   left: 0
    // },
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

let setFunnel = () => {
  let option = {
    color: ['rgba(11,83,243,0.2)', 'rgba(11,83,243,0.4)', 'rgba(11,83,243,0.6)', 'rgba(11,83,243,0.8)', 'rgba(11,83,243,1)'],
    series: [
      {
        name: '1',
        type: 'funnel',
        label: {
          position: 'right',
          formatter: '{b|{b}}\n\r\r\r{a|{a}}',
          rich: {
            b: {
              fontSize: 19,
              color: '#0134A5'

            },
            a: {
              fontSize: 25,
              color: '#001F77'
            }
          },
          backgroundColor: {
            image: '/static/icon-label.png'
          }
        },
        labelLine: {
          show: true,
          length: 60,
          lineStyle: {
            color: '#5C8EFE',
            type: 'dotted'
          }

        },
        data: [
          {value: 20, name: '信访', other: 1},
          {value: 40, name: '其他', other: 1},
          {value: 60, name: '主动调解', other: 1},
          {value: 80, name: '公安移送', other: 1},
          {value: 100, name: '当事人申请', other: 1}
        ]
      },
      {
        name: '2',
        type: 'funnel',
        label: {
          position: 'inside',
          formatter: '{b}',
          color: '#B1C5FF',
          fontSize: 19
        },
        data: [
          {value: 20, name: '信访', other: 1},
          {value: 40, name: '其他', other: 1},
          {value: 60, name: '主动调解', other: 1},
          {value: 80, name: '公安移送', other: 1},
          {value: 100, name: '当事人申请', other: 1}
        ]
      }
    ]
  }
  return option
}

export default {setBar, setBar2, setBar3, setRadar, setLine, setLine2, setLine3, setLine4, setFill, setPie, setPie2, setFunnel}
