import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "semicolonsy",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  }),
  // 10MB
  limits: { fileSize: 1024 * 1024 * 10 },
});
// can upload 10 files
export const uploadMiddleware = upload.array("file", 10);

// a file upload (single)
export const uploadSingleController = (req, res) => {
  const {
    file: { location }
  } = req;
  
  res.json({ location });
};

// files upload (array)
export const uploadArrayController = async (req, res, { error }) => {
    if (error) {
      console.log('errors', error);
      res.status(500).json({
        status: 'fail',
        error: error
      });
    } else {
      // If File not found
      if (req.files === undefined) {
        console.log('uploadProductsImages Error: No File Selected!');
        res.status(500).json({
          status: 'fail',
          message: 'Error: No File Selected'
        });
      } else {
        // If Success
        let fileArray = req.files,
          fileLocation;
        const images = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location;
          console.log('Upload : ', fileLocation);
          images.push(fileLocation)
        }
        // Save the file name into database
        return res.status(200).json({
          status: 'ok',
          filesArray: fileArray,
          locationArray: images
        });
      }
    }
};
