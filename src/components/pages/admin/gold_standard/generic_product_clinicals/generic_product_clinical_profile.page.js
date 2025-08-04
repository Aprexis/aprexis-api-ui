import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../../../shared/index.js'
import { GenericProductClinicalProfilePageViewModel } from '../../../../view_models/pages/admin/gold_standard/generic_product_clinicals/index.js'
import { goldStandardGenericProductClinicalHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../../../helpers/index.js'

const GenericProductClinicalProfile = ({ genericProductClinical }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Synonym", goldStandardGenericProductClinicalHelper.synonym(genericProductClinical))}
        </CardBody>
      </Card>
    </Col>
  )
}

const GenericProductClinicalDisplay = ({ genericProductClinical }) => {
  if (!valueHelper.isValue(genericProductClinical)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <GenericProductClinicalProfile genericProductClinical={genericProductClinical} />
      </Row>
    </React.Fragment>
  )
}

class GenericProductClinicalProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new GenericProductClinicalProfilePageViewModel(
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
    const { genericProductClinical } = this.state
    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardGenericProductClinicalHelper.name(genericProductClinical)}</h1>
          </div>

          <GenericProductClinicalDisplay
            currentUser={this.props.currentUser}
            genericProductClinical={genericProductClinical}
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

export { GenericProductClinicalProfilePage }
