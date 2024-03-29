export default class Rain
{
    constructor(canvasElement, containerElement)
    {
        this.canvas = canvasElement
        this.container = containerElement

        // throttling for update
        this.lastCall = 0 
        this.delay = 500

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
        // console.log(`Update rain`)
    }
}