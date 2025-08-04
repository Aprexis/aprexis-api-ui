import { Component } from "react"
import { Route, Switch } from "react-router-dom"
//import { AnswerRouting } from "./answer.routing.js"
import { NoMatch } from "../index.js"
import { AnswersPage } from "../../pages/answers/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class AnswersRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
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
