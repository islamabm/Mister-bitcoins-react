import React, { useEffect, useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { contactService } from '../services/contact.service'
import { Audio } from 'react-loader-spinner'
export function GoogleMaps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDgkCNsKW1vRJ4g3ZgAuoqf-qX2qHAg9eI',
  })
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [center, setCenter] = useState({ lat: 31.6667, lng: 34.5667 })
  const [zoom, setZoom] = useState(10)
  useEffect(() => {
    contactService.getContacts().then((contacts) => {
      setContacts(contacts)
    })
  }, [])
  useEffect(() => {
    if (selectedContact) {
      setCenter({ lat: selectedContact.lat, lng: selectedContact.lng })
    }
  }, [selectedContact])

  const handleSelectChange = (event) => {
    const contactId = event.target.value
    const contact = contacts.find((contact) => contact._id === contactId)
    setSelectedContact(contact)
  }
  const handleZoomChange = (event) => {
    setZoom(parseInt(event.target.value, 10))
  }

  if (!isLoaded)
    return (
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    )

  return (
    <div>
      <select onChange={handleSelectChange}>
        <option value="">Select contact</option>
        {contacts.map((contact) => (
          <option key={contact._id} value={contact._id}>
            {contact.name}
          </option>
        ))}
      </select>
      <input
        className="zoom-input"
        type="number"
        value={zoom}
        onChange={handleZoomChange}
      />

      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerClassName="map-container"
      >
        {contacts.map((contact) => (
          <Marker
            key={contact._id}
            position={{ lat: contact.lat, lng: contact.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  )
}
