import Image from "next/image";
import Link from "next/link";

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const team = teamsDetails[params.id];

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Link href="/teams" className="text-blue-600 hover:underline mb-4 block">
        ← Back to Teams
      </Link>

      <div className="flex items-center space-x-6 mb-8">
        <div className="relative w-24 h-24">
          <Image
            src={team.logo}
            alt={team.name}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{team.name}</h1>
          <p className="text-gray-600">
            {team.league} • {team.country}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Team Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Founded:</span> {team.founded}
            </p>
            <p>
              <span className="font-medium">Stadium:</span> {team.stadiumName}
            </p>
            <p>
              <span className="font-medium">Manager:</span> {team.manager}
            </p>
            <p>
              <span className="font-medium">Salary Cap:</span> $
              {team.salaryCap.toLocaleString()}
            </p>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Roster</h2>
          <div className="divide-y">
            {team.roster.map((player) => (
              <div key={player.id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{player.name}</h3>
                    <p className="text-gray-600">
                      {player.position} • #{player.number}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {player.nationality}
                    </p>
                    <p className="text-sm text-gray-600">Age: {player.age}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
