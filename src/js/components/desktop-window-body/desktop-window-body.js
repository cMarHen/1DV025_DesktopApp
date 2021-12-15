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
      
      min-height: 200px;
        min-width: 200px;
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
    
    ::slotted {
      height: 100%;
      width: 100%;
    }
    
</style>

  <div id="window" part="contentWindow" draggable="true">
    <slot name="test2"></slot>
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

      this.windowWrapper = this.shadowRoot.querySelector('#window')
      this.resizeDownLeft = this.shadowRoot.querySelector('#downLeft')
      this.resizeDownRight = this.shadowRoot.querySelector('#downRight')

      this.resizingRight = this.resizingRight.bind(this)
    }

    /**
     * Resizing the window.
     */
    resizingRight () {
      this.windowWrapper.addEventListener('mousemove', (event) => {
        const width = event.offsetX < 200 ? 200 : event.offsetX
        const height = event.offsetY < 200 ? 200 : event.offsetY

        this.windowWrapper.style.width = `${width}px`
        this.windowWrapper.style.height = `${height}px`
      })
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Det här i det omgivande elementet kanske?
      // this.resizeDownRight.addEventListener('dragstart', this.resizingRight)

      this.resizeDownRight.addEventListener('dragend', (event) => {
        this.resizeDownRight.removeEventListener('dragstart', this.resizingRight)
      })

      this.addEventListener('click', (event) => {
        console.log(event.offsetY)
        console.log(event.clientY)
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
