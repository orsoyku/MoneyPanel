import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Campaign, CampaignService } from '../../services/campaign.service';
import { CampaignModalComponent } from '../campaign-modal/campaign-modal.component';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, CampaignModalComponent],
  template: `
    <div class="campaign-list-container">
      <h2>Kampanya Listesi</h2>
      
      <div *ngIf="campaigns.length === 0" class="empty-state">
        <p>Henüz hiç kampanya oluşturulmamış.</p>
      </div>

      <div *ngIf="campaigns.length > 0" class="campaigns">
        <div class="campaigns-header">
          <div class="header-item">Kampanya Adı</div>
          <div class="header-item">Açıklama</div>
          <div class="header-item">Puan</div>
          <div class="header-item">Tarih</div>
          <div class="header-item">İşlemler</div>
        </div>
        
        <div *ngFor="let campaign of campaigns" class="campaign-item">
          <div class="campaign-title">{{ campaign.title }}</div>
          <div class="campaign-description">{{ campaign.description }}</div>
          <div class="campaign-points">
            <div class="points-control">
              <button 
                class="point-button decrease" 
                (click)="adjustPoints(campaign.id, -1)"
                [disabled]="campaign.points <= 0"
              >−</button>
              <span class="points-value">{{ campaign.points }}</span>
              <button 
                class="point-button increase" 
                (click)="adjustPoints(campaign.id, 1)"
              >+</button>
            </div>
          </div>
          <div class="campaign-date">{{ campaign.date }}</div>
          <div class="campaign-actions">
            <button class="action-button edit" (click)="editCampaign(campaign)">
              Düzenle
            </button>
            <button class="action-button delete" (click)="deleteCampaign(campaign.id)">
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <app-campaign-modal
      [visible]="isModalVisible"
      [campaign]="selectedCampaign"
      (close)="closeModal()"
      (save)="saveCampaign($event)"
    ></app-campaign-modal>
  `,
  styles: [`
    .campaign-list-container {
      padding: 1rem;
    }
    
    h2 {
      margin-bottom: 2rem;
      color: #333;
      font-size: 1.75rem;
    }
    
    .empty-state {
      padding: 2rem;
      text-align: center;
      background-color: #f5f5f5;
      border-radius: 8px;
      color: #666;
    }
    
    .campaigns {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .campaigns-header {
      display: grid;
      grid-template-columns: 2fr 3fr 1fr 1fr 1fr;
      background-color: #f5f5f5;
      font-weight: 600;
      padding: 1rem;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .header-item {
      padding: 0.5rem;
    }
    
    .campaign-item {
      display: grid;
      grid-template-columns: 2fr 3fr 1fr 1fr 1fr;
      padding: 1rem;
      border-bottom: 1px solid #e0e0e0;
      transition: background-color 0.2s;
    }
    
    .campaign-item:last-child {
      border-bottom: none;
    }
    
    .campaign-item:hover {
      background-color: #f9f9f9;
    }
    
    .campaign-title {
      font-weight: 500;
      padding: 0.5rem;
    }
    
    .campaign-description, .campaign-date {
      padding: 0.5rem;
    }
    
    .points-control {
      display: flex;
      align-items: center;
      padding: 0.5rem;
    }
    
    .point-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-weight: bold;
      font-size: 1rem;
    }
    
    .point-button.decrease {
      background-color: #f44336;
      color: white;
    }
    
    .point-button.increase {
      background-color: #4caf50;
      color: white;
    }
    
    .point-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .points-value {
      margin: 0 0.5rem;
      min-width: 24px;
      text-align: center;
    }
    
    .campaign-actions {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
    }
    
    .action-button {
      padding: 0.25rem 0.5rem;
      border: none;
      border-radius: 4px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .action-button.edit {
      background-color: #2196f3;
      color: white;
    }
    
    .action-button.delete {
      background-color: #f44336;
      color: white;
    }
  `]
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  isModalVisible = false;
  selectedCampaign: Campaign | null = null;

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }

  adjustPoints(id: string, amount: number): void {
    this.campaignService.adjustPoints(id, amount);
  }

  editCampaign(campaign: Campaign): void {
    this.selectedCampaign = campaign;
    this.isModalVisible = true;
  }

  deleteCampaign(id: string): void {
    if (confirm('Bu kampanyayı silmek istediğinize emin misiniz?')) {
      this.campaignService.deleteCampaign(id);
    }
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedCampaign = null;
  }

  saveCampaign(updatedCampaign: { title: string, description: string }): void {
    if (this.selectedCampaign) {
      this.campaignService.updateCampaign(this.selectedCampaign.id, updatedCampaign);
      this.closeModal();
    }
  }
} 