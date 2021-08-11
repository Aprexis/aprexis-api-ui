import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import {
  DateFieldEditor,
  DateTimeFieldEditor,
  SelectFieldEditor,
  SelectPharmacyStore,
  Spinner,
  TextFieldEditor
} from "../../shared"
import { AppointmentModalViewModel } from "../../view_models/modals/appointments"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { appointmentHelper, pathHelper, userHelper, valueHelper } from "../../../helpers"
import { venues } from "../../../types"

const AllDayAppointment = ({ appointment, onChangeDate }) => {
  return (
    <FormGroup row>
      <DateFieldEditor
        allowBlank={false}
        changeField={onChangeDate}
        fieldLabel="Start Date"
        fieldName="scheduled_at"
        helper={appointmentHelper}
        earliestDate={new Date()}
        model={appointment}
      />
      <DateFieldEditor
        allowBlank={false}
        changeField={onChangeDate}
        fieldLabel="End Date"
        fieldName="scheduled_until"
        helper={appointmentHelper}
        earliestDate={new Date()}
        model={appointment}
      />
    </FormGroup>
  )
}

const TimeRangeAppointment = ({ appointment, onChangeDateTime }) => {
  return (
    <FormGroup row>
      <DateTimeFieldEditor
        allowBlank={false}
        changeField={onChangeDateTime}
        fieldLabel="Scheduled At"
        fieldName="scheduled_at"
        helper={appointmentHelper}
        earliestDateTime={new Date()}
        model={appointment}
        timeStep={15}
      />
      <DateTimeFieldEditor
        allowBlank={false}
        changeField={onChangeDateTime}
        fieldLabel="Scheduled Until"
        fieldName="scheduled_until"
        helper={appointmentHelper}
        earliestDateTime={new Date()}
        model={appointment}
        timeStep={15}
      />
    </FormGroup>
  )
}

const AppointmentTimeEditor = ({ appointment, onChangeDate, onChangeDateTime }) => {
  if (valueHelper.isSet(appointmentHelper.allDay(appointment))) {
    return (<AllDayAppointment appointment={appointment} onChangeDate={onChangeDate} />)
  }

  return (<TimeRangeAppointment appointment={appointment} onChangeDateTime={onChangeDateTime} />)
}

class AppointmentModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new AppointmentModalViewModel(
      {
        ...props,
        view: this
      }
    )

    this.renderFooter = this.renderFooter.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { appointment } = this.state
    const pathEntries = this.vm.pathEntries()
    const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy-stores")

    if (!valueHelper.isValue(appointment)) {
      return (<Spinner />)
    }

    return (
      <AprexisModal
        {...this.props}
        modalClassName="appointment modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="title"
                    helper={appointmentHelper}
                    model={appointment}
                  />
                </FormGroup>

                <AppointmentTimeEditor
                  appointment={appointment}
                  onChangeDate={this.vm.changeDate}
                  onChangeDateTime={this.vm.changeDateTime}
                />

                {
                  !valueHelper.isNumberValue(pharmacyStoreId) &&
                  <SelectPharmacyStore
                    {...valueHelper.importantProps(this.props)}
                    fieldLabel="Pharmacy Store"
                    inForm={true}
                    id={appointmentHelper.pharmacyStoreId(appointment)}
                    onChange={this.vm.selectPharmacyStore}
                    readOnly={!appointmentHelper.canModifyField(appointment, "pharmacy_store_id")}
                  />
                }

                <FormGroup row>
                  <SelectFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="venue"
                    fieldOptions={venues}
                    helper={appointmentHelper}
                    model={appointment}
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
    const { clearModal } = this.props
    const { appointment, changedAppointment, operation } = this.state

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(event) => { this.vm.toggleModal(clearModal) }}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={
            (event) => {
              this.vm.submitModalCreateOrUpdate("appointment", appointment, changedAppointment)
            }
          }>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { user } = this.state
    const title = `Appointment for ${userHelper.fullName(user)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisAppointmentModal = aprexisWrapperModal(AppointmentModal)
export { aprexisAppointmentModal as AppointmentModal }

