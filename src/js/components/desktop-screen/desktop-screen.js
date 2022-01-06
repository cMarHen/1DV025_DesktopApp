/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../desktop-screen-window'
import '../desktop-navbar'

const BACKGROUND_IMG = (new URL('./images/desktop-background.jpg', import.meta.url)).href
const ASTROID_SHOOTER_ICON = (new URL('./images/shooter-icon.png', import.meta.url)).href
const MEMORY_ICON = (new URL('./images/lnu-symbol.png', import.meta.url)).href
const CHAT_ICON = (new URL('./images/chat-icon.png', import.meta.url)).href
const HIGHSCORE_ICON = (new URL('./images/highscore-icon.png', import.meta.url)).href

/*
* Define template.
*/
const template = document.createElement('template')
template.innerHTML = `
<style>
    :host {
        display: flex;
        height: 100vh;
        width: 100vw;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background-image: url(${BACKGROUND_IMG});
        background-size: 100%;
        background-position: cover;
        box-shadow: inset 1px 1px 4px gray;
        position: relative;
        overflow: hidden; 
    }

    #navWrapper {
      display: flex;
      align-self: flex-start;
        width: 100%;
        height: 100px;
        justify-content: center;
        overflow: hidden;
     }

    #desktopScreen {
      height: 100vh;
      width: 100vw;
      position: relative;
    }

    desktop-screen-window {
      width: min-content;
      height: min-content;
      position: absolute;
    }

    .icon {
      background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
    }

    #shooter-area-main {
      background-image: url(${ASTROID_SHOOTER_ICON});
    }
    #memory-application {
      background-image: url(${MEMORY_ICON});
    }
    #chat-application {
      background-image: url(${CHAT_ICON});
    }
    #my-highscore-component {
      background-image: url(${HIGHSCORE_ICON});
    }

</style>
<div id="desktopScreen">
    <!-- <desktop-screen-window id="window2" zindex="2">
      <chat-application slot="app"></chat-application>
    </desktop-screen-window> -->
    <!-- <chat-application></chat-application> -->
    <!-- <desktop-screen-window id="window2" zindex="2">
      <shooter-area-main slot="app"></shooter-area-main>
    </desktop-screen-window> -->
    <!-- <desktop-screen-window name="window1">
      <memory-application slot="app"></memory-application>
    </desktop-screen-window> -->

    <!-- <desktop-screen-window id="window2" zindex="2">
      <my-highscore-component slot="app"></my-highscore-component>
    </desktop-screen-window> -->
</div>


<div id="navWrapper">
       <desktop-navbar>
          <div id="shooter-area-main" class="icon" slot="icon1" tabindex="0" title="Astroid Shooter"></div>
          <div id="memory-application" class="icon" slot="icon2" tabindex="0" title="Memory Game"></div>
          <div id="chat-application" class="icon" slot="icon3" tabindex="0" title="Chat Application"></div> 
          <div id="my-highscore-component" class="icon" slot="icon4" tabindex="0"  title="Highscore Application"></div>
       </desktop-navbar>
   </div>
`

/*
* Define custom element.
*/
customElements.define('desktop-screen',
  /**
   * Represents a component.
   */
  class extends HTMLElement {
  /**
   * The z-index to use next.
   */
  #zIndexToUse

  /**
   * The id to use next.
   */
  #idToUse

  /**
   * The position to use next.
   */
  #positionToUse

  /**
   * Creates an instance of the current type.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

    this.desktopScreen = this.shadowRoot.querySelector('#desktopScreen')
    this.navBar = this.shadowRoot.querySelector('desktop-navbar')

    this.#zIndexToUse = 1
    this.#idToUse = 1
    this.#positionToUse = 20

    this.windowDragStart = this.windowDragStart.bind(this)
    this.windowDragOver = this.windowDragOver.bind(this)

    // -- EVENT LISTENERS -- //

    this.navBar.addEventListener('icon-request', (event) => {
      this.appendNewWindow(event.detail.id)
    })

    this.desktopScreen.addEventListener('require-focus', (event) => {
      event.target.setAttribute('zindex', this.#zIndexToUse)
      this.#zIndexToUse += 1
    })

    this.desktopScreen.addEventListener('closeWindow', (event) => {
      this.desktopScreen.removeChild(event.target)
    })

    this.desktopScreen.addEventListener('dragstart', this.windowDragStart)

    this.desktopScreen.addEventListener('dragend', (event) => {
      this.removeEventListener('dragover', this.windowDragOver)
    })

    this.desktopScreen.addEventListener('highscore-update', (event) => {
      try {
        this.shadowRoot.querySelector('my-highscore-component').updateHighscore()
      } catch (error) {
        console.info('INFO: No current highscore-window open.')
      }
    })
  }

  /**
   * Create a new window. Set an unique id to the element.
   *
   * @param {string} id - The type of app to open.
   */
  async appendNewWindow (id) {
    // Lazy load and create the element.
    const desktopApp = await this.importAndCreateElement(id)
    desktopApp.slot = 'app'

    const desktopWindow = document.createElement('desktop-screen-window')
    desktopWindow.append(desktopApp)

    desktopWindow.zindex = this.#zIndexToUse
    desktopWindow.id = `window${this.#idToUse}`

    // New position for each window.
    if (this.#idToUse < 500) {
      desktopWindow.style.left = `${this.#positionToUse}px`
      desktopWindow.style.top = `${this.#positionToUse}px`
    } else {
      desktopWindow.style.left = '500px'
      desktopWindow.style.top = '500px'
    }

    this.#idToUse += 1
    this.#positionToUse += 5
    this.#zIndexToUse += 1

    this.desktopScreen.append(desktopWindow)
  }

  /**
   * Takes an id and import the corresponding url.
   *
   * @param {string} id - The id of wanted element.
   * @returns {Promise<HTMLElement>} - The created element.
   */
  async importAndCreateElement (id) {
    try {
      await import(/* @vite-ignore */`../${id}`)
      return document.createElement(`${id}`)
    } catch (error) {
      // TODO: Show warning
      console.info('Couldn\'t import from url. ')
    }
  }

  /**
   * Handles window start dragging.
   *
   * @param {object} event - The event.
   */
  windowDragStart (event) {
    this.windowElement = this.shadowRoot.querySelector(`#${event.target.id}`)
    this.pointerX = event.clientX
    this.pointerY = event.clientY

    // setDragImage solution from:
    // https://stackoverflow.com/questions/7680285/how-do-you-turn-off-setdragimage#comment43433666_7680619

    const img = document.createElement('img')
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

    event.dataTransfer.setDragImage(img, 0, 0)
    this.addEventListener('dragover', this.windowDragOver)
  }

  /**
   * Handles window moving.
   *
   * @param {object} event - The event.
   */
  windowDragOver (event) {
    const screenRect = this.getBoundingClientRect()
    const wrapperRect = this.windowElement.getBoundingClientRect()

    // To update the coordinates.
    const windowX = this.pointerX - event.clientX
    const windowY = this.pointerY - event.clientY
    this.pointerX = event.clientX
    this.pointerY = event.clientY

    let left = this.windowElement.offsetLeft - windowX
    let top = this.windowElement.offsetTop - windowY

    // Handle x-lead dragging stop.
    if (this.windowElement.offsetLeft < 0) {
      left = 2
    } else if (this.windowElement.offsetLeft + wrapperRect.width >= screenRect.width - 6) {
      left = this.windowElement.offsetLeft - 6
    }

    // Handle y-lead dragging stop.
    if (this.windowElement.offsetTop <= 3) {
      top = 4
    } else if (this.windowElement.offsetTop + wrapperRect.height >= window.innerHeight) {
      top = this.windowElement.offsetTop - 6
    }

    this.windowElement.style.left = `${left}px`
    this.windowElement.style.top = `${top}px`
    event.stopPropagation()
    event.preventDefault()
  }
  }
)
