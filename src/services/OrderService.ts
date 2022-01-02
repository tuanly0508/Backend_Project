import { QueryResult } from 'pg'
import {pool} from '../database'

export const createOrder = async(idOrder:string,idUser:string) => {
    const response: QueryResult = await pool.query('INSERT INTO orderTemp ("idOrder","idUser","timeAt") VALUES ($1,$2,$3)', [idOrder,idUser,new Date()])
    return response.rows
}

export const deleteOrder = async(idOrder:string) => {
    const response: QueryResult = await pool.query('DELETE FROM orderTemp where "idOrder"=$1',[idOrder])
    return response.rows
}

export const updateStatusOrder = async(idOrder:string,idUser:string) => {
    const response: QueryResult = await pool.query('UPDATE orderTemp set "isTemp"=false where "idOrder"=$1 and "idUser"=$2', [idOrder,idUser])
    return response.rows
}