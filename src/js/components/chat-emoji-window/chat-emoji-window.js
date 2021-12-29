/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import { emojiEmotion } from 'emoji-emotion'

const BACKGROUND_EMOJI = (new URL('./images/happy-emoji.png', import.meta.url)).href

/*
* Define template.
*/
const template = document.createElement('template')
template.innerHTML = `
    <style>
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: min-content;
        width: min-content;
        box-shadow: inset 0 0 3px gray;
        position: relative;
      }

      #noWindow {
        height: 25px;
        width: 25px;
        background-image: url(${BACKGROUND_EMOJI});
        background-size: 100%;
        background-position: cover;
        position: absolute;
        border-radius: 0 0 5px 5px;
        border-left: 2px solid gray;
        border-bottom: 2px solid gray;
        border-right: 2px solid gray;
        box-shadow: inset 0 0 10px #62908d;
        left: 80px;
        top: 4px;
      }

      #noWindow:hover {
        box-shadow: inset 0 0 10px #334d4b;
      }

      #clickedWindow {
          display: none;
        background: white;
        height: 180px;
        width: 230px;
        position: absolute;
        top: -177px;
        left: -100px;
        box-shadow: inset 0 0 5px gray;
        overflow-y: scroll;
        scrollbar-color: gray transparent;
        scrollbar-width: thin;
      }

      ::-webkit-scrollbar-thumb {
        background: black;
      }

      p {
          margin: 0;
          cursor: pointer;
      }

      .showing {
          display: flex !important;
          flex-wrap: wrap;
      }
 
 
    </style>
 
        <div id="noWindow"></div>
 
        <div id="clickedWindow"></div>
  `

/*
 * Define custom element.
 */
customElements.define('chat-emoji-window',
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

      this.noWindow = this.shadowRoot.querySelector('#noWindow')
      this.clickedWindow = this.shadowRoot.querySelector('#clickedWindow')

      this.noWindow.addEventListener('click', (event) => {
        this.clickedWindow.classList.toggle('showing')
      })

      this.clickedWindow.addEventListener('click', (event) => {
        this.dispatchEvent(new CustomEvent('emoji-clicked', {
          bubbles: true,
          detail: { emoji: event.target.textContent }
        }))
        this.clickedWindow.classList.remove('showing')
      })

      this.appendEmojisToWindow()
    }

    /* connectedCallback () {
      console.log(emojiEmotion[0])
      const pTag = document.createElement('p')
      emojiEmotion.map(x => {
          this.clickedWindow.append(x.emoji)
        })
    } */

    /**
     * Append emojis to emoji window.
     */
    appendEmojisToWindow () {
      for (const emojiObj of emojiEmotion) {
        const pTag = document.createElement('p')
        pTag.append(emojiObj.emoji)
        this.clickedWindow.append(pTag)
      }
    }

    /**
     * Hides expanded window.
     */
    hideEmojiWindow () {
      this.clickedWindow.classList.remove('showing')
    }
  })
