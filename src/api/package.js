import request from '@/utils/request'

// 列表
export function getList(data) {
  return request({
    url: '/package/list',
    data
  })
}

// 录入
export function postSave(data) {
  return request({
    url: '/package/save',
    data
  })
}
