
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import SetAvatar from './Pages/SetAvatar';
import SignUp from './Pages/SignUp';
import Test from './Test';

function App() {
  return (
    <div className="App">
      
      <Router>

        <Routes>

          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/setavatar' element={<SetAvatar/>}/>

          <Route path='/' element={<Chat/>}/>

          <Route path='/test' element={<Test/>}/>

        </Routes>

      </Router>
    </div>
  );
}

export default App;
