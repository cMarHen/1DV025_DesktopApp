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
     }

     div {
         display: flex;
     }

     div input {
         border-radius: 3px;
         outline: none;
         border: 1px solid black;

     }

     ::part(buttonText) {
     }

     ::part(buttonArea) {
        height: 25px;
        width: 50px;
    }
     ::part(buttonArea):hover {
    }

   </style>
   <div>
    <input id="inputText" type="text">
    <my-custom-button>
      <slot></slot>
    </my-custom-button>
   </div>
 `

/*
* Define custom element.
*/
customElements.define('my-username-input',
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

      this.button = this.shadowRoot.querySelector('my-custom-button')
      this.inputText = this.shadowRoot.querySelector('#inputText')

      this.setUsername = this.setUsername.bind(this)

      this.button.addEventListener('clicked', this.setUsername)

      this.inputText.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          this.setUsername(event)
        }
      })
    }

    /**
     * Set username to local storage.
     *
     * @param {object} event - The event.
     */
    setUsername (event) {
      if (this.type) {
        this.dispatchEvent(new CustomEvent('username-set', {
          bubbles: true,
          composed: true,
          detail: { username: this.inputText.value }
        }))
      }

      window.localStorage.setItem(`${this.type}Username`, JSON.stringify({ username: this.inputText.value }))

      event.preventDefault()
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.inputText.focus()
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['type']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'type') {
        this.type = newValue
      }
    }
  }
)
