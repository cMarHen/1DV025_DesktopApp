
import '../memory-flipping-tile'

const THUMBS_UP = new URL('./images/thumbs-up.png', import.meta.url).href

const template = document.createElement('template')
template.innerHTML = `
<style>
    :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        flex-wrap: wrap;
    }

    :host([hidden]) {
      visibility: hidden;
    }

    #mainArea {
        display: grid;
        justify-content: center;
        padding: 5px;
        gap: 20px 4px;
        position: relative;
        overflow: hidden;
        height: min-content;
    }

    #mainArea > * {
        display: flex;
        justify-self: center;
        align-items: center;
    }

    #winDiv {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      height: 100%;
      width: 100%;
    }

    #thumbsUp {
      height: 30vh;
      width: 20vw;
      background-image: url(${THUMBS_UP});
      background-size: 60%;
      background-repeat: no-repeat;
      background-position: center;
    }
    flipping-tile::part(card) {
        height: 14vh;
        width: 6vw;
        margin: 0;
    }
    flipping-tile::part(back) {
        background-size: 50%;
        background-color: yellow;
    }

</style>
    <div id="mainArea">
      
    </div>

  <template id="playAgain">
    <div id="winDiv">
      <h3 id="winHeadline">Well done! Select a difficulty level and try again.</h3>
      <div id="thumbsUp"></div>
    </div>
  </template>

`

customElements.define('memory-area',
/**
 * Represents a memory-area component.
 */
  class extends HTMLElement {
    #frontImages
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .append(template.content.cloneNode(true))

      this.#frontImages = new Array(9)

      this.mainArea = this.shadowRoot.querySelector('#mainArea')
      this.createGrid(4, 4)

      // -----------------
      // EVENT LISTENERS
      // -----------------
      this.compareContainer = []
      this.mainArea.addEventListener('flipping-tile:flipped', this.onFlippedEvent.bind(this))
    }

    /**
     * Check gameboard and flipped tiles.
     *
     * @param {*} event - The event.
     */
    onFlippedEvent (event) {
      if (this.compareContainer.length >= 2) {
        event.target.removeAttribute('flipped')
      } else {
        this.compareContainer.push(event.target)
      }

      if (this.compareContainer.length === 2) {
        this.tileIsEqual(this.compareContainer[0], this.compareContainer[1])
        this.compareContainer = []
      }

      event.preventDefault()
      event.stopPropagation()
    }

    /**
     * Compares two tiles if matching.
     *
     * @param {*} tile1 First tile.
     * @param {*} tile2 Second tile.
     */
    tileIsEqual (tile1, tile2) {
      setTimeout(() => {
        // Check if innerHTML is equal, but not the id.
        if ((tile1.isEqual(tile2)) && !(tile1.isEqualNode(tile2))) {
          tile1.setAttribute('hidden', '')
          tile2.setAttribute('hidden', '')
          this.dispatchEvent(new window.CustomEvent('match', {
            bubbles: true
          }))
        } else {
          tile1.removeAttribute('flipped')
          tile2.removeAttribute('flipped')
          this.dispatchEvent(new window.CustomEvent('noMatch', {
            bubbles: true
          }))
        }
        this.checkIfAllMatch()
      }, 1000)
    }

    /**
     * Check if all the tiles are matched.
     */
    checkIfAllMatch () {
      const tiles = this.shadowRoot.querySelectorAll('flipping-tile')
      const hiddenTiles = this.shadowRoot.querySelectorAll('flipping-tile[hidden]')
      if (tiles.length === hiddenTiles.length) {
        this.dispatchEvent(new CustomEvent('all-matched', {
          bubbles: true
        }))
        const template = this.shadowRoot.querySelector('#playAgain')

        // Append a play again-scene.
        this.mainArea.innerText = ''
        this.mainArea.append(template.content.cloneNode(true))
      }
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['difficulty']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'difficulty') {
        this.mainArea.innerText = ''

        switch (newValue) {
          case 'easy':
            this.createGrid(2, 2)
            break
          case 'medium':
            this.createGrid(4, 2)
            break
          default:
            this.createGrid(4, 4)
            break
        }
      }
    }

    /**
     * Creates a grid for main area.
     *
     * @param {*} column The amount of columns.
     * @param {*} row The amount of rows.
     */
    createGrid (column, row) {
      if ((column * row) % 2 !== 0) { return }

      this.mainArea.style.gridTemplateColumns = `repeat(${column}, 8vw)`
      this.mainArea.style.gridTemplateRows = `repeat(${row}, 13vh)`

      let i = 0
      for (const tile of this.createTileArray(column * row)) {
        tile.id = i
        this.mainArea.append(tile)
        i++
      }
    }

    /**
     * Creates a node list of memory tiles.
     *
     * @param {number} tiles Wanted amount of tiles.
     * @returns {object[]} A node list.
     */
    createTileArray (tiles) {
      this.createImageArray(tiles / 2)
      const arrOfTiles = []
      const randomIndexArray = this.randomIndexArray(tiles / 2)

      for (let i = 0; i < tiles; i++) {
        const newTile = document.createElement('flipping-tile')
        const imgElement = document.createElement('img')

        imgElement.setAttribute('src', this.#frontImages[randomIndexArray[i]])
        newTile.append(imgElement)
        arrOfTiles.push(newTile)
      }
      return arrOfTiles
    }

    /**
     * Creates an array with image elements.
     *
     * @param {number} pairs Amount of pairs.
     */
    createImageArray (pairs) {
      this.#frontImages = new Array(pairs)

      for (let i = 1; i <= pairs; i++) {
        const url = ((new URL(`./images/front-images/${i}.png`, import.meta.url)).href)
        this.#frontImages[i - 1] = url
      }
    }

    /**
     * Creates an array of random numbers doubled.
     *
     * @param {number} indexes - Wanted amount of index.
     * @returns {number[]} - An array with shuffled numbers.
     */
    randomIndexArray (indexes) {
      // Duplicate the indexes.
      const arr = [...Array(indexes).keys()].concat([...Array(indexes).keys()])

      for (let i = 0; i < arr.length; i++) {
        const randomIndex = Math.floor(Math.random() * (arr.length - 1)) + 1
        const container = arr[0]
        arr[0] = arr[randomIndex]
        arr[randomIndex] = container
      }
      return arr
    }
  })
