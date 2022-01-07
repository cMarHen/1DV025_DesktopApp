/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

/*
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
   <style>
    #window {
        display: flex;
        height: 100%;
        width: 100%;
        background: white;
        resize: both;
        overflow: hidden;
    }

    .fullscreen {      
      height: 98vh !important;
        width: 100vw !important;
    }

    ::-webkit-resizer {
      display: none;
    }

</style>

  <div id="window" part="contentWindow">
    <slot name="app"></slot>
  </div>
 `

/*
 * Define custom element.
 */
customElements.define('desktop-window-body',
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

      this.windowWrapper = this.shadowRoot.querySelector('#window')
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['fullscreen']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'fullscreen') {
        this.windowWrapper.classList.toggle('fullscreen')
      }
    }
  }
)
