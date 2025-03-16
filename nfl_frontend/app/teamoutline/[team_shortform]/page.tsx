"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

type Player = {
  player_name: string;
  position: string;
  age: number;
  cap_hit: number;
  cap_hit_percent: number;
  base_salary: number;
  signing_bonus: number;
  game_bonus: number;
  dead_cap: number;
  // Add other player properties as needed
};

type Team = {
  team_shortform: string;
  team_name: string;
  total_cap: number;
  top_51: number;
  team_cap_space: number;
  offense_cap: number;
  defense_cap: number;
  special_cap: number;
  // Add other team properties as needed
};

type TeamOutlineData = {
  team: Team;
  players: Player[];
};

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to format percentage
const formatPercent = (value: number) => {
  return `${value.toFixed(2)}%`;
};

export default function TeamOutlinePage() {
  const params = useParams();
  const router = useRouter();
  const team_shortform = params.team_shortform as string;

  const [teamData, setTeamData] = useState<TeamOutlineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTeamOutline() {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/teams/${team_shortform}/outline/`
        );
        console.log("API Response:", response.data);
        setTeamData(response.data);
      } catch (err) {
        console.error("Error fetching team outline:", err);
        setError("Failed to load team data");
      } finally {
        setLoading(false);
      }
    }

    if (team_shortform) {
      fetchTeamOutline();
    }
  }, [team_shortform]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-r-4 border-l-4 border-transparent border-opacity-50 animate-pulse"></div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Loading Team Data
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
            Preparing team information for {team_shortform}...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-500">{error}</div>;
  }

  if (!teamData) {
    return (
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
          No data available
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
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

      {/* Team Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-32 h-32">
            <Image
              src={`https://d1dglpr230r57l.cloudfront.net/images/thumb/${
                teamData.team.team_shortform === "JAC"
                  ? "jax"
                  : teamData.team.team_shortform.toLowerCase()
              }.png`}
              alt={teamData.team.team_shortform}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {teamData.team.team_name || teamData.team.team_shortform}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Team Code: {teamData.team.team_shortform}
            </p>

            {/* Team Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Cap
                </p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {formatCurrency(teamData.team.total_cap)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Top 51
                </p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {formatCurrency(teamData.team.top_51)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cap Space
                </p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(teamData.team.team_cap_space)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cap Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Cap Distribution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-1">
              Offense
            </h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(teamData.team.offense_cap)}
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-1">
              Defense
            </h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(teamData.team.defense_cap)}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-1">
              Special Teams
            </h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(teamData.team.special_cap)}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Team Roster
      </h2>

      {teamData.players.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            No players available for this team
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Cap Hit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Cap %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Base Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Signing Bonus
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Game Bonus
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Dead Cap
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {teamData.players.map((player, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {player.player_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {player.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {player.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {formatCurrency(player.cap_hit)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {formatPercent(player.cap_hit_percent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {formatCurrency(player.base_salary)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {formatCurrency(player.signing_bonus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {formatCurrency(player.game_bonus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {formatCurrency(player.dead_cap)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}