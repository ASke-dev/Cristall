import { Route, Routes } from 'react-router';
import Opto from './Pages/Optoviy'
import Roznica from './Pages/Roznica'
import Contacts from './Pages/Contacts'



import Home from './Pages/HomePage';

import About from './Pages/About';
import Auth from './Pages/Auth';
import Otzyv from './Pages/Otzyv';
import Confidal from './Pages/Confidal';

const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/opto' element={<Opto />} />
        <Route path="/prodaja" element={<Roznica />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/otzyv" element={<Otzyv />} />
        <Route path="/privacy" element={<Confidal />} />

      </Routes>
    </div>
  );
}

export default App;
