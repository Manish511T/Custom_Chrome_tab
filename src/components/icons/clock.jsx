import React, { useEffect, useState } from 'react';

const clock = () => {

    const [dateTime, setDateTime] = useState({
        time: '',
        date: '',
    });


    const updateTime = () => {
        const now = new Date();

        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });

        const date = now.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

        setDateTime({ time, date });
    };


    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-cyan-400 flex items-center gap-2 font-mono text-sm tracking-wide text-right">
            <div>⏱ {dateTime.time} |</div>
            <div className="text-xs text-cyan-300">{dateTime.date}</div>
        </div>
    )
}

export default clock