const TO_BE_REMOVED_SELECTORS = [
  // csdn 的强制登录
  '.login-mark',
  '.login-box',
  // zhihu 的强制登录
  '.Modal-wrapper'
]

// 观察的节点
// https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/MutationObserver
const TARGET_NODE = document.body
// 要观察的变更
const config = {
  attributes: false, // 观察属性变动
  childList: true, // 观察子节点变动: 删除或增加
  subtree: false // 观察后代节点
}

// 标识是否已经做过强制登录的处理
// 仅处理一次
let firstEnforcedLoginDone = false

const callback = (mutationsList, observer) => {
  mutationsList.forEach(mutation => {
    switch (mutation.type) {
      case 'childList':
        if (!firstEnforcedLoginDone) {
          removeNodes()
          firstEnforcedLoginDone = true
        }
        break
    }
  })
}

const observer = new MutationObserver(callback)

observer.observe(TARGET_NODE, config)

function removeNodes () {
  let el
  TO_BE_REMOVED_SELECTORS.forEach(selector => {
    el = document.querySelector(selector)
    if (el) {
      try {
        el.parentNode.removeChild(el)
      } catch (e) {
        console.log(e)
      }
    }
  })

  // zhihu 自动弹出的登录, 需要取消溢出隐藏
  const rootEl = document.documentElement
  if (rootEl.style.overflow === 'hidden') {
    rootEl.style.overflow = 'auto'
  }
}
