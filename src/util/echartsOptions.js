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

// 液体填充
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
export default {setBar, setBar2, setRadar, setLine, setLine2, setFill, setPie}
