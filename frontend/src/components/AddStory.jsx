
import { useState} from "react"

//Import created components
import Navigation from "./@navigation/Navigation";
import ErrorText from "./@error_text/ErrorText";

//Import third party libraroes
import { 
    ButtonGroup, 
    Col, 
    Form, 
    InputGroup, 
    Row, 
    ToggleButton,
    Button
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
                <Row className='container d-flex justify-content-center'>
                    <Col md='auto'>
                        <h5>Create your very own character with background story!</h5>
                        <InputGroup className='mb-1'>              
                            <Form.Control
                                type="text" 
                                name="characterFirstName"
                                value={characterStoryTitle}
                                onChange={e=>setCharacterStoryTitle(e.currentTarget.value)}
                                placeholder={"Enter Story Title"}
                            />
                            <InputGroup.Append>
                                <Button
                                    className="btn btn-primary" 
                                    onClick={()=>axiosTitleGen(setCharacterStoryTitle)}
                                    type="button"
                                >
                                    Random!
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='container d-flex justify-content-between mt-3'>
                        <Col md='6' className='column'>
                            {/*FOR CHARACTER FIRSTNAME*/}
                            <InputGroup className='mb-3'>
                                <Form.Control
                                    type="text" 
                                    name="characterFirstName"
                                    value={characterFirstName}
                                    onChange={e=>setCharacterFirstName(e.currentTarget.value)}
                                    placeholder={"Enter Character Firstname"}
                                />
                                <InputGroup.Append>
                                    <Button
                                        className="btn btn-primary" 
                                        onClick={handleOnclickRandomFirstname(setCharacterFirstName)}
                                        type="button"
                                    >
                                        Random!
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                            {/*FOR CHARACTER CLASS*/}
                            <InputGroup className='mb-3'>
                                <Form.Control
                                    type="text" 
                                    name="characterFirstName"
                                    value={characterClass}
                                    onChange={e=>setCharacterClass(e.currentTarget.value)}
                                    placeholder={"Enter Character Class"}
                                />
                                <InputGroup.Append>
                                    <Button
                                        className="btn btn-primary" 
                                        onClick={()=>axiosGenerateClass(setCharacterClass)}
                                        type="button"
                                    >
                                        Random!
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>


                            {/*FOR CHARACTER ENEMY FACTION*/}
                            <InputGroup className='mb-3'>
                                <Form.Control
                                    type="text" 
                                    className="form-control"
                                    name="characterFirstName"
                                    value={characterEnemyFaction}
                                    onChange={e=>setCharacterEnemyFaction(e.currentTarget.value)}
                                    placeholder={"Enter Enemy Character Faction"}
                                />
                                <InputGroup.Append>
                                    <Button
                                        className="btn btn-primary" 
                                        onClick={()=>axiosGenFaction(setCharacterEnemyFaction)}
                                        type="button"
                                    >
                                        Random!
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                        </Col>

                        <Col md='6' className='column'>
                            {/*FOR CHARACTER LAST NAME*/}
                            <InputGroup className='mb-3'>
                                <Form.Control
                                    type="text" 
                                    name="characterFirstName"
                                    value={characterLastName}
                                    onChange={e=>setCharacterLastName(e.currentTarget.value)}
                                    placeholder={"Enter Character Lastname"}
                                />
                                <InputGroup.Append>
                                    <Button
                                        className="btn btn-primary" 
                                        onClick={handleOnClickRandomLastname(setCharacterLastName)}
                                        type="button"
                                    >
                                        Random!
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                            {/*FOR CHARACTER RACE*/}
                            <InputGroup className='mb-3'>
                                <Form.Control
                                    type="text" 
                                    className="form-control"
                                    name="characterFirstName"
                                    value={characterRace}
                                    onChange={e=>setCharacterRace(e.currentTarget.value)}
                                    placeholder={"Enter Enemy Character Faction"}
                                />
                                <InputGroup.Append>
                                    <Button
                                        className="btn btn-primary" 
                                        onClick={()=>generateRandomRace(setCharacterRace)}
                                        type="button"
                                    >
                                        Random!
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                            {/*FOR CHARACTER ENEMY NAME*/}
                            <InputGroup className='mb-3'>
                                <Form.Control
                                    type="text" 
                                    name="characterFirstName"
                                    value={characterEnemyFullName}
                                    onChange={e=>setCharacterLastName(e.currentTarget.value)}
                                    placeholder={"Enter Enemy Character Name"}
                                />
                                <InputGroup.Append>
                                    <Button
                                        className="btn btn-primary" 
                                        onClick={()=>handleOnClickEnemyName(setCharacterEnemyFirstName,setCharacterEnemyLastName)}
                                        type="button"
                                    >
                                        Random!
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                        </Col>
                </Row>

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
                        <div className="form-group">
                            <label for="textAreaBody">Click the textarea to edit your generated story: </label>
                            <textarea 
                                placeholder="Generated Story Text are generated here"
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
                        <Button
                            variant='outline-danger'
                            className="mr-5"
                            onClick={handleOnClickClearInputs}
                        >
                            Clear
                        </Button>
                        <Button 
                            variant='outline-primary'
                            className="ml-5"
                            onClick={handleOnClickGenerateStory}
                        >
                                Generate Story
                        </Button>
                    </div>
                </div>

                <div className='row mt-4 d-flex justify-content-center w-100'>
                    <div className='col-md-auto '>
                        <ErrorText errorText={"PLEASE FILL OUT ALL THE INPUTS"} hasErrors={hasErrors}/> 
                        <Button
                            block
                            size='lg'
                            variant='primary'
                            onClick={handleOnClickRegister}
                        >
                            SAVE STORY
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AddStory