import Gliders from './Gliders/Gliders'
import PaperPlanes from './PaperPlanes/PaperPlanes'
import Rain from './Rain/Rain'
import Sizes from './Utilities/Sizes.js'
import Time from './Utilities/Time.js'

let instance = null

export default class Experience
{
    constructor()
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()

        this.rain = new Rain(
            document.getElementById('2d-canvas'),
            document.getElementById('canvas-container')
        )
        this.paperPlanes = new PaperPlanes(
            document.getElementById('webgl-canvas'),
            document.getElementById('webgl-container')
        )
        this.gliders = new Gliders(
            document.getElementById('svg-canvas'),
            document.getElementById('svg-container')
        )

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

    }

    resize()
    {
        this.rain.resize()
        this.gliders.resize()
        this.paperPlanes.resize()
    }

    update()
    {

    }

    destroy()
    {

    }
}
