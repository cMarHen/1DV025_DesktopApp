
self.addEventListener('message', async (event) => {
  try {
    getNewJoke()
  } catch (error) {
    console.info('NOTIFICATION: Could\'t contact Chuck Norris.')
  }
})

/**
 * Notify user with a Chuck Norris-joke.
 */
async function getNewJoke () {
  const response = await fetch('https://api.chucknorris.io/jokes/random')
  const data = await response.json()
  const notification = new Notification(`CHUCK NORRIS JOKE: \n\n${await data.value}`)

  notification.addEventListener('click', (event) => {
    getNewJoke()
  })
}
