import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../../../../shared'
import { DrugItemActiveIngredientProfilePageViewModel } from '../../../../../view_models/pages/admin/gold_standard/drug_items/active_ingredients'
import { goldStandardDrugItemActiveIngredientHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../../../../helpers'

const DrugItemActiveIngredientProfile = ({ drugItemActiveIngredient, onDrugItem, onIngredient }) => {
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
              goldStandardDrugItemActiveIngredientHelper.goldStandardDrugItemNameLong(drugItemActiveIngredient),
              '',
              ':',
              false,
              onDrugItem
            )
          }
          {
            displayHelper.display(
              "Ingredient",
              goldStandardDrugItemActiveIngredientHelper.goldStandardIngredientName(drugItemActiveIngredient),
              '',
              ':',
              false,
              onIngredient
            )
          }
          {displayHelper.display("Strength", goldStandardDrugItemActiveIngredientHelper.strength(drugItemActiveIngredient))}
          {displayHelper.display("Strength Unit Code", goldStandardDrugItemActiveIngredientHelper.strengthUnitCode(drugItemActiveIngredient))}
          {displayHelper.display("Per Volumne", goldStandardDrugItemActiveIngredientHelper.perVolume(drugItemActiveIngredient))}
          {displayHelper.display("Per Volume Unit Code", goldStandardDrugItemActiveIngredientHelper.perVolumeUnitCode(drugItemActiveIngredient))}
          {displayHelper.display("Dilution Numerator", goldStandardDrugItemActiveIngredientHelper.dilutionNumerator(drugItemActiveIngredient))}
          {displayHelper.display("Dilution Denominator", goldStandardDrugItemActiveIngredientHelper.dilutionDenominator(drugItemActiveIngredient))}
          {displayHelper.booleanDisplay("Base Equivalent", goldStandardDrugItemActiveIngredientHelper.baseEquivalent(drugItemActiveIngredient))}
        </CardBody>
      </Card>
    </Col>
  )
}

const DrugItemActiveIngredientDisplay = ({ drugItemActiveIngredient, onDrugItem, onIngredientName }) => {
  if (!valueHelper.isValue(drugItemActiveIngredient)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <DrugItemActiveIngredientProfile drugItemActiveIngredient={drugItemActiveIngredient} onDrugItem={onDrugItem} onIngredientName={onIngredientName} />
      </Row>
    </React.Fragment>
  )
}

class DrugItemActiveIngredientProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DrugItemActiveIngredientProfilePageViewModel(
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
    const { drugItemActiveIngredient } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardDrugItemActiveIngredientHelper.label(drugItemActiveIngredient)}</h1>
          </div>

          <DrugItemActiveIngredientDisplay
            currentUser={this.props.currentUser}
            drugItemActiveIngredient={drugItemActiveIngredient}
            onDrugItem={() => { this.vm.gotoDrugItem(drugItemActiveIngredient) }}
            onIngredient={() => { this.vm.gotoIngredient(drugItemActiveIngredient) }}
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

export { DrugItemActiveIngredientProfilePage }
