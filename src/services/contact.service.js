import { storageService } from './storage.service.js'
import { makeId } from './util.service.js'
import { getPhoto } from './photo.service.js'
export const contactService = {
  getContacts,
  getContactById,
  deleteContact,
  saveContact,
  getEmptyContact,
  save,
}
const STORAGE_KEY = 'contacts'
const contacts = [
  {
    _id: '5a56640269f443a5d64b32ca',
    name: 'Ochoa Hyde',
    email: 'ochoahyde@renovize.com',
    phone: '+1 (968) 593-3824',
    coins: 0,
    url: getPhoto(1, 'men'),
    lat: 32.08,
    lng: 34.78,
  },
  {
    _id: '5a5664025f6ae9aa24a99fde',
    name: 'Hallie Mclean',
    email: 'halliemclean@renovize.com',
    phone: '+1 (948) 464-2888',
    coins: 0,
    url: getPhoto(2, 'women'),
    lat: 31.7784,
    lng: 35.2066,
  },
  {
    _id: '5a56640252d6acddd183d319',
    name: 'Parsons Norris',
    email: 'parsonsnorris@renovize.com',
    phone: '+1 (958) 502-3495',
    coins: 0,
    url: getPhoto(3, 'men'),
    lat: 32.8192,
    lng: 34.9992,
  },
  {
    _id: '5a566402ed1cf349f0b47b4d',
    name: 'Rachel Lowe',
    email: 'rachellowe@renovize.com',
    phone: '+1 (911) 475-2312',
    coins: 0,
    url: getPhoto(4, 'women'),
    lat: 31.95,
    lng: 34.8,
  },
  {
    _id: '5a566402abce24c6bfe4699d',
    name: 'Dominique Soto',
    email: 'dominiquesoto@renovize.com',
    phone: '+1 (807) 551-3258',
    coins: 0,
    url: getPhoto(5, 'men'),
    lat: 32.0889,
    lng: 34.8864,
  },
  {
    _id: '5a566402a6499c1d4da9220a',
    name: 'Shana Pope',
    email: 'shanapope@renovize.com',
    phone: '+1 (970) 527-3082',
    coins: 0,
    url: getPhoto(6, 'women'),
    lat: 31.8,
    lng: 34.65,
  },
  {
    _id: '5a566402f90ae30e97f990db',
    name: 'Faulkner Flores',
    email: 'faulknerflores@renovize.com',
    phone: '+1 (952) 501-2678',
    coins: 0,
    url: getPhoto(7, 'men'),
    lat: 32.3286,
    lng: 34.8567,
  },
  {
    _id: '5a5664027bae84ef280ffbdf',
    name: 'Holder Bean',
    email: 'holderbean@renovize.com',
    phone: '+1 (989) 503-2663',
    coins: 0,
    url: getPhoto(8, 'women'),
    lat: 31.2589,
    lng: 34.7997,
  },
  {
    _id: '5a566402e3b846c5f6aec652',
    name: 'Rosanne Shelton',
    email: 'rosanneshelton@renovize.com',
    phone: '+1 (968) 454-3851',
    coins: 0,
    url: getPhoto(9, 'men'),
    lat: 32.0167,
    lng: 34.7667,
  },
  {
    _id: '5a56640272c7dcdf59c3d411',
    name: 'Pamela Nolan',
    email: 'pamelanolan@renovize.com',
    phone: '+1 (986) 545-2166',
    coins: 0,
    url: getPhoto(10, 'women'),
    lat: 32.0833,
    lng: 34.8333,
  },
  {
    _id: '5a5664029a8dd82a6178b15f',
    name: 'Roy Cantu',
    email: 'roycantu@renovize.com',
    phone: '+1 (929) 571-2295',
    coins: 0,
    url: getPhoto(11, 'men'),
    lat: 32.07,
    lng: 34.8236,
  },
  {
    _id: '5a5664028c096d08eeb13a8a',
    name: 'Ollie Christian',
    email: 'olliechristian@renovize.com',
    phone: '+1 (977) 419-3550',
    coins: 0,
    url: getPhoto(12, 'women'),
    lat: 31.6667,
    lng: 34.5667,
  },
  {
    _id: '5a5664026c53582bb9ebe9d1',
    name: 'Nguyen Walls',
    email: 'nguyenwalls@renovize.com',
    phone: '+1 (963) 471-3181',
    coins: 0,
    url: getPhoto(13, 'men'),
    lat: 31.8981,
    lng: 34.8081,
  },
  {
    _id: '5a56640298ab77236845b82b',
    name: 'Glenna Santana',
    email: 'glennasantana@renovize.com',
    phone: '+1 (860) 467-2376',
    coins: 0,
    url: getPhoto(14, 'women'),
    lat: 32.0167,
    lng: 34.75,
  },
  {
    _id: '5a56640208fba3e8ecb97305',
    name: 'Malone Clark',
    email: 'maloneclark@renovize.com',
    phone: '+1 (818) 565-2557',
    coins: 0,
    url: getPhoto(15, 'men'),
    lat: 31.7456,
    lng: 34.9867,
  },
  {
    _id: '5a566402abb3146207bc4ec5',
    name: 'Floyd Rutledge',
    email: 'floydrutledge@renovize.com',
    phone: '+1 (807) 597-3629',
    coins: 0,
    url: getPhoto(16, 'women'),
    lat: 32.1714,
    lng: 34.9083,
  },
  {
    _id: '5a56640298500fead8cb1ee5',
    name: 'Grace James',
    email: 'gracejames@renovize.com',
    phone: '+1 (959) 525-2529',
    coins: 0,
    url: getPhoto(17, 'men'),
    lat: 32.45,
    lng: 34.9167,
  },
  {
    _id: '5a56640243427b8f8445231e',
    name: 'Tanner Gates',
    email: 'tannergates@renovize.com',
    phone: '+1 (978) 591-2291',
    coins: 0,
    url: getPhoto(18, 'women'),
    lat: 32.1653,
    lng: 34.8458,
  },
  {
    _id: '5a5664025c3abdad6f5e098c',
    name: 'Lilly Conner',
    email: 'lillyconner@renovize.com',
    phone: '+1 (842) 587-3812',
    coins: 0,
    url: getPhoto(19, 'men'),
    lat: 32.7019,
    lng: 35.3033,
  },
]

storageService.save('contacts', contacts)

function sort(arr) {
  return arr.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1
    }

    return 0
  })
}

function getContacts(filterBy = null) {
  return new Promise((resolve, reject) => {
    var contactsToReturn = contacts
    if (filterBy && (filterBy.name || filterBy.phone)) {
      contactsToReturn = filter(filterBy.name || filterBy.phone)
    }
    resolve(sort(contactsToReturn))
  })
}
function save(contactToSave) {
  if (contactToSave._id) {
    const idx = contacts.findIndex(
      (contact) => contact._id === contactToSave._id
    )
    contacts.splice(idx, 1, contactToSave)
  } else {
    contactToSave._id = makeId()

    contacts.push(contactToSave)
  }
  storageService.save('contacts', contacts)
  return Promise.resolve(contactToSave)
}

function getContactById(id) {
  return new Promise((resolve, reject) => {
    const contact = contacts.find((contact) => contact._id === id)
    contact ? resolve(contact) : reject(`Contact id ${id} not found!`)
  })
}

function deleteContact(id) {
  return new Promise((resolve, reject) => {
    const index = contacts.findIndex((contact) => contact._id === id)
    if (index !== -1) {
      contacts.splice(index, 1)
    }

    resolve(contacts)
  })
}

function _updateContact(contact) {
  return new Promise((resolve, reject) => {
    const index = contacts.findIndex((c) => contact._id === c._id)
    if (index !== -1) {
      contacts[index] = contact
    }
    resolve(contact)
  })
}

function _addContact(contact) {
  return new Promise((resolve, reject) => {
    contact._id = _makeId()
    contacts.push(contact)
    resolve(contact)
  })
}

function saveContact(contact) {
  return contact._id ? _updateContact(contact) : _addContact(contact)
}

function getEmptyContact() {
  return {
    name: '',
    email: '',
    phone: '',
  }
}

function filter(term) {
  term = term.toLocaleLowerCase()
  return contacts.filter((contact) => {
    return (
      contact.name.toLocaleLowerCase().includes(term) ||
      contact.phone.toLocaleLowerCase().includes(term) ||
      contact.email.toLocaleLowerCase().includes(term)
    )
  })
}

function _makeId(length = 10) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
