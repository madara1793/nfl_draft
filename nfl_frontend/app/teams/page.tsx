"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

type TeamType = {
  team_shortform: string;
};

export default function TeamsPage() {
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/teams/");
        console.log("API Response:", response.data);

        // Check if the data has a teams property
        if (response.data && response.data.teams) {
          setTeams(response.data.teams);
        } else {
          console.error("Unexpected API response format:", response.data);
          setError("Unexpected data format from API");
        }
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError("Failed to load teams");
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  if (loading)
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-r-4 border-l-4 border-transparent border-opacity-50 animate-pulse"></div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Loading Teams
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
            Preparing your NFL team selection experience...
          </p>
        </div>
      </div>
    );
  if (error)
    return <div className="container mx-auto p-6 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Back button at the top */}
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
        Select Your Team
      </h1>

      {teams.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">
            No teams available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
          {teams.map((team, index) => (
            <Link
              key={index}
              href={`/teamoutline/${team.team_shortform}`}
              className="group flex flex-col items-center p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-400 dark:hover:border-blue-500"
            >
              <div className="relative w-20 h-20 mb-4 transition-transform duration-300 group-hover:scale-110">
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                <Image
                  src={`https://d1dglpr230r57l.cloudfront.net/images/thumb/${
                    team.team_shortform === "JAC"
                      ? "jax"
                      : team.team_shortform.toLowerCase()
                  }.png`}
                  alt={team.team_shortform}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-1"
                />
              </div>
              <span className="text-center font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {team.team_shortform}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
