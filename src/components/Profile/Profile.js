import React from 'react'
import "./Profile.css"
import ProfileItem from './ProfileItem'
import { useNavigate } from 'react-router-dom'
const Profile = ({ user,setUser }) => {

    const navigate = useNavigate();
    const formatDob = ()=>{
        if(user.dob){
            const date = new Date(user.dob)
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const day = date.getDate();
            return `${day}-${month}-${year}`
        }
        return user.dob;
    }

    const logout = () =>{
        setUser();
    }
    return (
        <div className='wrapper'>
            <div className='profile-container'>
                <h1 className='heading text-center'>Profile</h1>
                <div>
                    
                    <ProfileItem detail="Full Name" value={user.firstName +" "+user.lastName} />
                    <ProfileItem detail="Email ID" value={user.email} />
                    <ProfileItem detail="Mobile Number" value={user.mobileNumber ? user.mobileNumber :"No Number"} />
                    <ProfileItem detail="Age" value={user.age ? user.age : "Not Mentioned"} />
                    <ProfileItem detail="Date of Birth" value={user.dob ? formatDob() : "Not Mentioned"} />
                   
                </div>

                <div className='container-fluid'>
                    <div className='row'>
                        <div className="form-group text-center col-6" onClick={()=> navigate("/updateprofile")}>
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </div>
                        <div className="form-group text-center col-6" onClick={logout}>
                            <button type="submit" className="btn btn-primary">
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Profile
