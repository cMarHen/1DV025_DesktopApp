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

const BACKGROUND_IMG = (new URL('./images/desktop-background.jpg', import.meta.url)).href
const ASTROID_SHOOTER_ICON = (new URL('./images/shooter-icon.png', import.meta.url)).href

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
        background-repeat: no-repeat;
        background-position: cover;
        box-shadow: inset 1px 1px 4px gray;
        position: relative;
    }

    #navWrapper {
      display: flex;
      align-self: flex-start;
        width: 100%;
        height: 100px;
        justify-content: center;
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
      left: 20px;
    }

    /* .icon{
      height: 50px;
      width: 50px;
      background: red;
    } */

    #shooter {
      background-image: url(${ASTROID_SHOOTER_ICON});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: cover;
    }

</style>
<div id="desktopScreen">
    <desktop-screen-window id="window2" zindex="2">
      <chat-application slot="app"></chat-application>
    </desktop-screen-window>
    <!-- <chat-application></chat-application> -->
    <!-- <desktop-screen-window id="window2" zindex="2">
      <shooter-area-main slot="app"></shooter-area-main>
    </desktop-screen-window> -->
    <!-- <desktop-screen-window name="window1">
      <memory-application slot="app"></memory-application>
    </desktop-screen-window> -->
    <!-- <my-custom-timer></my-custom-timer> -->
</div>


<div id="navWrapper">
  <!-- Img-taggar i slotten? -->
  <!-- Ikoner till höger, med en döljfunktion -->
       <desktop-navbar>
          <div id="shooter" slot="icon1"></div>
          <div id="memory" class="icon" slot="icon2">
            <h5>Memory</h5>
          </div>
          <div id="chat" class="icon" slot="icon3">
          <h5>Chat</h5>
          </div> 
          
          <div class="icon" slot="icon4"></div>
       </desktop-navbar>
   </div>



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
    this.screenRect = this.getBoundingClientRect()
    this.windowDragStart = this.windowDragStart.bind(this)
    this.windowDragOver = this.windowDragOver.bind(this)

    // -- WINDOW TEMPLATES -- //

    this.shooterTemplate = this.shadowRoot.querySelector('#shooterTemplate')

    // -- EVENT LISTENERS -- //

    this.navBar.addEventListener('icon-request', (event) => {
      console.log(event.detail.id)
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
  }

  /**
   * Create a new window. Set an unique id to the element.
   *
   * @param {*} id - The type of app to open.
   */
  appendNewWindow (id) {
    const element = this.shadowRoot.querySelector(`#${id}Template`).content.cloneNode(true)
    element.firstElementChild.id = `window${this.#idToUse}`
    this.#idToUse += 1
    this.desktopScreen.append(element)
  }

  /**
   * Handles window start dragging.
   *
   * @param {*} event - The event.
   */
  windowDragStart (event) {
    console.log(event.target)
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
   * Called after the element is inserted into the DOM.
   */
  connectedCallback () {
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
