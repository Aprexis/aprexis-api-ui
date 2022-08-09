import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { DownloadButton, EditButton, Spinner } from '../../shared'
import { InterventionDocumentProfilePageViewModel } from "../../view_models/pages/intervention_documents"
import { interventionDocumentHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../helpers"

const InterventionDocumentProfile = ({ currentUser, onDownload, onEditProfile, interventionDocument }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              interventionDocumentHelper.canEdit(currentUser, interventionDocument) &&
              <EditButton onEdit={(_event) => { onEditProfile(interventionDocument) }} />
            }
            {
              valueHelper.isStringValue(interventionDocumentHelper.filePath(interventionDocument)) &&
              <DownloadButton onDownload={(_event) => { onDownload(interventionDocument) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Program", interventionDocumentHelper.programName(interventionDocument))}
          {displayHelper.display("")}
          {displayHelper.display("Locale", interventionDocumentHelper.displayLocale(interventionDocument))}
          {displayHelper.dateTimeDisplay("Created At", interventionDocumentHelper.createdAt(interventionDocument))}
          {displayHelper.dateTimeDisplay("Updated At", interventionDocumentHelper.updatedAt(interventionDocument))}
        </CardBody>
      </Card>
    </Col>
  )
}

const InterventionDocumentDisplay = ({ currentUser, onDownload, onEditProfile, interventionDocument }) => {
  if (!valueHelper.isValue(interventionDocument)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <InterventionDocumentProfile
        currentUser={currentUser}
        onDownload={onDownload}
        onEditProfile={onEditProfile}
        interventionDocument={interventionDocument}
      />
    </Row>
  )
}
class InterventionDocumentProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new InterventionDocumentProfilePageViewModel(
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
    const { interventionDocument } = this.state

    return (
      <Container className='intervention-document-profile'>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {interventionDocumentHelper.title(interventionDocument)}
            </h1>
          </div>

          <InterventionDocumentDisplay
            currentUser={this.props.currentUser}
            onDownload={this.vm.download}
            onEditProfile={this.vm.editProfileModal}
            interventionDocument={interventionDocument}
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

export { InterventionDocumentProfilePage }
