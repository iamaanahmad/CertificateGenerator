
import React from 'react';
import type { CertificateData, DownloadType } from '../types';
import { MagicWandIcon, UploadIcon, DownloadIcon, SpinnerIcon } from './IconComponents';

interface ControlPanelProps {
  data: CertificateData;
  onDataChange: (field: keyof CertificateData, value: string) => void;
  onFileChange: (file: File, field: 'logoUrl' | 'backgroundUrl' | 'issuerSignatureUrl') => void;
  onDownload: (type: DownloadType) => void;
  onGenerateDescription: () => void;
  isLoading: boolean;
  isGenerating: boolean;
  isBulkMode: boolean;
  onBulkModeChange: () => void;
  bulkNames: string;
  onBulkNamesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBulkDownload: () => void;
  isBulkLoading: boolean;
  bulkProgress: { current: number; total: number };
}

const InputField: React.FC<{ label: string; id: keyof CertificateData; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; type?: string; }> = ({ label, id, value, onChange, type = 'text' }) => {
  const commonProps = {
    id,
    name: id,
    value,
    onChange,
    className: "mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input {...commonProps} type={type} />
    </div>
  );
};

const FileInput: React.FC<{ label: string; id: 'logoUrl' | 'backgroundUrl' | 'issuerSignatureUrl'; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, id, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
      <div className="space-y-1 text-center">
        <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
        <div className="flex text-sm text-gray-600 dark:text-gray-400">
          <label htmlFor={id} className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
            <span>Upload a file</span>
            <input id={id} name={id} type="file" className="sr-only" onChange={onChange} accept="image/png, image/jpeg, image/svg+xml" />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, SVG up to 10MB</p>
      </div>
    </div>
  </div>
);


const ControlPanel: React.FC<ControlPanelProps> = ({ data, onDataChange, onFileChange, onDownload, onGenerateDescription, isLoading, isGenerating, isBulkMode, onBulkModeChange, bulkNames, onBulkNamesChange, onBulkDownload, isBulkLoading, bulkProgress }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onDataChange(e.target.name as keyof CertificateData, e.target.value);
  };
  
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0], e.target.name as 'logoUrl' | 'backgroundUrl' | 'issuerSignatureUrl');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customize Certificate</h2>
      
      <div className="space-y-4">
        <InputField label="Certificate Title" id="certificateTitle" value={data.certificateTitle} onChange={handleInputChange} />
        
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isBulkMode ? "Recipient Names (one per line)" : "Recipient Name"}
                </label>
                <div className="flex items-center space-x-2">
                     <span className="text-sm text-gray-500 dark:text-gray-400">Bulk Mode</span>
                     <label htmlFor="bulk-toggle" className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" checked={isBulkMode} onChange={onBulkModeChange} id="bulk-toggle" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
            {isBulkMode ? (
                 <textarea
                    id="bulkNames"
                    name="bulkNames"
                    value={bulkNames}
                    onChange={onBulkNamesChange}
                    rows={5}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Jane Doe&#10;John Smith&#10;Peter Jones"
                />
            ) : (
                <input id="recipientName" name="recipientName" value={data.recipientName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" type="text" />
            )}
        </div>

        <InputField label="Course Name" id="courseName" value={data.courseName} onChange={handleInputChange} />
        <div>
          <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Description</label>
          <div className="relative">
            <textarea id="courseDescription" name="courseDescription" value={data.courseDescription} onChange={handleInputChange} rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10" />
            <button onClick={onGenerateDescription} disabled={isGenerating} title="Generate with AI" className="absolute top-2 right-2 p-1.5 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              {isGenerating ? <SpinnerIcon className="h-5 w-5 animate-spin"/> : <MagicWandIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <InputField label="Completion Date" id="completionDate" value={data.completionDate} onChange={handleInputChange} type="date" />
        <InputField label="Issuer Name / Organization" id="issuerName" value={data.issuerName} onChange={handleInputChange} />
        <InputField label="Issuer Signature Text" id="issuerSignature" value={data.issuerSignature} onChange={handleInputChange} />
        <FileInput label="Or Upload Signature Image" id="issuerSignatureUrl" onChange={handleFile} />
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Template</label>
          <select id="template" name="template" value={data.template} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option className="bg-white dark:bg-gray-700 text-black dark:text-white" value="classic">Classic</option>
            <option className="bg-white dark:bg-gray-700 text-black dark:text-white" value="modern">Modern</option>
            <option className="bg-white dark:bg-gray-700 text-black dark:text-white" value="elegant">Elegant</option>
            <option className="bg-white dark:bg-gray-700 text-black dark:text-white" value="custom">Custom (Upload Your Own)</option>
          </select>
        </div>
        <FileInput label="Logo Image" id="logoUrl" onChange={handleFile} />
        {data.template === 'custom' && (
          <FileInput label="Upload Custom Template Background" id="backgroundUrl" onChange={handleFile} />
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Download</h3>
        {isBulkMode ? (
            <button onClick={onBulkDownload} disabled={isBulkLoading} className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300 dark:disabled:bg-green-800 disabled:cursor-not-allowed">
                {isBulkLoading ? (
                    <>
                        <SpinnerIcon className="h-5 w-5 animate-spin mr-2" />
                        {`Generating ${bulkProgress.current} of ${bulkProgress.total}...`}
                    </>
                ) : (
                    <>
                        <DownloadIcon className="h-5 w-5 mr-2" />
                        Download as ZIP
                    </>
                )}
            </button>
         ) : (
          <div className="flex space-x-3">
            <button onClick={() => onDownload('PNG')} disabled={isLoading} className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed">
              {isLoading && !isBulkLoading ? <SpinnerIcon className="h-5 w-5 animate-spin mr-2" /> : <DownloadIcon className="h-5 w-5 mr-2" />}
              Download PNG
            </button>
            <button onClick={() => onDownload('PDF')} disabled={isLoading} className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-500 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading && !isBulkLoading ? <SpinnerIcon className="h-5 w-5 animate-spin mr-2" /> : <DownloadIcon className="h-5 w-5 mr-2" />}
              Download PDF
            </button>
          </div>
         )}
      </div>
    </div>
  );
};

export default ControlPanel;
