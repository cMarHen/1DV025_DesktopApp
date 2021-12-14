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
    :host {
        margin: 20px;
    }

    #window {
        display: flex;
        height: 300px;
        width: 300px;
        background: white;
    }

    #downRight {
      background-color: red;
      height: 8px;
      width: 8px;
      position: absolute;
      left: 99%;
      top: 99%;
      z-index: 3;
      cursor: nwse-resize;
    }
    #downLeft {
      background-color: red;
      height: 8px;
      width: 8px;
      position: absolute;
      left: -1%;
      top: 99%;
      z-index: 3;
      cursor: nesw-resize;
    }
    
</style>

  <div id="window">
    <div id="downLeft" draggable="true"></div>
    <div id="downRight" draggable="true"></div>
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

      this.window = this.shadowRoot.querySelector('#window')
      this.resizeDownLeft = this.shadowRoot.querySelector('#downLeft')
      this.resizeDownRight = this.shadowRoot.querySelector('#downRight')

      this.resizingRight = this.resizingRight.bind(this)
    }

    /**
     * Resizing the window.
     */
    resizingRight () {
      this.window.addEventListener('dragover', (event) => {
        console.log('hej')
        console.log(event.clientX)
        console.log(event.clientY)
        /* this.window.style.width = `${event.clientX}px`
        this.window.style.height = `${event.clientY}px` */

        event.stopPropagation()
        event.stopImmediatePropagation()
        event.preventDefault()
      })
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.resizeDownRight.addEventListener('dragstart', this.resizingRight)

      this.resizeDownRight.addEventListener('dragend', (event) => {
        this.resizeDownRight.removeEventListener('dragstart', this.resizingRight)
        event.stopPropagation()
        event.stopImmediatePropagation()
        event.preventDefault()
      })
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
