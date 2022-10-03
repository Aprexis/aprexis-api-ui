import React from 'react'
import sanitizeHtml from 'sanitize-html'

function Sanitize({ html }) {
  const clean = sanitizeHtml(
    html,
    {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'span']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        'span': ['class', 'style']
      },
      allowedClasses: {
        'span': ['hidden']
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
