const getItem = key => {
  try {
    const str = localStorage.getItem(key)
    if (!str) return null
    const data = JSON.parse(str)
    return data
  } catch (error) {
    return null
  }
}

const setItem = (key, data) => {
  try {
    const str = JSON.stringify(data)
    localStorage.setItem(key, str)
    return str
  } catch (error) {
    return false
  }
}

export default {getItem, setItem}
