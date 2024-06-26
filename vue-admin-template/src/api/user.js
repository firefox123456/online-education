import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/education/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/education/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/education/admin/logout',
    method: 'post'
  })
}
