import { AbstractModalViewModel } from "../abstract.modal.vm.js"
import { answerApi, valueHelper, answerHelper } from "@aprexis/aprexis-api-utility"

const answerRequiredFields = {
  patient_id: { label: "Patient", testMethod: valueHelper.isNumberValue }
}

class AnswerModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
  }

  api() {
    return answerApi
  }

  dateAndTimeFields(_answer) {
    return {}
  }

  helper() {
    return answerHelper
  }

  loadData() {
    const { operation, answer } = this.props
    this.addData(
      {
        operation,
        answer: this.initializeDateAndTimeValidities(answer)
      },
      this.redrawView
    )
  }

  model() {
    const { answer, changedAnswer } = this.data

    return {
      changedModel: changedAnswer,
      model: answer,
      modelName: this.modelName()
    }
  }

  modelName() {
    return "answer"
  }

  requiredFields() {
    return answerRequiredFields
  }
}

export { AnswerModalViewModel }
