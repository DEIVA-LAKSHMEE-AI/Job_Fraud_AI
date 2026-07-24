import { getFileExtension } from './utils';

export default class FileHandler {
  async extractText(file: File): Promise<string> {
    const extension = getFileExtension(file.name).toLowerCase();

    switch (extension) {
      case 'txt':
        return this.extractFromText(file);
      case 'pdf':
        return this.extractFromPDF(file);
      case 'docx':
        return this.extractFromDocx(file);
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'webp':
        return this.extractFromImage(file);
      default:
        throw new Error(`Unsupported file type: ${extension}`);
    }
  }

  private async extractFromText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  private async extractFromPDF(file: File): Promise<string> {
    // For now, return a placeholder. In production, use pdf.js or similar
    const text = await this.extractFromText(file);
    return text || 'PDF extraction requires server-side processing. Please paste the text directly.';
  }

  private async extractFromDocx(file: File): Promise<string> {
    // For now, return a placeholder. In production, use docx parser
    return 'DOCX extraction requires server-side processing. Please copy the text and paste it directly.';
  }

  private async extractFromImage(file: File): Promise<string> {
    // For now, return a placeholder. In production, use OCR (Tesseract.js or Cloud Vision)
    return 'Image OCR requires server-side processing. Please copy the text from the image and paste it directly.';
  }

  // Helper method to validate file
  isValidFile(file: File): boolean {
    const validMimeTypes = [
      'text/plain',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png',
      'image/jpeg',
      'image/webp',
    ];

    return validMimeTypes.includes(file.type) || file.type === '';
  }
}
