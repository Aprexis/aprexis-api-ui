import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import {
  DayFieldEditor,
  NumberFieldEditor
} from "../../shared"
import { ExternalInterventionProfileModalViewModel } from "../../view_models/modals/interventions"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { interventionHelper, valueHelper, contactMethods } from "@aprexis/aprexis-api-utility"

class ExternalInterventionProfileModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new ExternalInterventionProfileModalViewModel(
      {
        ...props,
        view: this
      }
    )

    this.contactMethods = this.contactMethods.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  contactMethods(preferredContactMethod) {
    if (valueHelper.isValue(contactMethods.find((contactMethod) => contactMethod.value == preferredContactMethod))) {
      return contactMethods
    }

    return [
      {
        value: preferredContactMethod,
        label: preferredContactMethod
      },
      ...contactMethods,
    ]
  }

  render() {
    const { intervention } = this.state

    return (
      <AprexisModal
        {...this.props}
        modalClassName="extermal-intervention-profile modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup row>
                  <DayFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldName="date_of_service"
                    fieldXs={3}
                    helper={interventionHelper}
                    model={intervention}
                    style={{ width: 110 }}
                    required={true}
                  />
                </FormGroup>

                <FormGroup row>
                  <NumberFieldEditor
                    changeField={this.vm.changeNumericField}
                    fieldName="consult_session_duration"
                    helper={interventionHelper}
                    model={intervention}
                    min={1}
                    max={31}
                    required={true}
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </AprexisModal>
    )
  }

  renderFooter() {
    const { changedExternalIntervention, clearModal, operation, intervention } = this.state

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(_event) => { this.vm.toggleModal(clearModal) }}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={(_event) => { this.vm.submitModalCreateOrUpdate("intervention", intervention, changedExternalIntervention) }}>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const title = "External Intervention"

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisExternalInterventionProfileModal = aprexisWrapperModal(ExternalInterventionProfileModal)
export { aprexisExternalInterventionProfileModal as ExternalInterventionProfileModal }
