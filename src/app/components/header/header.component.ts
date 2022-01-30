import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveData() {
    this.dataStorageService.postRecipes();
  }

  onFetchData() {
    this.dataStorageService.getRecipes().subscribe();
  }

}
