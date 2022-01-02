/**
 * The component.
 *
 * @author Martin Henriksson <mh225wd@student.lnu.se>
 * @version 1.1.0
 */

import '../my-custom-button'

/*
* Define template.
*/
const template = document.createElement('template')
template.innerHTML = `
    <style>
  :host {
      display: flex;
      height: 60vh;
      width: 50vw;
      box-shadow: inset 0 0 10px rgba(240, 222, 201, 0.9);
      background: radial-gradient(rgba(240, 222, 201, 0.9), rgba(240, 181, 213, 0.449));
      flex-direction: column;
  }

  #tabWrapper {
    display: flex;
    justify-content: center;
  }

  ::part(buttonArea) {
    border-radius: 0 0 5px 5px;
    width: 130px;
  }

  .notHidden {
    display: flex !important;
  }

  .olWrapper {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  #shooter, #memory {
      height: 30vh;
      width: 20vw;
  }

  h4 {
    border-left: 1px solid black;
      border-right: 1px solid black;
      padding: 0 20px 0 20px;
  }

  ol {
      padding-top: 20px;
  }

  li {
      font-size: 0.8rem;
      list-style: upper-roman;
      padding: 4px 6px;
      margin-left: 20px; 
  }
 
    </style>
    <div id="tabWrapper">
      <my-custom-button id="memoryButton" class="tab" name="olMemory">Memory Game</my-custom-button>
      <my-custom-button id="shooterButton" class="tab" name="olShooter">Astroid Shooter</my-custom-button>
    </div> 
  <div class="wrapper">
      <div class="olWrapper notHidden">
         <h4>This is the page for all highscores. Choose a game to inspect.</h4>
     </div>
     <div class="olWrapper" id="olShooter">
         <h4>Astroid Shooter</h4>
         <ol id="shooter"></ol>
     </div>
     <div class="olWrapper" id="olMemory">
         <h4>Memory Game</h4>
         <ol id="memory"></ol>
     </div>
   </div>

    
  `

/*
* Define custom element.
*/
customElements.define('my-highscore-component',
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

      this.tabWrapper = this.shadowRoot.querySelector('#tabWrapper')

      this.updateHighscore()

      this.tabWrapper.addEventListener('clicked', (event) => {
        Array.from(this.shadowRoot.querySelectorAll('.olWrapper')).map(x => x.classList.remove('notHidden'))
        this.shadowRoot.querySelector(`#${event.target.name}`).classList.add('notHidden')
      })
    }

    /**
     * When called, sort the wanted score on type.
     *
     * @param {object[]} data - The data to sort.
     * @param {string} type - Type of sorting.
     * @returns {object[]} - The sorted data.
     */
    sortHighscore (data, type) {
      if (type === 'descending') {
        return data.sort((a, b) => Object.values(b)[0].time - Object.values(a)[0].time)
          .slice(0, 5)
      }

      if (type === 'ascending') {
        return data.sort((a, b) => Object.values(a)[0].time - Object.values(b)[0].time)
          .slice(0, 5)
      }
    }

    /**
     * Updates highscore for a memory game and a shooter game.
     */
    updateHighscore () {
      if (!localStorage.highscore) { return }

      this.shadowRoot.querySelector('#memory').innerText = ''
      this.shadowRoot.querySelector('#shooter').innerText = ''

      const data = JSON.parse(localStorage.highscore).flat()

      this.memoryData = []
      this.shooterData = []

      for (const key of Object.values(data)) {
        if (Object.keys(key)[0] === 'memory') {
          this.memoryData.push(key)
        }

        if (Object.keys(key)[0] === 'shooter') {
          this.shooterData.push(key)
        }
      }

      this.memoryData = this.sortHighscore(this.memoryData, 'ascending')
        .map(obj => this.appendToDom(obj, 'memory'))

      this.shooterData = this.sortHighscore(this.shooterData, 'descending')
        .map(obj => this.appendToDom(obj, 'shooter'))
    }

    /**
     * Append to highscore list.
     *
     * @param {object} obj - The element to append.
     * @param {string} type - The game for highscore element.
     */
    appendToDom (obj, type) {
      const liElement = document.createElement('li')
      liElement.textContent = `${Object.values(obj)[0].username} : ${Object.values(obj)[0].time}`
      this.shadowRoot.querySelector(`#${type}`).append(liElement)
    }
  }
)
