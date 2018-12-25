/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-09-19 14:06:35
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-12-25 13:25:17
 */

import json from '@/util/dictionaryMapping'

// 获取并设置当前用户的数据权限
export const dataPermission = (areacode) => {
  let temp = []
  if (areacode === 'SHJCK01000') {
    temp = json.area
  } else {
    json.area.map(item => {
      if (item.value === areacode) {
        temp.push(item)
      }
    })
  }
  return temp
}
