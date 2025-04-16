import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Campaign {
    id: string;
    title: string;
    description: string;
    points: number;
    date: string;
}

@Injectable({
    providedIn: 'root'
})
export class CampaignService {
    private campaigns = new BehaviorSubject<Campaign[]>([]);

    constructor() {
        this.loadCampaigns();
    }

    getCampaigns(): Observable<Campaign[]> {
        return this.campaigns.asObservable();
    }

    createCampaign(title: string, description: string): void {
        const newCampaign: Campaign = {
            id: Date.now().toString(),
            title,
            description,
            points: 0,
            date: new Date().toISOString().split('T')[0]
        };

        const currentCampaigns = [...this.campaigns.value];
        currentCampaigns.push(newCampaign);

        this.campaigns.next(currentCampaigns);
        this.saveCampaigns();
    }

    updateCampaign(id: string, updates: Partial<Campaign>): void {
        const currentCampaigns = [...this.campaigns.value];
        const index = currentCampaigns.findIndex(campaign => campaign.id === id);

        if (index !== -1) {
            currentCampaigns[index] = {
                ...currentCampaigns[index],
                ...updates
            };

            this.campaigns.next(currentCampaigns);
            this.saveCampaigns();
        }
    }

    deleteCampaign(id: string): void {
        const currentCampaigns = this.campaigns.value.filter(campaign => campaign.id !== id);
        this.campaigns.next(currentCampaigns);
        this.saveCampaigns();
    }

    adjustPoints(id: string, amount: number): void {
        const currentCampaigns = [...this.campaigns.value];
        const index = currentCampaigns.findIndex(campaign => campaign.id === id);

        if (index !== -1) {
            const newPoints = currentCampaigns[index].points + amount;
            // Ensure points don't go below zero
            currentCampaigns[index].points = Math.max(0, newPoints);

            this.campaigns.next(currentCampaigns);
            this.saveCampaigns();
        }
    }

    private loadCampaigns(): void {
        const storedCampaigns = localStorage.getItem('campaigns');
        if (storedCampaigns) {
            this.campaigns.next(JSON.parse(storedCampaigns));
        }
    }

    private saveCampaigns(): void {
        localStorage.setItem('campaigns', JSON.stringify(this.campaigns.value));
    }
} 