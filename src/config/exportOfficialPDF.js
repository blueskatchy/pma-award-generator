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

  const cleanText = (text) => {
    return text.replace(/\s+/g, " ").trim();
  };

  const drawHeader = () => {
    doc.addImage(logo, "PNG", leftMargin, 15, 22, 22);

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Philippine Military Academy", headerTextX, 24);

    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text(pageTitle, headerTextX, 32);

    const today = new Date().toLocaleDateString();
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(`Generated on: ${today}`, headerTextX, 40);

    doc.setDrawColor(0, 51, 102);
    doc.setLineWidth(0.4);
    doc.line(leftMargin, 48, pageWidth - leftMargin, 48);

    yPosition = 60;
  };

  drawHeader();

  sections.forEach((section) => {
    if (!section.data || section.data.length === 0) return;

    if (yPosition > pageHeight - 40) {
      doc.addPage();
      drawHeader();
    }

    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text(section.title.toUpperCase(), leftMargin, yPosition);
    doc.setFont(undefined, "normal");
    yPosition += 6;

    autoTable(doc, {
      startY: yPosition,

      head: [["Rank", "Name", "Grade"]],

      body: section.data.map((item) => [
        item.rank,
        cleanText(item.name).toUpperCase(), // ✅ whitespace cleaned here
        Number(item.grade).toFixed(3),
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

      didDrawPage: (data) => {
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(
          `Page ${data.pageNumber} of ${doc.getNumberOfPages()}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      },
    });

    yPosition = doc.lastAutoTable.finalY + 12;
  });

  doc.save(`${fileName}.pdf`);
};

export default exportOfficialPDF;