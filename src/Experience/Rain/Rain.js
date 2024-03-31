import Experience from '../Experience.js'

export default class Rain
{
    constructor(canvasElement, containerElement)
    {
        this.experience = new Experience()
        this.debug = this.experience.debug

        this.canvas = canvasElement
        this.container = containerElement
        this.ctx = this.canvas.getContext('2d')

        this.bg = { r: 70/256, g: 130/256, b: 180/256 }
        this.fg = { r: 220/256, g: 220/256, b: 220/256 }
        this.fadeFactor = 0.05

        this.tileSize = 24
        this.columns
        this.maxStackHeight

        // throttling for update
        this.lastCall = 0 
        this.delay = 150

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('rain')

            this.debugFolder
                .addColor(this, 'fg')
                .name('foreground')

            this.debugFolder
                .addColor(this, 'bg')
                .name('background')

            this.debugFolder
                .add(this, 'delay')
                .min(0)
                .max(1000)
                .step(5)
            
            this.debugFolder
                .add(this, 'tileSize')
                .min(8)
                .max(48)
                .step(1)
                .onChange(() =>
                {
                    this.initMatrix()
                })
        }

        this.resize()
    }

    resize()
    {
        const parentStyle = window.getComputedStyle(this.container)

        const width = parseInt(parentStyle.getPropertyValue('width'))
        const height = parseInt(parentStyle.getPropertyValue('height'))

        this.canvas.width = width
        this.canvas.height = height

        this.initMatrix()
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

        this.draw()
    }

    draw()
    {
        // draw a semi transparent rectangle on top of the scene to slowly fade older characters
        this.ctx.fillStyle = `rgba( ${256*this.bg.r} , ${256*this.bg.g} , ${256*this.bg.b} , ${this.fadeFactor} )`
        this.ctx.fillRect( 0 , 0 , this.canvas.width , this.canvas.height )

        this.ctx.font = (this.tileSize-2)+"px monospace"
        this.ctx.fillStyle = `rgb( ${256*this.fg.r} , ${256*this.fg.g} , ${256*this.fg.b} )`
        for ( let i = 0;  i < this.columns.length;  ++i )
        {
            // 0 or 1
            const randomCharacter = Math.round(Math.random())
            this.ctx.fillText( randomCharacter , this.columns[i].x , this.columns[i].stackCounter*this.tileSize+this.tileSize )

            // if the stack is at its height limit, pick a new random height and reset the counter
            if ( ++this.columns[i].stackCounter >= this.columns[i].stackHeight )
            {
                this.columns[i].stackHeight = 10+Math.random()*this.maxStackHeight
                this.columns[i].stackCounter = 0
            }
        }
    }

    initMatrix()
    {
        this.columns = []

        this.maxStackHeight = Math.ceil(this.canvas.height/this.tileSize)

        // divide the canvas into columns
        for ( let i = 0;  i < this.canvas.width/this.tileSize; ++i )
        {
            const column = {}
            // save the x position of the column
            column.x = i*this.tileSize
            // create a random stack height for the column
            column.stackHeight = 10+Math.random()*this.maxStackHeight
            // add a counter to count the stack height
            column.stackCounter = 0
            // add the column to the list
            this.columns.push( column )
        }
    }
}