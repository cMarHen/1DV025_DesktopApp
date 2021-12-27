/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../shooter-score-counter'
import '../shooter-cannon'
import '../shooter-custom-astroid'
import '../my-custom-timer'

const BRIDGE = (new URL('./images/bridge.jpg', import.meta.url)).href
const BACKGROUND = (new URL('./images/space-bg.jpg', import.meta.url)).href
/*
* Define template.
*/
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      height: 80%;
      width: 80%;
      border: 1px solid antiquewhite;
      border-radius: 4px;
      cursor: crosshair;
      background: url("${BACKGROUND}") no-repeat center;
      background-size: cover;
    }

    @keyframes falling {
        0% {
            transform: translateY(0vh) scale(1%);
            filter: brightness(0.5);
        }
    
        100% {
            transform: translateY(70vh) scale(100%);
            filter:  brightness(1.65);
        } 
    }

    #astroidField {
        height: 100%;
        width: 100%;
        color: white;
        position: relative;
        overflow: hidden;
    }

    #astroidField > * {
        position: absolute;
        left: 75%;
        top: -40px;
        z-index: -10px;
        animation: falling 5s linear;
    }

    #bottomArea {
        display: flex;
        border-top: 1px solid black;
        background-color: yellow;
        height: 60px;
        width: 100%;
        position: relative;
        background: url("${BRIDGE}") no-repeat center;
        background-size: cover;
    }

    #bottomArea #score {
        color: white;
        position: absolute;
        bottom: 90%;
        margin-left: 10px;
    }
    #bottomArea #timer {
        color: white;
        position: absolute;
        bottom: 90%;
        left: 80%;
    }

    #bottomArea shooter-cannon {
      left: 50%;
      bottom: 50px;
      transform-origin: bottom;
      transform: rotateY(20deg)
    }

    ::part(tickingUp) {
      color: white;
      font-size: 1.1em;
      margin-left: 5px;
    }

  </style>
  <div id="astroidField">
  </div>
  <div id="bottomArea">
      <shooter-score-counter id="score"></shooter-score-counter>
      <h3 id="timer">
        <my-custom-timer></my-custom-timer>
      </h3>

      <shooter-cannon></shooter-cannon>
  </div>
`

/*
 * Define custom element.
 */
customElements.define('shooter-astroid-field',
  /**
   * Represents a component.
   */
  class extends HTMLElement {
    #score
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#score = 0

      this.astroidField = this.shadowRoot.querySelector('#astroidField')
      this.scoreBoard = this.shadowRoot.querySelector('#score')
      this.timer = this.shadowRoot.querySelector('#timer')
      this.bottomArea = this.shadowRoot.querySelector('#bottomArea')
      this.shooterCannon = this.shadowRoot.querySelector('shooter-cannon')
      this.tickingUpTimer = this.shadowRoot.querySelector('my-custom-timer')

      // ----- EVENT LISTENERS! -----

      this.astroidField.addEventListener('astroid-shot', (event) => {
        this.#score += 1
        this.scoreBoard.setAttribute('value', this.#score)
      })

      this.astroidField.addEventListener('animationend', (event) => {
        // setInterval on this??
        this.astroidField.innerHTML = ''
        const totalTime = this.tickingUpTimer.stopTimer()
        clearTimeout(this.playTimer)
        this.dispatchEvent(new window.CustomEvent('game-over', {
          bubbles: true,
          detail: {
            score: this.#score,
            time: totalTime
          }
        }))
      })
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      //  this.startGame(5000)
    }

    /**
     * Called when element is removed from the DOM.
     */
    disconnectedCallback () {
      clearTimeout(this.playTimer)
      this.tickingUpTimer.stopTimer()
    }

    /**
     * Starts the game.
     *
     * @param {number} speed - The initiate speed for the astroids.
     */
    startGame (speed) {
      clearTimeout(this.playTimer)

      this.tickingUpTimer.startTimer(10, 2)
      this.astroidField.innerText = ''
      this.#score = 0
      this.scoreBoard.textContent = this.#score

      // For the shooter
      this.addEventListener('mousemove', (event) => {
        const pointerRelToMidX = event.offsetX - this.offsetWidth / 2
        const pointerY = this.offsetHeight - event.offsetY

        this.shooterCannon.movePointer(pointerRelToMidX, pointerY)
      })

      // Set speed for astroids coming.
      this.speedID = speed
      this.playTimer = setTimeout(function play () {
        this.createAstroid(this.speedID)
        this.speedID = this.speedID - 50
        this.playTimer = setTimeout(play.bind(this), 1000)
      }.bind(this), 1000)
    }

    /**
     * Creates an astroid element.
     *
     * @param {number} speed - The speed for the animation.
     */
    createAstroid (speed) {
      const newAstroid = document.createElement('shooter-custom-astroid')
      newAstroid.classList.add('animated')
      newAstroid.style.left = `${Math.floor(Math.random() * 75) + 10}%`
      newAstroid.style.animation = `falling ${speed}ms linear forwards`
      this.astroidField.append(newAstroid)
    }
  }
)
