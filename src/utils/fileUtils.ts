import fs from 'fs';
import path from 'path';

export function deleteFile(filePath: string): void {
  const fullPath = path.join(__dirname, '..', '..', filePath);
  fs.unlink(fullPath, err => {
    if (err) {
      console.error('Failed to delete file:', err);
    } else {
      console.log('File deleted successfully:', fullPath);
    }
  });
}
