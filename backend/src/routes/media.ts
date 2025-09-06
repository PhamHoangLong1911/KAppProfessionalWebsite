import express, { Request, Response } from 'express';
import multer from 'multer';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, 'uploads/');
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// POST /api/media/upload - Upload file (authenticated users only)
router.post('/upload', protect, upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // TODO: Implement cloud storage upload (Cloudinary, AWS S3, etc.)
    // For now, return local file info

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: `/uploads/${req.file.filename}` // This should be the actual URL
      }
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({
      success: false,
      message: 'File upload failed'
    });
  }
});

// GET /api/media - Get media library (admin/editor only)
router.get('/', protect, authorize('admin', 'editor'), async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Get media library endpoint - to be implemented',
    data: []
  });
});

// DELETE /api/media/:id - Delete media file (admin/editor only)
router.delete('/:id', protect, authorize('admin', 'editor'), async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Delete media endpoint - to be implemented'
  });
});

export default router;
