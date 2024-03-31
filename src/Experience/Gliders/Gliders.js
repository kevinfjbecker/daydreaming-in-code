import * as d3 from 'd3'
import Dropper from './Dropper.js'
import Experience from '../Experience.js'

export default class Gliders
{
    constructor(svgElement, containerElement)
    {
        // Experience
        this.experience = new Experience()
        this.debug = this.experience.debug

        // Components
        this.dropper = new Dropper()

        // Container
        this.svg = d3.select(svgElement)
        this.container = containerElement

        // dots
        this.circleRadius = 8
        this.circleMargin = 2
        this.squareSide = (this.circleRadius + this.circleMargin) * 2
        this.glider = new Set(['-1,-1', '0,-1', '1,-1', '1,0', '0,1']) // https://conwaylife.com/wiki/Glider

        // throttling for update
        this.lastCall = 0 
        this.delay = 1000

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('gliders')

            this.debugFolder
                .add(this, 'delay')
                .min(0)
                .max(1000)
                .step(5)
        }

        // Resize
        this.resize()

        // Grid
        this.width
        this.height
        this.grid = this.svg
            .append('g')
            .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
        
        this.grid
            .selectAll('circle')
            .data([...this.glider].map((d) => d.split(',')))
            .join('circle') // todo
                .attr('cx', (d) => d[0] * this.squareSide)
                .attr('cy', (d) => d[1] * this.squareSide)
                .attr('r', this.circleRadius)
                .style('fill', 'white')
    }

    resize()
    {
        const parentStyle = window.getComputedStyle(this.container)

        this.width = parseInt(parentStyle.getPropertyValue('width'))
        this.height = parseInt(parentStyle.getPropertyValue('height'))

        this.svg.attr('width', this.width)
        this.svg.attr('height', this.height)
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

        // console.log([...this.glider].map((d) => d.split(',')))
    }

}
