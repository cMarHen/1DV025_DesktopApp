/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../my-username-input'

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
        height: 100%;
        width: 100%;
        /* background: #e1fdff; <---- USE THIS  */
        background: white;
    }

</style>
    <div id="formWrapper">
        <h2>THE CHAT</h2>
         <my-username-input type="chat" id="usernameInput">LOGIN</my-username-input> 
    </div>
`

/*
* Define custom element.
*/
customElements.define('chat-login',
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
  }
)
