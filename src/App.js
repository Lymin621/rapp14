import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TestPage from './Navigation';
import SignInPage from './SignInPage';
import SingUpPage from './SignUpPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<TestPage />} />
        <Route path={"/login"} element={<SignInPage />} />
        <Route path={"/signup"} element={<SingUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
