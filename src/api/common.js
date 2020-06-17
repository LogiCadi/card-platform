import request from '@/utils/request'

// config
export function getConfig(data) {
  return request({
    url: '/config',
    data
  })
}
