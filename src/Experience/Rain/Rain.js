export default class Rain
{
    constructor(canvasElement, containerElement)
    {
        this.canvas = canvasElement
        this.container = containerElement

        this.ctx = this.canvas.getContext('2d')

        this.tileSize = 20
        this.fadeFactor = 0.05

        this.columns = []
        this.maxStackHeight

        // throttling for update
        this.lastCall = 0 
        this.delay = 50

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
        // this.ctx.fillStyle = `rgba( ${bg.r} , ${bg.g} , ${bg.b} , ${fadeFactor} )`
        this.ctx.fillStyle = `rgba( 0 , 0 , 0 , ${this.fadeFactor} )`
        this.ctx.fillRect( 0 , 0 , this.canvas.width , this.canvas.height )

        this.ctx.font = (this.tileSize-2)+"px monospace"
        // this.ctx.fillStyle = `rgb( ${fg.r} , ${fg.g} , ${fg.b})`
        this.ctx.fillStyle = `rgb( 0 , 255 , 0 )`
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