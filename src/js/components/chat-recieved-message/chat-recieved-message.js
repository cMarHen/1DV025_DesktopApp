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
          display: block;
          margin: 3px;
          height: 100%;
          width: 95%;
      }

      :host([self]) #wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background: green;
      }

      :host([self]) > *::after {
        margin-right: 15px;
      }

      #wrapper {
        background: rgba(176, 231, 226, 0.56);
        box-shadow: inset 0 0 15px white;
        display: flex;
        flex-direction: column;
        align-items: start;
      }

      #user {
      }

      #message {
        height: min-content;
      }

/*       #wrapper {
        display: flex; 
        flex-direction: column;
      }

      #wrapper > * {
        display: flex;
        word-wrap: break-word;
        height: min-content;
      } */
      /* Lägg till class om skrivaren är en själv, så det hamnar åt höger */

    </style>
   <!--  <div id="wrapper">
    </div> -->

    <template id="messageTemplate">
     <div id="wrapper">
        <p id="user"> <span id="headline"></span> says: </p>
        <p id="message"> </p>
     </div>
    </template>
  `

/*
* Define custom element.
*/
customElements.define('chat-recieved-message',
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

      this.messageTemplate = this.shadowRoot.querySelector('#messageTemplate').content.cloneNode(true)
      console.log(this.messageTemplate)
    }

    /**
     * Append username and the message to the component.
     *
     * @param {string} message - The message to be shown.
     * @param {string} [user='Unknown'] - The username.
     */
    usernameAndMessage (message, user = 'Unknown') {
      const wrapper = this.messageTemplate.querySelector('#wrapper')
      const userTag = wrapper.querySelector('#headline')
      userTag.append(user)

      const messageTag = wrapper.querySelector('#message')
      messageTag.append(message)

      console.log(wrapper)
      // console.log(this.messageTemplate.content.querySelector('#message'))
      // messageTag.append(message), userTag.append(user)

      this.shadowRoot.append(wrapper)
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
    }
  }
)
