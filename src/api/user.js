import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/user/info',
    data
  })
}
