/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../desktop-screen-window'
import '../desktop-navbar'

import '../test-component'

/*
* Define template.
*/
const template = document.createElement('template')
template.innerHTML = `
<style>
    :host {
        display: flex;
        height: 100vh;
        width: 100vw;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: white;
        box-shadow: inset 1px 1px 4px gray;
        position: relative;
    }

    #navWrapper {
        width: 100%;
        height: min-content;
        background: antiquewhite;
        display: flex;
        justify-content: center;
        border-bottom: 2px solid green;
     }

    #windowWrapper {
      position: absolute;
      box-shadow: inset 1px 1px 4px gray;
      border: 2px solid black;
      height: min-content;
    }

    ::part(contentWindow) {
      border-radius: 30px;
    }

    .icon{
      height: 50px;
      width: 50px;
      background: red;
    }

</style>
<div id="navWrapper">
       <desktop-navbar>
         <!-- <test-component class="icon" slot="icon5"></test-component> -->
          <div class="icon" slot="icon1"></div>
          <div class="icon" slot="icon2"></div>
          <div class="icon" slot="icon3"></div>
          <div class="icon" slot="icon4"></div>
       </desktop-navbar>
   </div>
  <desktop-screen-window>
   <p slot="test">Hej</p>
  </desktop-screen-window>

`

/*
* Define custom element.
*/
customElements.define('desktop-screen',
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

      this.windowScreen = this.shadowRoot.querySelector('#emptyWindow')
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
      return ['value']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === newValue) {
        console.log()
      }
    }
  }
)
