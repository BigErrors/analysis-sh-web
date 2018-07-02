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
        color: '#BABABA'
      },
      splitLine: {
        show: false
      },
      splitNumber: 3
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
let setPie = (data, title, bgColorOpacity, titlePosition, color) => {
  color = color || ['#495BFF', '#12BFFE']
  let option = {
    title: {
      x: 'center',
      bottom: titlePosition || 0,
      text: title || '标题',
      textStyle: {
        color: '#BABABA',
        fontSize: 9
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
      center: ['50%', '38%'],
      radius: ['55%', '65%'],
      label: {
        show: false
      },
      data: data,
      hoverAnimation: false
    }, {
      type: 'pie',
      center: ['50%', '38%'],
      radius: ['0%', '55%'],
      data: [{
        value: 0,
        name: data[0] + '%',
        label: {
          show: true,
          position: 'center',
          fontSize: 12,
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
  data = data.sort(function (v1, v2) {
    if (v1.value >= v2.value) {
      return 1
    } else {
      return -1
    }
  })
  let option = {
    grid: {
      containLabel: true,
      left: 30,
      right: 40,
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
        color: '#BABABA'
      },
      splitLine: {
        show: false
      },
      boundaryGap: true
    },
    series: [{
      type: 'bar',
      stack: 'test',
      data: data.map(item => {
        return item['value']
      }),
      z: 3,
      barMaxWidth: 6,
      barMinHeight: 10,
      itemStyle: {
        barBorderRadius: 10,
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
        }
      },
      label: {
        show: true,
        position: 'right',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 12
      }
    }]
  }
  return option
}
export default {setLine, setPie, setBar}
