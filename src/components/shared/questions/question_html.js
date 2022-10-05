import React, { Component } from 'react'
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { Sanitize } from '../'
import $ from 'jquery'

function extractAttribute(attributes, attributeName) {
  for (let idx = 0; idx < attributes.length; ++idx) {
    const item = attributes.item(idx)
    if (item.name == attributeName) {
      return item.value
    }
  }

  return
}

class QuestionHtml extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.overlayPop = this.overlayPop.bind(this)
    this.overlayPopoverAndPopup = this.overlayPopoverAndPopup.bind(this)
    this.overlayPopoverGroup = this.overlayPopoverGroup.bind(this)
    this.overlayPopupTarget = this.overlayPopupTarget.bind(this)
    this.setupJQueryShowPopoverOnHover = this.setupJQueryShowPopoverOnHover.bind(this)
    this.setupJQueryShowPopup = this.setupJQueryShowPopup.bind(this)
  }

  componentDidMount() {
    this.setupJQueryShowPopoverOnHover()
    this.setupJQueryShowPopup()
  }

  overlayPop(html, doaction, side, actionData, actionName, title, content) {
    const idx = findAction(html, doaction, actionName)
    if (idx == -1) {
      return html
    }

    const { start, tag } = locateStart(html, idx)
    const pop = buildPop(title, content)
    switch (side) {
      case 'top':
        return insertPopAt(html, start, pop)

      case 'bottom':
        return insertPopAfter(html, start, tag, pop)

      default:
        return html
    }

    function buildPop(title, content) {
      return [
        "<overlay class='html-overlay'>",
        "  <h1>",
        `    ${title}`,
        `  </h1>`,
        `  <div>`,
        `    ${content}`,
        "  </div>",
        "</overlay>"
      ].join('')
    }

    function findAction(html, doaction, actionName) {
      const regexString = `\\sdata-doaction=['"]${doaction}['"].*\\sdata-${actionData}=['"]${actionName}['"]`
      const actionRegex = new RegExp(regexString)
      return html.search(actionRegex)
    }

    function insertPopAfter(html, position, tag, pop) {
      const positionAfter = locateEnd(html, position, tag)
      return insertPopAt(html, positionAfter, pop)
    }

    function insertPopAt(html, position, pop) {
      return [html.slice(0, position), pop, html.slice(position)].join('')
    }

    function locateEnd(html, start, _tag) {
      /* For now, we'll assume that the target tag is <a> and is in a <p>.
      const closedTag = '/>'
      const closedTagEnd = html.indexOf(closedTag, start)
      const closeTag = `</${tag}>`
      const closeTagEnd = html.indexOf(closeTag, start)
      if (closedTagEnd < closeTagEnd) {
        return closedTagEnd + closedTag.length + 1
      }
      */

      const closeTag = '</p>'
      const closeTagEnd = html.slice(start).indexOf(closeTag)
      return start + closeTagEnd + closeTag.length + 1
    }

    function locateStart(html, idx) {
      /* For now, we'll assume that the target tag is <a> and is in a <p>.
      const start = html.slice(0, idx).lastIndexOf('<')
      const end = html.indexOf(' ', start)
      const tag = html.slice(start + 1, end)
      return { start, tag }
      */
      const tag = '<p>'
      const start = html.slice(0, idx).lastIndexOf(tag)
      return { start, tag }
    }
  }

  overlayPopoverAndPopup(html) {
    const { popoverGroup, popupTarget } = this.state

    if (valueHelper.isStringValue(popoverGroup)) {
      return this.overlayPopoverGroup(html, popoverGroup)
    }

    if (valueHelper.isStringValue(popupTarget)) {
      return this.overlayPopupTarget(html, popupTarget)
    }

    return html
  }

  overlayPopoverGroup(html, popoverGroup) {
    const { popoverTitle, popoverContent } = this.state

    return this.overlayPop(html, 'show-popover-on-hover', 'bottom', 'group', popoverGroup, popoverTitle, popoverContent)
  }

  overlayPopupTarget(html, popupTarget) {
    const { popupTitle, popupContent } = this.state

    return this.overlayPop(html, 'show-popup', 'bottom', 'target', popupTarget, popupTitle, popupContent)
  }

  render() {
    let { html } = this.props

    return (
      <Sanitize html={this.overlayPopoverAndPopup(html)} />
    )
  }

  setupJQueryShowPopoverOnHover() {
    $(document).on(
      'mouseover',
      "a[data-doaction='show-popover-on-hover']",
      (event) => {
        const { attributes } = event.currentTarget
        const popoverGroup = extractAttribute(attributes, 'data-group')
        const popoverSource = $(`span.popup-content.hidden.${popoverGroup}`)
        const popoverTitle = popoverSource.find('span.title').html()
        const popoverContent = popoverSource.find('span.content').html()

        this.setState(
          (oldState, _oldProps) => {
            if (oldState.popoverContent == popoverContent) {
              return { popoverContent: undefined, popoverGroup: undefined, popoverTitle: undefined }
            }

            return { popoverContent, popoverGroup, popoverTitle }
          }
        )
      }
    )
  }

  setupJQueryShowPopup() {
    $(document).on(
      'mouseup',
      "a[data-doaction='show-popup']",
      (event) => {
        const { attributes } = event.currentTarget
        const popupTarget = extractAttribute(attributes, 'data-target')
        const popupSource = $(`span.popup-content.hidden.${popupTarget}`)
        const popupTitle = popupSource.find('span.title').html()
        const popupContent = popupSource.find('span.content').html()

        this.setState(
          (oldState, _oldProps) => {
            if (oldState.popupTarget == popupTarget) {
              return { popupContent: undefined, popupTarget: undefined, popupTitle: undefined }
            }

            return { popupContent, popupTarget, popupTitle }
          }
        )

        return false
      }
    )
  }

}

export { QuestionHtml }
