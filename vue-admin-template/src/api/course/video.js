import request from '@/utils/request'

export default {
  //添加小节
  addVideo(video) {
    return request({
      url: '/api/education/edu-video/addVideo',
      method: 'post',
      data: video
    })
  },
  //修改章节
  updatevideo(video) {
    return request({
      url: '/api/education/edu-video/updateVideo',
      method: 'post',
      data: video
    })
  },
  //删除章节
  deleteVideo(videoId) {
    return request({
      url: '/api/education/edu-video/deleteVideo/' + videoId,
      method: 'delete'
    })
  },
  //通过id查询video
  getVideoById(videoId){
    return request({
      url:'/api/education/edu-video/getVideoInfo/'+videoId,
      method:'get'
    })
  },
//  =========================云端视频操作===============================================
  //删除视频
  deleteAlyVideo(id) {
    return request({
      url: '/api/videoModule/deleteVideo/'+id,
      method: 'delete'
    })
  },
}
