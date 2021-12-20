/**
 * A memory application component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../memory-area'
import '../my-custom-timer'

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
    }

    #levelChoice {
      height: 10%;
        margin: 3px 0 0 0;
    }

    #levelChoice button {
        padding: 5px 10px;
        margin: 4px;
    }

    #appArea {
        height: 100%;
        overflow: hidden;
        width: 100%;
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
        border-left: 1px solid gray;
        padding-left: 10px;
        display: inherit;
    }

    ::part(tickingUp) {
      color: #4E3B3B;
      font-size: 1.1em;
      margin-left: 5px;
    }

</style>
<div id="levelChoice">
    <button name="easy">EASY</button>
    <button name="medium">MEDIUM</button>
    <button name="hard">HARD</button>
</div>
<div id="appArea">
    <memory-area hidden></memory-area>
</div>
<div id="bottomArea">
      <h5>Tries: <span id="tryCounter">0</span>
  </h5>
      <h5>Points: <span id="pointCounter">0</span>
  </h5>
      <h5>TIME: <span id="timeCounter"> <my-custom-timer></my-custom-timer></span>
  </h5>
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
     * How many points the player should be given for each match
     */
    #pointsPerMatch
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#pointsPerMatch = 10

      this.levelChoice = this.shadowRoot.querySelector('#levelChoice')
      this.appArea = this.shadowRoot.querySelector('#appArea')
      this.memoryArea = this.shadowRoot.querySelector('memory-area')
      this.pointCounter = this.shadowRoot.querySelector('#pointCounter')
      this.tryCounter = this.shadowRoot.querySelector('#tryCounter')
      this.timeCounter = this.shadowRoot.querySelector('#timeCounter')
      this.tickingUpTimer = this.shadowRoot.querySelector('my-custom-timer')

      // -----------------
      // EVENT LISTENERS
      // -----------------

      this.levelChoice.addEventListener('click', (event) => {
        if (event.target.name) {
          this.memoryArea.setAttribute('difficulty', event.target.name)
          this.memoryArea.removeAttribute('hidden')
          this.tickingUpTimer.startTimer(10, 2)
        }
      })

      this.memoryArea.addEventListener('match', (event) => {
        this.updateScoreMatch()
      })
      this.memoryArea.addEventListener('noMatch', (event) => {
        this.updateScoreNomatch()
      })
    }

    /**
     * Updates the score counter.
     */
    updateScoreMatch () {
      this.pointCounter.textContent = Number(this.pointCounter.textContent) + 10

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
  })
