package com.example.Library.system;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Stream;

@Service
public class PDFGen {

//Borrow activity report
    public ByteArrayInputStream generateBorrowReport(List<BorrowRecord> records) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, BaseColor.BLACK);
            Paragraph title = new Paragraph("Borrow Activity Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(6);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{1, 2, 2, 3, 3, 2}); // Adjusted widths

            Stream.of("Trans ID", "Book ID", "Member ID", "Borrow Date", "Return Date", "Status")
                    .forEach(headerTitle -> {
                        PdfPCell header = new PdfPCell();
                        header.setBackgroundColor(BaseColor.CYAN);
                        header.setBorderWidth(1);
                        header.setPhrase(new Phrase(headerTitle));
                        header.setHorizontalAlignment(Element.ALIGN_CENTER);
                        header.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        header.setPadding(5);
                        table.addCell(header);
                    });

            for (BorrowRecord record : records) {
                table.addCell(String.valueOf(record.getTransactionId()));

                table.addCell(String.valueOf(record.getBookId()));

                table.addCell(String.valueOf(record.getMemberId()));

                table.addCell(record.getBorrowDate() != null ? record.getBorrowDate().toString() : "-");
                table.addCell(record.getReturnDate() != null ? record.getReturnDate().toString() : "-");

                table.addCell(record.getStatus() != null ? record.getStatus() : "Unknown");
            }

            document.add(table);
            document.close();

        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
//Member report
    public ByteArrayInputStream generateMemberReport(List<Member> members) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // 1. Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
            Paragraph title = new Paragraph("Member List Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            // 2. Table Setup (5 Columns)
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{1, 3, 4, 3, 2});

            // 3. Header
            Stream.of("ID", "Name", "Email", "Phone", "Status")
                    .forEach(headerTitle -> {
                        PdfPCell header = new PdfPCell();
                        header.setBackgroundColor(BaseColor.LIGHT_GRAY); // Gray header
                        header.setBorderWidth(1);
                        header.setPhrase(new Phrase(headerTitle));
                        header.setHorizontalAlignment(Element.ALIGN_CENTER);
                        header.setPadding(5);
                        table.addCell(header);
                    });

            // 4. Data Rows
            for (Member member : members) {
                table.addCell(String.valueOf(member.getMemberId()));
                table.addCell(member.getMemberName());
                table.addCell(member.getMemberEmail());
                table.addCell(member.getMemberPhoneNumber());
                table.addCell(member.getMemberStatus());
            }

            document.add(table);
            document.close();

        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }


//Book report
    public ByteArrayInputStream generateBookReport(List<Book> books) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
            Paragraph title = new Paragraph("Book Inventory Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{1, 4, 3, 2});

            Stream.of("ID", "Book Title", "Author", "Status")
                    .forEach(headerTitle -> {
                        PdfPCell header = new PdfPCell();
                        header.setBackgroundColor(BaseColor.ORANGE); // Orange header
                        header.setBorderWidth(1);
                        header.setPhrase(new Phrase(headerTitle));
                        header.setHorizontalAlignment(Element.ALIGN_CENTER);
                        header.setPadding(5);
                        table.addCell(header);
                    });

            for (Book book : books) {
                table.addCell(String.valueOf(book.getBookId()));
                table.addCell(book.getTitle());
                table.addCell(book.getAuthor());

            }

            document.add(table);
            document.close();

        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    //User report
    public ByteArrayInputStream generateUserSpecificReport(Member member, List<BorrowRecord> history) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
            Paragraph title = new Paragraph("Individual Member Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
            Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

            document.add(new Paragraph("Member Profile:", headFont));
            document.add(new Paragraph("ID: " + member.getMemberId(), bodyFont));
            document.add(new Paragraph("Name: " + member.getMemberName(), bodyFont));
            document.add(new Paragraph("Email: " + member.getMemberEmail(), bodyFont));
            document.add(new Paragraph("Phone: " + member.getMemberPhoneNumber(), bodyFont));
            document.add(new Paragraph("Status: " + member.getMemberStatus(), bodyFont));

            document.add(Chunk.NEWLINE);
            document.add(new Paragraph("Borrowing History:", headFont));
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{1, 1, 3, 3, 2});

            Stream.of("Trans ID", "Book ID", "Borrow Date", "Return Date", "Status")
                    .forEach(headerTitle -> {
                        PdfPCell header = new PdfPCell();
                        header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                        header.setBorderWidth(1);
                        header.setPhrase(new Phrase(headerTitle));
                        header.setHorizontalAlignment(Element.ALIGN_CENTER);
                        table.addCell(header);
                    });

            for (BorrowRecord record : history) {
                table.addCell(String.valueOf(record.getTransactionId()));
                table.addCell(String.valueOf(record.getBookId()));
                table.addCell(record.getBorrowDate() != null ? record.getBorrowDate().toString().split("T")[0] : "-");
                table.addCell(record.getReturnDate() != null ? record.getReturnDate().toString().split("T")[0] : "-");
                table.addCell(record.getStatus());
            }

            if(history.isEmpty()){
                table.addCell("No History");
                table.addCell("-");
                table.addCell("-");
                table.addCell("-");
                table.addCell("-");
            }

            document.add(table);
            document.close();

        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }


}