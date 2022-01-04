import { Request, Response } from "express";
import {QueryResult} from 'pg'
import {pool} from '../database'
import { getUser, updateUser } from "../services/UserService";

// export const getUsers = async (req:Request, res: Response) => {
//     const response: QueryResult = await pool.query('SELECT * FROM buyUser')
//     res.status(200).json(response.rows) 
// }

export const handleUpdateUser = async (req:Request, res: Response) => {
    const {idUser,nameUser,email,phone,address} = req.body
    const data = await updateUser(nameUser,email,phone,address,idUser)
    return res.json(data)
}

export const getUserDetail = async (req:Request, res: Response) => {
    const id = req.params.idUser
    const data = await getUser(id)
    res.status(200).json(data) 
}

// export const createUser = async (req:Request, res: Response) => {
//     const {idUser,nameUser,email,phone} = req.body
//     const response: QueryResult = await pool.query('INSERT INTO buyUser (idUser,nameUser,email,phone) VALUES ($1,$2,$3,$4)', [idUser,nameUser,email,phone])
//     return res.json({
//         message: 'Create a user success'
//     })
// }

// export const deleteUser = async (req:Request, res: Response) => {
//     const idUser = req.params.idUser
//     const response: QueryResult = await pool.query('DELETE FROM buyUser where idUser=$1', [idUser])
//     return res.json({
//         message: 'Delete a user success'
//     })
// }
 
