import { operation } from '../../lib/data'
import { Piece, Block } from './testImplementation'
import { makeC } from '../../lib/utils'


const COUNTING = [
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
            value: 5
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