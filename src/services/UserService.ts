import { QueryResult } from 'pg'
import {pool} from '../database'

export const getUser = async(idUser: string) => {
    const response: QueryResult = await pool.query('select "nameUser" ,email ,phone ,address from buyuser where "idUser" = $1',[idUser])
    return response.rows
}