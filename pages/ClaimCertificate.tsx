import React, { useState, useRef } from 'react';
import { Download, FileDown, Search, XCircle, Image as ImageIcon, FileText, Loader2 } from 'lucide-react';
import { db } from '../services/db';
import CertificateTemplate from '../components/CertificateTemplate';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ClaimCertificate: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [certificateData, setCertificateData] = useState<{name: string} | null>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null); // 'png' | 'pdf' | null
  
  // Ref for the hidden high-res export element
  const exportRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCertificateData(null);

    const cert = db.verifyCertificate(password);
    if (cert) {
      setCertificateData({ name: cert.name });
    } else {
      setError("Password is incorrect. Please fill the form or contact support.");
    }
  };

  const getExportCanvas = async () => {
    if (!exportRef.current) return null;
    
    // We use the hidden export container which has fixed 2000px width.
    // This ensures desktop layout and high resolution even on mobile devices.
    return await html2canvas(exportRef.current, {
      scale: 2, // 2000px * 2 = 4000px width, extremely high quality
      useCORS: true,
      backgroundColor: '#000000',
      logging: false,
      windowWidth: 2000, // Force CSS media queries to see a desktop viewport
      onclone: (clonedDoc) => {
         // Ensure the cloned element is visible in the cloned document
         const el = clonedDoc.getElementById('certificate-export');
         if (el) {
             el.style.display = 'flex';
         }
      }
    });
  };

  const handleDownloadPNG = async () => {
    if (!exportRef.current) return;
    setIsGenerating('png');
    
    try {
      const canvas = await getExportCanvas();
      if (!canvas) throw new Error("Canvas generation failed");

      const data = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = data;
      link.download = `TenaNet_Certificate_${certificateData?.name.replace(/\s+/g, '_') || 'CTF'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("PNG Generation failed", err);
      alert("Failed to generate PNG.");
    } finally {
      setIsGenerating(null);
    }
  };

  const handleDownloadPDF = async () => {
    if (!exportRef.current) return;
    setIsGenerating('pdf');

    try {
      const canvas = await getExportCanvas();
      if (!canvas) throw new Error("Canvas generation failed");

      const imgData = canvas.toDataURL('image/png');
      
      // A4 Landscape dimensions in mm (297 x 210)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`TenaNet_Certificate_${certificateData?.name.replace(/\s+/g, '_') || 'CTF'}.pdf`);
    } catch (err) {
      console.error("PDF Generation failed", err);
      alert("Failed to generate PDF.");
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-hacker-black relative">
       {/* Background */}
       <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-hacker-dark-red/20 to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {!certificateData ? (
          <div className="max-w-md mx-auto">
            <div className="bg-black/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
              <h2 className="text-2xl font-orbitron font-bold text-white mb-6 text-center">
                Claim Certificate
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Certificate Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-hacker-red focus:border-transparent outline-none transition-all placeholder-gray-600"
                      placeholder="Enter the password from Google Form"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Use the password you submitted in the registration form.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3 text-red-400 text-sm">
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-white text-black font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Find Certificate
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-orbitron font-bold text-white">Your Certificate</h2>
                <p className="text-gray-400">Issued to <span className="text-hacker-red">{certificateData.name}</span></p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleDownloadPNG}
                  disabled={!!isGenerating}
                  className="flex items-center gap-2 bg-hacker-red hover:bg-red-600 text-white px-6 py-2.5 rounded-lg transition-colors font-medium shadow-neon-red disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating === 'png' ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
                  Download PNG
                </button>
                <button 
                  onClick={handleDownloadPDF}
                  disabled={!!isGenerating}
                  className="flex items-center gap-2 bg-neon-purple hover:bg-purple-600 text-white px-6 py-2.5 rounded-lg transition-colors font-medium shadow-neon-purple disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating === 'pdf' ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                  Download PDF
                </button>
              </div>
            </div>

            {/* Display Version - Responsive */}
            <div className="rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,0,51,0.15)] border border-gray-800 mb-8">
               <CertificateTemplate recipientName={certificateData.name} />
            </div>

            {/* Hidden High-Res Version for Export - Fixed width 2000px */}
            <div style={{ position: 'fixed', top: 0, left: '-9999px', zIndex: -50 }}>
               <div ref={exportRef} style={{ width: '2000px' }}>
                  <CertificateTemplate recipientName={certificateData.name} id="certificate-export" />
               </div>
            </div>
            
            <p className="text-center text-gray-500 text-sm">
              Downloads are generated in high-resolution (4000px width).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimCertificate;