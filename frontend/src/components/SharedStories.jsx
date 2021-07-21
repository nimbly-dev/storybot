import { useState } from "react"

import { Col, Image, Row } from "react-bootstrap"
import Navigation from "./@navigation/Navigation"
import DisplaySharedUserStories from "./@user_stories/DisplaySharedUserStories"
import FilterStoriesField from "./@user_stories/FilterStoriesField"
import UserDashboard from "./@user_stories/UserDashboard"


const SharedStories = ()=>{
    const [isFiltered, setIsFiltered] = useState(false)
    const [filterValue, setFilterValue] = useState('')

    const token = JSON.parse(localStorage.getItem('token'))
    const imgSrc = "https://nimbly-dev.github.io/img/test-avatar.91e50cc7.png"

    const handleFilterInputChange = (event)=>{
        if(event.target.value === ''){
            setIsFiltered(false)
            setFilterValue('')
        }else {
            setIsFiltered(true);
            setFilterValue(event.target.value);
        }
    }
    return(
        <main>
            <Navigation currentPage={'Browse'}/>
            <section className='container py-5 mb-5 '>
                <Row className="d-flex flex-wrap align-content-center">
                    <Col md='3'>
                        <div className='ml-5'>
                            <Image src={imgSrc} roundedCircle width='150'
                            alt={'Img src not found'}/>
                            <h5 className='mt-3 '
                            >Welcome back! {token.username}
                            </h5>
                        </div>
                        <FilterStoriesField 
                            handleOnChangeFilterValue={handleFilterInputChange}
                            currentFilterValue={filterValue}
                        />
                        <UserDashboard/>
                    </Col>
                    <Col md='9'>
                        <DisplaySharedUserStories 
                            isFiltered={isFiltered} 
                            filterValue={filterValue}
                        />
                    </Col>
                </Row>
            </section>
        </main>
    )
}

export default SharedStories