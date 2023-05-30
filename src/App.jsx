import './App.scss';
// 載入路由的套件
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// 引入所需元件
import { HomePage, LoginPage, SignUpPage, TodoPage } from 'pages';
// 引入 context
import { AuthProvider } from 'contexts/AuthContext';

// test2

// 設定路由與對應渲染畫面
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="todos" element={<TodoPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
