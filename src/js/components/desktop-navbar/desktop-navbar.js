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
       height: 100%;
       background: rgba(78,205,242,0.5);
       border-radius: 10px;
       border: 1px solid rgba(78,205,242,1);
       width: min-content;
       transform: translateY(70px);
       transition: 700ms;
       z-index: 10000;
     }

     :host(:hover) {
       transition: 500ms;
       transform: translateY(20px);
     }

     #iconWrapper {
       display: flex;
       padding: 5px;
       width: 100%;
       justify-content: center;
       align-items: center;
     }

     ::slotted(*) {
       display: flex;
       justify-content: center;
       align-items: flex-start;
       height: 110%;
       width: 70px;
       background: radial-gradient(circle, rgba(111,200,240,1) 28%, rgba(32,122,194,1) 79%);
       margin: 4px;
       border-radius: 15px 15px 2px 2px;
     }

     ::slotted(*:hover), ::slotted(*:focus) {
      box-shadow: inset 0 0 4px black;
     }

     .icon {
       height: 110%;
       width: 70px;
       background: radial-gradient(circle, rgba(111,200,240,1) 28%, rgba(32,122,194,1) 79%);
       margin: 4px;
       border-radius: 15px 15px 2px 2px;
     }

   </style>
   <div id="iconWrapper">
     <slot class="icon" name="icon1"></slot>
     <slot class="icon" name="icon2"></slot>
     <slot class="icon" name="icon3"></slot>
     <slot class="icon" name="icon4"></slot>
     <slot class="icon" name="icon5"></slot>
     <slot class="icon" name="icon6"></slot>
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

      this.iconWrapper = this.shadowRoot.querySelector('#iconWrapper')

      this.iconWrapper.addEventListener('click', (event) => {
        this.dispatchEvent(new CustomEvent('icon-request', {
          bubbles: true,
          detail: { id: event.target.id }
        }))
      })

      this.iconWrapper.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          this.dispatchEvent(new CustomEvent('icon-request', {
            bubbles: true,
            detail: { id: event.target.id }
          }))
        }
      })
    }
  }
)
