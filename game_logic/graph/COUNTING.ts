import { Piece, Block } from './testImplementation'
import { makeC } from '../../lib/utils'
import { operation, BlockI } from '../../types'


export function generateCountingBoard() : Array<BlockI> {


const COUNTING : Array<BlockI> = [
    new Block({
        coordinates: makeC(0,7),
        operation: operation.MULTIPLY,
        piece: new Piece({
            type: 'x',
            value: 3,            
        })
    }),
    new Block({
        coordinates: makeC(2,7),
        operation: operation.DIVIDE,
        piece: new Piece({
            type: 'x',
            value: 6
        })
    }),
    new Block({
        coordinates: makeC(4,7),
        operation: operation.SUBTRACT,
        piece: new Piece({
            type: 'x',
            value: 9
        })
    }),
    new Block({
        coordinates: makeC(6,7),
        operation: operation.ADD,
        piece: new Piece({
            type: 'x',
            value: 12
        })
    }),
    new Block({
        coordinates: makeC(1,6),
        operation: operation.DIVIDE,
        piece: new Piece({
            type: 'x',
            value: 8
        })
    }),
    new Block({
        coordinates: makeC(3,6),
        operation: operation.MULTIPLY,
        piece: new Piece({
            type: 'x',
            value: 11
        })
    }),
    new Block({
        coordinates: makeC(5,6),
        operation: operation.ADD,
        piece: new Piece({
            type: 'x',
            value: 4
        })
    }),
    new Block({
        coordinates: makeC(7,6),
        operation: operation.SUBTRACT,
        piece: new Piece({
            type: 'x',
            value: 1
        })
    }),
    new Block({
        coordinates: makeC(0,5),
        operation: operation.SUBTRACT,
        piece: new Piece({
            type: 'x',
            value: 5,
        })
    }),
    new Block({
        coordinates: makeC(2,5),
        operation: operation.ADD,
        piece: new Piece({
            type: 'x',
            value: 2
        })
    }),
    new Block({
        coordinates: makeC(4,5),
        operation: operation.MULTIPLY,
        piece: new Piece({
            type: 'x',
            value: 7
        })
    }),
    new Block({
        coordinates: makeC(6,5),
        operation: operation.DIVIDE,
        piece: new Piece({
            type: 'x',
            value: 10
        })
    }),
    new Block({
        coordinates: makeC(1,4),
        operation: operation.ADD
    }),
    new Block({
        coordinates: makeC(3,4),
        operation: operation.SUBTRACT
    }),
    new Block({
        coordinates: makeC(5,4),
        operation: operation.DIVIDE
    }),
    new Block({
        coordinates: makeC(7,4),
        operation: operation.MULTIPLY
    }),
    new Block({
        coordinates: makeC(0,3),
        operation: operation.MULTIPLY,        
    }),
    new Block({
        coordinates: makeC(2,3),
        operation: operation.DIVIDE
    }),
    new Block({
        coordinates: makeC(4,3),
        operation: operation.SUBTRACT,        
    }),
    new Block({
        coordinates: makeC(6,3),
        operation: operation.ADD
    }),
    new Block({
        coordinates: makeC(1,2),
        operation: operation.DIVIDE,
        piece: new Piece({
            type: 'z',
            value: 10
        })
    }),
    new Block({
        coordinates: makeC(3,2),
        operation: operation.MULTIPLY,
        piece: new Piece({
            type: 'z',
            value: 7
        })
    }),
    new Block({
        coordinates: makeC(5,2),
        operation: operation.ADD,
        piece: new Piece({
            type: 'z',
            value: 2
        })
    }),
    new Block({
        coordinates: makeC(7,2),
        operation: operation.SUBTRACT,
        piece: new Piece({
            type: 'z',
            value: 5
        })
    }),
    new Block({
        coordinates: makeC(0,1),
        operation: operation.SUBTRACT,
        piece: new Piece({
            type: 'z',
            value: 1
        })
    }),
    new Block({
        coordinates: makeC(2,1),
        operation: operation.ADD,
        piece: new Piece({
            type: 'z',
            value: 4
        })
    }),
    new Block({
        coordinates: makeC(4,1),
        operation: operation.MULTIPLY,
        piece: new Piece({
            type: 'z',
            value: 11
        })
    }),
    new Block({
        coordinates: makeC(6,1),
        operation: operation.DIVIDE,
        piece: new Piece({
            type: 'z',
            value: 8
        })
    }),
    new Block({
        coordinates: makeC(1,0),
        operation: operation.ADD,
        piece: new Piece({
            type: 'z',
            value: 12
        }),        
    }),
    new Block({
        coordinates: makeC(3,0),
        operation: operation.SUBTRACT,
        piece: new Piece({
            type: 'z',
            value: 9
        })
    }),
    new Block({
        coordinates: makeC(5,0),
        operation: operation.DIVIDE,
        piece: new Piece({
            type: 'z',
            value: 6
        })
    }),
    new Block({
        coordinates: makeC(7,0),
        operation: operation.MULTIPLY,
        piece: new Piece({
            type: 'z',
            value: 3
        })
    })
]


const c = COUNTING
// inital blue moves
c[8].piece!.moves = [c[12].coordinates]
c[9].piece!.moves = [c[12].coordinates, c[13].coordinates]
c[10].piece!.moves = [c[13].coordinates, c[14].coordinates]
c[11].piece!.moves = [c[14].coordinates, c[15].coordinates]

// initial red moves
c[20].piece!.moves = [c[16].coordinates, c[17].coordinates]
c[21].piece!.moves = [c[17].coordinates, c[18].coordinates]
c[22].piece!.moves = [c[18].coordinates, c[19].coordinates]
c[23].piece!.moves = [c[19].coordinates]


// y-7
                                                                 c[0].botRight = c[4]
                                            c[1].botLeft = c[4], c[1].botRight = c[5]
                                            c[2].botLeft = c[5], c[2].botRight = c[6]
                                            c[3].botLeft = c[6], c[3].botRight = c[7]

// y-6
c[4].topLeft = c[0], c[4].topRight = c[1], c[4].botLeft = c[8], c[4].botRight = c[9]
c[5].topLeft = c[1], c[5].topRight = c[2], c[5].botLeft = c[9], c[5].botRight = c[10]
c[6].topLeft = c[2], c[6].topRight = c[3], c[6].botLeft = c[10], c[6].botRight = c[11]
c[7].topLeft = c[3],                       c[7].botLeft = c[11]

// y-5
                     c[8].topRight = c[4],                       c[8].botRight = c[12]
c[9].topLeft = c[4], c[9].topRight = c[5], c[9].botLeft = c[12], c[9].botRight = c[13]
c[10].topLeft = c[5], c[10].topRight = c[6], c[10].botLeft = c[13], c[10].botRight = c[14]
c[11].topLeft = c[6], c[11].topRight = c[7], c[11].botLeft = c[14], c[11].botRight = c[15]

// y-4
c[12].topLeft = c[8], c[12].topRight = c[9], c[12].botLeft = c[16], c[12].botRight = c[17]
c[13].topLeft = c[9], c[13].topRight = c[10], c[13].botLeft = c[17], c[13].botRight = c[18]
c[14].topLeft = c[10], c[14].topRight = c[11], c[14].botLeft = c[18], c[14].botRight = c[19]
c[15].topLeft = c[11],                         c[15].botLeft = c[19]

// y-3
                       c[16].topRight = c[12],                        c[16].botRight = c[20]
c[17].topLeft = c[12], c[17].topRight = c[13], c[17].botLeft = c[20], c[17].botRight = c[21]
c[18].topLeft = c[13], c[18].topRight = c[14], c[18].botLeft = c[21], c[18].botRight = c[22]
c[19].topLeft = c[14], c[19].topRight = c[15], c[19].botLeft = c[22], c[19].botRight = c[23]

// y-2
c[20].topLeft = c[16], c[20].topRight = c[17], c[20].botLeft = c[24], c[20].botRight = c[25]
c[21].topLeft = c[17], c[21].topRight = c[18], c[21].botLeft = c[25], c[21].botRight = c[26]
c[22].topLeft = c[18], c[22].topRight = c[19], c[22].botLeft = c[26], c[22].botRight = c[27]
c[23].topLeft = c[19],                         c[23].botLeft = c[27]

// y-1
                       c[24].topRight = c[20],                        c[24].botRight = c[28]
c[25].topLeft = c[20], c[25].topRight = c[21], c[25].botLeft = c[28], c[25].botRight = c[29]
c[26].topLeft = c[21], c[26].topRight = c[22], c[26].botLeft = c[29], c[26].botRight = c[30]
c[27].topLeft = c[22], c[27].topRight = c[23], c[27].botLeft = c[30],  c[27].botRight = c[31]

// y-0
c[28].topLeft = c[24], c[28].topRight = c[25]
c[29].topLeft = c[25], c[29].topRight =  c[26]
c[30].topLeft = c[26], c[30].topRight = c[27]
c[31].topLeft = c[27]


return c

}

