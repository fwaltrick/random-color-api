const generateBtn = document.getElementById('generate-btn')
const hexValueSpan = document.getElementById('hex-value')
const rgbValueSpan = document.getElementById('rgb-value')
const hslValueSpan = document.getElementById('hsl-value')
const colorValuesBox = document.getElementById('color-values')
const toastNotification = document.getElementById('toast-notification')
const root = document.documentElement

// API endpoint to fetch a random color
const API_URL = '/api/random-color'

// Array of button labels to cycle through when generating a new color
const labelOptions = [
  'LET ME PICK A COLOR FOR YOU',
  'NOT FEELING IT?',
  'STILL NOT THE ONE?',
  'ONE MORE TRY?',
  'TRUST ME, THIS NEXT ONE’S BETTER',
  'HMM… YOU’RE PICKY. I LIKE THAT',
  'I’M NOT GIVING UP ON YOU!',
  'OK, NOW I’M SERIOUS',
  'WHAT ABOUT THIS ONE?',
]
let currentLabelIndex = 0

// Set the initial state of the UI
const setInitialState = () => {
  const initialColor = {
    hex: '#000000',
    rgb: [0, 0, 0],
    hsl: [0, 0, 0],
  }
  generateBtn.textContent = labelOptions[0]
  updateUI(initialColor)
}

// Fetches a new color from the API and triggers a UI update
const fetchColor = async () => {
  updateButtonLabel()
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    const data = await response.json()
    updateUI(data)
  } catch (error) {
    console.error('Failed to fetch color:', error)
    alert('Error connecting to API.')
  }
}

// Updates the UI with the provided color data.
// @param {object} colorData - The color object from the API { hex<string>, rgb<string[]>, hsl<string[]> }
const updateUI = (colorData) => {
  const { hex, rgb, hsl } = colorData

  hexValueSpan.textContent = hex.toUpperCase()
  rgbValueSpan.textContent = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`
  hslValueSpan.textContent = `${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%`

  root.style.setProperty('--theme-color', hex)
}

// Cycles through the labelOptions array and updates the button text when it is clicked.
// When the array is exhausted, it loops back to the start (use of modulus operator).
const updateButtonLabel = () => {
  currentLabelIndex = (currentLabelIndex + 1) % labelOptions.length
  generateBtn.textContent = labelOptions[currentLabelIndex]
}

// Handles the copy action when the color values box is clicked.
// It formats the text to be copied and uses the Clipboard API to copy it.
const handleCopy = () => {
  const hex = `HEX: ${hexValueSpan.textContent}`
  const rgb = `RGB: ${rgbValueSpan.textContent}`
  const hsl = `HSL: ${hslValueSpan.textContent}`

  // formats the text to be copied with line breaks
  const textToCopy = `${hex}\n${rgb}\n${hsl}`

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      // Show a toast notification to indicate success
      showToast()
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err)
    })
}

// Displays a toast notification at the bottom of the screen for 2 seconds.
const showToast = () => {
  toastNotification.classList.add('show')

  setTimeout(() => {
    toastNotification.classList.remove('show')
  }, 2000)
}

// Initilize
setInitialState()
generateBtn.addEventListener('click', fetchColor)
colorValuesBox.addEventListener('click', handleCopy)
