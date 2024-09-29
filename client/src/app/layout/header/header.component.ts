import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AutoCompleteModule } from 'primeng/autocomplete';
// import { UploadComponent } from '../../components/upload/upload.component';
// import { ApiService } from '../../services/api.service';
// import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
// import { WebSocketService } from '../../services/websocket.service';
import { MessageService } from 'primeng/api';
// import { DataService } from '../../services/data.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'header-component',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ToastModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: any[] | undefined;
  @Input() documents: any[] = [];
  dropdownOpen = false;
  private clickListener?: () => void;
  userId: string | undefined;
  constructor(
    public auth: AuthService,
    // private apiService: ApiService,
    private router: Router,
    // private webSocketService: WebSocketService,
    private messageService: MessageService,
    // private dataService: DataService,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {

    this.clickListener = this.renderer.listen(
      'document',
      'click',
      (event: Event) => {
        this.onDocumentClick(event);
      },
    );
  }

  ngOnDestroy(): void {
    if (this.clickListener) {
      this.clickListener();
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  viewDocument(id: number) {
    const doc = this.items?.find((doc) => doc.id === id);
    if (!doc) {
      return;
    }
    this.router.navigate(['/documents', id]);
  }

  selectedItem: any;
  suggestions: any[] = [];

  search(event: any) {
    const query = event.query ? event.query.toLowerCase() : '';
    this.suggestions = this.items
      ? this.items
          .filter(
            (item) =>
              item.document.originalname &&
              item.document.originalname.toLowerCase().includes(query),
          )
          .map((item) => ({
            label: item.document.originalname,
            id: item.id,
          }))
      : [];
  }

  onSuggestionSelect(event: any) {
    const selectedDocument = event;
    if (selectedDocument && selectedDocument.value.id) {
      this.viewDocument(selectedDocument.value.id);
    }
  }
  private onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    const profileContainer = document.querySelector('.profile-container');
    const welcome = document.querySelector('.welcome');
    console.log('targetElement', targetElement);
    if (
      profileContainer &&
      !profileContainer.contains(targetElement) &&
      targetElement !== welcome
    ) {
      this.dropdownOpen = false;
    }
  }
}
