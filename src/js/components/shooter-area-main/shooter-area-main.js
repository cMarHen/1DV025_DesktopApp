/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../shooter-astriod-field'

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

     #navArea {
         display: flex;
         justify-content: space-around;
         align-items: center;
        position: absolute;
        height: 40px;
        width: 70%;
        top: 89%;
     }

     #play {
         height: 70%;
         width: 30%;
         border: 1px solid antiquewhite;
         border-radius: 5px;
         box-shadow: inset 0 0 10px gray;
         outline: none;
     }


   </style>
       <shooter-astroid-field></shooter-astroid-field>

       <div id="navArea">
           <button id="play">NEW GAME</button>
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

      this.playButton = this.shadowRoot.querySelector('#play')
      this.astroidGame = this.shadowRoot.querySelector('shooter-astroid-field')

      this.playButton.addEventListener('click', event => {
        this.astroidGame.startGame(6000)
      })
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'def') {
        console.log()
      }
    }
  }
)
