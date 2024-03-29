export default class Rain
{
    constructor(canvasElement, containerElement)
    {
        this.canvas = canvasElement
        this.container = containerElement

        this.resize()
    }

    resize()
    {
        const parentStyle = window.getComputedStyle(this.container)

        const width = parseInt(parentStyle.getPropertyValue('width'))
        const height = parseInt(parentStyle.getPropertyValue('height'))

        this.canvas.width = width
        this.canvas.height = height
    }
}