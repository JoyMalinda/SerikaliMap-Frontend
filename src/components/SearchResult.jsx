import React from "react";
import { X } from "lucide-react";

function formatPosition(key) {
  const map = {
    governor: "Governor",
    dep_governor: "Deputy Governor",
    senator: "Senator",
    women_rep: "Women Representative",
    mp: "MP"
  };
  return map[key] || key.replace("_", " ");
}

export default function SearchResult({ query, data, onClose }) {
  const { location, leaders } = data || {};

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-2xl shadow-lg p-6 space-y-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Location Info */}
        <div>
          <p className="text-xl font-normal text-gray-800 dark:text-white">
            <span className="font-normal italic">{query}</span> is in <span className="font-medium">{location.constituency}</span> Constituency, <span className="font-medium">{location.county}</span> County
          </p>
        </div>
        <div>
          <p className="text-gray-600 font-bold text-xl dark:text-gray-400">Leaders</p>
        </div>

        {/* Leaders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leaders &&
            Object.entries(leaders).map(([position, leader]) => (
              <div
                key={position}
                className="flex items-center border-2 border-green-800 rounded-xl shadow-sm p-1 mb-4 bg-gray-50 dark:bg-gray-800"
              >
                <img
                  src={leader.photo_url}
                  alt={leader.name}
                  className="w-15 h-15 object-cover rounded-lg border border-gray-200"
                />
                {/* Left: Name + Position */}
                <div className="flex-1 ml-4">
                  
                  <div className="mb-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{leader.name}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm dark:text-gray-200">{formatPosition(position)}</p>
                    </div>
                    <div>
                       <p className="text-gray-600 text-sm flex items-center gap-1 dark:text-gray-500">
                        Party:
                        <span className="text-black dark:text-gray-300">{leader.abbreviation}</span>
                       </p>
                    </div>
                  </div>
                  
                </div>   
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
