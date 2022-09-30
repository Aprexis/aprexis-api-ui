import { questionHelper, questionHtmlOptionsHelper, valueHelper } from '@aprexis/aprexis-api-utility'

export const questionHtmlOptionsParser = {
  parseHtmlOptions
}

function parseHtmlOptions(question) {
  const htmlOptions = questionHelper.htmlOptions(question)
  if (!valueHelper.isValue(htmlOptions)) {
    return { className: '' }
  }

  const options = questionHtmlOptionsHelper.options(htmlOptions)
  return {
    className: options.class,
    multiple: options.multiple,
    placeholder: options.placeholder,
    style: parseStyle(options.style)
  }

  function parseStyle(style) {
    if (!valueHelper.isStringValue(style)) {
      return {}
    }

    const styles = {}
    style.split(';').forEach(
      (styleEntry) => {
        const styleParts = styleEntry.split(':')

        styles[styleParts[0].trim()] = styleParts[1].trim()
      }
    )
    return styles
  }
}
