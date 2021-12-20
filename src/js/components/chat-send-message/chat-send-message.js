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
         justify-content: space-around;
         align-items: center;
     }

     #textField {
         background: red;
         height: 100px;
         width: 100%;
     }

     #textField input {
         height: 100%;
         width: 100%;
     }

     #sendButton {
         margin: 6px;
     }

   </style>

   <div id="textField">
       <input type="text">
   </div>
       <button id="sendButton">SEND</button>
 `

/*
* Define custom element.
*/
customElements.define('chat-send-message',
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
