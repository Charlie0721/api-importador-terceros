import { Request, Response } from 'express'
import XLSX from 'xlsx'
import { connect } from '../database'
export class ThirdPartyImporter {


    /**
     * Eliminar datos de terceros
     * 
     */
    static deleteThird = async (req: Request, res: Response) => {


        try {

            const conn = await connect();
            const response1 = await conn.query(`/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
           
            `)
            const response = await conn.query(`
            TRUNCATE TABLE terceros;
            `)
            return res.json({
                message: "third parties removed successfully !!",
                response
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }


    static sendData = async (req: Request, res: Response) => {

        try {
            const conn = await connect();
            const dataFromJS: [] = req.body
            /**
             * Insertar la data en BD
             * 
            **/

            const third = dataFromJS

            third.forEach(async (item, index) => {
                let number = index + 1
                await conn.query(`INSERT INTO terceros SET?`, [item])
                console.log(`${number} added successfully !!`)
            })
            
            if (third) {

                return res.json({
                    message: "Successful loading",
                    data: third,
                    number: third.length

                })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }


    }




}



