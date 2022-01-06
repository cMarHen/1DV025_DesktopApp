/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../my-custom-button'
import '../chat-emoji-window'

/*
* Define template.
*/
const template = document.createElement('template')
template.innerHTML = `
   <style>
     :host {
         display: flex;
         justify-content: space-around;
         align-items: center;
         margin-bottom: 30px;
     }

     #textField {
         display: flex;
         height: 100%;
         width: 100%;
         position: relative;
     }

     #textInput {
       outline: none;
       resize: none;
       width: 100%;
     }

     chat-emoji-window {
       position: absolute;
       top: 90%;
       left: -20px;
     }

     ::part(buttonText) {
     }

     ::part(buttonArea) {
      width: 60px;
      height: 100%;
      background: white;
      box-shadow: inset 0 0 1px black;
    }
     ::part(buttonArea):hover {
      box-shadow: inset 0 0 3px #432854;
    }

   </style>
    <form id="textField">
       <textarea id="textInput"></textarea>
       <my-custom-button id="sendButton">SEND</my-custom-button>
       <chat-emoji-window></chat-emoji-window>
    </form>
 `

/*
* Define custom element.
*/
customElements.define('chat-send-message',
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
      this.sendButton = this.shadowRoot.querySelector('#sendButton')
      this.textInput = this.shadowRoot.querySelector('#textInput')
      this.emojiWindow = this.shadowRoot.querySelector('chat-emoji-window')

      this.sendMessage = this.sendMessage.bind(this)

      this.emojiWindow.addEventListener('emoji-clicked', (event) => {
        this.textInput.value += event.detail.emoji
        event.preventDefault()
      })

      this.sendButton.addEventListener('click', this.sendMessage)

      this.textInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          this.sendMessage(event)
        }
      })
    }

    /**
     * Send a new message.
     *
     * @param {object} event - The event.
     */
    sendMessage (event) {
      this.dispatchEvent(new CustomEvent('user-message', {
        detail: { message: this.textInput.value }
      }))
      this.textField.reset()
      this.textInput.focus()
      event.preventDefault()
    }
  }
)
