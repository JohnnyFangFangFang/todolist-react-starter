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
  const handleInput = (value) => {
    setInputValue(value);
  };

  const handleTodo = () => {
    // 如果輸入空值就不要執行
    if (inputValue.length === 0) {
      return;
    }

    // 新增一筆 todo
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

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleInput}
        onAddTodo={handleTodo}
      />
      <TodoCollection todos={todos} />
      <Footer />
    </div>
  );
};

export default TodoPage;
