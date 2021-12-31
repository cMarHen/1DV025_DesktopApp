/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../shooter-astriod-field'
import '../my-custom-button'

const COMMAND_BRIDGE = (new URL('./images/command-bridge.jpg', import.meta.url)).href

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
       height: 100%;
       width: 100%;
       min-width: 50vw;
       min-height: 75vh;
       padding: 6px;
       border: 1px solid black;
       background: url("${COMMAND_BRIDGE}") no-repeat center;
       background-size: cover;
       position: relative;
     }

     #gameoverWindow {
       display: none;
     }

     .messageWindow {
       position: absolute;
       z-index: 1;
       height: 70%;
       width: 70%;
       display: flex;
       background: black;
       box-shadow: inset 0 0 20px white;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       color: white;
     }

     .messageWindow p {
       margin: 10px 20px 10px 20px;
     }

     .messageWindow h2 {
      font-size: 1.8rem;
     }

     ::part(buttonText) {
      color: gray;
     }


   </style>
       <shooter-astroid-field></shooter-astroid-field>

       <div id="introWindow" class="messageWindow">

          <h2>Welcome to Astroid Shooter! </h2>

          <p>You are on an important mission, but your starship got stuck in an astroid field.</p>
          <p>Aim on the astroids, and shoot them down. They are coming faster and faster.</p>
          <p>The possibility of successfully navigating an asteroid field is approximately three thousand seven hundred and twenty to one.</p>
          <my-username-input type="shooter">PLAY</my-username-input>
       </div>

       <div id="gameoverWindow" class="messageWindow">

          <h2>YOUR STARSHIP GOT DESTROYED! </h2>

          <p id="resultText"></p>
          <p>Reload the engines and try again.</p>
          <p>Remember, The possibility of successfully navigating an asteroid field is approximately three thousand seven hundred and twenty to one.</p>
          <my-custom-button>PLAY</my-custom-button>
       </div>
 `

/*
* Define custom element.
*/
customElements.define('shooter-area-main',
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

      this.messageWindow = this.shadowRoot.querySelector('.messageWindow')
      this.astroidGame = this.shadowRoot.querySelector('shooter-astroid-field')
      this.introWindow = this.shadowRoot.querySelector('#introWindow')
      this.gameoverWindow = this.shadowRoot.querySelector('#gameoverWindow')
      this.resultText = this.shadowRoot.querySelector('#resultText')
      this.playAgainButton = this.shadowRoot.querySelector('#playAgainButton')

      // On username set
      // this.addEventListener('username-set', this.startGame)

      // Play again-button
      this.addEventListener('clicked', this.startGame)

      this.astroidGame.addEventListener('game-over', (event) => {
        this.resultText.textContent = ''
        this.gameoverWindow.style.display = 'flex'
        const str = `Your shot down ${event.detail.score} astroids, and it took ${event.detail.time}s to massacre you.`
        this.resultText.append(str)
      })
    }

    /**
     * Starts game.
     *
     * @param {*} event - The event.
     */
    startGame (event) {
      console.log('stARTED')
      this.introWindow.style.display = 'none'
      this.gameoverWindow.style.display = 'none'
      this.astroidGame.startGame(6000)
    }
  }
)
