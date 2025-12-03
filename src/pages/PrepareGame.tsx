import React, { useState, useContext, useEffect } from "react";
import { GameSettingContext } from "../context/GameSettingContext";
import wordsData from "../data/words.json";
import { Toggle } from "../components/Toogle";
import { useNavigate } from "react-router-dom";
const PrepareGame = () => {
  const { addPlayer, removePlayer, players, nextGame, setGameSetting, impostorsHint: contextImpostorHint, allowAllImpostors: contextAllowAllImpostors, category, numImpostors: contextNumImpostors } = useContext(GameSettingContext);

  const [name, setName] = useState<string>("");
  const categories = Object.keys(wordsData);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(category || []);
  const [allowAllImpostors, setAllowaAllImpostors] = useState<boolean>(contextAllowAllImpostors || false);
  const [impostorsHint, setImpostorsHint] = useState<boolean>(contextImpostorHint || false);
  const [numImpostors, setNumImpostors] = useState<number>(contextNumImpostors || 1);

  const navigate = useNavigate();

  const toogleCategory = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name)
        ? prev.filter((c) => c !== name)
        : [...prev, name]
    );
  };

  const handleSubmitPlayer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim().length === 0) return;
    addPlayer(name);
    setName("");
  };

  const handleSubmitStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGameSetting({
      numImpostors,
      selectedCategories,
      allowAllImpostors,
      impostorsHint,
    });
    nextGame();
    navigate("/play");
  };

  const inputClass =
    "bg-gray-800 text-white border border-gray-600 rounded-md p-2 outline-none focus:border-purple-400 transition w-full max-w-xs";

  const buttonClass =
    "px-4 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-md text-white font-semibold";

  return (
    <div className="flex flex-col h-full p-4 gap-4">

      <form
        onSubmit={handleSubmitPlayer}
        className="flex gap-2 items-center justify-center sm:justify-start"
      >
        <input
          type="text"
          placeholder="Wprowadź imię"
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className={buttonClass}>
          Dodaj
        </button>
      </form>

      <div className="flex flex-col sm:flex-row gap-4 h-full">

        <div
          className={`${
            players.length > 0 ? "flex" : "hidden"
          } flex-col bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-4 sm:w-1/3 overflow-auto`}
        >
          <p className="text-xl font-semibold text-center mb-3 text-purple-300">
            GRACZE
          </p>

          <div className="flex flex-col gap-2">
            {players.map((p, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-700 border border-gray-600 rounded-md p-2 items-center"
              >
                <span className="capitalize text-lg font-medium text-white">
                  {p}
                </span>
                <button
                  onClick={() => removePlayer(index)}
                  className="text-red-400 hover:text-red-200 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-4 sm:w-2/3 overflow-auto">
          <p className="text-xl font-semibold text-center text-purple-300 mb-3">
            USTAWIENIA
          </p>

          <form
            onSubmit={handleSubmitStart}
            className="flex flex-col gap-4 text-lg"
          >
            <div>
              <label className="font-medium">Kategorie:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => toogleCategory(cat)}
                    className={`cursor-pointer px-3 py-2 rounded-lg border text-center transition ${
                      selectedCategories.includes(cat)
                        ? "bg-purple-600 border-purple-400 text-white"
                        : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="font-medium">Liczba impostorów:</label>
              <select
                value={numImpostors}
                className="bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white"
                onChange={(e) => setNumImpostors(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Wszyscy impostorzy:</span>
              <Toggle
                value={allowAllImpostors}
                onChange={setAllowaAllImpostors}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Wskazówka dla impostorów:</span>
              <Toggle
                value={impostorsHint}
                onChange={setImpostorsHint}
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 transition rounded-lg text-white font-bold w-1/2"
              >
                START
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrepareGame;
