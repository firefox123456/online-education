import request from '@/utils/request'

export default {
  //生成统计数据
  createStaData(day) {
    return request({
      url: '/education/statistics-daily/registerCount/'+day,
      method: 'post',
    })
  },
  //展示统计数据
  getDataSta(searchObj) {
    return request({
      url: '/education/statistics-daily/showData/'+searchObj.type+'/'+searchObj.begin+'/'+searchObj.end,
      method: 'get',
    })
  },
}
