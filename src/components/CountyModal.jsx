import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { X } from "lucide-react";

import pathBounds from "svg-path-bounds";

export default function CountyModal({ countyId, onClose }) {
  const [data, setData] = useState(null);
  const [hoveredConstituency, setHoveredConstituency] = useState(null);

  function formatPosition(key) {
  const map = {
    governor: "Governor",
    deputy_governor: "Deputy Governor",
    senator: "Senator",
    women_rep: "Women Representative",
    mp: "MP"
  };
  return map[key] || key.replace("_", " ");
}
  

  useEffect(() => {
    if (!countyId) return;
    const fetchCountyData = async () => {
      try {
        const res = await axios.get(`/maps/counties/${countyId}`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch county data:", err);
      }
    };
    fetchCountyData();
  }, [countyId]);

  if (!data) return null;

  const { county, leaders, constituencies } = data;

  function getViewBoxFromPaths(paths) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  paths.forEach(d => {
    const [x0, y0, x1, y1] = pathBounds(d);
    minX = Math.min(minX, x0);
    minY = Math.min(minY, y0);
    maxX = Math.max(maxX, x1);
    maxY = Math.max(maxY, y1);
  });

  const width = maxX - minX;
  const height = maxY - minY;

  return `${minX} ${minY} ${width} ${height}`;
}

  const paths = constituencies.map(c => c.svgPath);
  const viewBox = getViewBoxFromPaths(paths);

  /*function getPathCentroid(d) {
    const [x0, y0, x1, y1] = pathBounds(d);
    return [(x0 + x1) / 2, (y0 + y1) / 2];
  }*/

    function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });
}


  return (
    <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 w-11/12 max-w-4xl rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 hover:scale-110 transition"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-left mb-6 dark:text-white">
          {county.name} County
        </h2>

        {/* Leaders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          {["governor", "deputy_governor", "senator", "women_rep"].map((role) => {
            const leader = leaders[role];
            if (!leader) return null;
            return (
              <div
                key={role}
                className="flex items-center gap-4 border-2 border-green-800 rounded-xl p-1 shadow hover:shadow-lg transition bg-gray-50 dark:bg-gray-800 mb-3 mr-4"
              >
                <img
                  src={leader.photo_url}
                  alt={leader.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {leader.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <div>
                       <p className="text-sm text-gray-800 dark:text-gray-300">
                            {formatPosition(role)}
                        </p>
                    </div>
                    <div>
                       <p className="text-xs text-black dark:text-gray-300"><span className="text-gray-600 text-xs dark:text-gray-500">Party: </span>{leader.party?.abbreviation}</p>
                    </div>
                </div>
                </div>
                
              </div>
            );
          })}
        </div>

        {/* Constituencies Map */}
        <div className="relative rounded-xl bg-gray-100 dark:bg-gray-800 p-4">
          <svg
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[500px]"
            preserveAspectRatio="xMidYMid meet"
          >
            {constituencies.map((c) => (
              <g key={c.id}>
                <path
                  id={c.name}
                  d={c.svgPath}
                  className={`stroke-gray-400 stroke-[0.02] ${
                    hoveredConstituency?.id === c.id
                      ? "fill-red-500"
                      : "fill-white dark:fill-gray-700"
                  }`}
                  onMouseEnter={() => {setHoveredConstituency(c)
                  }}
                  onMouseLeave={() => {setHoveredConstituency(null)
                }}
                  style={{ vectorEffect: "non-scaling-stroke", strokeWidth: 0.6 }}
                />
              </g>
            ))}
          </svg>

          {/* Hover MP Card */}
          {hoveredConstituency?.mp && (
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 border-2 border-red-500 rounded-xl shadow-lg p-1 pr-4 flex gap-4 items-center max-w-md">
              <img
                src={hoveredConstituency.mp.photo_url}
                alt={hoveredConstituency.mp.name}
                className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-300 capitalize mb-1">
                  {toTitleCase(hoveredConstituency.mp.name)}
                </h4>
                <div className="flex justify-between items-center gap-6">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          MP – {hoveredConstituency.name}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs dark:text-gray-400"><span className="text-gray-600 dark:text-gray-500">Party: </span>{hoveredConstituency.mp.party?.abbreviation}</p>
                    </div>
                </div>
              </div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
