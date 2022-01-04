import { QueryResult } from 'pg'
import {pool} from '../database'

export const getUser = async(idUser: string) => {
    const response: QueryResult = await pool.query('select "nameUser" ,email ,phone ,address from buyuser where "idUser" = $1',[idUser])
    return response.rows
}

export const updateUser = async(nameUser:string,email:string,phone:string,address:string,idUser: string) => {
    const response: QueryResult = await pool.query('UPDATE buyUser set "nameUser"=$1,email=$2,phone=$3,address=$4 where "idUser"=$5', [nameUser,email,phone,address,idUser])
    return response.rows
}