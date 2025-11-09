import {Outlet} from 'react-router-dom';
import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {BlogsProvider} from "../components/blog-list-context/BlogsProvider.tsx";

export function App() {
    return (
        <BlogsProvider>
            <Header/>
            <Outlet/>
            <Footer/>
        </BlogsProvider>
    );
}

