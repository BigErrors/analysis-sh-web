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

export default { merge, dateTimeFormat }
