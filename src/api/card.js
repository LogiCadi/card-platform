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
