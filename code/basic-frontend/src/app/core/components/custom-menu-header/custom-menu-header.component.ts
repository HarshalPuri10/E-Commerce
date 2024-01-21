import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuTitleService } from '../../services/menu-title.service';
import { StorageService } from '../../services';
@Component({
  selector: 'app-custom-menu-header',
  templateUrl: './custom-menu-header.component.html',
  styleUrls: ['./custom-menu-header.component.scss'],
})
export class CustomMenuHeaderComponent implements OnInit {
  activeTab: string = 'HOME';
  @Input() menuData: any = {};
  title: string = '';
  constructor(
    private router: Router,
    private Location: Location,
    private storageService: StorageService,
    private menuTitleService: MenuTitleService
  ) {}

  navigateTo(page: string, tab: string) {
    if (page) {
      this.storageService.set('tab', tab);
      this.activeTab = tab;
      this.router.navigate([page]);
    }
  }
  goBack() {
    this.Location.back();
  }
  ngOnInit(): void {
    let tab = this.storageService.get('tab') ?? 'HOME';
    this.activeTab = tab;
    this.menuTitleService.$titleData.subscribe((success: any) => {
      this.menuData = { ...this.menuData, ...success };
    });
  }
}
