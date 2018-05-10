let merge = (list, type) => {
  let newList = []
  list.map(item => {
    if (item['zhibiao'] === type) {
      newList.push(item)
    }
  })
  return newList
}

export default { merge }
