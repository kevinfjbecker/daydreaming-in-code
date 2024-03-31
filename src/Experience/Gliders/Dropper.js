import Dimensions from './Dimensions.js'
import { rotate, translate } from './Transform.js'

export default class Dropper {

    constructor()
    {
        this.dimensions = new Dimensions()
    }

    drop()
    {
        const dropSide =
        dropLocations[Math.floor(Math.random() * dropLocations.length)]
        
        const angle = dropAngles[dropSide][Math.floor(Math.random() * 2)]
        const dx = dropTranslations[dropSide][0]()
        const dy = dropTranslations[dropSide][1]()
        
        const coords = coordinateSetToArray(glider)
        .map((coordinates) => rotate(angle, coordinates))
        .map((coordinates) => translate(dx, dy, coordinates))
        
        return new Set(coords.map((a) => a.toString()))
    }
}

const dropLocations = ['N', 'E', 'S', 'W']

const dropAngles = {
    N: [90, 180],
    E: [180, 270],
    S: [270, 0],
    W: [0, 90]
}

const dropTranslations = {
    N: [
        () => Math.floor(dist() * widthBound),
        () => -(heightBound + boardMargin)
    ],
    E: [
        () => widthBound + boardMargin,
        () => Math.floor(dist() * heightBound)
    ],
    S: [
        () => Math.floor(dist() * widthBound),
        () => heightBound + boardMargin
    ],
    W: [
        () => -(widthBound + boardMargin),
        () => Math.floor(dist() * heightBound)
    ]
}
