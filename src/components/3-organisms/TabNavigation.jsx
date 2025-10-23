function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "dados", label: "Dados do Curso" },
    { id: "instrutores", label: "Instrutores" },
    { id: "aulas", label: "Aulas" },
  ];

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-[#34D399] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TabNavigation;
