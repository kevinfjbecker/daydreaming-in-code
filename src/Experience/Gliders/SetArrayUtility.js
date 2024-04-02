export const oddStep = (x) => x + (x % 2 === 0 ? 1 : 0)

export const coordinateSetToArray = (set) =>
    [...set].map((coordinate) => coordinate.split(","))

export const combine = (arrayOfSets) =>
    arrayOfSets.reduce((a, b) => new Set([...a, ...b]), new Set())
