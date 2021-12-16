/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

 const SHOOTER_BACKGROUND = (new URL('./images/pointer.png', import.meta.url)).href

 
 /*
  * Define template.
  */
 const template = document.createElement('template')
 template.innerHTML = `
   <style>
     :host {
        display: block;
        width: 15px;
        height: 70px;
        background: url("${SHOOTER_BACKGROUND}") no-repeat center;
        position: absolute;
     }

   </style>
 `
 
 /*
  * Define custom element.
  */
 customElements.define('shooter-cannon',
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

      movePointer (pointerX, pointerY) {
        let degree = Math.atan2(pointerX, pointerY) * 180 / Math.PI
        this.style.transform = `rotate(${degree}deg)`
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
        return []
      }
 
 
      /**
       * Called when observed attribute(s) changes.
       *
       * @param {string} name - The attribute's name.
       * @param {*} oldValue - The old value.
       * @param {*} newValue - The new value.
       */
      attributeChangedCallback (name, oldValue, newValue) {
        if (name === 'def') {
        }
      }
   }
 )
 