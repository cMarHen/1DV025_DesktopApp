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
      height: 100%;
      width: 100%;
      box-shadow: inset 0 0 10px rgba(158, 166, 217, 0.9);
      background: radial-gradient(rgba(240, 222, 201, 0.9), rgba(240, 181, 213, 0.449));
      flex-direction: column;
  }

  #tabWrapper {
    display: flex;
    justify-content: center;
  }

  ::part(buttonArea) {
    border-radius: 0 0 10px 10px;
    width: 130px;
  }

  .wrapper {
    display: flex;
    padding: 0 0 25px 0;
    justify-content: center;
  }

  .notHidden {
    display: flex !important;
  }

  .olWrapper {
      display: none;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      height: 60vh;
      width: 50vw;
      max-height: 100%;
      max-width: 100%;
  }

  .olHighscore {
      display: flex;
      flex-direction: column;
      align-items: center;      
      box-shadow: inset 0 0 10px rgba(110, 93, 37, 0.8);
      padding: 0;
      height: 30vh;
      width: 30%;
      min-width: 200px;
      margin-top: 15px;
  }

  ol {
      padding: 0 15px 0 15px;
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
    <!-- First page -->
      <div class="olWrapper notHidden">
         <h4>This is the page for all highscores. Choose a game to inspect.</h4>
     </div>

     <!-- Shooter page -->
     <div class="olWrapper" id="olShooter">
         <ol id="shooter"></ol>
     </div>

     <!-- Memory page -->
     <div class="olWrapper" id="olMemory">
        <div class="olHighscore">
          <h5>Easy</h5>
          <ol id="easy"></ol>
        </div>

        <div class="olHighscore">
          <h5>Medium</h5>
          <ol id="medium"></ol>
        </div>

        <div class="olHighscore">
          <h5>Hard</h5>
          <ol id="hard"></ol>
        </div>
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
      }

      if (type === 'ascending') {
        return data.sort((a, b) => Object.values(a)[0].time - Object.values(b)[0].time)
      }
    }

    /**
     * Updates highscore for a memory game and a shooter game.
     */
    updateHighscore () {
      if (!localStorage.highscore) { return }

      this.shadowRoot.querySelector('ol').innerText = ''

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
        .map(obj => this.appendToDom(obj, Object.values(obj)[0].difficulty))

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
      const element = this.shadowRoot.querySelector(`#${type}`)

      const liElement = document.createElement('li')
      liElement.textContent = `${Object.values(obj)[0].username} : ${Object.values(obj)[0].time}`

      if (element.childNodes.length < 5) {
        element.append(liElement)
      }
    }
  }
)
