import React, { useState, useEffect } from 'react';

const getRandomUsage = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


const systemLoad = () => {
    const [cpu, setCPU] = useState(getRandomUsage(20, 70));
    const [ramUsed, setRamUsed] = useState(getRandomUsage(1, 6));

    useEffect(() => {
        const interval = setInterval(() => {
            setCPU(getRandomUsage(20, 90));
            setRamUsed(getRandomUsage(1, 7)); // out of 8GB
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="text-green-400 font-mono text-sm flex gap-4 items-center">
            <div><i class="ri-cpu-line text-blue-400"></i> CPU: {cpu}%</div>
            <div><i class="ri-ram-2-fill text-gray-400"></i> RAM: {ramUsed}.0GB / 8GB</div>
        </div>
    )
}

export default systemLoad