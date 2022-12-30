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

            /**
    * leer data del excel
    * 
    */
            const path = 'C:/Users/Desarrollo Carlos/Documents/terceros.xls'
            const workBook = XLSX.readFile(path)
            const workBookSheets = workBook.SheetNames;

            const sheet = workBookSheets[0]
            const dataExcel = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);

            /**
             * Insertar la data en BD
             * 
            **/

            const third = dataExcel

            third.forEach(async (item) => {

                await conn.query(`INSERT INTO terceros SET?`, [item])
               
            })
            if (third) {

                return res.json({
                    data: dataExcel,
                    third
                })
            }


        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }


    }




}



