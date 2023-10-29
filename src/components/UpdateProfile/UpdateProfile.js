import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as api from "../../api/user"
import { useNavigate } from 'react-router-dom';
import "../SignUp/SignUp.css"
function UpdateProfile({ user, setUser }) {

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const formatDate = () => {
        if (user.dob) {
            var today = new Date(user.dob);
            var d = (today.getDate() < 10 ? '0' : '') + today.getDate();
            var m = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
            var y = today.getFullYear();
            var x = String(y + "-" + m + "-" + d);
            return x;
        }
        return user.dob;
    }
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            dob: formatDate(),
            age: user.age
        }
    }
    );

    const onSubmit = async (userdata) => {
        userdata.email = user.email;
        userdata.password = user.password;
        console.log(userdata)
        try {
            const { data } = await api.updateUser(userdata)
            setUser(data.user);
            setMessage(data.message);

        }
        catch (error) {
            setError(error.response.data.message)
        }
    };


    const validateTenDigits = (value) => {
        if (!/^\d{10}$/.test(value)) {
            return 'Please enter a 10-digit number.';
        }
        return true;
    };

    useEffect(() => {
        if (message !== "") {
            setMessage("");
            navigate("/profile");
        }
    }, [message, user])

    return (

        <>
            {error &&
                <div class="alert alert-danger mt-3 text-center" role="alert">
                    {error}
                </div>
            }
            <div className='wrapper'>
                <div className='form-container'>


                    <h2 className='heading text-center'>Update Profile</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label className='inputLabel' htmlFor="firstName">First Name</label>
                            <Controller
                                name="firstName"
                                control={control}
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    />
                                )}
                            />
                            {errors.firstName && (
                                <div className="invalid-feedback">{errors.firstName.message}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className='inputLabel' htmlFor="lastName">Last Name</label>
                            <Controller
                                name="lastName"
                                control={control}
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    />
                                )}
                            />
                            {errors.lastName && (
                                <div className="invalid-feedback">{errors.lastName.message}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className='inputLabel' htmlFor="mobileNumber">Mobile Number</label>
                            <Controller
                                name="mobileNumber"
                                control={control}
                                rules={{
                                    required: false,
                                    validate: validateTenDigits
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="tel"
                                        className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                                    />
                                )}
                            />
                            {errors.mobileNumber && (
                                <div className="invalid-feedback">{errors.mobileNumber.message}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className='inputLabel' htmlFor="dob">Date of Birth</label>
                            <Controller
                                name="dob"
                                control={control}
                                rules={{ required: false }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="date"
                                        className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                                    />
                                )}
                            />
                            {errors.dob && (
                                <div className="invalid-feedback">{errors.dob.message}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className='inputLabel' htmlFor="age">Age</label>
                            <Controller
                                name="age"
                                control={control}
                                rules={{ required: false }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="number"
                                        className={`form-control ${errors.age ? 'is-invalid' : ''} `}
                                    />
                                )}
                            />
                            {errors.age && (
                                <div className="invalid-feedback">{errors.age.message}</div>
                            )}
                        </div>


                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateProfile;

