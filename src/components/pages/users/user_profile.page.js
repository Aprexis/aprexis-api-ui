import { Component } from "react"
import { Col, Container } from "reactstrap"
import { valueHelper, userHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../helpers"
import { Spinner, UserProfile } from "../../shared"
import { UserProfilePageViewModel } from "../../view_models/pages/users"

class UserProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new UserProfilePageViewModel(
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
    const { user } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>Account for {userHelper.fullName(user)}{displayHelper.renderAccess(user)}</h1>
          </div>

          {
            !valueHelper.isValue(user) &&
            <Spinner />
          }

          {
            valueHelper.isValue(user) &&
            <UserProfile user={user} />
          }
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { UserProfilePage }

