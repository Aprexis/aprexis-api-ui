import { Component } from "react"
import { Col, Container } from "reactstrap"
import { TherapeuticConceptProfilePageViewModel } from "../../../../view_models/pages/admin/gold_standard/therapeutic_concepts/index.js"
import { goldStandardTherapeuticConceptHelper } from "@aprexis/aprexis-api-utility"

class TherapeuticConceptProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new TherapeuticConceptProfilePageViewModel(
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
    const { therapeuticConcept } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardTherapeuticConceptHelper.conceptName(therapeuticConcept)}</h1>
          </div>
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { TherapeuticConceptProfilePage }
