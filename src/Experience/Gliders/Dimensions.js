import { oddStep, coordinateSetToArray } from './SetArrayUtility.js'

export default class Dimensions
{
    constructor()
    {
        this.width
        this.height
        this.circleRadius
        this.circleMargin
        this.boardMargin = 3

        this.squareSide
        this.boardWidth
        this.boardHeight
        this.widthBound
        this.heightBound
    }

    recalculate()
    {
        this.squareSide = (this.circleRadius + this.circleMargin) * 2
        this.boardWidth = oddStep(Math.ceil(this.width / this.squareSide))
        this.boardHeight = oddStep(Math.ceil(this.height / this.squareSide))
        this.widthBound = Math.floor(this.boardWidth / 2)
        this.heightBound = Math.floor(this.boardHeight / 2)
    }

    inBounds(coordinateSet)
    {
        return coordinateSetToArray(coordinateSet).every(
            (c) =>
                Math.abs(c[0]) < this.widthBound + 2 * this.boardMargin &&
                Math.abs(c[1]) < this.heightBound + 2 * this.boardMargin
        )
    }
}
