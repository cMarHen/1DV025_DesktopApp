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
       height: 80%;
       width: min-content;
       margin: 5px;
       border-radius: 5px;
       box-shadow: inset 0 0 3px black;
       border: 2px solid black;
     }

     #iconWrapper {
       display: inherit;
       padding: 5px;
       width: 100%;
       justify-content: center;
       align-items: center;
     }

     ::slotted(*) {
       display: flex;
       border-radius: 10px;
       margin: 4px;
       border: 2px solid black;
     }

     ::slotted(*:hover) {
      box-shadow: inset 0 0 4px black;
     }

   </style>
   <div id="iconWrapper">
     <slot name="icon1" class="icon"></slot>
     <slot name="icon2"></slot>
     <slot name="icon3"></slot>
     <slot name="icon4"></slot>
     <slot name="icon5"></slot>
     <slot name="icon6"></slot>
   </div>
 `

/*
* Define custom element.
*/
customElements.define('desktop-navbar',
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
