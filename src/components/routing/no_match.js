import { Component } from 'react'
import { Spinner } from '../shared/index.js'

class NoMatch extends Component {
  render() {
    return (
      <div>
        <Spinner />
      </div>
    )
  }
}

export { NoMatch }
