import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import "./SignUp.css"
import { useNavigate } from 'react-router-dom';
import * as api from "../../api/user"

function Signup() {

  const navigate = useNavigate();
  const [message,setMessage] = useState('');
  const [error,setError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    getValues, 
  } = useForm();
  
  const onSubmit = async(userdata) => {
    //  user registration logic  same as login 
    try {
        
      const {data} =  await api.register(userdata)
      setMessage(data.message)
      console.log(data);

  } catch (error) {
      setError(error.response.data.message);
  }
  };

  useEffect(() =>{
    if(message !== ""){
      navigate('/login')   // use automatically redirect to login if the registration is sucess
    }
  })
  return (
    <> {error && 
      <div class="alert alert-danger mt-3 text-center" role="alert">
       {error}
    </div>
    }

    <div className="wrapper">
        <div className='form-container'>
              <h1 className="text-center heading">Sign Up</h1>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="inputLabel" htmlFor="email">Email</label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        placeholder='vik***@gmail.com'
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        {...register('email')} 
                      />
                    )}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="inputLabel" htmlFor="password">Password</label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password is too short' },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        {...register('password')} 
                      />
                    )}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="inputLabel" htmlFor="confirmPassword">Confirm Password</label>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === getValues('password') ||
                        'Passwords do not match',
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        {...register('confirmPassword')} 
                      />
                    )}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword.message}
                    </div>
                  )
                }
                </div>

                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
              </form>
              <div className='form-extra'>Already have an account? <span className="form-navigate" onClick={()=> navigate("/login")}>Login</span></div>
            </div>
            </div>
            </div>
            </>
  );
}

export default Signup;
