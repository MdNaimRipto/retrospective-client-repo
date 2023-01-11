import React from 'react';
import ActionTasks from './ActionTasks';
import CanImprovedTask from './CanImprovedTask';
import StartDoingTask from './StartDoingTask';
import WellTasks from './WellTasks';

const Home = () => {
    return (
        <div>
            <WellTasks />
            <CanImprovedTask />
            <StartDoingTask />
            <ActionTasks />
        </div>
    );
};

export default Home;