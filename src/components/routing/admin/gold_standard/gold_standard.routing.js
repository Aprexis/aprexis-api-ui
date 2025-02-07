import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { GoldStandardPage } from "../../../pages/admin/gold_standard"
import { NoMatch } from "../../"
import { DrugItemsRouting } from "./drug_items"
import { GenericProductClinicalsRouting } from "./generic_product_clinicals"
import { GenericProductsRouting } from "./generic_products"
import { MaintenanceMedicationsRouting } from "./maintenance_medications"
import { MarketedProductsRouting } from "./marketed_products"
import { PackageVersionsRouting } from "./package_versions"
import { PackagesRouting } from "./packages"
import { ProductsRouting } from "./products"
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
          path={`${goldStandardPrefix}/drug-items`}
          render={(props) => (<DrugItemsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${goldStandardPrefix}/generic-product-clinicaLs`}
          render={(props) => (<GenericProductClinicalsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${goldStandardPrefix}/generic-products`}
          render={(props) => (<GenericProductsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${goldStandardPrefix}/maintenance-medications`}
          render={(props) => (<MaintenanceMedicationsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${goldStandardPrefix}/marketed-products`}
          render={(props) => (<MarketedProductsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${goldStandardPrefix}/package-versions`}
          render={(props) => (<PackageVersionsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${goldStandardPrefix}/packages`}
          render={(props) => (<PackagesRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${goldStandardPrefix}/products`}
          render={(props) => (<ProductsRouting {...props} {...contextProps} />)}
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
