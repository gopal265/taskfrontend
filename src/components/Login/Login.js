import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as api from "../../api/user"
function Login({ user, setUser }) {
  const { control, handleSubmit, formState, } = useForm();  // it is used for form validation and submission
  const [message, setMessage] = useState('');
  const [error, setError] = useState();  // to  display  error message

  const navigate = useNavigate();   // used to navigate between react components
  const { errors } = formState;   // to display error ,used for client side validation


  const onSubmit = async (userdata) => {
    // logic for sending the login credentials to backend  
    try {

      const { data } = await api.login(userdata)  // send post request to backend to check login credentials

      setUser(data.user);   // update user state with userdata
      setMessage(data.message)

    } catch (error) {
      setError(error.response.data.message);   // if we get error 
    }

  };

  useEffect(() => {
    if (user) {
      navigate("/profile")
    }
  })

  return (
    <>
      {error &&
        <div class="alert alert-danger mt-3 text-center" role="alert">
          {/* to display the error */}
          {error}
        </div>
      }
      <div className='wrapper'>
        <div className='form-container'>
          <h1 className='heading text-center'>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className='inputLabel'>Email</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <input
                    type="email"
                    {...field}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Email"
                  />
                )}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="form-group">
              <label className='inputLabel'>Password</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                }}
                render={({ field }) => (
                  <input
                    type="password"
                    {...field}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Password"
                  />
                )}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <div className='form-extra'>No account?<span className='form-navigate' onClick={() => navigate("/register")}>Signup</span></div>
        </div>
      </div>
    </>
  );
}

export default Login;
