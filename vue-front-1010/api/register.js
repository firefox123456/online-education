import request from '@/utils/request'

export default{
    //根据手机号发送短信
    sendCode(qqmail){
        return request({
            url:`/messageModule/qqmailMessage/${qqmail}`,
            method:'get'
        })
    },

    //用户注册
    registerMember(fromItem){
        return request({
            url:`/education/ucenter-member/register`,
            method:'post',
            data:fromItem
        })
    }

}
