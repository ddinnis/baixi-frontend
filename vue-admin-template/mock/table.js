const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(2)',
      'status|1': ['published', 'draft', 'deleted'],
      author: '@cname()',
      display_time: '@date("yyyy-MM-dd")',
      pageviews: '@integer(300, 5000)',
      'isRead|1': '@boolean',
      Remark: '@sentence(3, 5)'
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
