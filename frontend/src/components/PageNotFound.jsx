import {useHistory, useLocation } from 'react-router-dom'

const PageNotFound = ()=>{
    const location = useLocation();
    const history = useHistory();
    const handleRedirectToHome = ()=>{
        const { from } = location.state || { from: { pathname: "/userprofile" } };
        history.replace(from)
    }
    return(
        <div class="page-wrap-error d-flex flex-row align-items-center">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12 text-center">
                        <span class="display-1 d-block">404</span>
                        <div class="mb-4 lead">The page you are looking for was not found.</div>
                        <button onClick={handleRedirectToHome} class="btn btn-link">Back to Home</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound