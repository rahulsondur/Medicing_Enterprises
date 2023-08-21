import PDFViewer from './pdf-viewer';

function ReviewPage() {
    const pdfUrl = './pdfs/Resume_Rahul_Sondur.pdf';
  return (
    <div className='review-page'>
        <PDFViewer  pdfUrl={pdfUrl} />
    </div>
  );
}

export default ReviewPage;
