import React from "react";

function Dashboard() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="bg-surface p-7 md:p- mt-0 w-full overflow-y-auto custom-scrollbar text-gray-600">
            <div className="flex justify-between items-center mb-4 md:mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-primary">
                    Welcome back!
                </h1>
                <span className="text-primary text-lg md:text-2xl">
                    {currentDate}
                </span>
            </div>
        </div>
    );
}

export default Dashboard;
