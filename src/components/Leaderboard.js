export default function Leaderboard() {
  const players = [
    { name: "CryptoKnight", points: "1200 VP" },
    { name: "MetaGambler", points: "1100 VP" },
    { name: "HorseLord", points: "1040 VP" },
  ];

  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-serif mb-10 text-center text-gray-800 drop-shadow-md">
          🏆 Top Players This Week
        </h2>
        <ul className="space-y-5">
          {players.map((p, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-gray-100 p-5 rounded-2xl border border-gray-300 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-yellow-600">
                  #{idx + 1}
                </span>
                <span className="text-lg font-semibold text-gray-800">
                  {p.name}
                </span>
              </div>
              <span className="text-lg font-medium text-emerald-600">
                {p.points}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
