import request from '@/utils/request'

export default {
  //查询所有的课程分类
  getAllSubject() {
    return request({
      url: `/api/education/edu-subject/getAllSubject`,
      method: 'get'
    })
  }
}
