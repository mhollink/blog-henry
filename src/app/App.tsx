import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {PostList} from '../pages/PostList';
import {PostView} from '../pages/PostView';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PostList/>}/>
                <Route path="/post/:filename" element={<PostView/>}/>
            </Routes>
        </BrowserRouter>
    );
}

