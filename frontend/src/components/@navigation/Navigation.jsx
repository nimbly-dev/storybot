import react from "react"

import AnchorItems from "./AnchorItems"

const Navigation = ({
    currentPage
})=>{

    return(
        <section>
            <nav className="navbar navbar-expand-md navbar-primary" id="navbar-right">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <AnchorItems currentPage={currentPage} />
                </div>
            </nav>
        </section>
    )
}

export default Navigation