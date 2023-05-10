import React from 'react'
import { Link } from 'react-router-dom'
import { getBitcoinSvg } from '../services/SVG.service'
export function ContactPreview({ contact, onRemoveContact }) {
  return (
    <article className="contact-preview">
      <Link to={`/contact/${contact._id}`} className="info">
        <img
          src={`https://robohash.org/${contact._id}?set=set5`}
          alt={contact.name}
        />
        <h2>{contact.name}</h2>
      </Link>
      <section className="actions">
        <Link to={`/contact/edit/${contact._id}`}>
          <span
            dangerouslySetInnerHTML={{
              __html: getBitcoinSvg('edit'),
            }}
          />
        </Link>
        <button onClick={() => onRemoveContact(contact._id)}>
          {' '}
          <span
            dangerouslySetInnerHTML={{
              __html: getBitcoinSvg('trash'),
            }}
          />
        </button>
      </section>
    </article>
  )
}
