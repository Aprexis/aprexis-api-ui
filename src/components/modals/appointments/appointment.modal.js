import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import {
  DayFieldEditor,
  DayTimeFieldEditor,
  SelectFieldEditor,
  SelectPharmacyStore,
  Spinner,
  TextFieldEditor
} from "../../shared"
import { AppointmentModalViewModel } from "../../view_models/modals/appointments"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { appointmentDurations, appointmentHelper, userHelper, valueHelper, venues } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../helpers"

const AllDayAppointment = ({ appointment, onChangeDate }) => {
  return (
    <FormGroup row>
      <DayFieldEditor
        allowBlank={false}
        changeField={onChangeDate}
        fieldLabel="Start Date"
        fieldName="scheduled_at"
        helper={appointmentHelper}
        earliestDate={new Date()}
        model={appointment}
      />
    </FormGroup>
  )
}

const TimeRangeAppointment = ({ appointment, onChangeDayTime, onChangeField }) => {
  return (
    <FormGroup row>
      <DayTimeFieldEditor
        allowBlank={false}
        changeField={onChangeDayTime}
        fieldLabel="Scheduled At"
        fieldName="scheduled_at"
        helper={appointmentHelper}
        earliestDayTime={new Date()}
        model={appointment}
        timeStep={15}
      />
      <SelectFieldEditor
        allowBlank={false}
        changeField={onChangeField}
        fieldLabel="Duration"
        fieldName="duration"
        fieldOptions={appointmentDurations}
        helper={appointmentHelper}
        model={appointment}
      />
    </FormGroup>
  )
}

const AppointmentTimeEditor = ({ appointment, onChangeDate, onChangeDayTime, onChangeField }) => {
  if (valueHelper.isSet(appointmentHelper.allDay(appointment))) {
    return (<AllDayAppointment appointment={appointment} onChangeDate={onChangeDate} />)
  }

  return (<TimeRangeAppointment appointment={appointment} onChangeDayTime={onChangeDayTime} onChangeField={onChangeField} />)
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
    const { reconnectAndRetry } = this.props
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
                  onChangeDayTime={this.vm.changeDayTime}
                  onChangeField={this.vm.changeField}
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
                    reconnectAndRetry={reconnectAndRetry}
                    required={this.vm.isRequired('pharmacy_store_id')}
                  />
                }

                <FormGroup row>
                  <SelectFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="venue"
                    fieldOptions={venues}
                    helper={appointmentHelper}
                    model={appointment}
                    required={this.vm.isRequired("venue")}
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
          onClick={(_event) => { this.vm.toggleModal(clearModal) }}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={
            (_event) => {
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

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisAppointmentModal = aprexisWrapperModal(AppointmentModal)
export { aprexisAppointmentModal as AppointmentModal }

