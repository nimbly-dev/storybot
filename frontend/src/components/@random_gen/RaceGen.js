


export const generateRandomRace = (setCharacterRace)=>{
    const supporedRaceList = [
        "Human","Elf", "Dwarf", "Orc"
    ]
    setCharacterRace(supporedRaceList[Math.floor(Math.random() * supporedRaceList.length)])
} 