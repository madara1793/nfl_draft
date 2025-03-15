import Link from "next/link";
import Image from "next/image";

export default function TeamsPage() {
  const teams = [
    {
      id: 1,
      teamname: "ARI",
      logo: "https://d9ioojyvhqpok.cloudfront.net/assets/logos/cardinals.svg",
    },
    {
      id: 2,
      teamname: "ATL",
      logo: "https://d9ioojyvhqpok.cloudfront.net/assets/logos/falcons.svg",
    },
    {
      id: 3,
      teamname: "BAL",
      logo: "https://d9ioojyvhqpok.cloudfront.net/assets/logos/ravens.svg",
    },
    {
      id: 4,
      teamname: "BUF",
      logo: "https://d9ioojyvhqpok.cloudfront.net/assets/logos/bills.svg",
    },
    {
      id: 5,
      teamname: "CAR",
      logo: "https://d9ioojyvhqpok.cloudfront.net/assets/logos/panthers.svg",
    },
    {
      id: 6,
      teamname: "CHI",
      logo: "https://d9ioojyvhqpok.cloudfront.net/assets/logos/bears.svg",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Football Teams</h1>
      <div className="grid grid-cols-8 md:grid-cols-4 lg:grid-cols-2 gap-6">
        {teams.map((team) => (
          <Link
            href={`/teams/teamoutline`}
            key={team.id}
            className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <Image
                  src={team.logo}
                  alt={team.teamname}
                  fill
                  className="object-contain"
                />
              </div>
              {team.teamname}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
