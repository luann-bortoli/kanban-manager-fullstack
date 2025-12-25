import styles from '../styles/AddTask.module.css'
import { IMaskInput } from 'react-imask'

import { useState } from 'react'

export default function AddTask(){

    const [addTaskVisible, setAddTaskVisible] = useState(false)

    const [newTitle, setNewTitle] = useState("")
    const [newDesc, setNewDesc] = useState("")
    const [newDeadline, setNewDeadline] = useState("")

    function createTask() {
    fetch("http://127.0.0.1:5000/tasks/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: newTitle,
            desc: newDesc,
            deadline: newDeadline
        })
    })

    setAddTaskVisible(false)
}

    return(
        <>
            <div className={styles.container}>
                <button onClick={()=> setAddTaskVisible(true)}>+ Adicionar task</button>
            </div>

            {addTaskVisible &&(
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <div className={styles.titleContainer}>
                        <p>Adicionando nova task</p>
                    </div>
                    <div className={styles.inputContainer}>
                        
                        <div className={styles.field}>
                            <input value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} type="text" placeholder=' '/>
                            <label>Título da task</label>
                        </div>
                            
                        <div className={styles.field}>
                            <textarea value={newDesc} onChange={(e)=> setNewDesc(e.target.value)} placeholder=' '></textarea>
                            <label className={styles.textareaLabel}>Descrição da task</label>
                        </div>
                            
                        <div className={styles.field}>
                            <IMaskInput value={newDeadline} onAccept={(e)=> setNewDeadline(e)} mask={"0000-00-00"} placeholder=''></IMaskInput>
                            <label>Prazo de conclusão A/M/D</label>
                        </div>

                    </div>

                    <div className={styles.buttonContainer}>
                        <button onClick={()=> createTask()}>+ Criar task</button>
                        <button onClick={()=> setAddTaskVisible(false)}>× Cancelar</button>
                    </div>

                </div>
            </div>
            )}
        </>
    )
}