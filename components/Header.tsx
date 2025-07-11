import React from 'react';
import { CertificateIcon } from './IconComponents';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CertificateIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            AI Certificate Generator
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;