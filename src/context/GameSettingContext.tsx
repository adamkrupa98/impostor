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
    gameCounter: number,
    addPlayer: (name: string) => void,
    removePlayer: (name: number) => void,
    setGameSetting: (settings: Setting) => void,
    resetGame: () => void,
    start: () => void,
    nextGame: () => void
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
    gameCounter: 0,
    addPlayer: () => {},
    removePlayer: () => {},
    setGameSetting: () => {},
    resetGame: () => {},
    start: () => {},
    nextGame: () => {}
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
    const [gameCounter, setGameCounter] = useState<number>(0)

    const addPlayer = (name:string) => {
        setPlayers(prev => [...prev, name]);
        setNumPlayers(prev => prev +1);
    }

    const removePlayer = (index: number) => {
        let copyPlayers = [...players];
        copyPlayers.splice(index,1);
        setPlayers(copyPlayers);
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

    const nextGame = () => {
        setGameCounter(prev => prev + 1);
    }
    const selectRolesForPlayers = () => {
      let newRoles: Role[] = [];
      const copyPlayers = [...players];
      let draw = Math.random();
      let impostorsIndex: number[] = [];
      if (allowAllImpostors == true && draw < 0.1) {
        copyPlayers.forEach(player => {
            newRoles.push({name: player, role: 'impostor'})
        })
      } else {
        for (let i = 0; i< numImpostors; i++) {
            let randomIndex;
               do {
                randomIndex = Math.floor(Math.random() * copyPlayers.length);
            } while (impostorsIndex.includes(randomIndex));

            impostorsIndex.push(randomIndex);   
        }

        for (let i = 0; i < copyPlayers.length; i++) {
            newRoles[i] = impostorsIndex.includes(i)
                ? { name: copyPlayers[i], role: "impostor" }
                : { name: copyPlayers[i], role: "civilian" };
                }
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
}   , [players, numImpostors, category, gameCounter]);

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
  gameCounter,
  addPlayer,
  removePlayer,
  setGameSetting,
  resetGame,
  start,
  nextGame
}}>
    {children}
   </GameSettingContext.Provider>
)}