import * as d3 from 'd3'
import { combine } from './SetArrayUtility.js'
import Dropper from './Dropper.js'
import Experience from '../Experience.js'
import Dimensions from './Dimensions.js'
import { glider } from './Dots.js'
import { tick } from './GameOfLife.js'

export default class Gliders
{
    constructor(svgElement, containerElement)
    {
        // Experience
        this.experience = new Experience()
        this.debug = this.experience.debug

        // Components
        this.dimensions = new Dimensions()
        this.dropper = new Dropper(this.dimensions)

        // Container
        this.container = containerElement

        // SVG
        this.svg = d3.select(svgElement)
        this.grid = this.svg.append('g')

        // dots
        this.fill = '#fff'
        this.stroke = '#4f4f4f'
        this.dimensions.circleRadius = 8
        this.dimensions.circleMargin = 2
        
        this.alive = []
        this.gliderCount = 4

        // throttling for update
        this.lastCall = 0 
        this.delay = 200

        this.resize() // calculate initial dimensions

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('gliders')

            this.debugFolder
                .addColor(this, 'fill')

            this.debugFolder
                .addColor(this, 'stroke')

            this.debugFolder
                .add(this, 'delay')
                .min(0)
                .max(1000)
                .step(5)

            this.debugFolder
                .add(this, 'gliderCount')
                .min(0)
                .max(50)
                .step(1)

            this.debugFolder
                .add(this.dropper, 'distributionFactor')
                .min(1)
                .max(5)
                .step(1)

            this.debugFolder
                .add(this.dimensions, 'boardMargin')
                .min(-3)
                .max(3)
                .step(1)
                .onChange(() => this.resize())

            this.debugFolder
                .add(this.dimensions, 'circleRadius')
                .min(2)
                .max(24)
                .step(1)
                .onChange(() => this.resize())
                
                this.debugFolder
                .add(this.dimensions, 'circleMargin')
                .min(0)
                .max(4)
                .step(1)
                .onChange(() => this.resize())
        }
    }

    resize()
    {
        const parentStyle = window.getComputedStyle(this.container)

        this.dimensions.width = parseInt(parentStyle.getPropertyValue('width'))
        this.dimensions.height = parseInt(parentStyle.getPropertyValue('height'))

        this.dimensions.recalculate()

        this.svg.attr('width', this.dimensions.width)
        this.svg.attr('height', this.dimensions.height)

        this.grid.attr('transform',
            `translate(${this.dimensions.width / 2}, ${this.dimensions.height / 2})`
        )
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
        this.alive = this.next(this.alive)
        this.updateWorld()
    }

    updateWorld()
    {
        this.grid
            .selectAll('circle')
            .data([...combine(this.alive)].map((d) => d.split(',')))
            .join(
                enter => enter.append('circle')
                    .attr('cx', (d) => d[0] * this.dimensions.squareSide)
                    .attr('cy', (d) => d[1] * this.dimensions.squareSide)
                    .attr('r', this.dimensions.circleRadius)
                    .style('fill', this.fill)
                    .style('stroke', this.stroke),
                    update => update
                    .attr('cx', (d) => d[0] * this.dimensions.squareSide)
                    .attr('cy', (d) => d[1] * this.dimensions.squareSide)
                    .attr('r', this.dimensions.circleRadius)
                    .style('fill', this.fill)
                    .style('stroke', this.stroke),
                exit => exit
                    .remove()
            )
    }

    next(arrayOfGames)
    {
        if (arrayOfGames.length < this.gliderCount) arrayOfGames.push(this.dropper.drop());
        return arrayOfGames.map(tick).filter((ag) => this.dimensions.inBounds(ag));
    }

}
