import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { Toaster } from "react-hot-toast";
import { Search } from "lucide-react";

export default function Presidents() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [filterPosition, setFilterPosition] = useState("All Leaders");
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/presidents");
        setData(res.data);
        console.log("Presidents: ", res.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Fake current leaders cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
            >
              <div className="w-16 h-16 bg-gray-300 rounded-full" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-gray-300 rounded" />
                <div className="w-20 h-3 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Fake search/filter bar */}
        <div className="bg-white shadow rounded-lg p-4 space-y-3">
          <div className="w-full h-10 bg-gray-200 rounded" />
          <div className="w-full h-10 bg-gray-200 rounded" />
        </div>

        {/* Fake table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="w-full h-40 bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-500 text-white p-4 rounded-lg text-center">
        Failed to fetch national leaders
      </div>
    );
  }

  const { all_leaders, current_leaders } = data;

  // Filtered leaders for table
  const filteredLeaders = all_leaders.filter((leader) => {
    const matchesName = leader.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesPosition =
      filterPosition === "All Leaders" || leader.position === filterPosition;
    const matchesYear =
    !year ||
    (leader.start_year <= parseInt(year) &&
      (leader.end_year === null || leader.end_year >= parseInt(year)));

  return matchesName && matchesPosition && matchesYear;
  });

  const handleNameSearch = (searchName) => {
  setSearchName(searchName)
};

const handleYearSearch = (year) => {
    setYear(year)
};


  return (
    <div className="space-y-6 mx-12 my-6">
      <Toaster />

      {/* Current Leaders */}
      <h2 className="text-2xl font-semibold">Elected National Officials</h2>
      <div className="flex flex-wrap gap-4">
        {current_leaders.map((leader, idx) => (
          <div
            key={idx}
            className="flex items-center border-2 border-green-800 rounded-xl p-1 shadow hover:shadow-lg transition bg-gray-50 dark:bg-gray-800 mb-3 mr-4 w-[400px]"
          >
            <img
              src={leader.photo}
              alt={leader.name}
              className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-b-gray-700 mr-2"
            />
            <div>
              <h2 className="font-semibold text-lg">H.E. {leader.name}</h2>
              <p className="text-sm text-gray-600">{leader.position}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
<div className="bg-white shadow rounded-lg p-4 mb-6">
  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-4">
    {/* Name Search */}
    <div className="flex flex-1">
      <input
        type="text"
        placeholder="Search by name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="flex-1 border-y border-l border-gray-300 rounded-l-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
      <button
        type="button"
        onClick={() => handleNameSearch(searchName)}
        className="bg-white text-green-800 px-3 rounded-r-lg hover:bg-green-800 hover:text-white hover:scale-110 transition border-y border-r border-gray-300"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>

    {/* Position Filter (Dropdown) */}
    <div className="relative flex-1">
      <select
        value={filterPosition}
        onChange={(e) => setFilterPosition(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Leaders</option>
        <option value="President">President</option>
        <option value="Deputy President">Deputy President</option>
        <option value="Vice President">Vice President</option>
      </select>
    </div>

    {/* Year Filter */}
    <div className="flex flex-1 sm:w-40">
      <input
        type="number"
        placeholder="Search by year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="flex-1 border-y border-l border-gray-300 rounded-l-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
      <button
        type="button"
        onClick={() => handleYearSearch(year)}
        className="bg-white text-green-800 px-3 rounded-r-lg hover:bg-green-800 hover:text-white hover:scale-110 transition border-y border-r border-gray-300"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  </div>
</div>


      {/* Leaders Table */}
      <div className="bg-white shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white border-y-2 text-base">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Photo</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Position</th>
              <th className="px-4 py-3 text-left font-medium">Term</th>
              <th className="px-4 py-3 text-left font-medium">Party</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaders.map((leader, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-1">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-1">H.E. {leader.name}</td>
                <td className="px-4 py-1">{leader.position}</td>
                <td className="px-4 py-1">
                  {leader.start_year} – {leader.end_year || "Present"}
                </td>
                <td className="px-4 py-1">
                  {leader.party_abbreviation || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
