import React, { Component } from 'react'
import { BreadcrumbsViewModel } from './view_models'
import { valueHelper } from '../helpers'

const PluralBreadcrumb = ({ gotoPage, orderedPathEntries, pathEntryIdx, pathKey }) => {
  const crumb = `${valueHelper.humanize(pathKey.replaceAll('-', ' '))}`

  return (
    <li className="plural-breadcrumb">
      {
        pathEntryIdx > 0 &&
        <label>/</label>
      }
      <button
        className="btn btn-link"
        onClick={(event) => { gotoPage(orderedPathEntries, pathKey) }}
        type="button">
        {crumb}
      </button>
    </li>
  )
}

const SingularBreadcrumb = ({ gotoPage, model, modelToBreadcrumb, orderedPathEntries, pathKey }) => {
  const crumb = modelToBreadcrumb(pathKey, model)

  return (
    <li className="singular-breadcrumb">
      <label>/</label>
      <button
        className="btn btn-link"
        onClick={(event) => { gotoPage(orderedPathEntries, pathKey, model) }}
        type="button">
        {crumb}
      </button>
    </li>
  )
}

class Breadcrumbs extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BreadcrumbsViewModel(
      {
        ...this.props,
        view: this
      }
    )
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { haveProfile, orderedPathEntries } = this.vm.pathInformation(window.location)
    let { context } = this.props
    if (!valueHelper.isValue(context)) {
      context = {}
    }

    const breadcrumbs = orderedPathEntries.map(
      (pathEntry, pathEntryIdx) => {
        const { key, value } = pathEntry
        let model
        if (valueHelper.isValue(value) && !isNaN(value) && (haveProfile || (pathEntryIdx + 1 < orderedPathEntries.length))) {
          model = context[key]
        }

        return (
          <React.Fragment key={`breadcrumb-${pathEntryIdx}`}>
            <PluralBreadcrumb
              gotoPage={this.vm.gotoPlural}
              orderedPathEntries={orderedPathEntries}
              pathEntryIdx={pathEntryIdx}
              pathKey={key}
            />
            {
              valueHelper.isValue(model) &&
              <React.Fragment>
                <SingularBreadcrumb
                  gotoPage={this.vm.gotoSingular}
                  model={model}
                  modelToBreadcrumb={this.vm.modelToBreadcrumb}
                  orderedPathEntries={orderedPathEntries}
                  pathKey={key}
                />
              </React.Fragment>
            }
          </React.Fragment>
        )
      }
    )

    return (
      <div className="breadcrumbs">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {breadcrumbs}
          </ol>
        </nav>
      </div>
    )
  }
}

export { Breadcrumbs }
