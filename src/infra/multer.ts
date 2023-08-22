import multer from 'multer';
import crypto from 'node:crypto';
import path from 'path';

const destFolder = path.resolve(__dirname, '..', 'tmp', 'uploads');
const upload = multer({
  dest: destFolder,
  limits: { fileSize: 1024 * 1024 * 20 },
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, destFolder);
    },
    filename(req, file, callback) {
      const fileName = `${crypto.randomBytes(20).toString('hex')}${file.originalname}`;
      callback(null, fileName);
    },
  }),
});

export { upload };