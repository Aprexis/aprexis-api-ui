export const alertHelper = {
  clear,
  error,
  get,
  info,
  success,
  warn
}

function clear() {
  sessionStorage.removeItem('alert-type')
  sessionStorage.removeItem('alert-message')
}

function error(message) {
  sessionStorage.setItem('alert-type', 'error')
  sessionStorage.setItem('alert-message', message)
}

function get() {
  const alertType = sessionStorage.getItem('alert-type')
  const alertMessage = sessionStorage.getItem('alert-message')

  return { alertMessage, alertType }
}

function info(message) {
  sessionStorage.setItem('alert-type', 'information')
  sessionStorage.setItem('alert-message', message)
}

function success(message) {
  sessionStorage.setItem('alert-type', 'success')
  sessionStorage.setItem('alert-message', message)
}

function warn(message) {
  sessionStorage.setItem('alert-type', 'warning')
  sessionStorage.setItem('alert-message', message)
}
