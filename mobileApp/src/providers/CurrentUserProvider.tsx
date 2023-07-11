import { PropsWithChildren, createContext, useState } from "react";

type IUserContext = {
    user: UserType | null
    userToken: string | null
    cleanUpContext: () => void
    setUser: (user: UserType) => void
    setUserToken: (userToken: string) => void
}

const InitialState: IUserContext = {
    user: null,
    userToken: null,
    cleanUpContext: () => {},
    setUser: () => {},
    setUserToken: () => {},
} as const 

export const CurrentUserContext = createContext<IUserContext>(InitialState)

export function CurrentUserProvider(props: PropsWithChildren<{}>){
    const [user, setUser] = useState<UserType | null>(InitialState.user)
    const [userToken, setUserToken] = useState<string | null>(InitialState.userToken)

    function cleanUpContext() {
        setUser(InitialState.user)
        setUserToken(InitialState.userToken)
    }

    return (
        <CurrentUserContext.Provider value={{user, userToken, cleanUpContext, setUser, setUserToken}}>
            {props.children}
        </CurrentUserContext.Provider>
    )
}