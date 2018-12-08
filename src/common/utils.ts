export const add = (a, b) => a + b

export const getTextByHtml = (html = '') => {
  return html.replace(/<\/?[^>]+>/g,"")
}
