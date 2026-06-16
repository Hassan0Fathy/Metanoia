import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export const generatePassPDF = async (
  guestName: string, 
  journey: string, 
  experience: string, 
  activities: string[], 
  id: string,
  checkInDate: string
) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });

  const applyBrandStyle = (page: number) => {
    if (page > 1) doc.addPage();
    doc.setFillColor(246, 243, 238);
    doc.rect(0, 0, 148, 210, 'F');
    doc.setTextColor(90, 62, 43);
  };

  // Helper: Header
  const drawHeader = (title: string) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.text('METANOIA', 74, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(title, 74, 22, { align: 'center' });
    doc.line(40, 25, 108, 25);
  };

  // --- Page 1: Cover ---
  applyBrandStyle(1);
  doc.setFontSize(28);
  doc.text('Welcome', 74, 100, { align: 'center' });
  doc.setFontSize(14);
  doc.text(guestName, 74, 110, { align: 'center' });

  // --- Page 2: Welcome Message ---
  applyBrandStyle(2);
  drawHeader('Sanctuary Welcome');
  doc.setFontSize(12);
  doc.text('Your path of return begins here.', 20, 50);
  doc.text('We are honored to guide your restoration.', 20, 60);

  // --- Page 3: Journey Overview ---
  applyBrandStyle(3);
  drawHeader('Journey Overview');
  doc.text(`Foundation: ${journey}`, 20, 50);
  doc.text(`Depth: ${experience}`, 20, 60);

  // --- Page 4: Itinerary ---
  applyBrandStyle(4);
  drawHeader('Daily Itinerary');
  activities.forEach((act, i) => {
    doc.text(`• ${act}`, 20, 50 + (i * 10));
  });

  // --- Page 5: Amenities ---
  applyBrandStyle(5);
  drawHeader('Sanctuary Amenities');
  ['Hydrotherapy', 'Quiet Zone', 'Meditation'].forEach((am, i) => {
    doc.text(`- ${am}`, 20, 50 + (i * 10));
  });

  // --- Page 6: Arrival ---
  applyBrandStyle(6);
  drawHeader('Arrival');
  doc.text(`Check-in: ${checkInDate}`, 20, 50);

  // --- Page 7: Etiquette ---
  applyBrandStyle(7);
  drawHeader('Etiquette');
  doc.text('We honor the silence of the sanctuary.', 20, 50);

  // --- Page 8: Access ---
  applyBrandStyle(8);
  drawHeader('Sanctuary Access');
  const qrDataUrl = await QRCode.toDataURL(id);
  doc.addImage(qrDataUrl, 'PNG', 54, 80, 40, 40);
  doc.text(`ID: ${id}`, 74, 130, { align: 'center' });

  doc.save(`Metanoia-Welcome-Booklet-${id}.pdf`);
};
