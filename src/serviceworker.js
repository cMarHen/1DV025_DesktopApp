const version = '1.0.1'

self.addEventListener('install', (event) => {
  console.info('ServiceWorker: Installed version ', version)
  // TODO: Cache resources needed to start

  /**
   * Cache assets when installing the service worker.
   *
   * @returns {Promise} Promise that resolves to undefined.
   */
  const cacheAssets = async () => {
    const cache = await self.caches.open(version)
    console.info('ServiceWorker: Caching Files')

    return cache.addAll([
      'index.html',
      'css/styles.css',
      'js/index.js'
    ])
  }

  event.waitUntil(cacheAssets())
})

self.addEventListener('activate', (event) => {
  console.info('ServiceWorker: Activated version', version)
  // TODO: Clean up older versions of the cache

  const removeCachedAssets = async () => {
    const cacheKeys = await self.caches.keys()

    return Promise.all(
      cacheKeys.map((cache) => {
        if (cache !== version) {
          console.info('ServiceWorker: Cleaning Cache', cache)
          return self.caches.delete(cache)
        }

        return undefined
      })
    )
  }
  event.waitUntil(removeCachedAssets())
})

const cachedFetch = async (request) => {
  try {
    const response = await fetch(request)

    const cache = await self.caches.open(version)
    cache.put(request, response.clone())

    return response
  } catch {
    console.info('ServiceWorker: Serving cached result')
    return caches.match(request)
  }
}

self.addEventListener('fetch', (event) => {
  // TODO: Cache new resources when online and serve cached content if offline

  console.info('ServiceWorker: Fetching')
  event.respondWith(cachedFetch(event.request))
})

self.addEventListener('message', (event) => {
  console.info('ServiceWorker: Got a message')
  // TODO: Handle events from the main application
})

self.addEventListener('push', (event) => {
  console.info('ServiceWorker: Got a push message from the server')
  // TODO: Show a notification for the user
})
