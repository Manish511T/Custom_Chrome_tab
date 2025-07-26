import React, { useEffect, useState } from 'react';

const battery = () => {
    const [batteryLevel, setBatteryLevel] = useState(1); // 100%
    const [charging, setCharging] = useState(false);

    useEffect(() => {
        navigator.getBattery().then(battery => {
            // Set initial values
            setBatteryLevel(battery.level);
            setCharging(battery.charging);

            // Listen for changes
            battery.addEventListener('levelchange', () => {
                setBatteryLevel(battery.level);
            });

            battery.addEventListener('chargingchange', () => {
                setCharging(battery.charging);
            });
        });
    }, []);

    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="flex items-center gap-2 text-white">
                <div className="text-sm h-full w-fit flex items-center justify-center">
                    {charging ? (
                        <i className="ri-battery-2-charge-fill text-green-400"></i>
                    ) : (
                        <div className="h-full w-fit">
                           <i className="ri-battery-2-fill"></i>
                        </div>
                    )}
                    &nbsp;{Math.round(batteryLevel * 100)}%
                </div>
            </div>
        </div>

    )
}

export default battery