import styles from '../styles/Column.module.css'
import Task from './Task'


export default function Column({columnTitle, columnStatus, columnBgColor, tasks, updateTasks}){

    return(
        <>
            <div className={styles.container}>

                <div style={{backgroundColor: `${columnBgColor}`}} className={styles.titleContainer}>
                    <p>{columnTitle}</p>
                </div>
        
                <div className={styles.taskContainer}>

                {tasks.filter(task => task.status == columnStatus)
                    .map((task, index)=>(
                    <Task key={task.id}
                    taskTitle={task.title}
                    taskDesc={task.desc}
                    taskDeadline={task.deadline}
                    taskStatus={task.status}
                    taskId={task.id}
                    taskBgColor={columnBgColor}
                    taskUpdate={updateTasks}
                    />
                ))}

                </div>

            </div>
        </>
    )
}