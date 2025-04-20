import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../../services/campaign.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-campaign-create',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.scss']
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