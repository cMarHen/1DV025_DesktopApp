/**
 * The main script file of the application.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.0.0
 */

import './components/desktop-screen'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    // Get a Chuck Norris-joke as a notification.
    try {
      const registration = await navigator.serviceWorker.register('./serviceworker.js')

      console.log('ServiceWorker: Registration successful with scope: ', registration.scope)
    } catch (error) {
      console.log('ServiceWorker: Registration failed: ', error)
    }
  })
}

const webWorker = new Worker('./webWorker')
Notification.requestPermission((permission) => {
  if (permission === 'granted') {
    webWorker.postMessage('NotifyAJoke')
  }
})
