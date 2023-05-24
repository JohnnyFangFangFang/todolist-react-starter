import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState, useEffect } from 'react';
import { getTodos, createTodo, patchTodo, deleteTodo } from '../api/todos';
import { useNavigate } from 'react-router-dom';
// import { checkPermission } from '../api/auth';不需要了
// 引用封裝好的資訊
import { useAuth } from '../contexts/AuthContext';

const TodoPage = () => {
  // 把使用者輸入資訊存在這
  const [inputValue, setInputValue] = useState('');
  // todos 存在這
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 檢查 token
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  // 儲存使用者輸入資訊
  const handleChange = (value) => {
    setInputValue(value);
  };

  // 新增一筆 todo
  const handleAddTodo = async () => {
    // 如果輸入空值就不要執行
    if (inputValue.length === 0) {
      return;
    }
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            // 使用從 API 撈到的資料
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            // 預設不是編輯狀態
            isEdit: false,
          },
        ];
      });

      // 新增 todo 後清空輸入欄
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  // 新增一筆 todo（如果按 Enter 鍵的話，程式碼跟上面的一樣）
  const handleKeyDown = async () => {
    // 如果輸入空值就不要執行
    if (inputValue.length === 0) {
      return;
    }
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            // 使用從 API 撈到的資料
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            // 預設不是編輯狀態
            isEdit: false,
          },
        ];
      });

      // 新增 todo 後清空輸入欄
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  // 切換 todo 完成樣式
  const handleToggleDone = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    try {
      await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 更換成編輯模式
  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false };
      });
    });
  };

  // 編輯完成後儲存
  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({
        id,
        title,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
              isEdit: false,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 刪除功能
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 計算剩餘 todo 數量
  const todosRemained = todos.length;

  // 透過 API 撈初始資料
  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onSave={handleSave}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onDelete={handleDelete}
      />
      <Footer todosRemained={todosRemained} />
    </div>
  );
};

export default TodoPage;
