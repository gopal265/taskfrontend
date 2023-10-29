import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
    
    const navigate  = useNavigate();
    return (
        <div className='wrapper'>
            <div className='form-container'>
                <div className='pb-3'>
                    <h2 className='heading text-center'>Welcome to My Project</h2>
                </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className="form-group text-center col-6" onClick={() => navigate("/login")}>
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                    <div className="form-group text-center col-6" onClick={()=> navigate("/register")}>
                        <button type="submit" className="btn btn-primary">
                            SignUp
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Welcome
