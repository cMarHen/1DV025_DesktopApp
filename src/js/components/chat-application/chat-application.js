/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../chat-send-message'
import '../chat-recieved-message'
import '../chat-login'

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
         height: 70vh;
         width: 30vw;
         min-height: 100%;
         min-width: 100%;
         background: #e1fdff;
     }

     #loginArea {
       display: none;
       height: 100%;
       width: 100%;
     }

     #messageField {
        display: none;
        flex-direction: column;
         height: 80%;
         width: 90%;
         background: white;
         margin: 4px;
         overflow-y: scroll;
     }
     /* ::-webkit-scrollbar-thumb */
     
     chat-send-message {
         display: none;
         justify-self: flex-end;
         width: 90%;
     }
     chat-recieved-message {
         height: min-content;
     }
   </style>
   <div id="loginArea">
     <chat-login></chat-login>
   </div>
    <div id="messageField">
       <chat-recieved-message></chat-recieved-message>
    </div>
    <chat-send-message></chat-send-message>
 `

/*
* Define custom element.
*/
customElements.define('chat-application',
  /**
   * Represents a component.
   */
  class extends HTMLElement {
    #jsonData

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.messageField = this.shadowRoot.querySelector('#messageField')
      this.sendMessageField = this.shadowRoot.querySelector('chat-send-message')
      this.loginArea = this.shadowRoot.querySelector('#loginArea')

      this.socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')

      this.#jsonData = {
        type: 'message',
        data: 'The message text is sent using the data property',
        username: 'anonymous',
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }

      this.checkIfLoggedIn()

      // ----- EVENT LISTENERS ------ //

      this.loginArea.addEventListener('username-set', (event) => {
        this.#jsonData.username = event.detail.username
        this.loginArea.style.display = 'none'
        this.messageField.style.display = 'flex'
        this.sendMessageField.style.display = 'flex'
      })

      this.sendMessageField.addEventListener('user-message', (event) => {
        console.log(event.detail.message)
        const dataMessage = event.detail.message
        this.#jsonData.data = dataMessage
        this.socket.send(JSON.stringify(this.#jsonData))
      })

      this.socket.addEventListener('message', this.gotNewMessage.bind(this))
    }

    /**
     * Check if login-window or not.
     */
    checkIfLoggedIn () {
      if (localStorage.chatUsername) {
        const data = JSON.parse(localStorage.chatUsername)
        this.#jsonData.username = data.username
        this.loginArea.style.display = 'none'
        this.messageField.style.display = 'flex'
        this.sendMessageField.style.display = 'flex'
      } else {
        this.loginArea.style.display = 'block'
      }
    }

    /**
     * Parses a new chat message and append it to shadowDOM.
     *
     * @param {object} event - The event.
     */
    gotNewMessage (event) {
      const data = JSON.parse(event.data)
      console.log(data)
      if (data.data) {
        const element = document.createElement('chat-recieved-message')
        element.usernameAndMessage(data.data, data.username)
        if (data.username === this.username) {
          element.setAttribute('self', '')
        }

        this.messageField.append(element)
        // element.scrollIntoView()
      }
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
