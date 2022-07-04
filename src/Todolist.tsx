import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
// import {FilterValuesType} from './App';

/*type TaskType = {
    id: string
    title: string
    isDone: boolean
}*/

type PropsType = {
    anyId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, selId: string) => void
    changeFilter: (selId: string, value: FilterValuesType) => void
    addTask: (id: string, title: string) => void
    changeTaskStatus: (listId: string, selectedTaskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.anyId, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onClickHandler = (selectedTaskId: string) => props.removeTask(props.anyId, selectedTaskId)

    const onAllClickHandler = () => props.changeFilter(props.anyId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.anyId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.anyId, "completed");


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    // const onClickHandler = () => props.removeTask(t.id, props.selId)

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.taskId, props.anyId, e.currentTarget.checked);
                    }

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => onClickHandler(t.taskId)}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
