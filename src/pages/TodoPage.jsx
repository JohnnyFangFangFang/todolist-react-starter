import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  // 把使用者輸入資訊存在這
  const [inputValue, setInputValue] = useState('');

  // todos 存在這
  const [todos, setTodos] = useState(dummyTodos);

  // 儲存使用者輸入資訊
  const handleChange = (value) => {
    setInputValue(value);
  };

  // 新增一筆 todo
  const handleAddTodo = () => {
    // 如果輸入空值就不要執行
    if (inputValue.length === 0) {
      return;
    }

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          // 給 id 一個數字
          id: Math.random() * 100,
          title: inputValue,
          // 新增的 todo 照理來說還沒完成
          isDone: false,
        },
      ];
    });

    // 新增 todo 後清空輸入欄
    setInputValue('');
  };

  // 新增一筆 todo（如果按 Enter 鍵的話，程式碼跟上面的一樣）
  const handleKeyDown = () => {
    // 如果輸入空值就不要執行
    if (inputValue.length === 0) {
      return;
    }

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          // 給 id 一個數字
          id: Math.random() * 100,
          title: inputValue,
          // 新增的 todo 照理來說還沒完成
          isDone: false,
        },
      ];
    });

    // 新增 todo 後清空輸入欄
    setInputValue('');
  };

  // 切換 todo 完成樣式
  const handleToggleDone = (id) => {
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
  const handleSave = ({ id, title }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            id,
            title,
            isEdit: false,
          };
        }
        return todo;
      });
    });
  };

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
      />
      <Footer />
    </div>
  );
};

export default TodoPage;
