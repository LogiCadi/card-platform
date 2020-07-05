import request from '@/utils/request'

// 卡片列表
export function getList(data) {
  return request({
    url: '/meal/list',
    data
  })
}

// 卡片录入
export function postSave(data) {
  return request({
    url: '/meal/save',
    data
  })
}
