import { glider } from './Dots.js'
import { coordinateSetToArray } from './SetArrayUtility.js'
import { rotate, translate } from './Transform.js'

export default class Dropper {

    constructor(dimensions)
    {
        this.dimensions = dimensions
        this.distributionFactor = 3
    }

    drop()
    {
        const dropSide =
            dropLocations[Math.floor(Math.random() * dropLocations.length)]
        
        const angle = dropAngles[dropSide][Math.floor(Math.random() * 2)]
        const dx = this.dropTranslations[dropSide][0]()
        const dy = this.dropTranslations[dropSide][1]()
        
        const coords = coordinateSetToArray(glider)
            .map((coordinates) => rotate(angle, coordinates))
            .map((coordinates) => translate(dx, dy, coordinates))
        
        return new Set(coords.map((a) => a.toString()))
    }

    distribution()
    {
        return (
                new Array(this.distributionFactor)
                    .fill(0)
                    .map(() => Math.random())
                    .reduce((a, b) => a + b) /
                this.distributionFactor
            ) *
            2 -
            1
    }

    dropTranslations = {
        N: [
            () => Math.floor(this.distribution() * this.dimensions.widthBound),
            () => -(this.dimensions.heightBound + this.dimensions.boardMargin)
        ],
        E: [
            () => this.dimensions.widthBound + this.dimensions.boardMargin,
            () => Math.floor(this.distribution() * this.dimensions.heightBound)
        ],
        S: [
            () => Math.floor(this.distribution() * this.dimensions.widthBound),
            () => this.dimensions.heightBound + this.dimensions.boardMargin
        ],
        W: [
            () => -(this.dimensions.widthBound + this.dimensions.boardMargin),
            () => Math.floor(this.distribution() * this.dimensions.heightBound)
        ]
    }

}

const dropLocations = ['N', 'E', 'S', 'W']

const dropAngles = {
    N: [90, 180],
    E: [180, 270],
    S: [270, 0],
    W: [0, 90]
}

