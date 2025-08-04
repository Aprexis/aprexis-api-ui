import { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { EditButton, Spinner } from '../../shared/index.js'
import { PatientAllergyProfilePageViewModel } from "../../view_models/pages/patient_allergies/index.js"
import { patientAllergyHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../helpers/index.js"

const PatientAllergyProfile = ({ currentUser, onEditProfile, patientAllergy }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              patientAllergyHelper.canEdit(currentUser, patientAllergy) &&
              <EditButton onEdit={(_event) => { onEditProfile(patientAllergy) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Allergy Type", patientAllergyHelper.allergyType(patientAllergy))}
          {displayHelper.display("Year", patientAllergyHelper.year(patientAllergy))}
          {displayHelper.display("Gold Standard Allergy", patientAllergyHelper.goldStandardAllergyName(patientAllergy))}
          {
            displayHelper.display(
              "Gold Standard Description",
              patientAllergyHelper.goldStandardAllergyDescription(patientAllergy)
            )
          }
          {displayHelper.display("Reaction", patientAllergyHelper.reaction(patientAllergy))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PatientAllergyDisplay = ({ currentUser, onEditProfile, patientAllergy }) => {
  if (!valueHelper.isValue(patientAllergy)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <PatientAllergyProfile
        currentUser={currentUser}
        onEditProfile={onEditProfile}
        patientAllergy={patientAllergy}
      />
    </Row>
  )
}
class PatientAllergyProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientAllergyProfilePageViewModel(
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
    const { patientAllergy } = this.state
    let allergyName = patientAllergyHelper.allergyName(patientAllergy)
    if (!valueHelper.isValue(allergyName)) {
      return "(no allergy name specified)"
    }

    return (
      <Container className='patient-allergy-profile'>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {patientAllergyHelper.allergyName(patientAllergy)} for {patientAllergyHelper.patientName(patientAllergy)}
            </h1>
          </div>

          <PatientAllergyDisplay
            currentUser={this.props.currentUser}
            onEditProfile={this.vm.editProfileModal}
            patientAllergy={patientAllergy}
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

export { PatientAllergyProfilePage }
