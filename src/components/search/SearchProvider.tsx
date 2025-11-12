import type {FunctionComponent, PropsWithChildren} from "react";
import {useState} from "react";
import {SearchContext} from "./SearchContext";

export const SearchProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
    const [query, setQuery] = useState('');
    return (
        <SearchContext.Provider value={{query, setQuery}}>
            {children}
        </SearchContext.Provider>
    );
}