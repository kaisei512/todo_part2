    import React, { useState } from 'react';

    function App() {
    const [todo, setTodo] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        const response = await fetch('http://localhost:5000/api/todos', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: todo })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Todo added:', data);
            // 追加後の処理（例：フォームのリセット、状態の更新など）
        } else {
            // エラー処理
            console.error('Failed to add todo');
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit">Add Todo</button>
        </form>
        </div>
    );
    }

    export default App;
