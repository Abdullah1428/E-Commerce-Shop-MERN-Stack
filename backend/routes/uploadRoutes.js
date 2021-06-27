import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, callBack) {
    callBack(null, 'uploads/')
  },
  filename(req, file, callBack) {
    callBack(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  }
})

function checkFileType(file, callBack) {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)

  if (extname && mimetype) {
    return callBack(null, true)
  } else {
    return callBack('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function(req, file, callBack) {
    checkFileType(file, callBack)
  }
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
