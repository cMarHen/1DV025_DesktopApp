const version = '1.0.0'

self.addEventListener('install', event => {
  console.log('ServiceWorker: Installed version ', version)
  // TODO: Cache resources needed to start

  /**
   * Cache assets when installing the service worker.
   *
   * @returns {Promise} Promise that resolves to undefined.
   */
  const cacheAssets = async () => {
    const cache = await self.caches.open(version)

    console.log('ServiceWorker: Caching Files')

    return cache.addAll([
      'index.html',
      'css/styles.css',
      'js/index.js'
    ])
  }

  event.waitUntil(cacheAssets())
  console.log('hej')
  console.log(caches)
})

self.addEventListener('activate', event => {
  console.log('ServiceWorker: Activated version', version)
  // TODO: Clean up older versions of the cache
})

self.addEventListener('fetch', event => {
  console.log('ServiceWorker: Fetching')
  // TODO: Cache new resources when online and serve cached content if offline
})

self.addEventListener('message', event => {
  console.log('ServiceWorker: Got a message')
  // TODO: Handle events from the main application
})

self.addEventListener('push', event => {
  console.log('ServiceWorker: Got a push message from the server')
  // TODO: Show a notification for the user
})
