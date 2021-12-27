/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../my-custom-button'

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
         display: flex;
         height: 100%;
         width: 100%;
         position: relative;
     }

     #textInput {
       outline: none;
       resize: none;
       width: 100%;
     }

     #sendButton {
         
     }

     ::part(buttonText) {
     }

     ::part(buttonArea) {
      width: 20px;
      height: 100%;
      background: white;
      box-shadow: inset 0 0 1px black;
    }
     ::part(buttonArea):hover {
      width: 20px;
      height: 100%;
      box-shadow: inset 0 0 3px #432854;
    }

   </style>
    <form id="textField">
       <textarea id="textInput"></textarea>
       <my-custom-button id="sendButton"></my-custom-button>
    </form>
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

      this.textField = this.shadowRoot.querySelector('#textField')
      this.sendButton = this.shadowRoot.querySelector('#sendButton')
      this.textInput = this.shadowRoot.querySelector('#textInput')

      this.sendMessage = this.sendMessage.bind(this)

      this.sendButton.addEventListener('click', this.sendMessage)

      this.textInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          this.sendMessage(event)
        }
      })
    }

    /**
     * Send a new message.
     *
     * @param {*} event - The event.
     */
    sendMessage (event) {
      this.dispatchEvent(new CustomEvent('user-message', {
        detail: { message: this.textInput.value }
      }))
      this.textField.reset()
      this.textInput.focus()
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
