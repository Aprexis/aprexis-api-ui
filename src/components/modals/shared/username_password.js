import React, { Component } from 'react'
import { FormGroup, Label } from 'reactstrap'
import { valueHelper } from '../../../helpers'

class UsernamePassword extends Component {
  render() {
    const { changeField, inputClassName, username, password } = this.props

    return (
      <React.Fragment>
        <FormGroup row>
          <Label htmlFor='username'>Username</Label>
          <input
            className={`${inputClassName} mb-2 form-control`}
            id='username'
            maxLength='254'
            name='username'
            onChange={changeField}
            placeholder='username'
            ref='username'
            required
            size='32'
            type='text'
            value={valueHelper.makeString(username)}
          />
        </FormGroup>

        <FormGroup row>
          <Label htmlFor='password'>Password</Label>
          <input
            className={`${inputClassName} mb-2 form-control`}
            id='password'
            maxLength='254'
            name='password'
            onChange={changeField}
            placeholder='password'
            required
            size='2'
            type='password'
            value={valueHelper.makeString(password)}
          />
        </FormGroup>
      </React.Fragment>
    )
  }
}

export { UsernamePassword }
