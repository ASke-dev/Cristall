import { Route, Routes } from 'react-router'; 
import Opto from './Pages/Optoviy'


import Home from './Pages/HomePage';

const App = () => {
  return (
    <div>

<Routes>
  <Route index element={<Home />} />
  <Route path='/opto' element={<Opto />} />
</Routes>

    </div>
  );
}

export default App;
