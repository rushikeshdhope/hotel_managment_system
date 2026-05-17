import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  public generatePdf(booking: any, fileName: string): void {
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(18);
    pdf.text('Booking Bill', 20, 20);
    
    // Add booking details
    pdf.setFontSize(12);
    pdf.text(`Order Details`, 20, 30);
    pdf.text(`Order No: ${booking.order1dto.order_no}`, 20, 40);
    pdf.text(`Date: ${booking.order1dto.date}`, 20, 50);
    pdf.text(`In Time: ${booking.order1dto.intime}`, 20, 60);
    pdf.text(`Out Time: ${booking.order1dto.outtime}`, 20, 70);
    pdf.text(`Total Amount: ${booking.order1dto.totalAmount}`, 20, 80);
    
    // Add customer details
    pdf.text(`Customer Details`, 20, 90);
    pdf.text(`Name: ${booking.customers1Dto.customer_name}`, 20, 100);
    pdf.text(`Email: ${booking.customers1Dto.customer_email}`, 20, 110);
    pdf.text(`Mobile: ${booking.customers1Dto.customer_mobile}`, 20, 120);
    pdf.text(`Identity Type: ${booking.customers1Dto.identity_type}`, 20, 130);
    pdf.text(`Identity Number: ${booking.customers1Dto.idenetity_number}`, 20, 140);
    
    // Optionally add related customers
    if (booking.relatedCustomer.length > 0) {
      pdf.text(`Related Customers`, 20, 150);
      booking.relatedCustomer.forEach((related: any, index: number) => {
        const position = 160 + index * 10;
        pdf.text(`Name: ${related.name}, Identity Type: ${related.idenetityType}`, 20, position);
      });
    }
    
    pdf.save(fileName);
  }
}
