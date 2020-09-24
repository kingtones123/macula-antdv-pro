const util = require('../util')

const usernames = ['ant.design', 'admin', 'superuser']
const passwords = ['ant.design', 'admin']

const nav = [
  // home
  {
    'id': 0,
    'name': 'home',
    'path': '/', // 这个很重要，不写会导致菜单点一下就缩起来
    'meta': {
      'title': 'menu.home',
    },
  },
  // dashboard
  {
    'id': 1,
    'parentId': 0,
    'name': 'dashboard',
    'path': '/dashboard', // 这个很重要，不写会导致菜单点一下就缩起来
    'meta': {
      'icon': 'dashboard',
      'title': '仪表盘',
    },
  },
  {
    'id': 7,
    'parentId': 1,
    'name': 'dashboard-Welcome',
    'path': '/dashboard/Welcome',
    'meta': {
      'title': '工作台',
    },
  },
  {
    'id': 3,
    'parentId': 1,
    'name': 'dashboard-monitor',
    'path': 'https://www.baidu.com/',
    'meta': {
      'title': '监控页（外部）',
      'target': '_blank',
    },
  },
  // form
  {
    'id': 10,
    'parentId': 0,
    'name': 'form',
    'path': '/form',
    'meta': {
      'icon': 'video-camera',
      'title': '表单页',
    },
  },
  {
    'id': 6,
    'parentId': 10,
    'name': 'form-basic-form',
    'path': '/form/basic-form',
    'meta': {
      'title': '基础表单',
    },
  },
  {
    'id': 5,
    'parentId': 10,
    'name': 'form-step-form',
    'path': '/form/step-form',
    'meta': {
      'title': '分步表单',
    },
  },
  {
    'id': 4,
    'parentId': 10,
    'name': 'form-advanced-form',
    'path': '/form/advanced-form',
    'meta': {
      'title': '高级表单',
    },
  },
]

const user = {
  name: 'Serati Ma',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  userid: '00000001',
  email: 'antdesign@alipay.com',
  signature: '海纳百川，有容乃大',
  title: '交互专家',
  group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
  tags: [
    {
      key: '0',
      label: '很有想法的',
    },
    {
      key: '1',
      label: '专注设计',
    },
    {
      key: '2',
      label: '辣~',
    },
    {
      key: '3',
      label: '大长腿',
    },
    {
      key: '4',
      label: '川妹子',
    },
    {
      key: '5',
      label: '海纳百川',
    },
  ],
  notifyCount: 12,
  unreadCount: 11,
  country: 'China',
  geographic: {
    province: {
      label: '浙江省',
      key: '330000',
    },
    city: {
      label: '杭州市',
      key: '330100',
    },
  },
  address: '西湖区工专路 77 号',
  phone: '0752-268888888',
}

module.exports = {
  'GET /api/user/info': (req, res) => {
    res.send(util.builder(user))
  },

  'GET /api/user/nav': (req, res) => {
    res.send(util.builder(nav))
  },

  'POST /api/login': (req, res) => {
    const { password, username, type } = req.body

    if (!usernames.includes(username) || !passwords.includes(password)) {
      res.send(util.builder({ isLogin: true }, '账户或密码错误', 401))
      return
    }

    res.send(util.builder({ token: 'use-token' }, '登录成功', 200))
  },

  'POST /api/logout': (req, res) => {
    res.send(util.builder({}, '登出成功', 200))
  },
}
