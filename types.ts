
export interface CertificateData {
  recipientName: string;
  courseName: string;
  completionDate: string;
  issuerName: string;
  issuerSignature: string;
  issuerSignatureUrl: string;
  certificateTitle: string;
  courseDescription: string;
  logoUrl: string;
  backgroundUrl: string;
  template: 'classic' | 'modern' | 'custom' | 'elegant';
}

export type DownloadType = 'PNG' | 'PDF';
