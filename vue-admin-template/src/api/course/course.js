import request from '@/utils/request'

export default {
  //添加课程信息
  addCourseInfo(courseInfo) {
    return request({
      url: `/api/education/edu-course/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  //2 查询所有讲师
  getListTeacher() {
    return request({
      url: '/api/education/edu-teacher/findAll',
      method: 'get'
    })
  },
  //3 根据课程id查询课程基本信息
  getCourseInfoId(id){
    return request({
      url:'/api/education/edu-course/getCourseInfo/'+id,
      method:'get'
    })
  },
  //4 修改课程信息
  updateCourseInfo(courseInfo){
    return request({
      url:'/api/education/edu-course/updateCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  //课程确认信息显示
  getCoursePublishInfo(id){
    return request({
      url:'/api/education/edu-course/getCoursePublishInfo/'+id,
      method: 'get'
    })
  },
  //课程最终发布
  publihCourse(id) {
    return request({
      url: '/api/education/edu-course/publishCource/'+id,
      method: 'post'
    })
  },
  // 课程列表=====================================
  //课程发布后
  //分页多条件查询课程
  getCourseListPage(current,limit,courseQuery){
    return request({
      url:`/api/education/edu-course/pageConditionQueryCourse/${current}/${limit}`,
      method:'post',
      data:courseQuery //后端requestBody要json字符串，data能把techerQuery对象转换成json字符串
    })
  },
  //删除课程
  deleteCourseById(courseId){
    return request({
      url:`/api/education/edu-course/deleteCourse/${courseId}`,
      method:'delete',
    })
  }

}
