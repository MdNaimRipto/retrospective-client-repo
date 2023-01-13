import React from 'react';

const DetailsModal = ({ updatedTask }) => {
    console.log(updatedTask);
    return (
        <>
            <input type="checkbox" id="taskDetails" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="taskDetails"
                        className="btn btn-sm btn-circle absolute right-2 top-2">
                        ✕
                    </label>
                    <h2 className='text-2xl font-semibold mb-3'>{updatedTask?.title}</h2>
                    <p className='font-bold text-sm text-gray-500 mb-2'>{updatedTask?.addedTime}</p>
                    <p className='text-justify'>{updatedTask?.task}</p>
                </div>
            </div>
        </>
    );
};

export default DetailsModal;