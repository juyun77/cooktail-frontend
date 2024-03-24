import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CocktailListPage from './pages/CocktailListPage';
import CocktailDetailPage from './pages/CocktailDetailPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SignUpSuccess from './pages/SingUpSuccessPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <>
                <Routes>
                    <Route exact path="/cocktails" element={<CocktailListPage />} />
                    <Route exact path="/cocktails/:id" element={<CocktailDetailPage />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/signup" element={<SignUpPage />} />
                    <Route exact path="/signup/success" element={<SignUpSuccess />} />
                </Routes>
            </>
        </BrowserRouter>
    </div>
  );
}

export default App;
