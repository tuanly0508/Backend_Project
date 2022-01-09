import { QueryResult } from 'pg'
import {pool} from '../database'

class UserService {

    login = async(email:string,pass:string) => {
        const response: QueryResult = await pool.query('select * from buyUser where email = $1 and pass = $2', [email,pass])
        return response.rows
    }

    get = async(idUser: string) => {
        const response: QueryResult = await pool.query('select "nameUser" ,email ,phone ,address from buyUser where "idUser" = $1',[idUser])
        return response.rows
    }

    update = async(nameUser:string,email:string,phone:string,address:string,idUser: string) => {
        const response: QueryResult = await pool.query('UPDATE buyUser set "nameUser"=$1,email=$2,phone=$3,address=$4 where "idUser"=$5', [nameUser,email,phone,address,idUser])
        return response.rows
    }

    getMe = async(email:string) => {
        const response: QueryResult = await pool.query('select * from buyUser where email = $1', [email])
        return response.rows
    }
}

export const userService = new UserService()