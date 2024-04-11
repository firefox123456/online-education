import request from '@/utils/request'

export default {
  getPlayAuth(vid) {
    return request({
      url: `/api/videoModule/getPlayAuth/${vid}`,
      method: 'get'
    })
  }

}
