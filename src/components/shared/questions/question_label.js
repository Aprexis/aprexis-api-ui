import React, { Component } from 'react'
import { Tooltip } from 'reactstrap'
import { questionHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { Sanitize } from '../'

function LabelWithTooltip({ label, labelTooltip, questionKey, toggle, tooltipOpen }) {
  return (
    <React.Fragment>
      <span style={{ textDecoration: 'underline', textDecorationColor: 'grey', textDecorationStyle: 'dashed' }} id={`tooltip-${questionKey}`}><Sanitize html={label} /></span>
      <Tooltip placement="right" isOpen={tooltipOpen} target={`tooltip-${questionKey}`} toggle={toggle}>
        <Sanitize html={labelTooltip} />
      </Tooltip>
    </React.Fragment>
  )
}

function SimpleLabel({ label }) {
  return (<Sanitize html={label} />)
}

class QuestionLabel extends Component {
  constructor(props) {
    super(props)

    this.state = { tooltipOpen: false }
    this.toggle = this.toggle.bind(this)
  }

  render() {
    const { question } = this.props
    let label = questionHelper.label(question)
    if (!valueHelper.isStringValue(label)) {
      label = valueHelper.humanize(questionHelper.questionKey(question))
    }
    const labelTooltip = questionHelper.labelTooltip(question)

    if (!valueHelper.isStringValue(labelTooltip)) {
      return (<SimpleLabel label={label} />)
    }

    return (<LabelWithTooltip label={label} labelTooltip={labelTooltip} questionKey={questionHelper.questionKey(question)} toggle={this.toggle} tooltipOpen={this.state.tooltipOpen} />)
  }

  toggle() {
    this.setState({ tooltipOpen: !this.state.tooltipOpen })
  }
}

export { QuestionLabel }

