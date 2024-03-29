export default class Gliders
{
    constructor(svgElement, containerElement)
    {
        this.svg = svgElement
        this.container = containerElement

        // throttling for update
        this.lastCall = 0 
        this.delay = 1000

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

    update()
    {
        // throttling
        const now = Date.now()
        if(now - this.lastCall < this.delay)
        {
            return
        }
        this.lastCall = now

        // do stuff
        // console.log(`Update gliders`)
    }
}