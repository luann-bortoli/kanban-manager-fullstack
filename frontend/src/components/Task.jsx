import { useEffect } from 'react'
import styles from '../styles/Task.module.css'

export default function Task({taskTitle, taskDesc, taskDeadline, taskStatus, taskId, taskBgColor, taskUpdate}){

    function formatDate(taskDeadline){
        let date = taskDeadline

        let splitDate = date.split("-")

        let formattedDate = (splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0])
        
        return formattedDate
    }

    const statusArray = ["todo", "wip", "done"]

    function getNextStatus(taskStatus){
        const statusIndex = statusArray.indexOf(taskStatus)

        if (statusIndex == 2){
            return "todo"
        }

        return statusArray[statusIndex + 1]
    }

    function getPrevStatus(taskStatus){
        const statusIndex = statusArray.indexOf(taskStatus)

        if (statusIndex == 0){
            return "done"
        }

        return statusArray[statusIndex -1]
    }

    function upTaskStatus(){
            fetch(`http://127.0.0.1:5000/tasks/${taskId}`,{
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ newStatus: getNextStatus(taskStatus)})
            })
            .then(response => response.json())
            .then(() => taskUpdate())
        }
    
    function prevTaskStatus(){
        fetch(`http://127.0.0.1:5000/tasks/${taskId}`,{
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ newStatus: getPrevStatus(taskStatus)})
            })
            .then(response => response.json())
            .then(() => taskUpdate())
    }

    return(
        <>
            <div className={styles.container}>

                <div style={{backgroundColor: `${taskBgColor}`}} className={styles.titleContainer}>
                    <p>{taskTitle}</p>
                </div>

                <div className={styles.descContainer}>
                    <p>{taskDesc}</p>
                </div>

                <hr style={{borderColor: `${taskBgColor}`}} />
                
                <p className={styles.pDeadline}>{formatDate(taskDeadline)}</p>

                <div className={styles.buttonContainer}>
                    <button onClick={()=>prevTaskStatus()} style={{backgroundColor: `${taskBgColor}`}}>{"< <"}</button>
                    <button onClick={()=>upTaskStatus()} style={{backgroundColor: `${taskBgColor}`}}>{"> >"}</button>
                </div>

            </div>
        </>
    )
}