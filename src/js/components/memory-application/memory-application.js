/**
 * A memory application component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../memory-area'
import '../my-custom-timer'
import '../my-username-input'
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
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 100%;
        box-shadow: 0 0 9px gray;
        background-color: rgba(255, 255, 255, 0.432);
        position: relative;
    }

    #appArea {
        height: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
        width: 100%;
        min-width: 500px;
        min-height: 400px;
    }

    memory-area {
      height: 100%;
    }

    #bottomArea {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        width: 100%;
        margin: 10px 0 0 0;
        border-top: 1px solid rgba(85, 72, 29, 0.35);
        box-shadow: 0 -3px 7px rgba(199, 178, 110, 0.8);
    }

    #bottomArea h5 {
      display: flex;
        border-left: 1px solid gray;
        padding-left: 10px;
        margin: 0;
        width: 60px;
        display: inherit;
    }

    ::part(tickingUp) {
      color: #4E3B3B;
      font-size: 1.1em;
      margin-left: 5px;
    }
    
    #levelChoice {
      display: none;
      height: 10%;
        margin: 3px 0 0 0;
    }

    ::part(buttonArea) {
        height: 35px;
        width: 70px;
        border-radius: 15px;
        margin: 2px;
        background: radial-gradient(circle, rgba(164,232,227,1) 17%, rgba(125,199,198,1) 75%);
    }

    #intro {
      padding: 15px;
      border-radius: 4px;
      box-shadow: inset 0 0 5px gray;
      position: absolute;
      top: 30px;
    }

</style>
<div id="appArea">
    <memory-area hidden></memory-area>
</div>


<div id="bottomArea">
      <h5>Tries: <span id="tryCounter">0</span></h5>

      <h5>TIME: <span id="timeCounter"> <my-custom-timer></my-custom-timer></span></h5>
</div>

<!-- Used before the game starts -->
<div id="intro">
  <div id="usernameInput">
    <h4>Username:</h4>
    <my-username-input type="memory">SEND</my-username-input>
  </div>

  <div id="levelChoice">
    <my-custom-button name="easy">Easy</my-custom-button>
    <my-custom-button name="medium">Medium</my-custom-button>
    <my-custom-button name="hard">Hard</my-custom-button>
  </div>
</div>
`

/*
* Define custom element.
*/
customElements.define('memory-application',
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

      this.levelChoice = this.shadowRoot.querySelector('#levelChoice')
      this.appArea = this.shadowRoot.querySelector('#appArea')
      this.memoryArea = this.shadowRoot.querySelector('memory-area')
      this.tryCounter = this.shadowRoot.querySelector('#tryCounter')
      this.timeCounter = this.shadowRoot.querySelector('#timeCounter')
      this.tickingUpTimer = this.shadowRoot.querySelector('my-custom-timer')
      this.usernameInput = this.shadowRoot.querySelector('#usernameInput')
      this.introDiv = this.shadowRoot.querySelector('#intro')

      this.setDifficulty = this.setDifficulty.bind(this)
      this.startGame = this.startGame.bind(this)

      // -----------------
      // EVENT LISTENERS
      // -----------------

      this.usernameInput.addEventListener('username-set', (event) => {
        this.username = event.detail.username
        this.setDifficulty()
      })

      this.memoryArea.addEventListener('match', (event) => {
        this.updateScoreMatch()
      })
      this.memoryArea.addEventListener('noMatch', (event) => {
        this.updateScoreNomatch()
      })

      this.memoryArea.addEventListener('all-matched', (event) => {
        this.totalTime = this.tickingUpTimer.stopTimer()
        this.setToStorage()
        this.introDiv.style.display = 'block'
        this.setDifficulty()
      })
    }

    /**
     * Difficulty on user input.
     */
    setDifficulty () {
      this.usernameInput.style.display = 'none'
      this.levelChoice.style.display = 'flex'
      this.levelChoice.addEventListener('clicked', this.startGame)
    }

    /**
     * Starts game.
     *
     * @param {object} event - The event.
     */
    startGame (event) {
      if (event.target.name) {
        this.levelChoice.style.display = 'none'
        this.introDiv.style.display = 'none'
        this.difficulty = event.target.name

        this.memoryArea.setAttribute('difficulty', this.difficulty)
        this.memoryArea.removeAttribute('hidden')
        this.tickingUpTimer.startTimer(10, 2)
      }
    }

    /**
     * Updates the score counter.
     */
    updateScoreMatch () {
      this.tryCounter.textContent = Number(this.tryCounter.textContent) + 1
    }

    /**
     * Updates the try counter.
     */
    updateScoreNomatch () {
      const tryCounter = this.shadowRoot.querySelector('#tryCounter')
      tryCounter.textContent = tryCounter.textContent
        ? Number(tryCounter.textContent) + 1
        : 1
    }

    /**
     * Set result to local storage.
     */
    setToStorage () {
      const data = []

      // Push current quiz highscore to array.
      if (window.localStorage.highscore) {
        data.push(JSON.parse(window.localStorage.highscore).flat())
      }

      data.push({
        memory: {
          username: this.username,
          time: this.totalTime,
          difficulty: this.difficulty
        }
      })
      window.localStorage.setItem('highscore', JSON.stringify(data))

      this.dispatchEvent(new CustomEvent('highscore-update', {
        bubbles: true,
        detail: { name: 'memory', type: 'ascending' }
      }))
    }
  })
