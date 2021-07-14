
import { useEffect } from "react"
import { useState, useRef } from "react"
import { URL_ROUTERS } from "../utility/strings"
import Navigation from "./@navigation/Navigation"

//Random GEN Routers
import {axiosHumanLastname, axiosMaleHumanFirstname} from "./@random_gen/HumanGen"
import { axiosElfLastname, axiosElfMaleFirstname } from "./@random_gen/ElfGen"
import { axiosDwarfLastname, axiosMaleDwarfFirstname } from "./@random_gen/DwarfGen"
import { axiosMaleOrcName } from "./@random_gen/OrcGen"

import { generateRandomRace } from "./@random_gen/RaceGen"
import { axiosGenerateClass } from "./@random_gen/ClassGen"
import { axiosGenFaction } from "./@random_gen/FactionGen"

//Import third party libraries

const AddStory = ()=>{

    const [characterFirstName, setCharacterFirstName] = useState('')
    const [characterLastName, setCharacterLastName] = useState('')
    const [characterClass, setCharacterClass] = useState('')
    const [characterRace, setCharacterRace] = useState('')
    const [characterEnemyFaction, setCharacterEnemyFaction] = useState('')

    const handleOnclickRandomFirstname = (setCharacterFirstName)=>{
        //Default is Human firstname
        return (characterRace === 'Human')
        ? ()=>axiosMaleHumanFirstname(setCharacterFirstName) :

        (characterRace === 'Elf')
        ? ()=>axiosElfMaleFirstname(setCharacterFirstName)   :

        (characterRace === 'Dwarf')
        ? ()=>axiosMaleDwarfFirstname(setCharacterFirstName) :

        (characterRace === 'Orc')
        ? ()=>axiosMaleOrcName(setCharacterFirstName)

        : ()=>axiosMaleHumanFirstname(setCharacterFirstName)
    }

    const handleOnClickRandomLastname = (setCharacterLastName)=>{
        //Default is Human lastname
        return (characterRace === 'Human')
        ? ()=>axiosHumanLastname(setCharacterLastName) :

        (characterRace === 'Elf')
        ? ()=>axiosElfLastname(setCharacterLastName)   :

        (characterRace === 'Dwarf')
        ? ()=>axiosDwarfLastname(setCharacterLastName) :

        (characterRace === 'Orc')
        ? ()=>axiosMaleOrcName(setCharacterLastName)

        : ()=>axiosHumanLastname(setCharacterLastName)
    }    

    return(
        <main>
            <Navigation currentPage={'Add Story'}/>
            <section className='container'>
                <div className='row container d-flex justify-content-center'>
                    <div className='col-md-auto'>
                        <h4>Add a background story</h4>
                    </div>
                </div>
                <div className='row container d-flex justify-content-between'>
                       
                        <div className='col-md-6 column'>
                            <h4>COL 1</h4>  
                            
                            {/*FOR CHARACTER FIRSTNAME*/}
                            <div class="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={characterFirstName}
                                    onChange={e=>setCharacterFirstName(e.currentTarget.value)}
                                    placeholder="Enter character first name"
                                />
                                <div className="input-group-append">
                                    <button 
                                    className="btn btn-primary" 
                                    onClick={handleOnclickRandomFirstname(setCharacterFirstName)}
                                    type="button">Random!</button>
                                </div>
                            </div>

                            {/*FOR CHARACTER CLASS*/}
                            <div class="input-group mb-3">
                                <input 
                                    type="text" 
                                    value={characterClass}
                                    onChange={e=>setCharacterClass(e.currentTarget.value)}
                                    className="form-control" 
                                    placeholder="Enter character class"/>
                                <div className="input-group-append">
                                    <button 
                                    onClick={()=>axiosGenerateClass(setCharacterClass)}
                                    className="btn btn-primary" 
                                    type="button">Random!</button>
                                </div>
                            </div>

                            {/*FOR CHARACTER ENEMY FACTION*/}
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={characterEnemyFaction}
                                    onChange={e=>setCharacterEnemyFaction(e.currentTarget.value)}
                                    placeholder="Enter character enemy faction"
                                />
                                <div className="input-group-append">
                                    <button 
                                        className="btn btn-primary" 
                                        type="button"
                                        onClick={()=>axiosGenFaction(setCharacterEnemyFaction)}>Random!
                                    </button>
                                </div>
                            </div>
                        </div>
                            
                        
                        
                        <div className='col-md-6 column'>
                            <h4>COL 2</h4>

                            {/*FOR CHARACTER LAST NAME*/}
                            <div class="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter character last name"
                                    value={characterLastName}
                                    onChange={e=>setCharacterLastName(e.currentTarget.value)}
                                />
                                <div className="input-group-append">
                                    <button 
                                    onClick={handleOnClickRandomLastname(setCharacterLastName)}
                                    className="btn btn-primary" 
                                    type="button">
                                        Random!
                                    </button>
                                </div>
                            </div>

                            {/*FOR CHARACTER RACE*/}
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={characterRace}
                                    onChange={e=>setCharacterRace(e.currentTarget.value)}
                                    placeholder="Enter character race"/>
                                <div class="input-group-append">
                                    <button 
                                    className="btn btn-primary" 
                                    type="button"
                                    onClick={()=>generateRandomRace(setCharacterRace)}
                                    >Random!
                                    </button>
                                </div>
                            </div>

                            {/*FOR CHARACTER ENEMY NAME*/}
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter character enemy name"/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">Random!</button>
                                </div>
                            </div>
                        </div>
                </div>

                <div className='row  d-flex justify-content-center'>
                    <div className='col-md-auto '>
                        <button className="btn btn-outline-primary">Generate Story</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AddStory