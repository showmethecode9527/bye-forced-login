// 遮罩层选择器
const MASK_SELECTOR = '.login-mark'
// 弹出的登录框选择器
const LOGIN_BOX_SELECTOR = '.login-box'

// 观察的节点
// https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/MutationObserver
var TARGET_NODE = document.body
// 要观察的变更
var config = {
  attributes: false, // 观察属性变动
  childList: true, // 观察子节点变动: 删除或增加
  subtree: false // 观察后代节点
}

var callback = (mutationsList, observer) => {
  mutationsList.forEach(mutation => {
    switch(mutation.type) {
      case 'childList':
        removeLoginNodes()
        break
    }
  })
}

var observer = new MutationObserver(callback)

observer.observe(TARGET_NODE, config)

function removeLoginNodes () {
  let el = document.querySelector(MASK_SELECTOR)
  if (el) {
    console.log('删除遮罩层')
    TARGET_NODE.removeChild(el)
  }

  el = document.querySelector(LOGIN_BOX_SELECTOR)
  if (el) {
    console.log('删除登录弹框')
    TARGET_NODE.removeChild(el)
  }
}
