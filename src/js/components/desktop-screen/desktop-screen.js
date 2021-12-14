/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../desktop-screen-window'
import '../desktop-screen-header'

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

    #test {
      height: 100px;
      width: 100px;
      background: black;
    }

    #windowWrapper {
      position: absolute;
      box-shadow: inset 1px 1px 4px gray;
      border: 2px solid black;
      height: min-content;
    }

    desktop-screen-window {
      height: 300px;
      width: 300px;
    }

    #downRight {
      background-color: red;
      height: 8px;
      width: 8px;
      position: absolute;
      left: 99%;
      top: 99%;
      z-index: 3;
      cursor: nwse-resize;
    }
    #downLeft {
      background-color: red;
      height: 8px;
      width: 8px;
      position: absolute;
      left: -1%;
      top: 99%;
      z-index: 3;
      cursor: nesw-resize;
    }

    /* #windowWrapper > * {
      position: absolute;
    } */

</style>
<div id="windowWrapper">
  <desktop-screen-header draggable="true"></desktop-screen-header>
  <desktop-screen-window></desktop-screen-window>
  <div id="downLeft"></div>
  <div id="downRight"></div>
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
   * Creates an instance of the current type.
   */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.windowWrapper = this.shadowRoot.querySelector('#windowWrapper')
      this.windowScreen = this.shadowRoot.querySelector('desktop-screen-window')
      this.screenHeader = this.shadowRoot.querySelector('desktop-screen-header')

      this.mouseMoveDragging = this.mouseMoveDragging.bind(this)

      this.screenHeader.addEventListener('dragstart', this.mouseMoveDragging)

      this.addEventListener('dragend', (event) => {
        this.screenHeader.removeEventListener('dragstart', this.mouseMoveDragging)
      })
    }

    /**
     * Handles window moving.
     *
     * @param {*} event - The event.
     */
    mouseMoveDragging (event) {
      let pointerX = event.clientX
      let pointerY = event.clientY

      this.addEventListener('dragover', (event) => {
        const windowX = pointerX - event.clientX
        const windowY = pointerY - event.clientY
        pointerX = event.clientX
        pointerY = event.clientY

        this.windowWrapper.style.left = `${this.windowWrapper.offsetLeft - windowX}px`
        this.windowWrapper.style.top = `${this.windowWrapper.offsetTop - windowY}px`
        event.stopPropagation()
        event.preventDefault()
      })
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
