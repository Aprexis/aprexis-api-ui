import React from 'react'
import sanitizeHtml from 'sanitize-html'

function Sanitize({ html }) {
  const clean = sanitizeHtml(
    html,
    {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'overlay', 'span']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        'a': sanitizeHtml.defaults.allowedAttributes.a.concat(['data-doaction', 'data-group', 'data-target']),
        'overlay': ['class'],
        'span': ['class', 'style']
      },
      allowedClasses: {
        'span': ['*']
      }
    }
  )

  return (
    <span
      className="sanitized-html"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}

export { Sanitize }
