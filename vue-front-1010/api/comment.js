import request from '@/utils/request'

export default{
    //根据课程id分页查询出该课程的评论
    getPageList(page,limit,courseId){
        return request({
            url:`/api/education/comment/getPageList/${page}/${limit}/${courseId}`,
            method:'get'
        })
    },
    //添加评论
    addComment(comment){
        return request({
            url:`/api/education/comment/auth/save`,
            method:'post',
            data:comment
        })
    },
}
