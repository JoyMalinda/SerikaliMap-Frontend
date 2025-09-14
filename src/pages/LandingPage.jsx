import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { Search } from "lucide-react";
import NavBar from "../components/NavBar";
import SearchResult from "../components/SearchResult";
import CountyModal from "../components/CountyModal";
import Presidents from "../components/PresidentsTable";

export default function LandingPage() {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const [counties, setCounties] = useState([]);
  const [hoveredCounty, setHoveredCounty] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, visible: false });

  const [selectedCountyId, setSelectedCountyId] = useState(null);

  // Fetch map data
  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const res = await axios.get("/maps/counties");
        setCounties(res.data);
      } catch (err) {
        console.error("Failed to fetch counties:", err);
      }
    };
    fetchCounties();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await axios.post("/location_search", { place: query });
      setSearchData(res.data);
      setShowResult(true);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };
  

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-6 py-12 lg:px-16 bg-green-100">
    <NavBar />
      {/* Left Side */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Who Leads Where You Live?
        </h1>
        <p className="text-3xl text-gray-600 max-w-xl my-12">
          Discover your <span className="italic text-black">elected</span> officials, past and present. Search by name,
          county, or party and explore Kenya’s political history.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-lg border rounded-xl overflow-hidden bg-green-100"
        >
          <input
            type="text"
            placeholder="Search a location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 text-gray-700 outline-none"
          />
          <button
            type="submit"
            className="bg-green-200 hover:bg-green-800 text-green-800  hover:text-white transition px-4 flex items-center justify-center border-l"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* On mobile, map moves here */}
        <div className="lg:hidden w-full h-[400px] flex items-center justify-center bg-green-100 rounded-xl relative overflow-hidden">
          <svg
            viewBox="33 -5 10 10"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
             preserveAspectRatio="xMidYMid meet"
            onMouseMove={(e) => {
              const bounds = e.currentTarget.getBoundingClientRect();
              setTooltip((prev) => ({
                ...prev,
                x: e.clientX - bounds.left,
                y: e.clientY - bounds.top,
              }))
            }}
          >
            {counties.map((county) => (
              <path
                key={county.id}
                d={county.svgPath}
                className={`stroke-gray-300 stroke-[0.02] 
                  ${hoveredCounty?.id === county.id 
                    ? "fill-red-500" 
                    : "fill-white dark:fill-gray-700"}`}
                stroke="lightgray"
                strokeWidth="0.02"
                onMouseEnter={() => {
                  setHoveredCounty(county);
                  setTooltip((prev) => ({ ...prev, visible: true }));
                }}
                onMouseLeave={() => {
                  setHoveredCounty(null);
                  setTooltip((prev) => ({ ...prev, visible: false }));
                }}
                onClick={() => {
                  setSelectedCountyId(county.id)
                  console.log("Clicked county:", county.name);
                }}
              />
            ))}
          </svg>

          {/* Tooltip */}
          {tooltip.visible && hoveredCounty && (
            <div
              className="absolute bg-white dark:bg-gray-800 shadow px-2 py-1 rounded text-sm text-gray-800 pointer-events-none border-2 border-red-500"
              style={{ top: tooltip.y + 10, left: tooltip.x + 10}}
            >
              <p className="text-base dark:text-white"><span className="text-xs">{hoveredCounty.code}</span> {hoveredCounty.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side (desktop only) */}
      <div className="hidden lg:block w-full h-[500px] bg-green-100 rounded-xl relative overflow-hidden m-3">
        <svg
          viewBox="33 -5 10 10"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          onMouseMove={(e) => {
            const bounds = e.currentTarget.getBoundingClientRect();
            setTooltip((prev) => ({
              ...prev,
              x: e.clientX - bounds.left,
              y: e.clientY - bounds.top,
            }))
          }}
        >
          {counties.map((county) => (
            <path
              key={county.id}
              d={county.svgPath}
              className={`stroke-gray-300 stroke-[0.02] 
                ${hoveredCounty?.id === county.id 
                ? "fill-red-500" 
                : "fill-white dark:fill-gray-700"}`}
              stroke="lightgray"
              strokeWidth="0.02"
              onMouseEnter={() => {
                setHoveredCounty(county);
                setTooltip((prev) => ({ ...prev, visible: true }));
              }}
              onMouseLeave={() => {
                setHoveredCounty(null);
                setTooltip((prev) => ({ ...prev, visible: false }));
              }}
              onClick={() => {
                setSelectedCountyId(county.id)
                console.log("Clicked county:", county.name);
              }}
            />
          ))}
        </svg>

        {/* Tooltip */}
        {tooltip.visible && hoveredCounty && (
          <div
            className="absolute bg-white dark:bg-gray-900 shadow px-2 py-1 rounded text-sm text-gray-800 pointer-events-none border-2 border-red-500"
            style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
          >
            <p className="text-base dark:text-white"><span className="text-xs">{hoveredCounty.code}</span> {hoveredCounty.name}</p>
          </div>
        )}
      </div>

      {/* Search Result Modal */}
      {showResult && (
        <SearchResult
          query={query}
          data={searchData}
          onClose={() => setShowResult(false)}
        />
      )}

      {/* County Modal */}
      {selectedCountyId && (
        <CountyModal countyId={selectedCountyId} onClose={() => setSelectedCountyId(null)} />
      )}

    </section>
    <Presidents />
    </div>
  );
}
