import json from '@/util/dictionaryMapping'

// 通过编码查找地区名称
export const findAreaNameByValue = (value) => {
  let result = json.area.filter(item => {
    if (item.value === value) {
      return true
    }
  })
  return result.length === 1 ? result[0].label : '未知区域'
}

// 通过编码查找机构类别
export const findCoordinationTypeByValue = (value) => {
  let result = json.coordinationType.filter(item => {
    if (item.value === value) {
      return true
    }
  })
  return result.length === 1 ? result[0].label : '未知类别'
}
