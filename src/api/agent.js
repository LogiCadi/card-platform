import request from '@/utils/request'

// 卡片列表
export function getList(data) {
  return request({
    url: '/agent/list',
    data
  })
}

// 卡片录入
export function postCreate(data) {
  return request({
    url: '/agent/save',
    data
  })
}

export function getMealList(data) {
  return request({
    url: '/agent/getMealList',
    data
  })
}
