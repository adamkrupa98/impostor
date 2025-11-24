import { createContext } from "react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useEffect } from "react";
import wordsData from "../data/words.json";

type GameSettingProvider = {
    children: ReactNode
}

type Role = {
    name: string,
    role: 'impostor' | 'civilian'
}

type Setting = {
    numImpostors: number,
    selectedCategories: string[],
    allowAllImpostors: boolean,
    impostorsHint: boolean,
}


type GameSettingContextType = {
    players: string[],
    numPlayers: number,
    numImpostors: number,
    category: string[],
    allowAllImpostors: boolean,
    impostorsHint: boolean,
    word: string,
    hint: string,
    startGame: boolean,
    roles: Role[],
    addPlayer: (name: string) => void,
    removePlayer: (name: string) => void,
    setGameSetting: (settings: Setting) => void,
    resetGame: () => void,
    start: () => void
}

export const GameSettingContext = createContext<GameSettingContextType>({
    players: [],
    numPlayers: 0,
    numImpostors: 0,
    category: [],
    allowAllImpostors: false,
    impostorsHint: false,
    word: '',
    hint : '',
    startGame: false,
    roles: [],
    addPlayer: () => {},
    removePlayer: () => {},
    setGameSetting: () => {},
    resetGame: () => {},
    start: () => {}
});


export const GameSettingProvider = ( {children} : GameSettingProvider) => {
    const [players, setPlayers] = useState<string[]>([]);
    const [numPlayers, setNumPlayers] = useState<number>(0);
    const [numImpostors, setNumImpostors] = useState<number>(0);
    const [category, setCategory] = useState<string[]>([]);
    const [allowAllImpostors, setAllowaAllImpostors] = useState<boolean>(false);
    const [impostorsHint, setImpostorsHint] = useState<boolean>(false);
    const [startGame, setStartGame] = useState<boolean>(false);
    const [word, setWord] = useState<string>('');
    const [hint, setHint] = useState<string>('');
    const [roles, setRoles] = useState<Role[]>([]);


    const addPlayer = (name:string) => {
        setPlayers(prev => [...prev, name]);
        setNumPlayers(prev => prev +1);
    }

    const removePlayer = (name: string) => {
        setPlayers(prev => prev.filter(player => player != name));
        setNumPlayers(prev => prev -1);
    }

    const setGameSetting = (settings: Setting) => {
        setNumImpostors(settings.numImpostors);
        setCategory(settings.selectedCategories);
        setAllowaAllImpostors(settings.allowAllImpostors);
        setImpostorsHint(settings.impostorsHint);
    } 
    const resetGame = () =>{
        setPlayers([]);
        setNumPlayers(0);
        setNumImpostors(0);
        setCategory([]);
        setAllowaAllImpostors(false);
        setImpostorsHint(false);
        setWord('');
        setRoles([]);
    }

    const selectRolesForPlayers = () => {
      let newRoles: Role[] = [];
      const copyPlayers = [...players];
      let draw = Math.random();

      if (allowAllImpostors == true && draw < 0.1) {
        copyPlayers.forEach(player => {
            newRoles.push({name: player, role: 'impostor'})
        })
      } else {
        for (let i = 0; i< numImpostors; i++) {
            let randomIndex = Math.floor(Math.random() * copyPlayers.length);
            let impostor = copyPlayers[randomIndex];
            newRoles.push({name:impostor, role: 'impostor'});
            copyPlayers.splice(randomIndex,1);
        }
        copyPlayers.forEach(player => {
            newRoles.push({name: player, role: 'civilian'})
        })
      }
      setRoles(newRoles);
    }

    const selectWord = () =>{
        const possibleWords = category.flatMap(cat => wordsData[cat as keyof typeof wordsData]);
        if (possibleWords.length === 0) return;
        const indexWord:number = Math.floor(Math.random() * possibleWords.length);
        const indexHint:number = Math.floor(Math.random() * 2);
        let selectedWord = possibleWords[indexWord].word;
        let selectedHint = possibleWords[indexWord].hints[indexHint];
        setWord(selectedWord);
        setHint(selectedHint);
    }

    const start = () => {
        selectRolesForPlayers();
        selectWord();
        setStartGame(true);
    };

    useEffect(() => {
    if (players.length && numImpostors && category.length) {
        start();
    }
}   , [players, numImpostors, category]);

    useEffect(() => {
        console.log("WORD UPDATED:", word, hint);
    }, [word, hint]);
    return(
<GameSettingContext.Provider value={{
  players,
  numPlayers,
  numImpostors,
  category,
  allowAllImpostors,
  impostorsHint,
  word,
  hint,
  startGame,
  roles,
  addPlayer,
  removePlayer,
  setGameSetting,
  resetGame,
  start
}}>
    {children}
   </GameSettingContext.Provider>
)}