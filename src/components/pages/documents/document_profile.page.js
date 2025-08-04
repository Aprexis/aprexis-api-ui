import { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { DownloadButton, EditButton, Spinner } from '../../shared/index.js'
import { DocumentProfilePageViewModel } from "../../view_models/pages/documents/index.js"
import { documentHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../helpers/index.js"

const DocumentProfile = ({ currentUser, onDownload, onEditProfile, document }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              documentHelper.canEdit(currentUser, document) &&
              <EditButton onEdit={(_event) => { onEditProfile(document) }} />
            }
            {
              valueHelper.isStringValue(documentHelper.filename(document)) &&
              <DownloadButton onDownload={(_event) => { onDownload(document) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Filename", documentHelper.filename(document))}
          {displayHelper.display("Content Type", documentHelper.contentType(document))}
          {displayHelper.dateTimeDisplay("Created At", documentHelper.createdAt(document))}
          {displayHelper.dateTimeDisplay("Updated At", documentHelper.updatedAt(document))}
        </CardBody>
      </Card>
    </Col>
  )
}

const DocumentDisplay = ({ currentUser, onDownload, onEditProfile, document }) => {
  if (!valueHelper.isValue(document)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <DocumentProfile
        currentUser={currentUser}
        onDownload={onDownload}
        onEditProfile={onEditProfile}
        document={document}
      />
    </Row>
  )
}
class DocumentProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DocumentProfilePageViewModel(
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
    const { document } = this.state

    return (
      <Container className='document-profile'>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {documentHelper.slug(document)}
            </h1>
          </div>

          <DocumentDisplay
            currentUser={this.props.currentUser}
            onDownload={this.vm.download}
            onEditProfile={this.vm.editProfileModal}
            document={document}
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

export { DocumentProfilePage }
