/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../chat-send-message'

/*
* Define template.
*/
const template = document.createElement('template')
template.innerHTML = `
   <style>
     :host {
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         border: 2px solid black;
         height: 70vh;
         width: 30vw;
         min-height: 100%;
         min-width: 100%;
         background: blue;
     }

     #messageField {
        display: flex;
         height: 90%;
         width: 90%;
         background: white;
     }

     chat-send-message {
         display: flex;
         align-self: flex-end;
         width: 90%;
     }

     /* #test2 {
        display: flex;
         height: 200px;
         width: 200px;
         background: blue;
     } */
   </style>
   <div id="messageField">
       <p>ChatApp</p>
    </div>
    <chat-send-message></chat-send-message>
   <!-- <div id="test2">
       <p>HEJHE</p>
    </div> -->
 `

/*
* Define custom element.
*/
customElements.define('chat-application',
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
      console.log('chat-app!!')
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
