import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export const generatePassPDF = async (
  guestName: string, 
  journey: string, 
  program: string, 
  activities: string[], 
  id: string,
  checkInDate: string
) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });

  const beige = [250, 249, 246];
  const brown = [139, 69, 19];
  const olive = [85, 107, 47];

  const applyBaseStyle = () => {
    doc.setFillColor(beige[0], beige[1], beige[2]);
    doc.rect(0, 0, 148, 210, 'F');
    doc.setDrawColor(brown[0], brown[1], brown[2]);
    doc.setLineWidth(0.5);
    doc.rect(5, 5, 138, 200);
  };

  // --- PAGE 1: COVER ---
  applyBaseStyle();
  doc.setTextColor(brown[0], brown[1], brown[2]);
  doc.setFont('times', 'italic');
  doc.setFontSize(12);
  doc.text('SANCTUARY DOSSIER', 74, 40, { align: 'center' });
  
  doc.setFont('times', 'bold');
  doc.setFontSize(32);
  doc.text('METANOIA', 74, 60, { align: 'center' });
  
  doc.setDrawColor(olive[0], olive[1], olive[2]);
  doc.line(40, 68, 108, 68);

  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.text('Prepared exclusively for', 74, 110, { align: 'center' });
  
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.text(guestName.toUpperCase(), 74, 125, { align: 'center' });
  
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.text(new Date().getFullYear().toString(), 74, 190, { align: 'center' });

  // --- PAGE 2: RESERVATION DETAILS ---
  doc.addPage();
  applyBaseStyle();
  
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.text('RESERVATION DETAILS', 74, 30, { align: 'center' });
  
  let y = 60;
  const details = [
    { label: 'REFERENCE', value: id },
    { label: 'JOURNEY TYPE', value: journey },
    { label: 'PROGRAM', value: program },
    { label: 'ARRIVAL DATE', value: checkInDate || 'JUNE 2026' },
  ];

  details.forEach(detail => {
    doc.setFont('times', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(detail.label, 20, y);
    
    y += 10;
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(brown[0], brown[1], brown[2]);
    doc.text(detail.value.toUpperCase(), 20, y);
    y += 15;
  });

  // Access QR on Details Page
  const qrDataUrl = await QRCode.toDataURL(id);
  doc.addImage(qrDataUrl, 'PNG', 100, 140, 30, 30);
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('DIGITAL ACCESS KEY', 115, 175, { align: 'center' });

  // --- PAGE 3: ITINERARY & EXPERIENCES ---
  doc.addPage();
  applyBaseStyle();
  
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(brown[0], brown[1], brown[2]);
  doc.text('YOUR ITINERARY', 74, 30, { align: 'center' });
  
  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.text('A choreographed sequence of restoration.', 74, 38, { align: 'center' });

  y = 60;
  activities.forEach((act, i) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(olive[0], olive[1], olive[2]);
    doc.text(`${String(i + 1).padStart(2, '0')}`, 20, y);
    
    doc.setFont('times', 'normal');
    doc.setTextColor(brown[0], brown[1], brown[2]);
    doc.text(act.toUpperCase(), 35, y);
    
    y += 12;
    if (y > 190) {
      doc.addPage();
      applyBaseStyle();
      y = 30;
    }
  });

  // --- FINAL PAGE: CONCIERGE ---
  doc.addPage();
  applyBaseStyle();
  
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.text('CONCIERGE', 74, 30, { align: 'center' });
  
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(brown[0], brown[1], brown[2]);
  const conciergeText = [
    'Your personal sanctuary guide is currently preparing',
    'every detail of your arrival. Should you require',
    'refinements to your itinerary or have special',
    'requests, we remain at your disposal.'
  ];
  
  conciergeText.forEach((line, i) => {
    doc.text(line, 74, 60 + (i * 7), { align: 'center' });
  });

  doc.setFont('times', 'bold');
  doc.text('CONTACT', 74, 110, { align: 'center' });
  doc.setFont('times', 'italic');
  doc.text('hello@metanoia.com', 74, 120, { align: 'center' });
  doc.text('+1 (800) METANOIA', 74, 127, { align: 'center' });

  doc.save(`Metanoia-Dossier-${id}.pdf`);
};
