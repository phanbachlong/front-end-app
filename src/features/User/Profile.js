import React, { useEffect, useState } from "react";
import userApi from "../../api/UserApi";
import LogoLogin from "../../assets/img/f.jpg"
import '../../css/Profile.css'


const Profile = () => {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        userApi.getProfile()
            .then(res => setProfile(res.data))
            .catch(err => console.log(err.message))
    }, [])

    if (!profile) return <div>Loading profile....</div>

    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="profile-left">
                    <img alt="profile-image" src={LogoLogin} width="40%" className='profile-image' />
                    <div className="profile-username">{profile.userName}</div>
                </div>
                <div className="profile-right">
                    <div className="form-items">
                        <label className="form-label">Full Name: </label>
                        <input className="form-control" value={`${profile.firstName} ${profile.lastName}`} disabled />
                    </div>
                    <div className="form-items">
                        <label className="form-label">Email: </label>
                        <input className="form-control" value={profile.email} disabled />
                    </div>
                    <div className="form-items">
                        <label className="form-label">Role: </label>
                        <input className="form-control" value={profile.role} disabled />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;