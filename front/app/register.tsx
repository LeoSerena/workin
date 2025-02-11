import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type RegisterInputs = {
    email : string
    username : string
    password : string
    repassword : string
}

const registerSchema = yup
    .object()
    .shape({
        email : yup.string().required(),
        username : yup.string().required(),
        password : yup.string().required(),
        repassword : yup.string().required()
    })
    .required()

const RegisterPage = () => {
    const { register, handleSubmit } = useForm<RegisterInputs>({ resolver : yupResolver(registerSchema) })

    return (
        <form onSubmit={ handleSubmit((data) => console.log(data)) }>
            <label>email</label>
            <input {...register("email")} />
            <label>username</label>
            <input {...register("username")} />
            <label>password</label>
            <input {...register("password")} />
            <label>repassword</label>
            <input {...register("repassword")} />
            <input type="submit" />
        </form>
    )
}


export default RegisterPage;
