import React from 'react';
import { ClockLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <ClockLoader color="#ffb66e" />
        </div>
    );
};

export default Loader;