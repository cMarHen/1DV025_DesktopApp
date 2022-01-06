/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../chat-send-message'
import '../chat-recieved-message'
import '../chat-login'
import '../my-custom-button'

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

     #updateUsernameDiv {
       display: none;
       align-items: center;
     }

     #buttonWrapper {
       display: flex;
       justify-content: space-around;
     }

     ::part(buttonArea) {
       height: 20px;
       width: 30px;
       margin-left: 4px;
      }

     ::part(buttonText) {
       font-size: 0.7rem;
      }

     p {
       margin: 0;
       font-size: 0.9rem;
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
         scrollbar-color: gray transparent;
         scrollbar-width: thin;
     }
     
     chat-send-message {
         display: none;
         justify-self: flex-end;
         width: 90%;
     }
     chat-recieved-message {
         height: min-content;
     }

     #notificationButton[activated]::part(buttonArea) {
       box-shadow: inset 0 0 15px #370259;
      } 

     #notificationButton::part(buttonArea) {
       height: 40px;
       width: 70px;
       margin: 3px 10px 3px 4px;
      }

   </style>
   <div id="buttonWrapper">
    <my-custom-button id="notificationButton">Toggle Notification</my-custom-button>
    
    <div id="updateUsernameDiv">
      <p>Change your username: </p>
      <my-custom-button id="updateUsername">OK</my-custom-button>
    </div>
    </div>
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
      this.updateUsernameDiv = this.shadowRoot.querySelector('#updateUsernameDiv')
      this.updateUsername = this.shadowRoot.querySelector('#updateUsername')
      this.notificationButton = this.shadowRoot.querySelector('#notificationButton')

      this.socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')

      this.#jsonData = {
        type: 'message',
        data: 'The message text is sent using the data property',
        username: 'anonymous',
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }

      this.checkIfLoggedIn()

      this.socket.addEventListener('message', this.gotNewMessage.bind(this))

      // ----- EVENT LISTENERS ------ //

      // New username.
      this.loginArea.addEventListener('username-set', (event) => {
        this.#jsonData.username = event.detail.username
        this.loginArea.style.display = 'none'
        this.messageField.style.display = 'flex'
        this.sendMessageField.style.display = 'flex'
        this.updateUsernameDiv.style.display = 'flex'
      })

      // Message from user to be dispatched to socket.
      this.sendMessageField.addEventListener('user-message', (event) => {
        const dataMessage = event.detail.message
        this.#jsonData.data = dataMessage
        this.socket.send(JSON.stringify(this.#jsonData))
      })

      // User want to change username.
      this.updateUsername.addEventListener('clicked', (event) => {
        this.loginArea.style.display = 'block'
        this.messageField.style.display = 'none'
        this.sendMessageField.style.display = 'none'
        this.updateUsernameDiv.style.display = 'none'
      })

      this.notificationButton.addEventListener('clicked', (event) => {
        this.notificationButton.toggleAttribute('activated')
      })
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
        this.updateUsernameDiv.style.display = 'flex'
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
      if (data.data) {
        const element = document.createElement('chat-recieved-message')
        element.usernameAndMessage(data.data, data.username)
        if (data.username === this.#jsonData.username) {
          element.setAttribute('self', '')
        }

        this.messageField.append(element)

        this.messageField.scrollTop = this.messageField.scrollHeight
      }

      if ('Notification' in window) {
        if (this.notificationButton.hasAttribute('activated') && data.data) {
          const webWorker = new Worker('./webWorker')
          Notification.requestPermission((permission) => {
            if (permission === 'granted') {
              webWorker.postMessage('newChatMessage')
            }
          })
        }
      }
    }
  }
)
