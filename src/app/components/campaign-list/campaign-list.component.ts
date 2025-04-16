import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Campaign, CampaignService } from '../../services/campaign.service';

@Component({
    selector: 'app-campaign-list',
    standalone: true,
    imports: [CommonModule],
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
        </div>
        
        <div *ngFor="let campaign of campaigns" class="campaign-item">
          <div class="campaign-title">{{ campaign.title }}</div>
          <div class="campaign-description">{{ campaign.description }}</div>
          <div class="campaign-points">{{ campaign.points }}</div>
          <div class="campaign-date">{{ campaign.date }}</div>
        </div>
      </div>
    </div>
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
      grid-template-columns: 2fr 3fr 1fr 1fr;
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
      grid-template-columns: 2fr 3fr 1fr 1fr;
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
    
    .campaign-description, .campaign-points, .campaign-date {
      padding: 0.5rem;
    }
  `]
})
export class CampaignListComponent implements OnInit {
    campaigns: Campaign[] = [];

    constructor(private campaignService: CampaignService) { }

    ngOnInit(): void {
        this.campaignService.getCampaigns().subscribe(campaigns => {
            this.campaigns = campaigns;
        });
    }
} 