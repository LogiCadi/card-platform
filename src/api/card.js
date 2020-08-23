import request from '@/utils/request'

// 卡片列表
export function getCardList(data) {
  return request({
    url: '/card/cardList',
    data
  })
}

// 卡片录入
export function postCardInput(data) {
  return request({
    url: '/card/cardInput',
    data
  })
}

// 卡片划拨
export function postCardAssign(data) {
  return request({
    url: '/card/cardAssign',
    data
  })
}
// 卡片数
export function getAreaCount(data) {
  return request({
    url: '/card/cardCount',
    data
  })
}
