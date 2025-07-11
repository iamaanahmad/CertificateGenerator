# AI Certificate Generator 🎓✨

![AI Certificate Generator Showcase](https://i.ibb.co/BVt1NcNT/image.png)

A powerful, open-source web application for creating, customizing, and bulk-generating professional certificates. Leveraging the Google Gemini API, this tool automates content creation and provides a seamless, real-time editing experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20TypeScript%20%7C%20Tailwind-blueviolet)](README.md#%-tech-stack)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](README.md#-contributing)


## ✨ Key Features

- **🤖 AI-Powered Content**: Automatically generate professional course descriptions using the Google Gemini API.
- **🎨 Multiple Templates**: Choose from several pre-designed templates (Classic, Modern, Elegant) or upload your own background for a fully custom design.
- **🖼️ Deep Customization**:
  - Edit all text fields in real-time.
  - Upload your organization's logo.
  - Upload a signature image or use stylized signature text.
- **⚡ Real-Time Preview**: See your certificate update instantly as you make changes.
- **📦 Bulk Generation**: Enter a list of recipient names to generate unique certificates for each, bundled conveniently into a single `.zip` file.
- **💾 Multiple Download Options**: Download your certificate as a high-quality `PNG` or a print-ready `PDF`.
- **📱 Fully Responsive**: A clean, intuitive interface that works flawlessly on desktop, tablets, and mobile devices.
- **🔍 SEO Optimized**: Meta tags are configured to improve visibility on search engines.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI**: [Google Gemini API](https://ai.google.dev/)
- **File Generation**: [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)
- **Archiving**: [JSZip](https://stuk.github.io/jszip/)

## 🚀 Getting Started

Follow these steps to get the project running locally.

### Prerequisites

You will need a Google Gemini API key.
- Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/iamaanahmad/CertificateGenerator.git
   cd CertificateGenerator
   ```

2. **API Key Configuration:**
   This application is designed to be deployed on a platform (like Vercel, Netlify, Glitch, or a custom Node.js server) that can securely inject environment variables into the frontend code.

   You must set an environment variable named `API_KEY` with your Google Gemini API key. The application code in `services/geminiService.ts` expects `process.env.API_KEY` to be available.

3. **Run Locally:**
   You can use any simple local web server to run the project.
   ```sh
   # If you have Node.js, you can use `npx`
   npx serve .
   ```
   Open your browser to the local address provided by the server.

   ⚠️ **Important for Local Development:** A simple static server like `serve` will **not** replace `process.env.API_KEY`. For local testing, you might need to temporarily replace `process.env.API_KEY` in `services/geminiService.ts` with your key string. **Remember to not commit your API key to your repository!**

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
