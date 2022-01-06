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

      this.windowBody = this.shadowRoot.querySelector('desktop-window-body')
      this.screenHeader = this.shadowRoot.querySelector('desktop-window-header')

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

      this.screenHeader.addEventListener('require-fullscreen', (event) => {
        this.windowBody.toggleAttribute('fullscreen')
        this.style.left = '0'
        this.style.top = '0'
        this.dispatchEvent(new window.CustomEvent('require-fullscreen', {
          bubbles: true
        }))
      })
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
