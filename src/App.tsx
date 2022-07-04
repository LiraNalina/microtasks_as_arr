import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}

export type todoListsType = {
    listId: string
    title: string
    filter: FilterValuesType
}

export type StateType = {
    [key: string] : TaskType[]
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todoListsType>>([
        {listId: todolistID1, title: 'What to learn', filter: 'all'},
        {listId: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<StateType>({
        [todolistID1]: [
            {taskId: v1(), title: "HTML&CSS", isDone: true},
            {taskId: v1(), title: "JS", isDone: true},
            {taskId: v1(), title: "ReactJS", isDone: false},
            {taskId: v1(), title: "Rest API", isDone: false},
            {taskId: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {taskId: v1(), title: "HTML&CSS2", isDone: true},
            {taskId: v1(), title: "JS2", isDone: true},
            {taskId: v1(), title: "ReactJS2", isDone: false},
            {taskId: v1(), title: "Rest API2", isDone: false},
            {taskId: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function changeFilter(selectedListId: string, value: FilterValuesType) {
        setTodolists(todolists.map(t => t.listId === selectedListId ? {...t, filter: value} : t))
    }

    function removeTask(listId: string, selectedTaskId: string) {
        let copy = tasks[listId]
        tasks[listId] = copy.filter(c => c.taskId !== selectedTaskId)
        setTasks({...tasks})
    }

    function addTask(listId: string, title: string) {
        let task = {taskId: v1(), title: title, isDone: false};
        let copy = tasks[listId]
        tasks[listId] = [task, ...copy]
        setTasks({...tasks})
    }

    function changeStatus(selectedTaskId: string, selectedListId: string, isDone: boolean) {
        tasks[selectedListId] = tasks[selectedListId].map(t => t.taskId === selectedTaskId ? {...t, isDone: isDone} : t);
        setTasks({...tasks});
    }

            return (
                <div className="App">

                    {
                        todolists.map(t => {

                            let tasksForTodolist = tasks[t.listId];

                            if (t.filter === "active") {
                                tasksForTodolist = tasks[t.listId].filter(t => t.isDone);
                            }
                            if (t.filter === "completed") {
                                tasksForTodolist = tasks[t.listId].filter(t => !t.isDone);
                            }


                 return <Todolist
                        key={t.listId}
                        anyId={t.listId}
                        title="What to learn"
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={t.filter}
                        />
                    })}
                </div>

            );
        }

        export default App;
