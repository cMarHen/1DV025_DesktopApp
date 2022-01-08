/**
 * Module as a web worker.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.0.0
 */

self.addEventListener('message', async (event) => {
  switch (event.data) {
    case 'NotifyAJoke':
      getNewJoke()
      break

    case 'newChatMessage':
      newMessageNotification()
      break

    default:
      console.info('NOTIFICATION: No valid notification request.')
      break
  }
})

/**
 * Notify user with a Chuck Norris-joke, if user clicks the notification, a new one appears.
 */
async function getNewJoke () {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random')
    const data = await response.json()
    const notification = new Notification(`CHUCK NORRIS JOKE: \n\n${await data.value}`)

    notification.removeEventListener('click', getNewJoke)
    notification.addEventListener('click', getNewJoke)
  } catch (error) {
    console.info('NOTIFICATION: Could\'t contact Chuck Norris.')
  }
}

/**
 * Notify the user a new message has arrived.
 *
 * @returns {object} - The notification.
 */
function newMessageNotification () {
  return new Notification('You got a new message!')
}
