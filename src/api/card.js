import request from '@/utils/request'

// 卡片列表
export function getCardList(data) {
  return request({
    url: '/card/cardList',
    data
  })
}
