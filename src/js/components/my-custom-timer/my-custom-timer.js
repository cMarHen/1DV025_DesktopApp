/**
 * The countup-timer web component module.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')

template.innerHTML = `
<style> 
    #timer {
        margin: 0;
        padding: 0;
        color: black;
    }
</style> 

    <p id="timer" part="tickingUp"></p>
`

customElements.define('my-custom-timer',
/**
 * Represents a countup-timer element.
 */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true))

      this.timerTextElement = this.shadowRoot.querySelector('#timer')
    }

    /**
     * On element removal, the timer stops.
     */
    disconnectedCallback () {
      clearInterval(this.timerTickingUp)
    }

    /**
     * Starts timer.
     *
     * @param {number} intervalID - The interval to use in ms.
     * @param {number} decimals - Amount of decimals to use, 0 as default.
     */
    startTimer (intervalID, decimals = 0) {
      const start = Date.now() / 1000

      this.timerTickingUp = setTimeout(function tickingUp () {
        this.counter = (Date.now() / 1000 - start).toFixed(decimals)
        this.timerTextElement.textContent = `${this.counter}`
        this.timerTickingUp = setTimeout(tickingUp.bind(this), intervalID)
      }.bind(this), intervalID)
    }

    /**
     * Stops the timer.
     *
     * @returns {number} - The total time.
     */
    stopTimer () {
      clearTimeout(this.timerTickingUp)
      this.dispatchEvent(new CustomEvent('timeIsUp', {
        bubbles: true,
        detail: { time: this.counter }
      }))

      return Number(this.counter)
    }
  })
