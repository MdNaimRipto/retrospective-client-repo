import React, { useContext, useState } from 'react';
import ActionTasks from './ActionTasks';
import CanImprovedTask from './CanImprovedTask';
import StartDoingTask from './StartDoingTask';
import WellTasks from './WellTasks';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../ContextProvider/UserContext';
import DetailsModal from '../Shared/DetailsModal';
import Loader from '../Shared/Loader';
import TaskWentWellModal from '../Modals/TaskWentWellModal';
import CanBeImprovedModal from '../Modals/CanBeImprovedModal';
import TasksStartDoingModal from '../Modals/TasksStartDoingModal';
import ActionTasksModal from '../Modals/ActionTasksModal';

const Home = () => {
    const { user } = useContext(AuthContext)
    const [editedTask, setEditedTask] = useState(null)
    const [updatedTask, setUpdatedTask] = useState(null)


    // TaskWentWell Get Function
    const { data: tasksWentWell = [], isLoading, refetch } = useQuery({
        queryKey: ['tasksWentWell', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/tasksWentWell?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    // TaskCanImproved Get Function
    const { data: taskCanBeImprove = [], refetch: refetchImprovementTasks } = useQuery({
        queryKey: ['taskCanBeImprove', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/taskCanBeImprove?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    // tasksStartDoing Get Function
    const { data: tasksStartDoing = [], refetch: refetchStartDoingTasks } = useQuery({
        queryKey: ['tasksStartDoing', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/tasksStartDoing?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    // actionTasks Get Function
    const { data: actionTasks = [], refetch: refetchActionTasks } = useQuery({
        queryKey: ['actionTasks', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/actionTasks?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 my-8'>
            <WellTasks
                tasksWentWell={tasksWentWell}
                refetch={refetch}
                isLoading={isLoading}
                setEditedTask={setEditedTask}
                setUpdatedTask={setUpdatedTask}
            />
            <CanImprovedTask
                taskCanBeImprove={taskCanBeImprove}
                refetch={refetchImprovementTasks}
                setEditedTask={setEditedTask}
                setUpdatedTask={setUpdatedTask}
            />
            <StartDoingTask
                tasksStartDoing={tasksStartDoing}
                refetch={refetchStartDoingTasks}
                setEditedTask={setEditedTask}
                setUpdatedTask={setUpdatedTask}
            />
            <ActionTasks
                actionTasks={actionTasks}
                refetch={refetchActionTasks}
                setEditedTask={setEditedTask}
                setUpdatedTask={setUpdatedTask}
            />
            {
                editedTask !== null &&
                <TaskWentWellModal
                    editedTask={editedTask}
                    setEditedTask={setEditedTask}
                    refetch={refetch} />
            }
            {
                editedTask !== null &&
                <CanBeImprovedModal
                    editedTask={editedTask}
                    setEditedTask={setEditedTask}
                    refetch={refetchImprovementTasks} />
            }
            {
                editedTask !== null &&
                <TasksStartDoingModal
                    editedTask={editedTask}
                    setEditedTask={setEditedTask}
                    refetch={refetchStartDoingTasks} />
            }
            {
                editedTask !== null &&
                <ActionTasksModal
                    editedTask={editedTask}
                    setEditedTask={setEditedTask}
                    refetch={refetchActionTasks} />
            }
            {
                updatedTask !== null &&
                <DetailsModal updatedTask={updatedTask} />
            }
        </div>
    );
};

export default Home;