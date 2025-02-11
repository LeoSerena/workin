import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AuthContext } from "@/utils/context";
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginInputs } from '@/utils/call_backend'

const inputSchema = yup
    .object()
    .shape({
        identifier : yup.string().required(),
        password : yup.string().required()
    })
    .required()

const LoginPage = () => {
    const { register, handleSubmit } = useForm<LoginInputs>({ resolver : yupResolver(inputSchema) })

    const { signIn } = useContext(AuthContext);

    return (
        <form onSubmit={ handleSubmit( (data) => signIn( data ) ) }>
            <label>identifier</label>
            <input {...register("identifier")} />
            <label>password</label>
            <input {...register("password")} />
            <input type="submit" />
        </form>
    )
}


export default LoginPage;
