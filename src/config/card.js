export default {
  openStatus: [{
      value: 10,
      label: '草稿',
      type: 'info',
    }, {
      value: 20,
      label: '待审核',
      type: 'info',
    }, {
      value: 21,
      label: '客服审核',
      type: '',
      re: 'serv'
    }, {
      value: 22,
      label: 'CA认证',
      type: '',
      re: 'ca'
    }, {
      value: 25,
      label: 'CA认证异常',
      type: 'danger',
      re: 'ca'
    },
    {
      value: 26,
      label: 'LR预审',
      type: '',
      re: 'lr_pre'
    }, {
      value: 27,
      label: 'RO预审',
      type: '',
      re: 'ro_pre'
    }, {
      value: 28,
      label: 'CS审核',
      type: '',
      re: 'cs'
    }, {
      value: 29,
      label: '结算审核',
      type: '',
      re: 'settle'
    },
    {
      value: 23,
      label: 'LR初审',
      type: '',
      re: 'lr'
    }, {
      value: 24,
      label: 'RO复核',
      type: '',
      re: 'ro'
    }, {
      value: 30,
      label: '运营开户',
      type: 'success',
      re: 'op'
    }, {
      value: 40,
      label: '驳回',
      type: 'warning',
    }, {
      value: 70,
      label: '开户成功',
      type: 'success',
    }, {
      value: 90,
      label: '拒绝开户',
      type: 'danger',
    }
  ],

  authMethod: [{
      value: 1,
      label: 'CA认证'
    },
    {
      value: 2,
      label: '网银转账'
    },
    {
      value: 3,
      label: '邮寄发票'
    },
  ],
  idArea: [{
      value: 1,
      label: '大陆'
    },
    {
      value: 2,
      label: '香港'
    },
    {
      value: 3,
      label: '澳门'
    },
    {
      value: 4,
      label: '其他'
    },
  ],

  datePickOptions: {
    shortcuts: [{
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }]
  },
}
