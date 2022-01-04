import { QueryResult } from 'pg'
import {pool} from '../database'

class AbsService {

    delete = async(idProduct:string) => {
        const response: QueryResult = await pool.query('DELETE FROM orderProduct where "idProduct"=$1', [idProduct])
        return response.rows
    }

}

export const absService = new AbsService()