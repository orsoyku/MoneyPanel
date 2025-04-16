import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../../services/campaign.service';

@Component({
    selector: 'app-campaign-create',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="campaign-create-container">
      <h2>Yeni Kampanya Oluştur</h2>
      
      <form (ngSubmit)="createCampaign()" #campaignForm="ngForm">
        <div class="form-group">
          <label for="title">Kampanya Başlığı *</label>
          <input 
            type="text" 
            id="title" 
            name="title"
            [(ngModel)]="title" 
            required
            #titleInput="ngModel"
            class="form-control"
          />
          <div *ngIf="titleInput.invalid && (titleInput.dirty || titleInput.touched)" class="error-message">
            Kampanya başlığı zorunludur.
          </div>
        </div>
        
        <div class="form-group">
          <label for="description">Kampanya Açıklaması *</label>
          <textarea 
            id="description" 
            name="description"
            [(ngModel)]="description" 
            required
            #descriptionInput="ngModel"
            class="form-control"
            rows="4"
          ></textarea>
          <div *ngIf="descriptionInput.invalid && (descriptionInput.dirty || descriptionInput.touched)" class="error-message">
            Kampanya açıklaması zorunludur.
          </div>
        </div>
        
        <button 
          type="submit" 
          [disabled]="!campaignForm.form.valid"
          class="create-button"
        >
          Kaydet
        </button>
      </form>
      
      <div *ngIf="showSuccessMessage" class="success-message">
        Kampanya başarılı bir şekilde eklenmiştir.
      </div>
    </div>
  `,
    styles: [`
    .campaign-create-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 1rem;
    }
    
    h2 {
      margin-bottom: 2rem;
      color: #333;
      font-size: 1.75rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    .form-control:focus {
      outline: none;
      border-color: #4a90e2;
    }
    
    .create-button {
      padding: 0.75rem 1.5rem;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .create-button:hover:not(:disabled) {
      background-color: #3a7bc8;
    }
    
    .create-button:disabled {
      background-color: #b0c4de;
      cursor: not-allowed;
    }
    
    .error-message {
      color: #e53935;
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }
    
    .success-message {
      margin-top: 1.5rem;
      padding: 1rem;
      background-color: #e8f5e9;
      color: #2e7d32;
      border-radius: 4px;
      text-align: center;
      font-weight: 500;
    }
  `]
})
export class CampaignCreateComponent {
    title = '';
    description = '';
    showSuccessMessage = false;

    constructor(private campaignService: CampaignService) { }

    createCampaign(): void {
        if (this.title && this.description) {
            this.campaignService.createCampaign(this.title, this.description);

            // Reset form
            this.title = '';
            this.description = '';

            // Show success message
            this.showSuccessMessage = true;
            setTimeout(() => {
                this.showSuccessMessage = false;
            }, 2000);
        }
    }
} 