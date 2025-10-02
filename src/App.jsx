import { Route, Routes } from 'react-router';
import Opto from './Pages/Optoviy'
import Roznica from './Pages/Roznica'
import Contacts from './Pages/Contacts'


import Home from './Pages/HomePage';
import DashBoard from './Pages/Admin/DashBoard/DashBoard';

const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/opto' element={<Opto />} />
        <Route path="/admin" element={<DashBoard />} />
        <Route path="/prodaja" element={<Roznica />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </div>
  );
}

export default App;
