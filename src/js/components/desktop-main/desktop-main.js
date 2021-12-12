/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

/*
* Define template.
*/
const template = document.createElement('template')
template.innerHTML = `
   <style>
     :host {
        display: block;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        box-shadow: inset 0 0 0 4px black;
     }
   </style>
   <div>
   </div>
 `

/*
* Define custom element.
*/
customElements.define('desktop-main',
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
