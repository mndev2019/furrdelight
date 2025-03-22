import React from "react";
import dog from "../assets/running.gif";

function Loader() {
    return (
        <div className="flex justify-center items-center h-screen w-full bg-white">
            <img src={dog} alt="Loading..." />
        </div>
    );
}

export default Loader;
