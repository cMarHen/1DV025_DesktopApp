/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../desktop-navbar'
import '../desktop-screen'

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
        height: 100vh;
        width: 100vw;
        overflow: hidden;
     }

     #navWrapper {
        width: 100%;
        height: min-content;
        width: 100vw;
        display: flex;
        justify-content: center;
        border-bottom: 2px solid green;
     }

     #windowWrapper {
         display: flex;
         height: 100%;
         width: 100%;
     }

     desktop-screen {
       left: 100px;
     }
   </style>
   <div id="navWrapper">
       <desktop-navbar>
           <!-- 
               USING SLOT ?
               ICON 1
               ICON 2
               ...
            -->
       </desktop-navbar>
   </div>
   <div id="windowWrapper">
       <desktop-screen></desktop-screen>
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
