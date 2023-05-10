function animateButton(e) {
  return new Promise((resolve, reject) => {
    e.preventDefault()
    //reset animation
    e.target.classList.remove('animate')

    e.target.classList.add('animate')
    setTimeout(function () {
      e.target.classList.remove('animate')
      resolve()
    }, 700)
  })
}

export const btnService = {
  animateButton,
  addBubble,
}

function addBubble() {
  var bubblyButtons = document.getElementsByClassName('bubbly-button')

  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false)
  }
}
