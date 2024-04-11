import request from '@/utils/request'

export default{
    //登录
    submitLoginUser(userInfo){
        return request({
            url:'/education/ucenter-member/login',
            method:'post',
            data:userInfo,
        })
    },

    //根据token获取用户信息
    getLoginUserInfo(){
        return request({
            url:'/education/ucenter-member/getUserInfo',
            method:'get',
        })
    }
}
