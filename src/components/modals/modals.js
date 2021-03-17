import React, { Component } from 'react'
import { SignInModal } from './'
import { valueHelper } from '../../helpers'

const modalList = {
  SignIn: SignInModal
}

class Modals extends Component {
  render() {
    const { modalProps, modalName } = this.props
    if (!valueHelper.isValue(modalName)) {
      return (<React.Fragment />)
    }

    const modalNameParts = modalName.split('-')
    const modal = modalNameParts.map((modalNamePart) => { return valueHelper.capitalizeWords(modalNamePart) }).join('')
    const Modal = modalList[modal]
    if (!valueHelper.isValue(Modal)) {
      return (
        <span>Could not build modal {modalName} ({modal}) (recognized? {JSON.stringify(modal in modalList)})</span>
      )
    }

    const props = valueHelper.isValue(modalProps) ? modalProps[modalName] : {}
    return (
      <Modal {...this.props} {...props} date={new Date()} />
    )
  }
}

export { Modals }
