import React, { forwardRef } from 'react';
import type { CertificateData } from '../types';

interface CertificatePreviewProps {
  data: CertificateData;
}

const ClassicTemplate: React.FC<CertificatePreviewProps> = ({ data }) => {
    const [signatureName, ...signatureTitleParts] = data.issuerSignature.split(',').map(s => s.trim());
    const signatureTitle = signatureTitleParts.join(', ');

    return (
        <div className="w-full h-full text-center px-16 py-10 flex flex-col items-center justify-between font-merriweather text-[#4a3528]" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url('${data.backgroundUrl}')`}}>
            
            {/* Top section content */}
            <div className="w-full">
                {data.logoUrl && <img src={data.logoUrl} alt="Organization Logo" className="max-h-16 mx-auto mb-4" />}
                
                <h1 className="text-5xl font-bold mb-2">{data.certificateTitle}</h1>
                <p className="text-base text-gray-500 mb-4">This is to certify that</p>
                
                <h2 className="text-6xl font-pinyon mb-3" style={{color: '#382a21'}}>{data.recipientName || 'Recipient Name'}</h2>
                
                <p className="max-w-2xl mx-auto text-[15px] leading-relaxed mb-6">{data.courseDescription || 'has successfully completed the course'}</p>
                
                <p className="text-3xl font-semibold" style={{color: '#8c5a3b'}}>{data.courseName || 'Course Name'}</p>
            </div>
            
            {/* Bottom section */}
            <div className="w-full flex justify-between items-end pt-8">
                {/* Date Block */}
                <div className="text-center w-2/5">
                    <p className="font-merriweather text-base h-8 flex items-end justify-center">{data.completionDate || 'YYYY-MM-DD'}</p>
                    <div className="border-t border-[#b9957f] w-full mx-auto pt-1 mt-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
                    </div>
                </div>

                {/* Issuer/Signature Block */}
                <div className="text-center w-2/5">
                     <div className="h-12 flex items-center justify-center">
                        {data.issuerSignatureUrl ? (
                            <img src={data.issuerSignatureUrl} alt="Signature" className="max-h-full" style={{ filter: 'brightness(0) saturate(100%) invert(23%) sepia(21%) saturate(1239%) hue-rotate(346deg) brightness(91%) contrast(87%)' }} />
                        ) : (
                            <p className="font-pinyon text-4xl" style={{color: '#382a21'}}>{signatureName}</p>
                        )}
                     </div>
                     <div className="border-t border-[#b9957f] w-full mx-auto pt-1 mt-1">
                        <div className="flex flex-col items-center">
                             {/* The image shows a small icon here. Let's add it, reusing the main logo. */}
                             {data.logoUrl && <img src={data.logoUrl} alt="Issuer Seal" className="h-8 mb-1" />}
                             <p className="text-sm font-semibold">{signatureTitle || data.issuerName}</p>
                             <p className="text-xs text-gray-500 uppercase tracking-wider">Issuer</p>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

const ModernTemplate: React.FC<CertificatePreviewProps> = ({ data }) => {
    const [signatureName, ...signatureTitleParts] = data.issuerSignature.split(',').map(s => s.trim());
    const signatureTitle = signatureTitleParts.join(', ');

    return (
        <div className="w-full h-full flex" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url('${data.backgroundUrl}')` }}>
            <div className="w-1/3 bg-gray-800 bg-opacity-80 p-10 flex flex-col justify-center items-center text-white">
                {data.logoUrl && <img src={data.logoUrl} alt="Organization Logo" className="max-h-20 mb-8" />}
                <h3 className="text-2xl font-bold uppercase tracking-widest text-blue-300">{data.certificateTitle}</h3>
                <div className="w-24 h-0.5 bg-blue-300 my-8"></div>
                <p className="text-center text-sm text-gray-300">{data.issuerName || 'Issuer Name'}</p>
            </div>
            <div className="w-2/3 p-12 flex flex-col justify-center text-gray-800">
                <p className="text-lg font-medium mb-2">This certifies that</p>
                <h1 className="text-5xl font-bold font-merriweather mb-4 text-gray-900">{data.recipientName || 'Recipient Name'}</h1>
                <p className="text-base max-w-lg mb-6">{data.courseDescription || 'has successfully completed the course'}</p>
                <h2 className="text-3xl font-semibold font-merriweather text-blue-700">{data.courseName || 'Course Name'}</h2>
                <div className="mt-auto pt-10 flex justify-between items-end text-sm">
                    <div className="w-1/2 pr-4">
                        <div className="h-12 flex items-center">
                            {data.issuerSignatureUrl ? (
                                <img src={data.issuerSignatureUrl} alt="Signature" className="max-h-full" />
                            ) : (
                                <p className="font-pinyon text-3xl text-gray-800">{signatureName}</p>
                            )}
                        </div>
                        <p className="border-t border-gray-400 pt-1 mt-1">{signatureTitle ? `${signatureName}, ${signatureTitle}` : signatureName}</p>
                        <p className="text-xs">Issuer Signature</p>
                    </div>
                    <div className="w-1/2 text-right pl-4">
                        <p className="font-bold text-lg font-merriweather">{data.completionDate || 'YYYY-MM-DD'}</p>
                        <p className="border-t border-gray-400 pt-1 mt-1">Completion Date</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ElegantTemplate: React.FC<CertificatePreviewProps> = ({ data }) => {
    const [signatureName, ...signatureTitleParts] = data.issuerSignature.split(',').map(s => s.trim());
    const signatureTitle = signatureTitleParts.join(', ');

    return (
        <div className="w-full h-full text-center p-16 flex flex-col items-center justify-center text-gray-700" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url('${data.backgroundUrl}')`}}>
            {data.logoUrl && <img src={data.logoUrl} alt="Organization Logo" className="max-h-20 mb-6 opacity-90" />}
            <p className="text-xl tracking-widest uppercase text-gray-500 mb-2">{data.certificateTitle}</p>
            <p className="text-lg mb-4">This certificate is proudly presented to</p>
            <h2 className="text-7xl font-pinyon mb-4 text-amber-800">{data.recipientName || 'Recipient Name'}</h2>
            <p className="max-w-xl mx-auto text-base italic text-gray-600 mb-8">{data.courseDescription || 'has successfully completed all the prescribed requirements of the course'}</p>
            <div className="w-1/2 border-t-2 border-amber-700 border-dotted my-4"></div>
            <p className="text-3xl font-semibold font-merriweather mb-12">{data.courseName || 'Course Name'}</p>
            <div className="w-full flex justify-between items-end mt-auto pt-8 text-sm">
                <div className="text-center w-1/2">
                    <div className="h-16 flex items-center justify-center">
                        {data.issuerSignatureUrl ? (
                             <img src={data.issuerSignatureUrl} alt="Signature" className="max-h-full" />
                        ) : (
                             <p className="font-pinyon text-4xl leading-none">{signatureName}</p>
                        )}
                    </div>
                    <p className="border-t border-gray-400 pt-1 mt-1 mx-8">{signatureTitle ? `${signatureName}, ${signatureTitle}` : signatureName}</p>
                    <p className="text-xs">Issuer Signature</p>
                </div>
                <div className="text-center w-1/2">
                     <p className="font-merriweather font-bold text-lg leading-tight">{data.completionDate || 'YYYY-MM-DD'}</p>
                    <p className="border-t border-gray-400 pt-1 mt-1 mx-8">Date of Completion</p>
                </div>
            </div>
        </div>
    );
};


const CustomTemplate: React.FC<CertificatePreviewProps> = ({ data }) => {
    const placeholderBg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4NTAiIHZpZXdCb3g9IjAgMCAxMjAwIDg1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmMTRmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSIjYzdjN2M3Ij5VcGxvYWQgYSBjdXN0b20gYmFja2dyb3VuZDwvdGV4dD48L3N2Zz4=';
    const [signatureName, ...signatureTitleParts] = data.issuerSignature.split(',').map(s => s.trim());
    const signatureTitle = signatureTitleParts.join(', ');
    
    return (
        <div className="w-full h-full text-center p-12 flex flex-col items-center justify-center text-gray-800" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url('${data.backgroundUrl || placeholderBg}')` }}>
            {data.logoUrl && <img src={data.logoUrl} alt="Organization Logo" className="max-h-24 mb-6" />}
            
            <h1 className="text-5xl font-bold font-merriweather mb-4">{data.certificateTitle}</h1>
            <p className="text-lg mb-4">This is to certify that</p>
            
            <h2 className="text-6xl font-pinyon mb-4 text-blue-800">{data.recipientName || 'Recipient Name'}</h2>
            
            <p className="max-w-2xl mx-auto text-base mb-8">{data.courseDescription || 'has successfully completed the course'}</p>
            
            <p className="text-2xl font-semibold font-merriweather mb-12">{data.courseName || 'Course Name'}</p>
            
            <div className="w-full flex justify-around items-end mt-auto pt-8">
                <div className="text-center w-2/5">
                    <p className="font-semibold text-lg">{data.completionDate || 'YYYY-MM-DD'}</p>
                    <p className="text-sm border-t-2 border-gray-500 pt-2 mt-2">Date</p>
                </div>
                <div className="text-center w-2/5">
                    <div className="h-16 flex items-center justify-center">
                        {data.issuerSignatureUrl ? (
                            <img src={data.issuerSignatureUrl} alt="Signature" className="max-h-full" />
                        ) : (
                            <p className="font-pinyon text-4xl">{signatureName}</p>
                        )}
                    </div>
                    <p className="text-sm border-t-2 border-gray-500 pt-2 mt-2">{signatureTitle ? `${signatureName}, ${signatureTitle}` : signatureName}</p>
                    <p className="text-xs">Issuer Signature</p>
                </div>
            </div>
        </div>
    );
};

const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>((props, ref) => {
  const { data } = props;

  const renderTemplate = () => {
    switch(data.template) {
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'elegant':
        return <ElegantTemplate data={data} />;
      case 'custom':
        return <CustomTemplate data={data} />;
      default:
        return <ClassicTemplate data={data} />;
    }
  }

  return (
    <div ref={ref} className="aspect-[1190/841] w-full bg-white shadow-2xl overflow-hidden transition-all duration-300">
      <div id="certificate-render-area" className="w-[1190px] h-[841px] transform scale-[var(--scale-factor,0.7)] origin-top-left" style={{ '--scale-factor': 'calc(100% / 1190px)' } as React.CSSProperties}>
        {renderTemplate()}
      </div>
    </div>
  );
});

CertificatePreview.displayName = 'CertificatePreview';
export default CertificatePreview;