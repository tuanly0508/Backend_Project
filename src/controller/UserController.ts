import { NextFunction, Request, Response } from "express";
import { userService } from "../services/UserService";
import jwt from "jsonwebtoken";
class UserController {
    
    update = async (req:Request, res: Response) => {
        const {idUser,nameUser,email,phone,address} = req.body
        const data = await userService.update(nameUser,email,phone,address,idUser)
        return res.json(data)
    }

    getById = async (req:Request, res: Response) => {
        const id = req.params.idUser
        const data = await userService.get(id)
        res.status(200).json(data) 
    }

    login = async (req:Request, res: Response) => {
        const {email,pass} = req.body
        const data = await userService.login(email,pass)
        if (data.length <= 0) {
            return res.status(401).json()
        }else {
            const accessToken = jwt.sign({email},process.env.ACCESS_TOKEN_SECRET || 'tokenTest',{expiresIn: '600s'})
            return res.json({data,accessToken})
        }
    }
    
    authToken = async (req:Request, res:Response, next: NextFunction) => {
        const token = req.headers['authorization'] || ''
        
        if (!token) return res.status(401).json()
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET||'tokenTest')
            next()
        } catch (error) {
            return res.status(403).json()
        }
    }

    getMe = async (req:Request, res:Response) => {
        const token = req.headers['authorization'] || ''
        const a = this.parseJwt(token)
        const data = await userService.getMe(a.email)
        return res.json(data)
    }

    parseJwt =(token:string)=> {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };






    // get = async (req:Request, res: Response) => {
    //     const response: QueryResult = await pool.query('SELECT * FROM buyUser')
    //     res.status(200).json(response.rows) 
    // }

    // create = async (req:Request, res: Response) => {
    //     const {idUser,nameUser,email,phone} = req.body
    //     const response: QueryResult = await pool.query('INSERT INTO buyUser (idUser,nameUser,email,phone) VALUES ($1,$2,$3,$4)', [idUser,nameUser,email,phone])
    //     return res.json({
    //         message: 'Create a user success'
    //     })
    // }

    // delete = async (req:Request, res: Response) => {
    //     const idUser = req.params.idUser
    //     const response: QueryResult = await pool.query('DELETE FROM buyUser where idUser=$1', [idUser])
    //     return res.json({
    //         message: 'Delete a user success'
    //     })
    // }
}

export const userController = new UserController()