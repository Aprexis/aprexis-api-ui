export const alertHelper = {
  clear,
  error,
  get,
  info,
  success,
  warning
}

function messageText(message) {
  if (typeof message === 'string') {
    return message
  }

  return JSON.stringify(message)
}

function clear() {
  sessionStorage.removeItem('alert-type')
  sessionStorage.removeItem('alert-message')
}

function error(message) {
  const text = messageText(message)
  console.log(`ERROR: ${text}`)
  console.trace()
  sessionStorage.setItem('alert-type', 'danger')
  sessionStorage.setItem('alert-message', text)
}

function get() {
  const alertType = sessionStorage.getItem('alert-type')
  const alertMessage = sessionStorage.getItem('alert-message')

  return { alertMessage, alertType }
}

function info(message) {
  const text = messageText(message)
  console.log(`'INFO: ${text}`)
  sessionStorage.setItem('alert-type', 'info')
  sessionStorage.setItem('alert-message', text)
}

function success(message) {
  const text = messageText(message)
  console.log(`SUCCESS: ${text}`)
  sessionStorage.setItem('alert-type', 'success')
  sessionStorage.setItem('alert-message', text)
}

function warning(message) {
  const text = messageText(message)
  console.log(`WARNING: ${text}`)
  console.trace()
  sessionStorage.setItem('alert-type', 'warning')
  sessionStorage.setItem('alert-message', text)
}
