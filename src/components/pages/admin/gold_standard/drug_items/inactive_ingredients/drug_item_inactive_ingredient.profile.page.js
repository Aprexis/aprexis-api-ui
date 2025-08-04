import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../../../../shared/index.js'
import { DrugItemInactiveIngredientProfilePageViewModel } from '../../../../../view_models/pages/admin/gold_standard/drug_items/inactive_ingredients/index.js'
import { goldStandardDrugItemInactiveIngredientHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../../../../helpers/index.js'

const DrugItemInactiveIngredientProfile = ({ drugItemInactiveIngredient, onDrugItem, onIngredient }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {
            displayHelper.display(
              "Drug Item",
              goldStandardDrugItemInactiveIngredientHelper.goldStandardDrugItemNameLong(drugItemInactiveIngredient),
              '',
              ':',
              false,
              onDrugItem
            )
          }
          {
            displayHelper.display(
              "Ingredient",
              goldStandardDrugItemInactiveIngredientHelper.goldStandardIngredientName(drugItemInactiveIngredient),
              '',
              ':',
              false,
              onIngredient
            )
          }
          {displayHelper.display("Strength", goldStandardDrugItemInactiveIngredientHelper.strength(drugItemInactiveIngredient))}
          {displayHelper.display("Strength Unit Code", goldStandardDrugItemInactiveIngredientHelper.strengthUnitCode(drugItemInactiveIngredient))}
          {displayHelper.display("Per Volumne", goldStandardDrugItemInactiveIngredientHelper.perVolume(drugItemInactiveIngredient))}
          {displayHelper.display("Per Volume Unit Code", goldStandardDrugItemInactiveIngredientHelper.perVolumeUnitCode(drugItemInactiveIngredient))}
        </CardBody>
      </Card>
    </Col>
  )
}

const DrugItemInactiveIngredientDisplay = ({ drugItemInactiveIngredient, onDrugItem, onIngredientName }) => {
  if (!valueHelper.isValue(drugItemInactiveIngredient)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <DrugItemInactiveIngredientProfile drugItemInactiveIngredient={drugItemInactiveIngredient} onDrugItem={onDrugItem} onIngredientName={onIngredientName} />
      </Row>
    </React.Fragment>
  )
}

class DrugItemInactiveIngredientProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DrugItemInactiveIngredientProfilePageViewModel(
      {
        ...props,
        view: this
      }
    )
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { drugItemInactiveIngredient } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardDrugItemInactiveIngredientHelper.label(drugItemInactiveIngredient)}</h1>
          </div>

          <DrugItemInactiveIngredientDisplay
            currentUser={this.props.currentUser}
            drugItemInactiveIngredient={drugItemInactiveIngredient}
            onDrugItem={() => { this.vm.gotoDrugItem(drugItemInactiveIngredient) }}
            onIngredient={() => { this.vm.gotoIngredient(drugItemInactiveIngredient) }}
          />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { DrugItemInactiveIngredientProfilePage }
