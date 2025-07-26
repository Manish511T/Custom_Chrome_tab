import React from "react";
import Typewriter from "typewriter-effect";

const GreetingMessage = () => {
  return (
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-green-400 font-mono text-2xl z-50  px-6 py-4  max-w-3xl w-full text-center animate-fadeIn">
      <Typewriter
        options={{
          strings: [
            "Initializing system...",
            "Welcome back, Commander.",
            "All systems are online and functional.",
            "What task would you like to perform today?"
          ],
          autoStart: true,
          loop: true,
          delay: 45,
          deleteSpeed: 10,
          pauseFor: 2000
        }}
      />
    </div>
  );
};

export default GreetingMessage;
