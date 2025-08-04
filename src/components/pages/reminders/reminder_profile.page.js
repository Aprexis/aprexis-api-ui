import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { EditButton, Spinner } from '../../shared/index.js'
import { ReminderProfilePageViewModel } from "../../view_models/pages/reminders/index.js"
import { medicationHelper, patientSupplementHelper, reminderHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../helpers/index.js"

const Medication = ({ medication }) => {
  return (<React.Fragment>{medicationHelper.name(medication)}<br /></React.Fragment>)
}

const ReminderMedications = ({ reminder }) => {
  const reminderMedications = valueHelper.arrayWithDefault(reminderHelper.medications(reminder)).map(
    (medication, idx) => {
      return (<Medication key={`edication-${idx}`} medication={medication} />)
    }
  )

  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle><h3>Medications</h3></CardTitle>

        <CardBody>
          {reminderMedications}
        </CardBody>
      </Card>
    </Col>
  )
}

const ReminderProfile = ({ currentUser, onEditProfile, reminder }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              reminderHelper.canEdit(currentUser, reminder) &&
              <EditButton onEdit={(_event) => { onEditProfile(reminder) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Type", reminderHelper.displayType(reminder))}
          {displayHelper.dateDisplay("Start On", reminderHelper.recurFrom(reminder))}
          {displayHelper.dateDisplay("End On", reminderHelper.recurTo(reminder))}
          {displayHelper.display("At", reminderHelper.displayRemindAt(reminder))}
          {displayHelper.display("Email", reminderHelper.emailAddress(reminder))}
          {displayHelper.display("Phone", reminderHelper.voiceNumber(reminder))}
          {displayHelper.display("Text", reminderHelper.txtNumber(reminder))}
        </CardBody>
      </Card>
    </Col>
  )
}

const ReminderSchedule = ({ reminder }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle><h3>Schedule</h3></CardTitle>

        <CardBody>
          {displaySchedule(reminder)}
        </CardBody>
      </Card>
    </Col>
  )

  function displaySchedule(reminder) {
    switch (reminderHelper.type(reminder)) {
      case 'DailyReminder':
        return displayDailySchedule(reminder)

      case 'WeeklyReminder':
        return displayWeeklySchedule(reminder)

      case 'MonthlyReminder':
        return displayMonthlySchedule(reminder)

      default:
        return (<React.Fragment>Unknown Schedule</React.Fragment>)
    }

    function displayDailySchedule(_reminder) {
      return (<React.Fragment>Every Day</React.Fragment>)
    }

    function displayWeeklySchedule(reminder) {
      return (
        <React.Fragment>
          {displayHelper.booleanDisplay("Sunday", reminderHelper.sunday(reminder))}
          {displayHelper.booleanDisplay("Monday", reminderHelper.monday(reminder))}
          {displayHelper.booleanDisplay("Tuesday", reminderHelper.tuesday(reminder))}
          {displayHelper.booleanDisplay("Wednesday".reminderHelper.wednesday(reminder))}
          {displayHelper.booleanDisplay("Thursday", reminderHelper.thursday(reminder))}
          {displayHelper.booleanDisplay("Friday", reminderHelper.friday(reminder))}
          {displayHelper.booleanDisplay("Saturday", reminderHelper.saturday(reminder))}
        </React.Fragment>
      )
    }

    function displayMonthlySchedule(reminder) {
      return (displayHelper.display("Day of Month", reminderHelper.dayOfMonth(reminder)))
    }
  }
}

const ReminderSupplement = ({ patientSupplement }) => {
  return (<React.Fragment>{patientSupplementHelper.name(patientSupplement)}<br /></React.Fragment>)
}

const ReminderSupplements = ({ reminder }) => {
  const reminderSupplements = valueHelper.arrayWithDefault(reminderHelper.patientSupplements(reminder)).map(
    (patientSupplement, idx) => {
      return (<ReminderSupplement key={`patient-supplement-${idx}`} patientSupplement={patientSupplement} />)
    }
  )

  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle><h3>Supplements</h3></CardTitle>

        <CardBody>
          {reminderSupplements}
        </CardBody>
      </Card>
    </Col>
  )
}

const ReminderDisplay = ({ currentUser, onEditProfile, reminder }) => {
  if (!valueHelper.isValue(reminder)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <ReminderProfile
          currentUser={currentUser}
          onEditProfile={onEditProfile}
          reminder={reminder}
        />
        <ReminderSchedule
          currentUser={currentUser}
          reminder={reminder}
        />
      </Row>

      <Row>
        <ReminderMedications
          currentUser={currentUser}
          reminder={reminder}
        />
        <ReminderSupplements
          currentUser={currentUser}
          reminder={reminder}
        />
      </Row>
    </React.Fragment>
  )
}
class ReminderProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new ReminderProfilePageViewModel(
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
    const { reminder } = this.state

    return (
      <Container className='reminder-profile'>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              Reminder: {reminderHelper.displayAction(reminder)} for {reminderHelper.patientName(reminder)}
            </h1>
          </div>

          <ReminderDisplay
            currentUser={this.props.currentUser}
            onEditProfile={this.vm.editProfileModal}
            reminder={reminder}
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

export { ReminderProfilePage }
