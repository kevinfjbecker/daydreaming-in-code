export default class Gliders
{
    constructor(svgElement, containerElement)
    {
        this.svg = svgElement
        this.container = containerElement

        this.resize()
    }

    resize()
    {
        const parentStyle = window.getComputedStyle(this.container)

        const width = parseInt(parentStyle.getPropertyValue('width'))
        const height = parseInt(parentStyle.getPropertyValue('height'))

        this.svg.setAttribute('width', width)
        this.svg.setAttribute('height', height)
    }
}