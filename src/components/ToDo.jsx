import classNames from 'classnames';
import 'bulma/css/bulma.css';

export const ToDo = (props) => {

  // stateを作成
    const { todo, onCheck } = props;

    // チェックボックス押下時、ToDoAppクラスの「handleCheck」関数を実行
    const handleChange = () => {
        onCheck(todo);
    };

    return (
        <label className="panel-block">
        <input
            type="checkbox"
            checked={todo.finish_flg}
            onChange={handleChange}
        />
        <span
            className={classNames({
            'has-text-grey-light': todo.finish_flg
            })}
        >
            {todo.do}
        </span>
        </label>
    );
}

export default ToDo;