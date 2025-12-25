import styles from '../styles/Board.module.css'
import Column from './Column'
import AddTask from './AddTask'

import { useState, useEffect } from 'react'

export default function Board(){

    const [tasks, setTasks] = useState([])

    const updateTasks = () =>{
            fetch("http://127.0.0.1:5000/tasks")
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err))
        }

    useEffect(()=>{
        updateTasks()
    },[])

    return(
        <>

            <AddTask />

            <div className={styles.container}>
                <Column
                columnTitle={"To do"}
                columnStatus={"todo"}
                columnBgColor={"var(--todo)"}
                tasks={tasks}
                updateTasks={()=> updateTasks()}
                />

                <Column
                columnTitle={"WIP"}
                columnStatus={"wip"}
                columnBgColor={"var(--wip)"}
                tasks={tasks}
                updateTasks={()=> updateTasks()}
                />

                <Column
                columnTitle={"Done"} 
                columnStatus={"done"}
                columnBgColor={"var(--done)"}
                tasks={tasks}
                updateTasks={()=> updateTasks()}
                />

            </div>
        </>
    )
}