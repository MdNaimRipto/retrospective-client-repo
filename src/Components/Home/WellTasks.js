import React, { useContext } from 'react';
import { FiPlusCircle } from "react-icons/fi"
import { BsArrowsAngleExpand, BsPlusCircle } from "react-icons/bs"
import { BiPlus } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { AuthContext } from '../../ContextProvider/UserContext';
import swal from 'sweetalert';
import toast from "react-hot-toast"
import { format } from 'date-fns';

const WellTasks = ({ tasksWentWell, refetch, setEditedTask, setUpdatedTask }) => {
    const { user } = useContext(AuthContext)

    const handleAddTask = () => {
        const task = {
            email: user?.email,
            completed: false,
            totalLiked: 0,
            addedTime: format(new Date(), "PPPP")
        }
        fetch("http://localhost:5000/tasksWentWell", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
                toast.success('Task Added!')
            })
    }

    const handleUpVote = (task) => {
        const totalLiked = parseInt(task.totalLiked) + 1;
        const updatedLiked = {
            totalLiked: totalLiked
        }
        fetch(`http://localhost:5000/updatedLike/${task._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedLiked)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch()
            })
            .catch(err => console.error(err))
    }

    const handleDelete = (task) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/tasksWentWell/${task._id}`, {
                        method: "DELETE",
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount === 1) {
                                console.log(data)
                                swal(`Selected doctor has been deleted!`, {
                                    icon: "success",
                                });
                                refetch()
                            }
                            else {
                                toast.error("Could not Delete. Please Try Again")
                            }
                        })
                }
            });
    }

    return (
        <div>
            <div className='flex justify-center mx-auto items-center mb-4'>
                <h2 className='text-2xl mr-2 font-semibold'>Tasks Went Well</h2>
                <FiPlusCircle
                    onClick={handleAddTask}
                    className='text-2xl cursor-pointer -mt-5 text-green-600'
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                {
                    tasksWentWell.map(task =>
                        <div key={task._id}>
                            {
                                !task?.completed ?
                                    <label
                                        key={task._id}
                                        onClick={() => { setEditedTask(task) }}
                                        htmlFor="editTask"
                                        className='flex items-center justify-center flex-col bg-[#ffb66e] text-white h-[100px] rounded-br-3xl rounded cursor-pointer shadow-2xl'>
                                        <BsPlusCircle className='text-4xl' />
                                        <p>Edit Task</p>
                                    </label>
                                    :
                                    <div
                                        key={task._id}
                                        className='bg-[#ffb66e] h-[100px] rounded-br-3xl rounded shadow-2xl'>
                                        <h4
                                            className='text-center font-semibold text-xl mt-1'>{task?.title.slice(0, 10) + "..."}
                                        </h4>
                                        <div className='flex items-center'>
                                            <p className='ml-2'>{task?.task.slice(0, 20)}</p>
                                            {
                                                task?.task.length >= 20 &&
                                                <label
                                                    htmlFor='taskDetails'
                                                    onClick={() => { setUpdatedTask(task) }}
                                                    className='cursor-pointer'>...</label>
                                            }
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex items-center mt-5'>
                                                <button onClick={() => { handleUpVote(task) }}>
                                                    <BiPlus
                                                        className='cursor-pointer'
                                                    />
                                                </button>
                                                <p>{task?.totalLiked}</p>
                                            </div>
                                            <div className='flex items-center mr-5 mt-5'>
                                                <button
                                                    onClick={() => { handleDelete(task) }}
                                                    className='mr-2 border-0 mt-1'>
                                                    <MdDelete />
                                                </button>
                                                <label
                                                    htmlFor='taskDetails'
                                                    onClick={() => { setUpdatedTask(task) }}
                                                    className='cursor-pointer'>
                                                    <label
                                                        htmlFor='taskDetails'
                                                        onClick={() => { setUpdatedTask(task) }}
                                                        className='cursor-pointer'>
                                                        <BsArrowsAngleExpand />
                                                    </label>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>

                    )
                }
            </div>
        </div>
    );
};

export default WellTasks;