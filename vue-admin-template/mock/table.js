const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(2)',
      'status|1': ['published', 'draft', 'deleted'],
      'mailStatus|1': ['收信人不可见', '可见'],
      'communicationStatus|1': ['冻结', '正常'],
      author: '@cname()',
      display_time: '@date("yyyy-MM-dd")',
      pageviews: '@integer(300, 5000)',
      'isRead|1': '@boolean',
      remark: '@sentence(3, 5)',
      'content|1': ['@image(300x300)', '@sentence(3, 5)']
    }
  ]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: () => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
