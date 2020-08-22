import { getConfig } from '@/api/common'
import { getList as getAgentList } from '@/api/agent'
import { getList as getUserList } from '@/api/user'

export default {
  async getAllAgent() {
    this.allAgent = (await getAgentList({ size: 9999 })).data.list
  },
  async getAllUser() {
    this.allUser = (await getUserList({ size: 9999 })).data.list
  },
  async getConfig() {
    this.cfg = (await getConfig()).data
  }
}
