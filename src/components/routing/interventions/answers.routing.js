import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
//import { AnswerRouting } from "./"
import { NoMatch } from "../"
import { AnswersPage } from "../../pages/interventions"
import { pathHelper } from "../../../helpers"

class AnswersRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
    }
    const answersPrefix = pathHelper.pluralPrefix(window.location, "answers")

    return (
      <Switch>
        <Route
          exact
          path={answersPrefix}
          render={(props) => (<AnswersPage {...props} {...contextProps} />)}
        />
        {/*}
        <Route
          path={`${answersPrefix}/:answer_id`}
          render={(props) => (<AnswerRouting {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { AnswersRouting }
