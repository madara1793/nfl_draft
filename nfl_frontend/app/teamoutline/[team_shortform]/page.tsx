"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";

type Player = {
  player_name: string;
  position: string;
  // Add other player properties as needed
};

type Team = {
  team_shortform: string;
  team_name: string;
  // Add other team properties as needed
};

type TeamOutlineData = {
  team: Team;
  players: Player[];
};

export default function TeamOutlinePage() {
  const params = useParams();
  const team_shortform = params.team_shortform as string;
  
  const [teamData, setTeamData] = useState<TeamOutlineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTeamOutline() {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/teams/${team_shortform}/outline`);
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
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Loading Team Data</h2>
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
    return <div className="container mx-auto p-6">No team data available</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
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
          
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {teamData.team.team_name || teamData.team.team_shortform}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Team Code: {teamData.team.team_shortform}
            </p>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Team Roster</h2>
      
      {teamData.players.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            No players available for this team
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamData.players.map((player, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                {player.player_name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium">
                {player.position}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
