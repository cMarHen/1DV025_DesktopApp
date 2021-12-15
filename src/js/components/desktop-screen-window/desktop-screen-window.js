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
<desktop-window-body>
  <slot name="app" slot="app"></slot>
</desktop-window-body>
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
      this.screenRect = this.getBoundingClientRect()
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

      event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight)

      this.windowWrapper.addEventListener('dragover', this.windowDragOver)
    }

    /**
     * Handles window moving.
     *
     * @param {*} event - The event.
     */
    windowDragOver (event) {
      const wrapperRect = this.windowWrapper.getBoundingClientRect()

      // To update the coordinates.
      const windowX = this.pointerX - event.clientX
      const windowY = this.pointerY - event.clientY
      this.pointerX = event.clientX
      this.pointerY = event.clientY

      let left = this.windowWrapper.offsetLeft - windowX
      let top = this.windowWrapper.offsetTop - windowY

      // Handle x-lead dragging stop.
      if (this.windowWrapper.offsetLeft < 0) {
        left = 0
      } else if (this.windowWrapper.offsetLeft + wrapperRect.width >= this.screenRect.width - 6) {
        left = this.windowWrapper.offsetLeft - 6
      }

      // Handle y-lead dragging stop.
      if (this.windowWrapper.offsetTop < 0) {
        top = 0
      } else if (this.windowWrapper.offsetTop + wrapperRect.height >= this.screenRect.height - 6) {
        top = this.windowWrapper.offsetTop - 6
      }

      /* console.log(wrapperRect) */
      // console.log(this.windowWrapper.offsetLeft)

      this.windowWrapper.style.left = `${left}px`
      this.windowWrapper.style.top = `${top}px`
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
