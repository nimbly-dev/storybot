

const UserDashboard = ()=>{
    return(
      <div class="list-group">
            <a href="#dashbaord" 
              class="list-group-item list-group-item-action active"> 
              Dashboard 
            </a>
            <a href="#userprofile" 
              class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              View User Stories
            </a>
            <a href="#browse" class="list-group-item list-group-item-action">View Shared Stories</a>
      </div>
    )
}

export default UserDashboard