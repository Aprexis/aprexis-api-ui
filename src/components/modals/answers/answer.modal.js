import React, { Component } from 'react'
import { AnswerModalViewModel } from '../../view_models/modals/answers'
import { valueHelper, questionHelper } from '@aprexis/aprexis-api-utility'
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { Col, Container, Form, Row } from "reactstrap"
import { Spinner } from "../../shared"
import { QuestionField, QuestionLabel } from '../../shared/questions'

class AnswerModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new AnswerModalViewModel(
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
    const { answer } = this.state

    if (!valueHelper.isValue(answer)) {
      return (<Spinner />)
    }

    return (
      <AprexisModal
        {...this.props}
        modalClassName="answer modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <QuestionField answer={answer} changeField={this.vm.changeField} changeFieldValue={this.vm.changeFieldValue} />
              </Form>
            </Col>
          </Row>
        </Container>
      </AprexisModal>
    )
  }

  renderFooter() {
    const { clearModal, operation } = this.props
    const { answer, changedAnswer } = this.state

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
              this.vm.submitModalCreateOrUpdate("answer", answer, changedAnswer)
            }
          }>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { answer } = this.state

    return (
      <AprexisModalHeader title={title(this.vm.helper().question(answer))} />
    )

    function title(question) {
      if (questionHelper.questionType(question) == 'Question not found') {
        return `${questionHelper.questionKey(question)} is an obsolete question, no longer supported`
      }

      return (<QuestionLabel question={question} />)
    }
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisAnswerModal = aprexisWrapperModal(AnswerModal)
export { aprexisAnswerModal as AnswerModal }
