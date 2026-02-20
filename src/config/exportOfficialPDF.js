import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/pma_logoicon.png";

const exportOfficialPDF = ({
  pageTitle,
  sections,
  fileName,
}) => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const leftMargin = 14;
  const headerTextX = 45;

  let yPosition = 60;

  // ===== HEADER FUNCTION (Reusable per page) =====
  const drawHeader = () => {
    doc.addImage(logo, "PNG", leftMargin, 15, 22, 22);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Philippine Military Academy", headerTextX, 24);

    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text(pageTitle, headerTextX, 32);

    const today = new Date().toLocaleDateString();
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Generated on: ${today}`, headerTextX, 40);

    doc.setDrawColor(0, 51, 102);
    doc.setLineWidth(0.4);
    doc.line(leftMargin, 48, pageWidth - leftMargin, 48);

    yPosition = 60;
  };

  drawHeader();

  sections.forEach((section) => {
    if (!section.data || section.data.length === 0) return;

    if (yPosition > pageHeight - 30) {
      doc.addPage();
      drawHeader();
    }

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(section.title, leftMargin, yPosition);
    yPosition += 6;

    autoTable(doc, {
      startY: yPosition,
      head: [["Rank", "Name", "Grade"]],
      body: section.data.map((item) => [
        item.rank,
        item.name,
        item.grade,
      ]),
      theme: "striped",
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [0, 51, 102],
        textColor: 255,
      },
      margin: { left: leftMargin, right: leftMargin },

      didDrawPage: () => {
        const pageCount = doc.getNumberOfPages();

        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(
          `Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
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