import { Component } from "react"
import { faFileDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { valueHelper } from "@aprexis/aprexis-api-utility"

const DownloadButtonContent = ({ useText }) => {
  if (useText) {
    return ("(download)")
  }

  return (<FontAwesomeIcon icon={faFileDownload} />)
}

class DownloadButton extends Component {
  constructor(props) {
    super(props)

    this.buildClassName = this.buildClassName.bind(this)
  }

  buildClassName() {
    const { useText } = this.props
    const basicClassName = "mt-0 mb-0 pt-0 pb-0 ml-1 btn"

    if (valueHelper.isSet(useText)) {
      return `text-muted ${basicClassName} btn-link`
    }

    return basicClassName
  }

  render() {
    return (
      <button
        className={this.buildClassName()}
        onClick={this.props.onDownload}>
        <DownloadButtonContent useText={this.props.useText} />
      </button>
    )
  }
}

export { DownloadButton }
