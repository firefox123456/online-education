import request from '@/utils/request'

export default{
    //查询前2条banner信息
    getListBanner(){
        return request({
            url:'/api/educationFront/banner-front/getAllBanner',
            method:'get'
        })
    }
}
