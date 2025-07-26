import React, { useEffect, useState } from 'react';

const wifi = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div className={`px-2 py-1 rounded flex items-center gap-1 text-sm font-mono ${isOnline ? ' text-blue-500' : ' text-red-500 animate-pulse'
            }`}>
            <i className={`ri-${isOnline ? 'wifi-fill ' : 'wifi-off-line'}`}></i>
            {isOnline ? 'Online' : 'Offline'}
        </div>
    )
}

export default wifi