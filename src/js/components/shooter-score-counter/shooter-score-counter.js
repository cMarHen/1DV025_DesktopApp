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
     #counter {
         display: flex;
         height: min-content;
         width: min-content;
         padding: none;
     }

     #textField {
         color: white;
         transition: 400ms;
     }

     @keyframes flash {
        0% {
             transform: scale(200%);
         }
     
         100% {
            transform: scale(100%);
         } 
     }
   </style>
   <div id="counter">
       <h2 part="counterText" id="textField">0</h2>
   </div>
 `
 
 /*
  * Define custom element.
  */
 customElements.define('shooter-point-counter',
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
        if (name === 'value') {
            this.textField.innerText = newValue
            this.textField.style.animation = `flash`
        }
      }
   }
 )
 