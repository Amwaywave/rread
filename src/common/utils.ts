export const add = (a, b) => a + b

export const getTextByHtml = (html = '') => {
  return html.replace(/<\/?[^>]+>/g,"").substr(0, 50)
}

const convertTime = (time) => time >= 10 ? time : `0${time}`

export const getTime = (time) => {
  const date = new Date(time)
  const hours = date.getHours()
  const min = date.getMinutes()
  const M = hours >= 12 ? "PM" : 'AM'

  const showHours = convertTime(hours > 12 ? (hours - 12) : hours)
  const showMin = convertTime(min)

  return `${showHours}.${showMin}${M}`
}
