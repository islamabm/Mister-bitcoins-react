import { storageService } from './storage.service.js'

import { contactService } from './contact.service'
export const userService = {
  getUser,
  signup,
  getLoggedinUser,
  transferCoins,
  getMovesForContact,
}

function getUser() {
  const user = {
    name: 'Ochoa Hyde',
    coins: 100,
    moves: [],
    url: 'https://png.pngtree.com/element_our/20190604/ourmid/pngtree-user-avatar-boy-image_1482937.jpg',
  }
  return Promise.resolve(user)
}

function signup(name) {
  const user = {
    name: name,
    coins: 100,
    moves: [],
    url: 'https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png',
  }
  storageService.save('user', user)
  return user
}

function getLoggedinUser() {
  return storageService.load('user')
}

// async function addMove(contactId, amount) {
//   const loggedInUser = getLoggedinUser()
//   console.log('loggedInUser', loggedInUser)
//   if (loggedInUser.coins < amount) {
//     throw new Error('Not enough coins')
//   }

//   const contact = await contactService.getContactById(contactId)
//   const timestamp = Date.now()
//   const move = {
//     toId: contact._id,
//     to: contact.name,
//     at: timestamp,
//     amount: amount,
//   }

//   loggedInUser.coins -= amount
//   console.log('loggedInUser.coins', loggedInUser.coins)
//   console.log('loggedInUser', loggedInUser)

//   contact.coins += amount
//   loggedInUser.moves.unshift(move)

//   storageService.save('user', loggedInUser)
//   const contacts = storageService.load('contacts')
//   const newContacts = contacts.push(contact)
//   storageService.save('contacts', newContacts)

//   return loggedInUser
// }
function createMove(contact, amount) {
  const newMove = {
    toId: contact._id,
    to: contact.name,
    at: Date.now(),
    amount,
  }
  return newMove
}

function transferCoins(amount, contact) {
  const loggedInUser = storageService.load('user')
  const newMove = createMove(contact, amount)
  loggedInUser.moves.unshift(newMove)
  loggedInUser.coins -= amount
  storageService.save('user', loggedInUser)
  return loggedInUser
}
async function getMovesForContact(contactId) {
  const loggedInUser = getLoggedinUser()
  const moves = loggedInUser.moves.filter((move) => move.toId === contactId)
  return moves
}
