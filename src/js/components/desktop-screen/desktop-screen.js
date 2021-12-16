/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../desktop-screen-window'
import '../desktop-navbar'
import '../memory-application'

const BACKGROUND_IMG = (new URL('./images/desktop-background.jpg', import.meta.url)).href

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

</style>
<div id="desktopScreen">
    
    <desktop-screen-window id="window2">
      <memory-application slot="app"></memory-application>
    </desktop-screen-window>
</div>
<!-- Allting som heter "windowWrapper i screen-window måste hit." -->


<div id="navWrapper">
  <!-- Img-taggar i slotten? -->
  <!-- Ikoner till höger, med en döljfunktion -->
       <desktop-navbar>
       <!--    <div id="chat" class="icon" slot="icon1">
            <h5>Chat</h5>
          </div>
          <div id="memory" class="icon" slot="icon2">
            <h5>Memory</h5>
          </div>
          <div id="shooter" class="icon" slot="icon3">
          <h5>Shooter</h5>
          </div> 
          
          <div class="icon" slot="icon4"></div> -->
       </desktop-navbar>
   </div>



  <template name="memoryTemplate">
    <desktop-screen-window name="window1">
      <memory-application slot="app"></memory-application>
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
  /**
   * Creates an instance of the current type.
   */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.desktopScreen = this.shadowRoot.querySelector('#desktopScreen')
      this.navBar = this.shadowRoot.querySelector('desktop-navbar')

      this.screenRect = this.getBoundingClientRect()
      this.windowDragStart = this.windowDragStart.bind(this)
      this.windowDragOver = this.windowDragOver.bind(this)

      this.navBar.addEventListener('icon-request', (event) => {
        console.log(event.target.id)
      })

      this.desktopScreen.addEventListener('closeWindow', (event) => {
        this.desktopScreen.removeChild(event.target)
      })

      this.desktopScreen.addEventListener('dragstart', this.windowDragStart)

      this.desktopScreen.addEventListener('dragend', (event) => {
        this.removeEventListener('dragover', this.windowDragOver)
      })
    }

    appendNewWindow (id) {

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


      /* console.log(wrapperRect) */
      // console.log(this.windowWrapper.offsetLeft)

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
