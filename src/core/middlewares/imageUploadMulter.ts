var multer = require('multer');

export interface MulterFile {
    key: string 
    path: string // Available using `DiskStorage`.
    mimetype: string
    originalname: string
    size: number
  }

const MIME_TYPE_MAP = { //make vaild on type
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req:Request, file:MulterFile, cb:CallableFunction) => {
        //const isValid:any = MIME_TYPE_MAP[file.mimetype]:;
        //let error = new Error('invalid mime type');
        // if (isValid) {
        //     error = null
        // }
        cb(null, "src/images");
    },
    filename: (req:Request, file:MulterFile, cb:CallableFunction) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = file.mimetype
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
})

export const upload = multer({ storage:storage })

