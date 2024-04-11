import request from '@/utils/request'

export default {
//        1根据课程id获取章节和小节数据
  getAllChapterVideo(courseId) {
    return request({
      url: '/api/education/edu-chapter/getChapterVideo/' + courseId,
      method: 'get',
    })
  },
  //添加章节
  addChapter(chapter) {
    return request({
      url: '/api/education/edu-chapter/addChapter/',
      method: 'post',
      data: chapter
    })
  },
  //修改章节
  updateChapter(chapter) {
    return request({
      url: '/api/education/edu-chapter/updateChapter/',
      method: 'post',
      data: chapter
    })
  },
  //根据章节id查询
  getChapterInfo(chapterId) {
    return request({
      url: '/api/education/edu-chapter/getChapterInfo/' + chapterId,
      method: 'get'
    })
  },
  //删除章节
  deleteChapter(chapterId) {
    return request({
      url: '/api/education/edu-chapter/deleteChapter/' + chapterId,
      method: 'delete'
    })
  },
}
