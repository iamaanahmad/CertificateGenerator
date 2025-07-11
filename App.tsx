
import React, { useState, useRef, useCallback } from 'react';
import { CertificateData, DownloadType } from './types';
import ControlPanel from './components/ControlPanel';
import CertificatePreview from './components/CertificatePreview';
import Header from './components/Header';
import { generateDescription } from './services/geminiService';

// Fallback for libraries if they are not on window
declare global {
  interface Window {
    html2canvas: any;
    jspdf: any;
    JSZip: any;
  }
}
const { jsPDF } = window.jspdf;
const JSZip = window.JSZip;

const App: React.FC = () => {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    recipientName: 'Jane Doe',
    courseName: 'Advanced React Development',
    completionDate: new Date().toISOString().split('T')[0],
    issuerName: 'Tech Academy',
    issuerSignature: 'John Smith, Director',
    issuerSignatureUrl: '',
    certificateTitle: 'Certificate of Completion',
    courseDescription: 'This certifies that the recipient has successfully completed all requirements of the comprehensive course on advanced React development, covering hooks, state management, and performance optimization.',
    logoUrl: 'https://i.ibb.co/Y7LpdBmh/image.png',
    backgroundUrl: 'https://i.ibb.co/pvQfc1Wb/certificate4.png',
    template: 'classic',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkNames, setBulkNames] = useState('Jane Doe\nJohn Smith\nPeter Jones');
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });


  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDataChange = useCallback((field: keyof CertificateData, value: string) => {
    setCertificateData(prev => {
        const newData = { ...prev, [field]: value };
        if (field === 'template') {
            switch(value) {
                case 'classic':
                    newData.backgroundUrl = 'https://i.ibb.co/pvQfc1Wb/certificate4.png';
                    break;
                case 'modern':
                    newData.backgroundUrl = 'https://i.ibb.co/JqZ1r2b/modern-bg.png';
                    break;
                case 'elegant':
                    newData.backgroundUrl = 'https://i.ibb.co/yY1hY2c/elegant-bg.jpg';
                    break;
                case 'custom':
                    newData.backgroundUrl = '';
                    break;
            }
        }
        return newData;
    });
  }, []);

  const handleFileChange = useCallback((file: File, field: 'logoUrl' | 'backgroundUrl' | 'issuerSignatureUrl') => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCertificateData(prev => ({ ...prev, [field]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGenerateDescription = useCallback(async () => {
    if (!certificateData.courseName) {
      setError("Please enter a course name first.");
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      const description = await generateDescription(certificateData.courseName);
      setCertificateData(prev => ({ ...prev, courseDescription: description }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  }, [certificateData.courseName]);

  const handleDownload = useCallback(async (type: DownloadType) => {
    if (!certificateRef.current) return;
    setIsLoading(true);
    setError(null);
    try {
        const previewElement = certificateRef.current.querySelector('#certificate-render-area');
        if (!previewElement) throw new Error("Could not find certificate render area.");

        const canvas = await window.html2canvas(previewElement as HTMLElement, {
            scale: 2,
            useCORS: true,
            backgroundColor: null,
        });

        if (type === 'PNG') {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `Certificate-${certificateData.recipientName.replace(/\s/g, '_')}.png`;
            link.href = imgData;
            link.click();
        } else if (type === 'PDF') {
            const imgData = canvas.toDataURL('image/jpeg', 0.9);
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
            pdf.save(`Certificate-${certificateData.recipientName.replace(/\s/g, '_')}.pdf`);
        }
    } catch (e) {
        setError("Failed to generate file. Please try again.");
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  }, [certificateData.recipientName]);
  
  const handleBulkDownload = useCallback(async () => {
    if (!certificateRef.current || !bulkNames.trim()) {
      setError("Please enter at least one recipient name for bulk generation.");
      return;
    }

    const names = bulkNames.split('\n').filter(name => name.trim() !== '');
    if (names.length === 0) {
      setError("No valid recipient names entered.");
      return;
    }

    setIsBulkLoading(true);
    setError(null);
    setBulkProgress({ current: 0, total: names.length });

    const zip = new JSZip();
    const originalRecipientName = certificateData.recipientName;

    try {
        const previewElement = certificateRef.current.querySelector('#certificate-render-area');
        if (!previewElement) throw new Error("Could not find certificate render area.");

        for (let i = 0; i < names.length; i++) {
            const name = names[i].trim();
            setBulkProgress({ current: i + 1, total: names.length });

            await new Promise<void>(resolve => {
                setCertificateData(prev => ({ ...prev, recipientName: name }));
                requestAnimationFrame(() => setTimeout(resolve, 50)); 
            });
            
            const canvas = await window.html2canvas(previewElement as HTMLElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
            });

            const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
            if (blob) {
                zip.file(`Certificate-${name.replace(/\s/g, '_')}.png`, blob);
            }
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipBlob);
        link.download = `Certificates-${certificateData.courseName.replace(/\s/g, '_')}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

    } catch (e) {
        setError("Failed to generate bulk certificates. Please try again.");
        console.error(e);
    } finally {
        setIsBulkLoading(false);
        setCertificateData(prev => ({ ...prev, recipientName: originalRecipientName }));
    }
  }, [bulkNames, certificateData.recipientName, certificateData.courseName]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <ControlPanel 
              data={certificateData} 
              onDataChange={handleDataChange} 
              onFileChange={handleFileChange}
              onDownload={handleDownload}
              onGenerateDescription={handleGenerateDescription}
              isLoading={isLoading}
              isGenerating={isGenerating}
              isBulkMode={isBulkMode}
              onBulkModeChange={() => setIsBulkMode(p => !p)}
              bulkNames={bulkNames}
              onBulkNamesChange={(e) => setBulkNames(e.target.value)}
              onBulkDownload={handleBulkDownload}
              isBulkLoading={isBulkLoading}
              bulkProgress={bulkProgress}
            />
          </div>
          <div className="lg:col-span-8">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Certificate Preview</h2>
              {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
              <CertificatePreview ref={certificateRef} data={certificateData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;