import React from 'react'

const ProfileItem = ({ detail, value }) => {
    return (
        <div className='container-fluid profile-item'>
            <div className='row'>
                <div className='col-5 detail'>
                    {detail}
                </div>
                <div className='col-1'>
                    :
                </div>
                <div className='col-6 value'>
                    {value}
                </div>
            </div>
        </div>
    )
}

export default ProfileItem
