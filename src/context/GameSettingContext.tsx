import { Children, createContext } from "react";
import type { Provider } from "react";
import type { ReactNode } from "react";
import { useState } from "react";

type GameSettingProvider = {
    children: ReactNode
}

type Role = {
    name: string,
    role: 'impostor' | 'civilian'
}

type Setting = {
    numImpostors: number,
    categories: string[],
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
    roles: Role[],
    addPlayer: (name: string) => void,
    removePlayer: (name: string) => void,
    setGameSetting: (settings: Setting) => void,
    resetGame: () => void,
    startGame: () => void
}

export const GameSettingContext = createContext<GameSettingContextType>({
    players: [],
    numPlayers: 0,
    numImpostors: 0,
    category: [],
    allowAllImpostors: false,
    impostorsHint: false,
    word: '',
    roles: [],
    addPlayer: () => {},
    removePlayer: () => {},
    setGameSetting: () => {},
    resetGame: () => {},
    startGame: () => {}
});


export const GameSettingProvider = ( {children} : GameSettingProvider) => {
    const [players, setPlayers] = useState<string[]>([]);
    const [numPlayers, setNumPlayers] = useState<number>(0);
    const [numImpostors, setNumImpostors] = useState<number>(0);
    const [category, setCategory] = useState<string[]>([]);
    const [allowAllImpostors, setAllowaAllImpostors] = useState<boolean>(false);
    const [impostorsHint, setImpostorsHint] = useState<boolean>(false);
    const [word, setWord] = useState<string>('');
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
        setCategory(settings.categories);
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
      let roles = [];
      const copyPlayers = [...players];
      
      for (let i = 0; i< numImpostors; i++) {
        let randomIndex = Math.floor(Math.random() * copyPlayers.length);
        let impostor = copyPlayers[i];
        roles.push({name:impostor, role: 'impostor'});
        copyPlayers.splice(randomIndex,1);
      }

      copyPlayers.forEach(player => {
        roles.push({name: player, role: 'civilian'})
      })
    }

    const selectWord = () => {
        const loadWord = async() =>{
            const res = await fetch("./data/words.json")
            const data = await res.json();
            console.log(data);
        }
    }

    const startGame = () => {
        selectRolesForPlayers();
        selectWord()

    }

    return(
<GameSettingContext.Provider value={{
  players,
  numPlayers,
  numImpostors,
  category,
  allowAllImpostors,
  impostorsHint,
  word,
  roles,
  addPlayer,
  removePlayer,
  setGameSetting,
  resetGame,
  startGame
}}>
    {children}
   </GameSettingContext.Provider>
)}