import React, { Component } from 'react'
import { dateHelper, valueHelper } from '@aprexis/aprexis-api-utility'

export function aprexisWrapperModal(WrappedModal) {
  return class extends Component {
    constructor(props) {
      super(props)

      this.state = {}

      this.toggleModal = this.toggleModal.bind(this)
      this.toggleState = this.toggleState.bind(this)
    }

    componentDidMount() {
      this._isMounted = true
    }

    componentWillUnmount() {
      this._isMounted = false
    }

    static getDerivedStateFromProps(props, state) {
      return deriveStateFromProps(props, state)
    }

    render() {
      const wrappedProps = {
        ...this.props,
        ...this.state,
        toggleModal: this.toggleModal
      }

      return (
        <WrappedModal {...wrappedProps} />
      )
    }

    toggleModal(nextOperation) {
      if (valueHelper.isSet(this._isMounted)) {
        this.setState(this.toggleState)
      }

      if (valueHelper.isFunction(nextOperation)) {
        nextOperation()
      }
    }

    toggleState(state, props) {
      deriveStateFromProps(props, state)
    }
  }
}

function deriveStateFromProps(props, state) {
  let modalDate
  if (dateHelper.isDateValue(state.modalDate)) {
    modalDate = dateHelper.makeDate(state.modalDate)
  }

  let propsDate
  if (dateHelper.isDateValue(props.date)) {
    propsDate = dateHelper.makeDate(props.date)
  }

  let { modalVisible } = state
  if (!dateHelper.isDateValue(propsDate)) {
    modalVisible = false
  } else if (!dateHelper.isDateValue(modalDate) || +propsDate > +modalDate) {
    modalDate = propsDate
    modalVisible = true
  } else if (!valueHelper.isValue(modalVisible)) {
    modalVisible = true
  }

  return {
    modalDate,
    modalVisible
  }
}
