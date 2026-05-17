import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  public generatePdf(booking: any, fileName: string): void {

    console.log("for pdf",booking);
    const pdf = new jsPDF();

    
    // Add title
    pdf.setFontSize(18);
    pdf.text('Booking Bill', 20, 20);
    
    // Add booking details
    pdf.setFontSize(12);
    pdf.text(`Order Details`, 100, 30);
    pdf.text(`Order No: ${booking.order1dto?.order_no ?? ''}`, 20, 40);
    pdf.text(`Date: ${booking.order1dto?.date ?? ''}`, 160, 40);
    pdf.text(`In Time: ${booking.order1dto?.intime ?? ''}`, 160, 60);
    pdf.text(`Out Time: ${booking.order1dto?.outtime ?? ''}`, 160, 70);
    // pdf.text(`Total Amount: ${booking.order1dto?.totalAmount ?? ''}`, 20, 60);
    
    // Add customer details
    pdf.text(`Customer Details`, 20, 60);
    pdf.text(`Name: ${booking.customers1Dto?.customer_name ?? ''}`, 20, 70);
    // pdf.text(`Email: ${booking.customers1Dto?.customer_email ?? ''}`, 20, 110);
    pdf.text(`Mobile: ${booking.customers1Dto?.customer_mobile ?? ''}`, 20, 80);
    // pdf.text(`Identity Type: ${booking.customers1Dto?.identity_type ?? ''}`, 20, 120);
    // pdf.text(`Identity Number: ${booking.customers1Dto?.idenetity_number ?? ''}`, 20, 140);
    
    // Optionally add related customers
    if (booking.order1dto.relatedCustomer) {
      pdf.text(`Related Guest`, 100, 60);
      pdf.text(`${booking.order1dto.relatedCustomer.name ?? ''}`, 100, 70);
  }
  
    
    // Add food details
    if (booking.order1dto?.foodDetails?.length > 0) {
        pdf.text(`Food Details`, 20, 100);
        booking.order1dto.foodDetails.forEach((food: any, index: number) => {
            const position = 110 + index * 10;
            pdf.text(`Food Name: ${food.food_name ?? ''}`, 20, position);
            pdf.text(`Quantity: ${food.quantity ?? ''}`, 120, position);
            pdf.text(`Price: ${food.amount ?? ''}`, 170, position);
        });
    }

    // Show total amounts
    const foodPrice = booking.order1dto?.foodDetails?.reduce((acc: number, food: any) => acc + (food.amount ?? 0), 0) ?? 0;
    const roomPrice = booking.order1dto?.roomDetails?.amount ?? 0;
    const Discount = booking.order1dto?.advance_amount ?? 0;
    const Extra_amount = booking.order1dto?.extra_amount ?? 0;
    const totalAmount = (foodPrice + roomPrice + (Extra_amount ?? 0)) - (Discount ?? 0);

    pdf.text(`Room Price: ${roomPrice}`, 20, 210);
    pdf.text(`Food Price: ${foodPrice}`, 20, 220);
    pdf.text(`Discount Amt: ${Discount}`, 100, 210);
    pdf.text(`Extra Amt: ${Extra_amount}`, 100, 220);
     pdf.text(`Total Amount: ${totalAmount}`, 20, 230);



     if (booking.order1dto?.payments?.length > 0) {
        pdf.text(`Payment Details`, 20, 250);
        booking.order1dto.payments.forEach((food: any, index: number) => {
            const position = 260 + index * 10;
            pdf.text(`Amount: ${food.amount ?? ''}`, 20, position);
            pdf.text(`${food.type ?? ''}`, 100, position);
           
        });
    }

    
    pdf.save(fileName);
}

}