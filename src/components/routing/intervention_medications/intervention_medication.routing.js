import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../index.js"
//import { InterventionMedicationProfilePage } from "../../pages/intervention_medications/index.js"
//import { valueHelper } from "@aprexis/aprexis-api-utility"
//import { pathHelper } from "../../../helpers/index.js"

class InterventionMedicationRouting extends Component {
  render() {
    /*
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const interventionMedicationPrefix = pathHelper.singularPrefix(window.location, "intervention-medications", ":intervention_medication_id")
    */

    return (
      <Switch>
        {/*
        <Route
          exact
          path={`${interventionMedicationPrefix}/profile`}
          render={(props) => (<InterventionMedicationProfilePage {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { InterventionMedicationRouting }
