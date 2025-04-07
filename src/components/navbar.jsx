import useGameStore from "../stores/game-store";

export const Navbar = () => {
  const { resetGame } = useGameStore((state) => state.resetGame);

  return (
    <nav className="flex justify-between items-center w-full px-4 py-2 text-white">
      {/* Logo à gauche */}
      <div className="logo">
        <a href="#" className="account-btn">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="3" />
            <path
              d="M15 20H25M25 20L21 16M25 20L21 24"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Boutons au centre */}
      <div className="flex space-x-4 text-[0.8vw]">
        <button className="navButton">
          <strong>Statistiques</strong>
        </button>
        <button className="navButton">
          <strong>Améliorations</strong>
        </button>
        <button className="navButton">
          <strong>Classement</strong>
        </button>
        <button className="navButton">
          <strong>Boutique</strong>
        </button>
      </div>

      {/* Bouton Ascension à droite */}
      <button onClick={resetGame} className="blackout text-[0.8vw]">
        <strong>Black Out</strong>
      </button>
    </nav>
  );
};
