import { makeC } from './utils'

export const CAPTURE_GROUPS = [    
    // increase x, increase y
    [makeC(0,5), makeC(1,6), makeC(2,7)],
    [makeC(0,3), makeC(1,4), makeC(2,5), makeC(3,6), makeC(4,7)],
    [makeC(0,1), makeC(1,2), makeC(2,3), makeC(3,4), makeC(4,5), makeC(5,6), makeC(6,7)],
    [makeC(1,0), makeC(2,1), makeC(3,2), makeC(4,3), makeC(5,4), makeC(6,5), makeC(7,6)],
    [makeC(3,0), makeC(4,1), makeC(5,2), makeC(6,3), makeC(7,4)],
    [makeC(5,0), makeC(6,1), makeC(7,2)],
    // increase x, decrease y
    [makeC(0,3), makeC(1,2), makeC(2,1), makeC(3,0)],
    [makeC(0,5), makeC(1,4), makeC(2,3), makeC(3,2), makeC(4,1), makeC(5,0)],
    [makeC(0,7), makeC(1,6), makeC(2,5), makeC(3,4), makeC(4,3), makeC(5,2), makeC(6,1), makeC(7,0)],
    [makeC(2,7), makeC(3,6), makeC(4,5), makeC(5,4), makeC(6,3), makeC(7,2)],
    [makeC(4,7), makeC(5,6), makeC(6,5), makeC(7,4)],    
]