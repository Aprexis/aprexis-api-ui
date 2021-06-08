import { AbstractModalViewModel } from "../"

class PatientProfileModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    const { operation, patient } = this.props
    this.addData(
      {
        operation,
        patient: this.initializeDateAndTimeValidities(patient)
      },
      this.redrawView
    )
  }
}

export { PatientProfileModalViewModel }
