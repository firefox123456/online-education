import request from '@/utils/request'

export default {
  //条件分页课程查询的方法
  getCourseList(page,limit,searchObj) {
    return request({
      url: `/api/education/front/course/getCourseFrontList/${page}/${limit}`,
      method: 'post',
      data:searchObj
    })
  },
  //查询所有分类的方法
  getAllSubject() {
    return request({
      url: `/api/education/edu-subject/getAllSubject`,
      method: 'get',
    })
  },
  //课程详情的方法
  getCourseInfo(id){
    return request({
      url: `/api/education/front/course/getCourseInfo/${id}`,
      method: 'get',
    })
  }


}
