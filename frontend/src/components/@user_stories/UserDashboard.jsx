import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";


const UserDashboard = ()=>{
  const location = useLocation();
  const history = useHistory();
  const handleUserprofileRedirect = ()=>{
    const { from } = location.state || { from: { pathname: "/userprofile" } };
    history.replace(from)
  }

  const handleSharedRedirect = ()=>{
    const { from } = location.state || { from: { pathname: "/shared" } };
    history.replace(from)
  }
    return(
      <div class="list-group">
            <Button 
              variant='link'
              onClick={handleUserprofileRedirect}
              className="list-group-item list-group-item-action active"
            > 
              Dashboard 
            </Button>
            <Button 
              variant='link'
              onClick={handleUserprofileRedirect}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              View User Stories
            </Button>
            <Button 
              variant='link'
              onClick={handleSharedRedirect}
              className="list-group-item list-group-item-action"
            >
              View Shared Stories
            </Button>
      </div>
    )
}

export default UserDashboard