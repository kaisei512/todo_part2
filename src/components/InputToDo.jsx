import React, { useState } from 'react';
import 'bulma/css/bulma.css';

export const InputToDo = (props) => {
    // stateを作成
    const [text, setText] = useState('');

    console.log(text);
    // Enter押下時、ToDoに追加
    const handleEnter = e => {
        if (e.key === 'Enter') {
        // 入力値が空白文字の場合終了
        if (!text.match(/\S/g) ) return;
        // ToDoAppクラスの「handleSubmit」関数を実行
        props.onAdd(text);
        setText('');
        }
    };

    return (
        <div className="panel-block">
            <input
            className="input"
            type="text"
            placeholder="Enter to add"
            value={text}
            onChange={ (e) => setText(e.target.value)}
            onKeyDown={handleEnter}
            />
        </div>
    );
}

export default InputToDo;