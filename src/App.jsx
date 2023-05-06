import './App.scss';
// 載入路由的套件
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// 引入所需元件
import { HomePage, LoginPage, SignUpPage, TodoPage } from 'pages';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route path='todo' element={<TodoPage />} />
        <Route path='*' element={<HomePage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
