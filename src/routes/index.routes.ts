import {Router}  from 'express'
import {ThirdPartyImporter} from '../controllers/importer.controller'

const router = Router();


router.post('/',ThirdPartyImporter.sendData)
router.delete('/remove-thirds', ThirdPartyImporter.deleteThird)


export default router;