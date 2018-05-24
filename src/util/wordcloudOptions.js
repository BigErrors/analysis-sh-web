let setOption = (data, str) => {
  console.log(data)
  let option = {
    list: data || [['foo', 12], ['bar', 6]]
  }
  return option
}

export default {setOption}
