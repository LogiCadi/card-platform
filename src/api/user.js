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

// 列表
export function getList(data) {
  return request({
    url: '/user/list',
    data
  })
}

// 新增
export function postSave(data) {
  return request({
    url: '/user/save',
    data
  })
}
