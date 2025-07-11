
import React from 'react';

export const CertificateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export const MagicWandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25278V2.75C12 2.47386 12.2239 2.25 12.5 2.25C12.7761 2.25 13 2.47386 13 2.75V6.25278C13 6.3421 13.0114 6.43029 13.0337 6.51446L13.0783 6.68554C13.2504 7.34023 12.7496 8 12.0783 8L11.9217 8C11.2504 8 10.7496 7.34023 10.9217 6.68554L10.9663 6.51446C10.9886 6.43029 11 6.3421 11 6.25278V2.75C11 2.47386 11.2239 2.25 11.5 2.25C11.7761 2.25 12 2.47386 12 2.75V6.25278ZM8.25 11.5C8.25 11.2239 8.02614 11 7.75 11C7.47386 11 7.25 11.2239 7.25 11.5V12.5C7.25 12.7761 7.47386 13 7.75 13C8.02614 13 8.25 12.7761 8.25 12.5V11.5ZM16.75 11.5C16.75 11.2239 16.5261 11 16.25 11C15.9739 11 15.75 11.2239 15.75 11.5V12.5C15.75 12.7761 15.9739 13 16.25 13C16.5261 13 16.75 12.7761 16.75 12.5V11.5ZM6.72632 6.72632C6.92158 6.53106 6.92158 6.21447 6.72632 6.01921C6.53106 5.82395 6.21447 5.82395 6.01921 6.01921L5.31213 6.72629C5.11687 6.92156 5.11687 7.23814 5.31213 7.4334L6.01921 8.14048C6.21447 8.33574 6.53106 8.33574 6.72632 8.14048C6.92158 7.94522 6.92158 7.62864 6.72632 7.43338L6.72632 6.72632ZM18.6879 6.72629C18.4926 6.53103 18.4926 6.21445 18.6879 6.01919C18.8831 5.82393 19.1997 5.82393 19.395 6.01919L20.1021 6.72627C20.2973 6.92153 20.2973 7.23811 20.1021 7.43337L19.395 8.14045C19.1997 8.33571 18.8831 8.33571 18.6879 8.14045C18.4926 7.94519 18.4926 7.62861 18.6879 7.43335L18.6879 6.72629ZM5.96967 17.2803C6.26256 16.9874 6.73744 16.9874 7.03033 17.2803L10.2929 20.5429C10.4393 20.6893 10.5 20.8824 10.5 21.0829V21.5C10.5 21.7761 10.7239 22 11 22H13C13.2761 22 13.5 21.7761 13.5 21.5V21.0829C13.5 20.8824 13.5607 20.6893 13.7071 20.5429L16.9697 17.2803C17.2626 16.9874 17.7374 16.9874 18.0303 17.2803C18.3232 17.5732 18.3232 18.0481 18.0303 18.341L13.341 23.0303C12.7553 23.6161 11.8053 23.6161 11.2195 23.0303L6.53033 18.341C6.23744 18.0481 6.23744 17.5732 5.96967 17.2803Z" />
  </svg>
);

export const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
