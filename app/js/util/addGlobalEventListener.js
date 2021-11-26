export default function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
      if (e.target.matches(selector)) {
        callback(e)
      }
    })
  }

export function addGlobalEventListenerQS(type, selector, callback){
  const selectorelemetn = document.querySelector(selector)
  document.querySelector(selector).addEventListener(type, callback)
}