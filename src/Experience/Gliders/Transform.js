const degreesToRadians = (degrees) => (degrees * π) / 180
const π = Math.PI
const sin = Math.sin
const cos = Math.cos
const round = Math.round

/**
 * 
 * @param {integer} degrees 
 * @param {[integer, integer]} coordinates 
 * @returns 
 */
export const rotate = (degrees, [x, y]) =>
{
    const φ = degreesToRadians(degrees)
    return [x * cos(φ) - y * sin(φ), x * sin(φ) + y * cos(φ)].map(round)
}

/**
 * 
 * @param {integer} δx 
 * @param {integer} δy 
 * @param {[integer, integer]} coordinates 
 * @returns 
 */
export const translate = (δx, δy, [x, y]) => [x + δx, y + δy]