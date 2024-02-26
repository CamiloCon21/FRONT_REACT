import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ShowSeries from './Series/showSeries';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowSeries></ShowSeries>} > </Route>
      </Routes>
    </BrowserRouter>);
}

export default App;
