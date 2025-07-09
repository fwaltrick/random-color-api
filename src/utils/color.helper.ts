import convert from 'color-convert'

const randomInt = (): number => Math.floor(Math.random() * 256)

// Generate a random color in RGB format and convert it to HEX and HSL formats
export const getRandomColorFormats = () => {
  const r = randomInt()
  const g = randomInt()
  const b = randomInt()
  const rgbArray: [number, number, number] = [r, g, b]

  // Color convert library is used to convert RGB to HEX and HSL
  const hex = convert.rgb.hex(rgbArray)
  const hslArray = convert.rgb.hsl(rgbArray)

  // Return the final object
  return {
    hex: '#' + hex,
    rgb: rgbArray,
    hsl: hslArray,
  }
}
