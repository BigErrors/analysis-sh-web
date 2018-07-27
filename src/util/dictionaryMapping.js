let area = [{
  'label': '上海市',
  'value': 'SHJCK01000',
  'coordinates': [121.5193, 31.263070]
}, {
  'label': '崇明区',
  'value': 'SHJCK01019',
  'coordinates': [121.563184, 31.631849]
}, {
  'label': '松江区',
  'value': 'SHJCK01018',
  'coordinates': [121.178709, 30.992306]
}, {
  'label': '青浦区',
  'value': 'SHJCK01017',
  'coordinates': [121.07968, 31.141832]
}, {
  'label': '虹口区',
  'value': 'SHJCK01001',
  'coordinates': [121.512, 31.27]
}, {
  'label': '奉贤区',
  'value': 'SHJCK01015',
  'coordinates': [121.555854, 30.8803]
}, {
  'label': '浦东新区',
  'value': 'SHJCK01014030',
  'coordinates': [121.736377, 31.088346]
}, {
  'label': '嘉定区',
  'value': 'SHJCK01013',
  'coordinates': [121.20573, 31.372673]
}, {
  'label': '闵行区',
  'value': 'SHJCK01012',
  'coordinates': [121.394878, 31.072511]
}, {
  'label': '宝山区',
  'value': 'SHJCK01011',
  'coordinates': [121.440296, 31.401281]
}, {
  'label': '金山区',
  'value': 'SHJCK01010',
  'coordinates': [121.233758, 30.816867]
}, {
  'label': '静安区',
  'value': 'SHJCK01009',
  'coordinates': [121.454, 31.234]
}, {
  'label': '长宁区',
  'value': 'SHJCK01008',
  'coordinates': [121.43, 31.227]
}, {
  'label': '普陀区',
  'value': 'SHJCK01006',
  'coordinates': [121.402261, 31.255465]
}, {
  'label': '徐汇区',
  'value': 'SHJCK01005',
  'coordinates': [121.43452, 31.170563]
}, {
  'label': '杨浦区',
  'value': 'SHJCK01003',
  'coordinates': [121.541702, 31.270352]
}, {
  'label': '黄浦区',
  'value': 'SHJCK01002',
  'coordinates': [121.491, 31.237]
}]

let caseType = [{
  'label': '民事',
  'value': '民事'
}, {
  'label': '刑事',
  'value': '刑事'
}, {
  'label': '治安',
  'value': '治安'
}, {
  'label': '房产',
  'value': '房产'
}, {
  'label': '医患',
  'value': '医患'
}, {
  'label': '交通',
  'value': '交通'
}, {
  'label': '劳动',
  'value': '劳动'
}, {
  'label': '涉校',
  'value': '涉校'
}, {
  'label': '知产',
  'value': '知产'
}]

let commonCaseType = [{
  'label': '民事',
  'value': '民事'
}, {
  'label': '治安',
  'value': '治安'
}, {
  'label': '房产',
  'value': '房产'
}, {
  'label': '医患',
  'value': '医患'
}, {
  'label': '交通',
  'value': '交通'
}, {
  'label': '劳动',
  'value': '劳动'
}, {
  'label': '知产',
  'value': '知产'
}]

let businessType = [{
  'label': '人民调解',
  'value': '人民调解'
}, {
  'label': '110联动',
  'value': '110联动'
}, {
  'label': '公共法律服务',
  'value': '公共法律服务'
}, {
  'label': '纠纷排查',
  'value': '纠纷排查'
}]

let coordinationType = [
  {label: '全部', value: 'allinformation'},
  {label: '村调委会', value: '6584014fd89249a1a750e9eb16f775e2'},
  {label: '居（社区）调委会', value: 'c0d8d4a282854854ad71826e0bea2c57'},
  {label: '乡镇调委会', value: 'c542c1a3863c47e798144d311e4371c8'},
  {label: '街道调委会', value: 'af970ed75443429fa302fdf5914de11a'},
  {label: '企事业单位调委会', value: '962855d460a149c0baf2e8f86a64cdf1'},
  {label: '行业性、专业性调委会', value: '29652b300bb2482ea1b30be2310cf451'},
  {label: '其它调委会', value: '14d05df3ee184a22aeb0d78a81874050'}
]
export default {area, caseType, commonCaseType, businessType, coordinationType}
