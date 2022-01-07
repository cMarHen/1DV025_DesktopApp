/**
 * Representing flipping-tile component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.0.0
 */

const LNU_SYMBOL = (new URL('./images/lnu-symbol.png', import.meta.url)).href

const template = document.createElement('template')
template.innerHTML = `
<style>
    :host {
        display: flex;
        justify-content: center;  
        position: relative;
        margin: 5px;
    }

    :host([flipped]) #cardContainer {
        transform: rotateY(180deg);
    }

    :host([hidden]) #cardContainer {
      cursor: default;
      border: 1px dashed gray;
      box-shadow: none;
      outline: none;
    }

    :host([hidden]) #cardContainer > *{
      visibility: hidden;
    }

    :host([inactive]) #cardContainer{
      opacity: 0.5;
      cursor: default;
    }

    #cardContainer:focus {
      box-shadow: 2px 4px 6px black;
      outline: 1px ridge gray;
    }

    #cardContainer {
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent; 
      border: 1px solid black;
      width: 100px;
      height: 150px;
      transition: 700ms;
      transform-style: preserve-3d;
    }

    #frontSide, #backSide {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      backface-visibility: hidden;
      background-color: white;
      border-radius: 10px;
      box-shadow: inset 0 0 0 5px white, inset 0 0 0 6px black;
    }

    #frontSide {
        transform: rotateY(180deg);
    }

    #backSide {
      background-image: url(${LNU_SYMBOL});
      background-size: 80%;
      background-repeat: no-repeat;
      background-position: center;
    }

    slot {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 100%;
        max-height: 100%;
    }

    slot > *, ::slotted(img) {
        max-width: 80%;
        max-height: 80%;
    }

    
</style>

<button part="card" id="cardContainer">
  <div part="back" id="backSide"></div>
  <div part="front" id="frontSide">
      <slot></slot>
  </div>
</button>

`

customElements.define('flipping-tile',
/**
 * Represents a flipping-tile component.
 */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true))

      this.cardContainer = this.shadowRoot.querySelector('#cardContainer')
      this.frontSide = this.shadowRoot.querySelector('#frontSide')
      this.backSide = this.shadowRoot.querySelector('#backSide')

      this.addEventListener('click', (event) => {
        this.flipCard()
      })
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['flipped', 'inactive', 'hidden']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'flipped' &&
        (this.hasAttribute('inactive') || this.hasAttribute('hidden'))) {
        this.removeAttribute('flipped')
      } else {
        this.dispatchEvent(new window.CustomEvent('flipped', {
          bubbles: true,
          detail: { faceUp: this.hasAttribute('flipped') }
        }))
      }
    }

    /**
     * Specifies whether this instance contains the same content as another tile.
     *
     * @param {HTMLElement} other - The tile to test for equality
     * @returns {boolean} true if other has the same content as this tile instance.
     */
    isEqual (other) {
      return this.innerHTML === other.innerHTML
    }

    /**
     * Flipping the card.
     */
    flipCard () {
      if (this.hasAttribute('disabled') || this.hasAttribute('hidden')) { return }

      this.setAttribute('flipped', '')
      this.dispatchEvent(new window.CustomEvent('flipping-tile:flipped', {
        bubbles: true,
        detail: { faceUp: this.hasAttribute('flipped') }
      }))
    }
  })
