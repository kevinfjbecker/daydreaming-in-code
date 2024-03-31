import Debug from './Utilities/Debug.js'
import Gliders from './Gliders/Gliders.js'
import PaperPlanes from './PaperPlanes/PaperPlanes.js'
import Rain from './Rain/Rain.js'
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
        this.debug = new Debug()
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

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
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
        this.rain.update()
        this.gliders.update()
        this.paperPlanes.update()
    }

    destroy()
    {

    }
}
