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

     }

     #button {
         outline: none;
         border: none;
         transition: 50ms;
        display: flex;
         justify-content: center;
         align-items: center;
         height: 40px;
         width: 100px;
         background: radial-gradient(circle, rgba(234,244,249,1) 28%, rgba(212,243,249,1) 76%);
         filter: brightness(0.9);
         border-radius: 5px;
         box-shadow: inset 0 0 5px black;
     }

     #button:hover {
        box-shadow: inset 0 0 15px #432854;
     }

     #button:active {
        box-shadow: inset 0 0 15px #370259;
     }
   </style>

   <button id="button" part="buttonArea">
       <slot id="slottedContent" part="buttonText"></slot>
    </button>
 `

/*
* Define custom element.
*/
customElements.define('my-custom-button',
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

      this.slottedContent = this.shadowRoot.querySelector('#slottedContent')

      this.addEventListener('click', (event) => {
        this.dispatchEvent(new CustomEvent('clicked', {
          bubbles: true,
          composed: true,
          detail: { id: this.slottedContent }
        }))
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
