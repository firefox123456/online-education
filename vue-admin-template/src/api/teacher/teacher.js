
import request from '@/utils/request'
import da from "element-ui/src/locale/lang/da";

export default {
  //1 讲师列表（条件查询分页）
  //current当前页 limit每页记录数 teacherQuery条件对象
  getTeacherListPage(current,size,teacherQuery) {
    return request({
      //url: '/eduservice/teacher/pageTeacherCondition/'+current+"/"+limit,
      url: `/api/education/edu-teacher/condition/${current}/${size}`,
      method: 'post',
      //teacherQuery条件对象，后端使用RequestBody获取数据
      //data表示把对象转换json进行传递到接口里面
      data: teacherQuery
    })
  },
//  2 通过id删除讲师
  deleteTeacherId(id){
    return request({
      url:`/api/education/edu-teacher/delete/${id}`,
      method: 'delete'
    })
  },
//  3 添加讲师
  addTeacher(teacher){
    return request({
      url:  `/api/education/edu-teacher/addTeacher`,
      method: 'post',
      data: teacher})
  },
//  4 根据id查找讲师
  getTeacherById(id){
    return request({
      url: `/api/education/edu-teacher/queryTeacherById/${id}`,
      method: 'get',
    })
  },
//  5 修改讲师
  updateTeacher(teacher){
    return  request({
      url:`/api/education/edu-teacher/updateTeacher`,
      method:'post',
      data:teacher
    })
  }
}
