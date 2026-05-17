import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotleservicesService } from '../hotleservices.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  upiId: string = 'lodgeone18@okhdfcbank';
  qrCodeUrl: string = '';
  amount: number = 0;
  order_id: any;
  paymentFile: File | null = null;
  paymentType: string = 'ONLINE';
  isCashPayment: boolean = false;
  transaction: any;

  constructor(
    private route: ActivatedRoute,
    private service: HotleservicesService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.order_id = params['order_id'];
      console.log('Received order ID:', this.order_id);
    });

    const amountStr = localStorage.getItem('amount');
    if (amountStr) {
      this.amount = parseInt(amountStr, 10);
      console.log('Amount:', this.amount);
    }

    this.generatePaymentQRCode();
  }

  generatePaymentQRCode(): void {
    if (isNaN(this.amount) || this.amount <= 0) {
      console.error('Invalid amount:', this.amount);
      return;
    }

    const data = `upi://pay?pa=${
      this.upiId
    }&pn=One%20Lodge&tid=${Math.random()}&tr=Invoice123&tn=Payment&am=${
      this.amount
    }&cu=INR`;
    console.log('QR Code data:', data);

    const apiUrl = `https://api.qrcode-monkey.com/qr/custom?size=200&data=${encodeURIComponent(
      data
    )}`;
    this.qrCodeUrl = apiUrl;
    console.log('Generated QR Code URL:', this.qrCodeUrl);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.paymentFile = file;
    }
  }

  onPaymentTypeChange(): void {
    this.isCashPayment = this.paymentType === 'CASH';
  }

  submitPaymentForm(): void {
    const formData = new FormData();

    if (!this.isCashPayment && this.paymentFile) {
      formData.append('paymentFile', this.paymentFile);
    }
    
    formData.append('order_id', this.order_id);
    formData.append('payments[0].transaction_id', this.transaction);
    formData.append('payments[0].type', this.paymentType);
    formData.append('payments[0].amount', this.amount.toString());

    this.service.payment(formData).subscribe(
      (response) => {
        console.log('Payment submitted successfully:', response);
        this.toastr.success(response.message);
        this.router.navigate(['/booking']);
      },
      (error) => {
        console.error('Error submitting payment:', error);
      }
    );
  }
}
