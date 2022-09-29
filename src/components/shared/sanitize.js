import React from 'react'
import sanitizeHtml from 'sanitize-html'

function Sanitize({ html }) {
  const clean = sanitizeHtml(
    html,
    {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'span']),
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
