/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../desktop-screen-window'
import '../desktop-navbar'
import '../memory-application'
import '../shooter-area-main'
import '../my-custom-timer'
import '../chat-application'
import '../my-highscore-component'

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

    #shooter {
      background-image: url(${ASTROID_SHOOTER_ICON});
    }
    #memory {
      background-image: url(${MEMORY_ICON});
    }
    #chat {
      background-image: url(${CHAT_ICON});
    }
    #highscore {
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
          <div id="shooter" class="icon" slot="icon1" tabindex="0" title="Astroid Shooter"></div>
          <div id="memory" class="icon" slot="icon2" tabindex="0" title="Memory Game"></div>
          <div id="chat" class="icon" slot="icon3" tabindex="0" title="Chat Application"></div> 
          <div id="highscore" class="icon" slot="icon4" tabindex="0"  title="Highscore Application"></div>
       </desktop-navbar>
   </div>

<!-- APP TEMPLATES -->

  <template id="memoryTemplate">
    <desktop-screen-window>
      <memory-application slot="app"></memory-application>
    </desktop-screen-window>
  </template>
  <template id="chatTemplate">
    <desktop-screen-window>
    <chat-application slot="app"></chat-application>
    </desktop-screen-window>
  </template>
  <template id="shooterTemplate">
    <desktop-screen-window>
      <shooter-area-main slot="app"></shooter-area-main>
    </desktop-screen-window>
  </template>
  <template id="highscoreTemplate">
    <desktop-screen-window>
      <my-highscore-component slot="app"></my-highscore-component>
    </desktop-screen-window>
  </template>

`

/*
* Define custom element.
*/
customElements.define('desktop-screen',
  /**
   * Represents a component.
   */
  class extends HTMLElement {
  #zIndexToUse

  #idToUse

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
    this.screenRect = this.getBoundingClientRect()
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
   * @param {*} id - The type of app to open.
   */
  appendNewWindow (id) {
    console.log(id)
    const element = this.shadowRoot.querySelector(`#${id}Template`).content.cloneNode(true)
    element.firstElementChild.id = `window${this.#idToUse}`
    this.#idToUse += 1
    this.#positionToUse += 5

    // New position for each window.
    if (this.#idToUse < 500) {
      element.firstElementChild.style.left = `${this.#positionToUse}px`
      element.firstElementChild.style.top = `${this.#positionToUse}px`
    } else {
      element.firstElementChild.style.left = '500px'
      element.firstElementChild.style.top = '500px'
    }

    // To make sure is displayed on top.
    element.firstElementChild.setAttribute('zindex', this.#zIndexToUse)
    this.#zIndexToUse += 1

    this.desktopScreen.append(element)
  }

  /**
   * Handles window start dragging.
   *
   * @param {*} event - The event.
   */
  windowDragStart (event) {
    this.windowElement = this.shadowRoot.querySelector(`#${event.target.id}`)
    this.pointerX = event.clientX
    this.pointerY = event.clientY

    event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight)
    this.addEventListener('dragover', this.windowDragOver)
  }

  /**
   * Handles window moving.
   *
   * @param {*} event - The event.
   */
  windowDragOver (event) {
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
    } else if (this.windowElement.offsetLeft + wrapperRect.width >= this.screenRect.width - 6) {
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

  /**
   * Attributes to monitor for changes.
   *
   * @returns {string[]} A string array of attributes to monitor.
   */
  static get observedAttributes () {
    return ['name']
  }

  /**
   * Called when observed attribute(s) changes.
   *
   * @param {string} name - The attribute's name.
   * @param {*} oldValue - The old value.
   * @param {*} newValue - The new value.
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'name') {
      this.id = name
    }
  }
  }
)
