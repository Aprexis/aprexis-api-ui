import React, { Component } from 'react'
import { Sanitize } from '../../components/shared'

function Title({ title }) {
  if (typeof title === 'object') {
    return title
  }

  return (<Sanitize html={title} />)
}

class AprexisModalHeader extends Component {
  render() {
    const { title, children } = this.props

    return (
      <div>
        <h2><Title title={title} /></h2>
        {children}
      </div>
    )
  }
}

export { AprexisModalHeader }
