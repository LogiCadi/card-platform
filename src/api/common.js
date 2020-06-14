import request from '@/utils/request'

// 卡片列表
export function getConfig(data) {
  return request({
    url: '/config',
    data
  })
}
