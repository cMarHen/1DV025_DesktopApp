/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

const SHOOTER_BACKGROUND = (new URL('./images/pointer.png', import.meta.url)).href

/*
* Define template.
*/
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 15px;
      height: 70px;
      background: url("${SHOOTER_BACKGROUND}") no-repeat center;
      position: absolute;
    }

  </style>
`

/*
* Define custom element.
*/
customElements.define('shooter-cannon',
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
    }

    /**
     * Set the rotate position for the cannon.
     *
     * @param {number} pointerX - The x-axis value.
     * @param {number} pointerY - The y-axis value.
     */
    movePointer (pointerX, pointerY) {
      const degree = Math.atan2(pointerX, pointerY) * 180 / Math.PI
      this.style.transform = `rotate(${degree}deg)`
    }
  }
)
