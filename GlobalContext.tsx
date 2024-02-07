import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState, useReducer } from "react";
import { boxPiece } from "./lib/data";

import { gameInitialState, boardReducer, Action, GameTypes } from "./gameReducer";

type GlobalContextValues = GameTypes & {
    dispatch: Dispatch<Action>
}

const GlobalContext = createContext<GlobalContextValues|null>(null)


export default function GlobalProvider({children}:{children:ReactNode}) {
    const [
        globalStates, 
        dispatch
    ] = useReducer(boardReducer, gameInitialState)

    return (
        <GlobalContext.Provider 
        value={{
            ...globalStates,
            dispatch
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    const context = useContext(GlobalContext)    
    if (!context) {
        throw new Error(`context is typeof ${typeof context}`)
    }    
    return context
}