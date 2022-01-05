/**
 * Module as a service worker.
 * Taken from https://youtu.be/YQEzSET35fw
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.0.0
 */

const version = '1.0.4'

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

  /**
   * Clean up old versions.
   *
   * @returns {*} - The return.
   */
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

self.addEventListener('fetch', (event) => {
  // TODO: Cache new resources when online and serve cached content if offline
/**
 * When online, cache the objects to be used if offline.
 *
 * @param {*} request - The request.
 * @returns {*} - The return.
 */
  const cachedFetch = async (request) => {
    try {
      const response = await fetch(request)

      const cache = await self.caches.open(version)
      cache.put(request, response.clone())

      return response
    } catch {
      console.info('ServiceWorker: Serving cached result')
      return self.caches.match(request)
    }
  }
  console.info('ServiceWorker: Fetching')
  event.respondWith(cachedFetch(event.request))
})
