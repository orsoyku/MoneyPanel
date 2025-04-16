import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Campaign } from '../../services/campaign.service';

@Component({
    selector: 'app-campaign-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="modal-overlay" *ngIf="visible" (click)="closeOnOverlayClick($event)">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Kampanya Güncelle</h3>
          <button class="close-button" (click)="onClose()">×</button>
        </div>
        <div class="modal-body">
          <form (ngSubmit)="onSave()" #campaignForm="ngForm">
            <div class="form-group">
              <label for="title">Kampanya Başlığı *</label>
              <input 
                type="text" 
                id="title" 
                name="title"
                [(ngModel)]="editedCampaign.title" 
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
                [(ngModel)]="editedCampaign.description" 
                required
                #descriptionInput="ngModel"
                class="form-control"
                rows="4"
              ></textarea>
              <div *ngIf="descriptionInput.invalid && (descriptionInput.dirty || descriptionInput.touched)" class="error-message">
                Kampanya açıklaması zorunludur.
              </div>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="cancel-button" (click)="onClose()">İptal</button>
              <button 
                type="submit" 
                [disabled]="!campaignForm.form.valid"
                class="save-button"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .modal-content {
      background-color: white;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }
    
    .modal-header h3 {
      margin: 0;
      color: #333;
    }
    
    .close-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    }
    
    .modal-body {
      padding: 1rem;
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
    
    .error-message {
      color: #e53935;
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }
    
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 1.5rem;
      gap: 1rem;
    }
    
    .cancel-button, .save-button {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      cursor: pointer;
      border: none;
    }
    
    .cancel-button {
      background-color: #f5f5f5;
      color: #333;
    }
    
    .save-button {
      background-color: #4a90e2;
      color: white;
    }
    
    .save-button:disabled {
      background-color: #b0c4de;
      cursor: not-allowed;
    }
  `]
})
export class CampaignModalComponent implements OnInit {
    @Input() visible = false;
    @Input() campaign: Campaign | null = null;
    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<{ title: string, description: string }>();

    editedCampaign: { title: string, description: string } = {
        title: '',
        description: ''
    };

    ngOnInit(): void {
        // Initialize form with campaign data when opened
        this.resetForm();
    }

    ngOnChanges(): void {
        this.resetForm();
    }

    closeOnOverlayClick(event: MouseEvent): void {
        if ((event.target as HTMLElement).className === 'modal-overlay') {
            this.onClose();
        }
    }

    onClose(): void {
        this.close.emit();
    }

    onSave(): void {
        if (this.editedCampaign.title && this.editedCampaign.description) {
            this.save.emit(this.editedCampaign);
        }
    }

    resetForm(): void {
        if (this.campaign) {
            this.editedCampaign = {
                title: this.campaign.title,
                description: this.campaign.description
            };
        } else {
            this.editedCampaign = {
                title: '',
                description: ''
            };
        }
    }
} 