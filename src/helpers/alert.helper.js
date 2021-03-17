export const alertHelper = {
  clear,
  error,
  get,
  info,
  success,
  warning
}

function clear() {
  sessionStorage.removeItem('alert-type')
  sessionStorage.removeItem('alert-message')
}

function error(message) {
  console.log(`ERROR: ${message}`)
  sessionStorage.setItem('alert-type', 'danger')
  sessionStorage.setItem('alert-message', message)
}

function get() {
  const alertType = sessionStorage.getItem('alert-type')
  const alertMessage = sessionStorage.getItem('alert-message')

  return { alertMessage, alertType }
}

function info(message) {
  console.log(`'INFO: ${message}`)
  sessionStorage.setItem('alert-type', 'info')
  sessionStorage.setItem('alert-message', message)
}

function success(message) {
  console.log(`SUCCESS: ${message}`)
  sessionStorage.setItem('alert-type', 'success')
  sessionStorage.setItem('alert-message', message)
}

function warning(message) {
  console.log(`WARNING: ${message}`)
  sessionStorage.setItem('alert-type', 'warning')
  sessionStorage.setItem('alert-message', message)
}
