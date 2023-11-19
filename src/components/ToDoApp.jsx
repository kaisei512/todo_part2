import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';

import { InputToDo, Filter, ToDo } from './index';

export const  ToDoApp = () => {
	
    // stateを作成
    const [todos, setToDos] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [updateTrigger, setUpdateTrigger] = useState(0);

    useEffect(() => {
        const fetchToDos = async () => {
            try {
                // fetchを使用してデータを取得
                const response = await fetch(`http://localhost:5000/api/todos/get`);
                
                // レスポンスが正常であれば、データをJSON形式に変換
                if (response.ok) {
                    const data = await response.json();
                    setToDos(data); // 取得したデータで状態を更新
                } else {
                    throw new Error('データの取得に失敗しました。');
                }
            } catch (error) {
                // エラーハンドリング
                console.error('ToDoの取得中にエラーが発生しました:', error);
            }
        };
        fetchToDos();
        }, [updateTrigger]);

    // 入力値をtodos(配列)に設定
    const handleSubmit = async (text) => {
        try {
            const response = await fetch(`http://localhost:5000/api/todos/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({do: text})
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Todo added:', data);
                setUpdateTrigger(prev => prev + 1);
            } else {
                console.error('Failed to add todo');
            }
        } catch (error){
            console.error('Error', error);
        }
    };
    
    // フィルターの切り替え
    const handleFilterChange = value => setFilter(value);
    
    // フィルターに応じたToDoを表示
    const displayToDos = todos.filter(todo => {
        if (filter === 'ALL') return true;
        if (filter === 'TODO') return !todo.finish_flg;
        if (filter === 'DONE') return todo.finish_flg;
        return false;
    });
    // チェックボックス判定
    const finishUpdate = async (toDo) => {
        try {
            // チェックがついたToDoの真偽値(finish_flg)を変更
            const response = await fetch(`http://localhost:5000/api/todos/finish/${toDo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({finish_flg: !toDo.finish_flg})
            })

            if (response.ok) {
                // setUpdateTrigger(prev => prev + 1);
                const newToDos = todos.map(todo => {
                    if (todo.id === toDo.id) {
                        todo.finish_flg = !todo.finish_flg
                    }
                    return todo;
                });
                setToDos(newToDos);
            } else {
                console.error('Faild to update finish flag');
            }
        } catch (error){
            console.error('Error', error);
        }
    };
    
    return (
        <div className="panel is-warning">
        <div className="panel-heading">
            ToDo
        </div>
        <InputToDo onAdd={handleSubmit} />
        <Filter
            onChange={handleFilterChange}
            value={filter}
        />
        {displayToDos.map(todo => (
            <ToDo
            key={todo.id}
            todo={todo}
            onCheck={finishUpdate}
            />
        ))}
        <div className="panel-block">
            {displayToDos.length} todos
        </div>
        </div>
    );
}

export default ToDoApp;