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
let zhihuFirstEnforcedLoginDone = false

const callback = (mutationsList, observer) => {
  mutationsList.forEach(mutation => {
    switch (mutation.type) {
      case 'childList':
        clearForcedLoginDialog()
        break
    }
  })
}

const observer = new MutationObserver(callback)

observer.observe(TARGET_NODE, config)

function clearForcedLoginDialog () {
  TO_BE_REMOVED_SELECTORS.forEach(selector => {
    if (selector === '.Modal-wrapper') {
      // 当前是 zhihu 的, 则只删除一次, 因为用户可能会手动点击登录
      if (!zhihuFirstEnforcedLoginDone) {
        zhihuFirstEnforcedLoginDone = removeEl(document.querySelector(selector))

        // zhihu 自动弹出的登录, 需要取消溢出隐藏
        const rootEl = document.documentElement
        if (rootEl.style.overflow === 'hidden') {
          rootEl.style.overflow = 'auto'
        }
      }
    } else {
      // csdn, 只要发现弹窗就删除
      // 因为如果用户手动点击登录是不会出现弹窗的, 而是直接跳转到登录页
      removeEl(document.querySelector(selector))
    }
  })
}

// 删除指定的 html 元素节点
function removeEl (el) {
  let result = false
  try {
    el.parentNode.removeChild(el)
    result = true
  } catch (e) {
    // console.log(e)
  }

  return result
}
