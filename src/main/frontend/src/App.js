import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';
import Home from './components/Main';
import Test from './components/test/Test';
import GameDetailPage from './components/GameDetailPage';
// import SearchResultPage from './components/SearchResultPage';
import SignupForm from "./components/SignupForm";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <div className='App'>

      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path={'/'} element={<Home />}></Route>
          <Route path={'/test'} element={<Test />}></Route>
          {/*<Route path={'/search'} element={<SearchResultPage />}></Route>*/}
          <Route path='/game/:gameId' element={<GameDetailPage />}></Route>
          <Route path={'/signup'} element={<SignupForm />}></Route>
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;