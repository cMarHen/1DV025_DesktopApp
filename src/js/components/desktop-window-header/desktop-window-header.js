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
        display: flex;
        height: 20px;
        width: 100%;
        background: gray;
        position: relative;
    }

    button {
        position: absolute;
        height: 17px;
        width: 17px;
        padding: 0 3px;
        margin: 0;
        left: 90%;
        text-decoration: none;
        font-size: 80%;
        font-weight: bold;
        border: none;
        box-shadow: 1px 1px 2px black;
        background-color: #4CAF50;
    }

</style>
<button id="closeButton">X</button>
 `

/*
 * Define custom element.
 */
customElements.define('desktop-window-header',
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

      this.closeButton = this.shadowRoot.querySelector('#closeButton')

      this.closeButton.addEventListener('click', (event) => {
        this.dispatchEvent(new window.CustomEvent('closeWindow', {
          bubbles: true
        }))
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
