import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Campaign } from '../../services/campaign.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-campaign-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './campaign-modal.component.html',
  styleUrls: ['./campaign-modal.component.scss']
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