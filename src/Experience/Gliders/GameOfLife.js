// src: https://observablehq.com/@visnup/game-of-life

export function tick(cells) {
    const counts = {}
    for (const cell of cells)
        for (const n of neighbors(cell.split(',').map(Number)))
            counts[n] = (counts[n] ?? 0) + 1

    const next = new Set()
    for (const [cell, count] of Object.entries(counts))
        if (count === 3 || (count == 2 && cells.has(cell)))
            next.add(cell)

    return next
}

function* neighbors([x, y]) {
    for (const dx of [-1, 0, 1])
      for (const dy of [-1, 0, 1])
        if (dx !== 0 || dy !== 0)
          yield [x + dx, y + dy]
  }