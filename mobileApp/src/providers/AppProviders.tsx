import { PropsWithChildren } from "react";
import { CurrentUserProvider } from "./CurrentUserProvider";
import { GroupsProvider } from "./GroupsProvider";

type AppProvidersProps = PropsWithChildren<{}>

export function AppProviders(props: AppProvidersProps): JSX.Element {
    return (
        <CurrentUserProvider>
            <GroupsProvider>
                {props.children}
            </GroupsProvider>
        </CurrentUserProvider>
    )    
}