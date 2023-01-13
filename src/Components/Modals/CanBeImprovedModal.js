import React from 'react';
import toast from "react-hot-toast"

const CanBeImprovedModal = ({ editedTask, setEditedTask, refetch }) => {
    const handleUpdateTask = (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value;
        const description = form.description.value;
        const currentTask = {
            title: title,
            description: description
        }

        fetch(`http://localhost:5000/taskCanBeImprove/${editedTask._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(currentTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEditedTask(null)
                refetch()
                toast.success('Task Updated!')
            })
    }
    return (
        <>
            <input type="checkbox" id="canBeImprove" className="modal-toggle" />
            <div className="modal">
                <form onSubmit={handleUpdateTask} className="modal-box relative">
                    <label
                        htmlFor="canBeImprove"
                        className="btn btn-sm btn-circle absolute right-2 top-2">
                        ✕
                    </label>
                    <h2 className='text-center text-2xl font-semibold mb-3'>Please Edit Your Task</h2>
                    <input
                        name="title"
                        type="text"
                        required
                        placeholder="Add Title" className="input input-bordered w-full mb-3" />
                    <textarea
                        name='description'
                        className="textarea textarea-bordered w-full"
                        placeholder="Task Description"
                        required
                    ></textarea>
                    <button className='btn btn-info border-0 text-black w-full mt-3 font-semibold'>Edit Task</button>
                </form>
            </div>
        </>
    );
};

export default CanBeImprovedModal;