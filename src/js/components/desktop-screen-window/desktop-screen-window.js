/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../desktop-window-body'
import '../desktop-window-header'

/*
* Define template.
*/
const template = document.createElement('template')
template.innerHTML = `
<style>
    :host {
        display: flex;
        height: 100%;
        width: 100%;
        background: white;
        box-shadow: inset 1px 1px 4px gray;
        position: relative;
    }

    #windowWrapper {
    position: absolute;
    box-shadow: inset 1px 1px 4px gray;
    border: 2px solid black;
    height: min-content;
    }

</style>
<div id="windowWrapper">
<desktop-window-header draggable="true"></desktop-window-header>
<desktop-window-body></desktop-window-body>
</div>

`

/*
* Define custom element.
*/
customElements.define('desktop-screen-window',
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

      this.windowWrapper = this.shadowRoot.querySelector('#windowWrapper')
      this.windowScreen = this.shadowRoot.querySelector('desktop-window-window')
      this.screenHeader = this.shadowRoot.querySelector('desktop-window-header')
      /* this.resizeDownLeft = this.shadowRoot.querySelector('#downLeft')
       this.resizeDownRight = this.shadowRoot.querySelector('#downRight') */

      this.windowDragStart = this.windowDragStart.bind(this)
      this.windowDragOver = this.windowDragOver.bind(this)
      /* this.resizingRight = this.resizingRight.bind(this) */

      this.screenHeader.addEventListener('closeWindow', (event) => {
        console.log('ta bort')
      })

      // Listener for screen dragging.
      this.screenHeader.addEventListener('dragstart', this.windowDragStart)

      this.screenHeader.addEventListener('dragend', (event) => {
        this.windowWrapper.removeEventListener('dragover', this.windowDragOver)
      })
    }

    /**
     * Handles window moving.
     *
     * @param {*} event - The event.
     */
    windowDragStart (event) {
      this.pointerX = event.clientX
      this.pointerY = event.clientY

      console.log(this.pointerX, this.pointerY)

      event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight)

      this.windowWrapper.addEventListener('dragover', this.windowDragOver)
    }

    /**
     * Handles window moving.
     *
     * @param {*} event - The event.
     */
    windowDragOver (event) {
      const windowX = this.pointerX - event.clientX
      const windowY = this.pointerY - event.clientY
      this.pointerX = event.clientX
      this.pointerY = event.clientY

      /* console.log(event.clientY)
        console.log(event.clientX) */

      this.windowWrapper.style.left = `${this.windowWrapper.offsetLeft - windowX}px`
      this.windowWrapper.style.top = `${this.windowWrapper.offsetTop - windowY}px`
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
      return ['value']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === newValue) {
        console.log()
      }
    }
  }
)
