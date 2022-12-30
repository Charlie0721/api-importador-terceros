import {Router}  from 'express'
import {ThirdPartyImporter} from '../controllers/importer.controller'

const router = Router();


router.post('/',ThirdPartyImporter.sendData)
router.get('/remove-thirds', ThirdPartyImporter.deleteThird)


export default router;