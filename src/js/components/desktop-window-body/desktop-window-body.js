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
      
    }

    #window {
        display: flex;
        height: 100%;
        width: 100%;
        background: white;
        overflow: hidden;
    }

    #downRight {
      background-color: red;
      height: 8px;
      width: 8px;
      position: absolute;
      left: 97%;
      top: 96%;
      z-index: 3;
      cursor: nwse-resize;
    }
    #downLeft {
      background-color: red;
      height: 8px;
      width: 8px;
      position: absolute;
      left: 4px;
      top: 96%;
      z-index: 3;
      cursor: nesw-resize;
    }
    
    /* ::slotted(*) {
      height: 80px;
      width: 100%;
    } */
    
</style>

  <div id="window" part="contentWindow">
    <slot name="app"></slot>
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

      this.resizingRightStart = this.resizingRightStart.bind(this)
      this.resizingRight = this.resizingRight.bind(this)
    }

    /**
     * Resizing the window.
     */
    resizingRightStart () {
      this.addEventListener('dragover', this.resizingRight)
    }

    /**
     * Resizing the window.
     *
     * @param {*} event - The event.
     */
    resizingRight (event) {
      console.log(event.offsetY)
      this.windowWrapper.style.width = `${event.offsetX + 7}px`
      this.windowWrapper.style.height = `${event.offsetY + 7}px`
      event.stopPropagation()
      event.preventDefault()
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Det här i det omgivande elementet kanske?
      this.resizeDownRight.addEventListener('dragstart', this.resizingRightStart)

      this.resizeDownRight.addEventListener('dragend', (event) => {
        this.removeEventListener('dragover', this.resizingRight)
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
