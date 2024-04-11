import request from '@/utils/request'

export default {
  getJson() {
  return request({
    url: '/api/renwu/json',
    method: 'get',
    })
  }
}
