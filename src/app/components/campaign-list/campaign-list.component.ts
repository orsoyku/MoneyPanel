import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Campaign, CampaignService } from '../../services/campaign.service';
import { CampaignModalComponent } from '../campaign-modal/campaign-modal.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, CampaignModalComponent, TranslateModule],
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  isModalVisible = false;
  selectedCampaign: Campaign | null = null;

  constructor(
    private campaignService: CampaignService,
    private translateService: TranslateService
  ) { }

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
    this.translateService.get('CAMPAIGN.LIST.CONFIRM_DELETE').subscribe(msg => {
      if (confirm(msg)) {
        this.campaignService.deleteCampaign(id);
      }
    });
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