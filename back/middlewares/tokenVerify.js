import express from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next){
    const authHeader = req.headers.authorization;
    console.log('passing through token validation');
    console.log(authHeader);
    next();
}