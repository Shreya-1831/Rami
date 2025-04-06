// 📦 Import PDF.js and Tesseract
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import Tesseract from 'tesseract.js';
import pdfWorker from './pdfWorker'; 

// 🛠️ Set the workerSrc right here — BEFORE any pdfjsLib usage
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

/**
 * Reads the content of a file (txt or pdf) and extracts text.
 * Falls back to OCR for image-based PDFs.
 * @param {File} file - The uploaded file from input.
 * @returns {Promise<string>} - The extracted text.
 */
export const readFileContent = async (file) => {
  const extension = file.name.split('.').pop().toLowerCase();

  if (extension === 'txt') {
    return (await file.text()).trim();
  }

  if (extension === 'pdf') {
    const typedArray = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const opList = await page.getOperatorList();
      const hasText = opList.fnArray.includes(pdfjsLib.OPS.showText);

      if (hasText) {
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        text += strings.join(' ') + '\n';
      } else {
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        const {
          data: { text: ocrText }
        } = await Tesseract.recognize(canvas, 'eng');
        text += ocrText + '\n';
      }
    }

    return text.trim();
  }

  if (['jpg', 'jpeg', 'png'].includes(extension)) {
    const {
      data: { text: imageText }
    } = await Tesseract.recognize(file, 'eng');
    return imageText.trim();
  }

  return '❌ Unsupported file format. Please upload a .pdf or .txt file.';
};
