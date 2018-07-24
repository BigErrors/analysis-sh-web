let merge = (list, type) => {
  let newList = []
  list.map(item => {
    if (item['zhibiao'] === type) {
      newList.push(item)
    }
  })
  return newList
}

let dateTimeFormat = (date) => {
  let dateObj = new Date(date)
  return (dateObj.getFullYear()) + '-' + (dateObj.getMonth() + 1) + '-' + (dateObj.getDate()) + ' 00:00:00'
}

let dateFormat = (dateTime, valueFormat) => {
  let newDate = new Date(dateTime)
  valueFormat = valueFormat || 'yyyy-MM-dd'
  let date = {
    'yy': newDate.getFullYear(),
    // 这里月份的key采用大写，为了区别分钟的key
    'MM': newDate.getMonth() + 1,
    'dd': newDate.getDate(),
    'hh': newDate.getHours(),
    'mm': newDate.getMinutes(),
    'ss': newDate.getSeconds()
  }
  // 输出年 y+:匹配1个到多个y,i:忽略大小写
  if (/(y+)/i.test(valueFormat)) {
    valueFormat = valueFormat.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  // 输出月、日、时、分、秒
  Object.keys(date).forEach(function (i) {
    //  '(' + i + ')'的结果是字符串'(i+)',
    // 只有写成'(' + i + ')'形式，才能在正则表达式中捕获子匹配，进而才能用到RegExp.$1的值
    if (new RegExp('(' + i + ')').test(valueFormat)) {
      // 判断，如果时间为一位数，则在前面加'0'
      // ps：这里有一个小知识点：number类型+string类型 = string类型
      if (RegExp.$1.length === 2) {
        if (date[i] < 10) {
          date[i] = '0' + date[i]
        }
      }
      // 替换初始化函数时候传入yyyy-mm-dd hh:mm:ss(这里可以打印出time、RegExp.$1、date[k])
      valueFormat = valueFormat.replace(RegExp.$1, date[i])
    }
  })
  return valueFormat
}

export default {
  merge,
  dateTimeFormat,
  dateFormat
}
