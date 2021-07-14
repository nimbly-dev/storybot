
import { useState} from "react"
import Navigation from "./@navigation/Navigation";

//Import third party libraroes
import { ButtonGroup, ToggleButton,ToggleButtonGroup  } from 'react-bootstrap';

//Random GEN Routers
import {axiosFemaleHumanfirstname, axiosHumanLastname, axiosMaleHumanFirstname} from "./@random_gen/HumanGen"
import { axiosElfFemaleFirstname, axiosElfLastname, axiosElfMaleFirstname } from "./@random_gen/ElfGen"
import { axiosDwarfLastname, axiosFemaleDwarffirstname, axiosMaleDwarfFirstname } from "./@random_gen/DwarfGen"
import { axiosFemaleOrcName, axiosMaleOrcName } from "./@random_gen/OrcGen"
import { generateRandomRace } from "./@random_gen/RaceGen"
import { axiosGenerateClass } from "./@random_gen/ClassGen"
import { axiosGenFaction } from "./@random_gen/FactionGen"
import { axiosGenerateBackgroundStory } from "./@random_gen/StoryGen";

//Import third party libraries

const AddStory = ()=>{

    const [characterFirstName, setCharacterFirstName] = useState('')
    const [characterLastName, setCharacterLastName] = useState('')
    const [characterClass, setCharacterClass] = useState('')
    const [characterRace, setCharacterRace] = useState('')
    const [characterEnemyFaction, setCharacterEnemyFaction] = useState('')
    const [characterEnemyFirstName, setCharacterEnemyFirstName] = useState('')
    const [characterEnemyLastName, setCharacterEnemyLastName] = useState('')
    const [characterEnemyFullName, setCharacterEnemyFullName] = useState('')
    const [genderValue, setGenderValue] = useState('1');
    const genders = [
        {name: 'Male', value: '1'},
        {name: 'Female', value: '2'},
    ]

    const [generatedCharStory, setGeneratedCharStory] = useState('');

    //Random names depends on what is the current race value, e.g only supported races have dedicated
    //random names
    const handleOnclickRandomFirstname = (setCharacterFirstName)=>{
        console.log(genderValue)
        //Default is Human firstname
        if (genderValue === '1'){
            return (characterRace === 'Human')
            ? ()=>axiosMaleHumanFirstname(setCharacterFirstName) :
    
            (characterRace === 'Elf')
            ? ()=>axiosElfMaleFirstname(setCharacterFirstName)   :
    
            (characterRace === 'Dwarf')
            ? ()=>axiosMaleDwarfFirstname(setCharacterFirstName) :
    
            (characterRace === 'Orc')
            ? ()=>axiosMaleOrcName(setCharacterFirstName)
    
            : ()=>axiosMaleHumanFirstname(setCharacterFirstName)
        }else {
            return (characterRace === 'Human')
            ? ()=>axiosFemaleHumanfirstname(setCharacterFirstName) :
    
            (characterRace === 'Elf')
            ? ()=>axiosElfFemaleFirstname(setCharacterFirstName)   :
    
            (characterRace === 'Dwarf')
            ? ()=>axiosFemaleDwarffirstname(setCharacterFirstName) :
    
            (characterRace === 'Orc')
            ? ()=>axiosFemaleOrcName(setCharacterFirstName)
    
            : ()=>axiosFemaleHumanfirstname(setCharacterFirstName)
        }
    }

    //Random names depends on what is the current race value, e.g only supported races have dedicated
    //random names
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

    //Random names are randomly generated based on the data of the backend
    const handleOnClickEnemyName = (setCharacterEnemyFirstName, setCharacterEnemyLastName)=>{
        /*
        0 - HUMAN
        1 - ELF
        2 - DWARF
        3 - ORC
        */
        const roll_die = Math.floor(Math.random() * 3); 
        console.log(roll_die)
        //Default is a human name
        if (roll_die === 0){//Rolled name is human
           /*
           0- Male
           1- Female
           */
            const roll_die_gender = Math.floor(Math.random() * 1); 

            if(roll_die_gender === 1){//Rolled is Male
                axiosMaleHumanFirstname(setCharacterEnemyFirstName);
                axiosHumanLastname(setCharacterEnemyLastName);
                setCharacterEnemyFullName(`${characterEnemyFirstName} ${characterEnemyLastName}`)
            }else{//Rolled is Female
                axiosFemaleHumanfirstname(setCharacterEnemyFirstName);
                axiosHumanLastname(setCharacterEnemyLastName);
                setCharacterEnemyFullName(`${characterEnemyFirstName} ${characterEnemyLastName}`)
            }
        }
        else if (roll_die === 1){//Rolled name is elf
            /*
            0- Male
            1- Female
            */
             const roll_die_gender = Math.floor(Math.random() * 1); 
 
             if(roll_die_gender === 1){//Rolled is Male
                 axiosElfMaleFirstname(setCharacterEnemyFirstName);
                 axiosElfLastname(setCharacterEnemyLastName);
                 setCharacterEnemyFullName(`${characterEnemyFirstName} ${characterEnemyLastName}`)
             }else{//Rolled is Female
                 axiosElfFemaleFirstname(setCharacterEnemyFirstName);
                 axiosElfLastname(setCharacterEnemyLastName);
                 setCharacterEnemyFullName(`${characterEnemyFirstName} ${characterEnemyLastName}`)
             }
         }
         else if (roll_die === 2){//Rolled name is dwarf
            /*
            0- Male
            1- Female
            */
             const roll_die_gender = Math.floor(Math.random() * 1); 
 
             if(roll_die_gender === 1){//Rolled is Male
                 axiosMaleDwarfFirstname(setCharacterEnemyFirstName);
                 axiosDwarfLastname(setCharacterEnemyLastName);
                 setCharacterEnemyFullName(`${characterEnemyFirstName} ${characterEnemyLastName}`)
             }else{//Rolled is Female
                 axiosFemaleDwarffirstname(setCharacterEnemyFirstName);
                 axiosDwarfLastname(setCharacterEnemyLastName);
                 setCharacterEnemyFullName(`${characterEnemyFirstName} ${characterEnemyLastName}`)
             }
         }
         else if (roll_die === 3){//Rolled name is orc
            /*
            0- Male
            1- Female
            */
            const roll_die_gender = Math.floor(Math.random() * 1); 
 
            if(roll_die_gender === 1){//Rolled is Male
                axiosMaleOrcName(characterFirstName)
                setCharacterEnemyFullName(characterFirstName)
            }else{//Rolled is Female
                axiosFemaleOrcName(characterFirstName)
                setCharacterEnemyFullName(characterFirstName)
            }
         }else{//Default is Human
           /*
           0- Male
           1- Female
           */
            const roll_die_gender = Math.floor(Math.random() * 1) ; 

            if(roll_die_gender === 1){//Rolled is Male
                axiosMaleHumanFirstname(setCharacterEnemyFirstName);
                axiosHumanLastname(setCharacterEnemyLastName);
                setCharacterEnemyFullName(`${characterEnemyFirstName} ${characterEnemyLastName}`)
            }else{//Rolled is Female
                axiosFemaleHumanfirstname(setCharacterEnemyFirstName);
                axiosHumanLastname(setCharacterEnemyLastName);
                setCharacterEnemyFullName(`${characterEnemyFirstName} ${characterEnemyLastName}`)
            }
         }
    }
    
    const handleOnClickGenerate = ()=>{

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
                                    placeholder="Enter character enemy name"
                                    value={characterEnemyFullName}
                                    onChange={e=>setCharacterEnemyFullName(e.currentTarget.value)}
                                />
                                <div className="input-group-append">
                                    <button 
                                        className="btn btn-primary" 
                                        type="button"
                                        onClick={()=>handleOnClickEnemyName(setCharacterEnemyFirstName, setCharacterEnemyLastName)}
                                        >Random!
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>

                <div className='row d-flex justify-content-center'>
                    <div className='col-md-auto'>
                        <ButtonGroup className="btn-group btn-group-toggle">
                            {genders.map((radio,idx)=>(
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant="outline-primary"
                                    name="radio"
                                    value={radio.value}
                                    checked={genderValue === radio.value}
                                    onChange={(e) => setGenderValue(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </div>
                </div>
                <div className='row mt-3 d -flex justify-content-center'>
                    <div className='col-md-auto w-100'>
                        <div className="form-group">
                                <label for="textAreaBody">Click the textarea to edit your generated story: </label>
                                <textarea 
                                className="form-control" 
                                value={generatedCharStory}
                                onChange={e=>setGeneratedCharStory(e.currentTarget.value)}
                                rows="5"
                                />
                        </div>
                    </div>
                </div>

                <div className='row mt-2 d-flex justify-content-center'>
                    <div className='col-md-auto'>
                        <button 
                            className="btn btn-outline-primary"
                            onClick={()=>axiosGenerateBackgroundStory(
                                setGeneratedCharStory,
                                characterRace,
                                characterClass,
                                characterEnemyFullName,
                                characterEnemyFaction
                            )}
                        >
                                Generate Story
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AddStory