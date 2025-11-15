import {Outlet} from 'react-router-dom';
import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {CurrentBlogsProvider} from "../components/current-blogs/CurrentBlogsProvider.tsx";

export function App() {
    return (
        <CurrentBlogsProvider>
            <Header/>
            <Outlet/>
            <Footer/>
        </CurrentBlogsProvider>
    );
}

