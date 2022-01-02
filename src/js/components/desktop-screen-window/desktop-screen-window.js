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
    }

    #windowWrapper {

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

      this.windowScreen = this.shadowRoot.querySelector('desktop-window-window')
      this.screenHeader = this.shadowRoot.querySelector('desktop-window-header')
      this.screenRect = this.getBoundingClientRect()

      this.windowDragStart = this.windowDragStart.bind(this)
      this.windowDragOver = this.windowDragOver.bind(this)

      this.addEventListener('mousedown', (event) => {
        this.dispatchEvent(new window.CustomEvent('require-focus', {
          bubbles: true
        }))
      })

      this.screenHeader.addEventListener('closeWindow', (event) => {
        this.dispatchEvent(new window.CustomEvent('closeWindow', {
          bubbles: true
        }))
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

      this.addEventListener('dragover', this.windowDragOver)
    }

    /**
     * Handles window moving.
     *
     * @param {*} event - The event.
     */
    windowDragOver (event) {
      const wrapperRect = this.getBoundingClientRect()

      // To update the coordinates.
      const windowX = this.pointerX - event.clientX
      const windowY = this.pointerY - event.clientY
      this.pointerX = event.clientX
      this.pointerY = event.clientY

      let left = this.offsetLeft - windowX
      let top = this.offsetTop - windowY

      // Handle x-lead dragging stop.
      if (this.offsetLeft < 0) {
        left = 2
      } else if (this.offsetLeft + wrapperRect.width >= this.screenRect.width - 6) {
        left = this.offsetLeft - 6
      }

      // Handle y-lead dragging stop.
      if (this.offsetTop <= 3) {
        top = 4
      } else if (this.offsetTop + wrapperRect.height >= window.innerHeight) {
        top = this.offsetTop - 6
      }

      this.dispatchEvent(new CustomEvent('move-window', {
        bubbles: true,
        detail: {
          x: left,
          y: top
        }
      }))
      event.stopPropagation()
      event.preventDefault()
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['zindex']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'zindex') {
        this.style.zIndex = newValue
      }
    }
  }
)
