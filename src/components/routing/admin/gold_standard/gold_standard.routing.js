import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { GoldStandardPage } from "../../../pages/admin/gold_standard"
import { NoMatch } from "../../"
import { SpecificDrugProductsRouting } from "./specific_drug_products"
import { SpecificProductsRouting } from "./specific_products"
import { TherapeuticConceptsRouting } from "./therapeutic_concepts"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers"

class GoldStandardRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const goldStandardPrefix = pathHelper.pluralPrefix(window.location, "gold-standard")

    return (
      <Switch>
        <Route
          exact
          path={goldStandardPrefix}
          render={(props) => (<GoldStandardPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${goldStandardPrefix}/specific-drug-products`}
          render={(props) => (<SpecificDrugProductsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${goldStandardPrefix}/specific-products`}
          render={(props) => (<SpecificProductsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${goldStandardPrefix}/therapeutic-concepts`}
          render={(props) => (<TherapeuticConceptsRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { GoldStandardRouting }
