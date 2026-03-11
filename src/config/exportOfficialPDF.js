import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/pma_logoicon.png";

const exportOfficialPDF = ({ pageTitle, sections, fileName }) => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const leftMargin = 14;
  const headerTextX = 45;
  let yPosition = 60;

  const cleanText = (text) => text.replace(/\s+/g, " ").trim();

  const drawHeader = (docInstance) => {
    docInstance.addImage(logo, "PNG", leftMargin, 15, 22, 22);

    docInstance.setFontSize(14);
    docInstance.setTextColor(0);
    docInstance.text("Philippine Military Academy", headerTextX, 24);

    docInstance.setFontSize(12);
    docInstance.setTextColor(40);
    docInstance.text(pageTitle, headerTextX, 32);

    const today = new Date().toLocaleDateString();
    docInstance.setFontSize(9);
    docInstance.setTextColor(120);
    docInstance.text(`Generated on: ${today}`, headerTextX, 40);

    docInstance.setDrawColor(0, 51, 102);
    docInstance.setLineWidth(0.4);
    docInstance.line(leftMargin, 48, pageWidth - leftMargin, 48);

    yPosition = 60;
  };

  drawHeader(doc);

  sections.forEach((section) => {
    if (!section.data || section.data.length === 0) return;

    if (yPosition > pageHeight - 40) {
      doc.addPage();
      drawHeader(doc);
    }

    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text(section.title.toUpperCase(), leftMargin, yPosition);
    doc.setFont(undefined, "normal");
    yPosition += 6;

    
    const hasCgpa = section.data[0]?.cgpa !== undefined;
    const valueKey = hasCgpa ? "cgpa" : "grade";
    const headerLabel = hasCgpa ? "CGPA" : "Grade";

    autoTable(doc, {
      startY: yPosition,
      head: [["Rank", "Name", headerLabel]],
      body: section.data.map((item) => [
        item.rank,
        cleanText(item.name).toUpperCase(),
        Number(item[valueKey]).toFixed(3),
      ]),
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
        valign: "middle",
      },
      headStyles: {
        fillColor: [50, 50, 50],
        textColor: 255,
        halign: "center",
        fontStyle: "bold",
      },
      columnStyles: {
        0: { halign: "center", cellWidth: 25 },
        1: { halign: "left", cellWidth: 120 },
        2: { halign: "center", cellWidth: 30 },
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { left: leftMargin, right: leftMargin },
    });

    yPosition = doc.lastAutoTable.finalY + 12;
  });

  
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, {
      align: "center",
    });
  }

  doc.save(`${fileName}.pdf`);
};

export default exportOfficialPDF;