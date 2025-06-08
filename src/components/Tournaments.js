import { Trophy, CalendarDays } from "lucide-react";

export default function Tournaments() {
  const tournaments = [
    {
      title: "Battle Royale Clash",
      date: "June 1",
      details: "Prize Pool: 2 ETH | Entry: 0.02 ETH",
      icon: <Trophy className="w-6 h-6 text-yellow-600" />,
    },
    {
      title: "NFT Horse Sprint",
      date: "June 5",
      details: "Exclusive to NFT holders",
      icon: <CalendarDays className="w-6 h-6 text-pink-500" />,
    },
  ];

  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-serif text-center mb-10 drop-shadow-sm text-gray-800">
          🎯 Upcoming Tournaments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tournaments.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-100 border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                {t.icon}
                <h3 className="text-2xl font-semibold text-gray-800">{t.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-1 flex items-center">
                <CalendarDays className="w-4 h-4 mr-1 text-gray-400" />
                {t.date}
              </p>
              <p className="text-md text-emerald-600">{t.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
