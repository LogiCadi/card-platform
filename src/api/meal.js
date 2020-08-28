import request from '@/utils/request'

// 列表
export function getList(data) {
  return request({
    url: '/meal/list',
    data
  })
}

// 录入
export function postSave(data) {
  return request({
    url: '/meal/save',
    data
  })
}

// 给卡片绑定套餐
export function postBindMeal(data) {
  return request({
    url: '/meal/bind',
    data
  })
}
