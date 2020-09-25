import * as userService from '@/api/user'

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorMenus = (rootId) => {
  return new Promise((resolve, reject) => {
    userService.getUserNav({}).then(res => {
      // console.log('userNav', res)
      const { result } = res
      const menuNav = []
      const childrenNav = []
      // 后端数据, 根级树数组,  根级 PID
      listToTree(result, childrenNav, rootId)
      const rootMenu = searchRoot(result, rootId)
      menuNav.push({
        ...rootMenu,
        children: childrenNav,
      })
      // console.log('menuNav', menuNav)
      resolve(menuNav)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: [],
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}

/**
 * 寻找根菜单
 */
const searchRoot = (list, rootId) => {
  for (var i = 0; i < list.length; i++) {
    if (rootId === list[i].id) {
      return list[i]
    }
  }
}
