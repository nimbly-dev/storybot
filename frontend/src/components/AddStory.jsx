
import { useState} from "react"

//Import created components
import Navigation from "./@navigation/Navigation";
import InputNameForAddStory from "./@forms/InputNameForAddStory";
import InputForAddStory from "./@forms/InputForAddStory";
import TextAreaForAddStory from "./@forms/TextAreaForAddStory";
import ErrorText from "./@error_text/ErrorText";

//Import third party libraroes
import { 
    ButtonGroup, 
    ToggleButton,
} from 'react-bootstrap';


//Random GEN Routers
import { axiosFemaleHumanfirstname, axiosHumanLastname, axiosMaleHumanFirstname} from "./@random_gen/HumanGen"
import { axiosElfFemaleFirstname, axiosElfLastname, axiosElfMaleFirstname } from "./@random_gen/ElfGen"
import { axiosDwarfLastname, axiosFemaleDwarffirstname, axiosMaleDwarfFirstname } from "./@random_gen/DwarfGen"
import { axiosFemaleOrcName, axiosMaleOrcName } from "./@random_gen/OrcGen"
import { generateRandomRace } from "./@random_gen/RaceGen"
import { axiosGenerateClass } from "./@random_gen/ClassGen"
import { axiosGenFaction } from "./@random_gen/FactionGen"
import { axiosGenerateBackgroundStory } from "./@random_gen/StoryGen";
import { axiosTitleGen} from "./@random_gen/TitleGen"
import { axiosSaveBackgroundStory } from "./@methods/BackgroundStory";

//Import third party libraries

const AddStory = ()=>{

    const [characterStoryTitle, setCharacterStoryTitle] = useState('')
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

    const [hasErrors, setHasError] = useState(false)

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
    
    const handleOnClickRegister = ()=>{
        //If any of these values are empty then throw error
        if(
            !characterFirstName     || 
            !characterLastName      ||
            !characterRace          ||
            !characterClass         ||
            !characterEnemyFaction  ||
            !characterEnemyFullName ||
            !generatedCharStory     ||
            !characterStoryTitle){
                console.log('ERROR')
                setHasError(true)
            }
        else{
            axiosSaveBackgroundStory(characterStoryTitle,generatedCharStory,`${characterFirstName} ${characterLastName}`)
            setHasError(false)
            alert('Created new background story')
        }
    }

    const handleOnClickGenerateStory = ()=>{
        //If any of these values are empty then throw error
        if(
            !characterFirstName     || 
            !characterLastName      ||
            !characterRace          ||
            !characterClass         ||
            !characterEnemyFaction  ||
            !characterEnemyFullName ||
            !characterStoryTitle){
                console.log('ERROR')
                setHasError(true)
            }
        else{
            axiosGenerateBackgroundStory(
                setGeneratedCharStory,
                characterRace,
                characterClass,
                characterEnemyFullName,
                characterEnemyFaction
            )
            setHasError(false)
        }
    }

    const handleOnClickClearInputs = ()=>{
        setCharacterFirstName('')
        setCharacterLastName('')
        setCharacterClass('')
        setCharacterRace('')
        setCharacterEnemyFaction('')
        setCharacterEnemyFirstName('')
        setCharacterEnemyLastName('')
        setCharacterEnemyFullName('')
        setGeneratedCharStory('')
    }

    return(
        <main>
            <Navigation currentPage={'Add Story'}/>
            <section className='container'>
                <div className='row container d-flex justify-content-center'>
                    <div className='col-md-auto'>
                        <h5>Create your very own character with background story!</h5>
                            <div className="input-group mb-1">
                                <InputForAddStory
                                    value={characterStoryTitle}
                                    placeholder="Enter story title"
                                    randomGen={axiosTitleGen}
                                    setter={setCharacterStoryTitle}
                                />
                        </div>
                    </div>
                </div>
                <div className='row container d-flex justify-content-between mt-3'>
                        <div className='col-md-6 column'>
                            {/*FOR CHARACTER FIRSTNAME*/}
                            <InputNameForAddStory 
                                placeholder="Enter Character firstname"
                                value={characterFirstName}
                                setter={setCharacterFirstName} 
                                randomGen={handleOnclickRandomFirstname}
                            />
                            {/*FOR CHARACTER CLASS*/}
                            <InputForAddStory
                                placeholder="Enter character Class"
                                value={characterClass}
                                setter={setCharacterClass}
                                randomGen={axiosGenerateClass}
                            />
                            {/*FOR CHARACTER ENEMY FACTION*/}
                            <InputForAddStory
                                placeholder="Enter character enemy faction"
                                value={characterEnemyFaction}
                                setter={setCharacterEnemyFaction}
                                randomGen={axiosGenFaction}
                            />
                        </div>

                        <div className='col-md-6 column'>
                            {/*FOR CHARACTER LAST NAME*/}
                            <InputNameForAddStory
                                placeholder="Enter character lastname"
                                value={characterLastName}
                                setter={setCharacterLastName}
                                randomGen={handleOnClickRandomLastname}
                            />

                            {/*FOR CHARACTER RACE*/}
                            <InputForAddStory
                                placeholder="Enter character race"
                                value={characterRace}
                                setter={setCharacterRace}
                                randomGen={generateRandomRace}
                            />

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

                {/* FOR GENERATED STORY TEXT */}
                <div className='row mt-3 d -flex justify-content-center'>
                    <div className='col-md-auto w-100'>
                        <TextAreaForAddStory
                            value={generatedCharStory}
                            setter={setGeneratedCharStory}
                        />
                    </div>
                </div>

                <div className='row mt-2 d-flex justify-content-center'>
                    <div className='col-md-auto'>
                        <button
                            className="btn btn-outline-primary mr-5"
                            onClick={handleOnClickClearInputs}
                        >
                            Clear
                        </button>
                        <button 
                            className="btn btn-outline-primary ml-5"
                            onClick={handleOnClickGenerateStory}
                        >
                                Generate Story
                        </button>
                    </div>
                </div>

                <div className='row mt-4 d-flex justify-content-center w-100'>
                    <div className='col-md-auto '>
                        <ErrorText errorText={"PLEASE FILL OUT ALL THE INPUTS"} hasErrors={hasErrors}/> 
                        <button
                            className="btn btn-outline-primary btn-lg btn-block"
                            onClick={handleOnClickRegister}
                        >
                            SAVE STORY
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AddStory