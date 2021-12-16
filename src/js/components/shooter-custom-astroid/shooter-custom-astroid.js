/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

const ASTROID_BACKGROUND = 'linear-gradient(90deg, rgba(153,155,162,1) 0%, rgba(130,130,133,1) 20%, rgba(98,98,109,1) 38%, rgba(74,81,94,1) 67%, rgba(110,113,132,1) 86%, rgba(135,136,142,1) 98%)'
 
 /*
  * Define template.
  */
 const template = document.createElement('template')
 template.innerHTML = `
   <style>
     #astroid {
       display: block;
       border-radius: 50px;
       height: 70px;
       width: 70px;
       transition: 0.4s;
       background: ${ASTROID_BACKGROUND};
     }

     /* background-color: #a40606;
background-image: linear-gradient(315deg, #a40606 0%, #d98324 74%);

YELLOWAREA: rgba(255,213,0,1)
 */

     @keyframes explosion {
         25% {
            background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(199,50,18,1) 11%, rgba(255,213,0,1) 25%, gray 50%);
         }

         60% {
            background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(199,50,18,1) 21%, rgba(255,213,0,1) 45%, gray 70%);
         }
         100% {
            background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(199,50,18,1) 31%, rgba(255,213,0,1) 70%, gray 90%);
            box-shadow: 0 0 35px  rgba(255,213,0,0.5), 0 0 50px  rgba(255,213,0,1);
         }
     }
   </style>
   <div id="astroid" class="explosion">
   </div>
 `
 
 /*
  * Define custom element.
  */
 customElements.define('shooter-custom-astroid',
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

          this.astroid = this.shadowRoot.querySelector('#astroid')

          this.addEventListener('click', (event) => {
              const astroid = event.target
              this.dispatchEvent(new window.CustomEvent('astroid-shot', {
                bubbles: true
              }))
              this.astroid.style.animation = `explosion 250ms linear forwards`
              this.astroid.classList.add('explosion') 
              setTimeout(() => {
                  astroid.parentElement.removeChild(astroid)
              }, 250);
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
        return ['explosion']
      }
 
 
      /**
       * Called when observed attribute(s) changes.
       *
       * @param {string} name - The attribute's name.
       * @param {*} oldValue - The old value.
       * @param {*} newValue - The new value.
       */
      attributeChangedCallback (name, oldValue, newValue) {
        if (name === 'explosion' && !this.hasAttribute('explosion')) {

        }
      }
   }
 )
 