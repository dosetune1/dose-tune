import fs from 'fs/promises';
import path from 'path';

export async function ensureDirectoryExists(filePath: string): Promise<void> {
  const directory = path.dirname(filePath);
  try {
    await fs.access(directory);
  } catch {
    await fs.mkdir(directory, { recursive: true });
  }
}

export async function writeFileWithBackup(filePath: string, content: string): Promise<void> {
  const backupPath = `${filePath}.backup`;
  
  try {
    // Check if original file exists
    try {
      await fs.access(filePath);
      // Create backup of existing file
      await fs.copyFile(filePath, backupPath);
    } catch {
      // File doesn't exist, continue
    }

    // Write new content
    await fs.writeFile(filePath, content, 'utf-8');
    
    // Remove backup if write was successful
    try {
      await fs.unlink(backupPath);
    } catch {
      // No backup to remove
    }
  } catch (error) {
    // Restore from backup if write failed
    if (error instanceof Error) {
      console.error('Error writing sitemap:', error.message);
      try {
        await fs.copyFile(backupPath, filePath);
        console.log('Restored from backup');
      } catch {
        console.error('Could not restore from backup');
      }
    }
    throw error;
  }
}