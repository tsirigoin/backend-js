import url from 'url';
import path from 'path';
import multer from 'multer';

const __filename = url.fileURLToPath( import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
	destination: function(req,file,cb) {
		cb(null,__dirname + '/public/img');
	},
	filename: function(req,file,cb) {
		cb(null,file.originalname);
	}
});

export const uploader = multer({storage});

export default __dirname;