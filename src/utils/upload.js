import {
  postPolicy,
  privateResourceUrl
} from '@/api/upload'
import axios from 'axios'

export default async function(file, bucketType, resourceKey) {
  // 1.从应用服务器获取policy
  const postPolicyRes = await postPolicy({
    bucketType,
    resourceKey
  })

  // 2.上传文件到OSS服务器
  const base64ToBlob = function(base64) {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {
      type: mime
    })
  }

  const formData = new FormData()
  formData.append('key', resourceKey)
  formData.append('OSSAccessKeyId', postPolicyRes.result.accessKeyId)
  formData.append('policy', postPolicyRes.result.policy)
  formData.append('signature', postPolicyRes.result.signature)
  formData.append('success_action_status', '200')
  formData.append('file', base64ToBlob(file))

  await axios({
    method: 'post',
    url: postPolicyRes.result.host,
    data: formData
  })

  // 3.获取文件真实的url地址
  const privateResourceUrlRes = await privateResourceUrl({
    bucketType,
    resourceKey
  })

  return privateResourceUrlRes.result.privateUrl
}
