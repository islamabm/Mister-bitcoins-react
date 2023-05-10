function save(key, value) {
  console.log('acsac')
  localStorage[key] = JSON.stringify(value)
}

function load(key, defaultValue = null) {
  var value = localStorage[key] || defaultValue
  return JSON.parse(value)
}
export const storageService = {
  save,
  load,
}
