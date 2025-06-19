import {Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StorageService} from "../../services/file_storage/storage.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-file-preview-dialog',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './file-preview-dialog.component.html',
  styleUrl: './file-preview-dialog.component.css'
})
export class FilePreviewDialogComponent implements OnInit {
  fileRef: string = '';
  fileUrl: SafeResourceUrl | null = null

  constructor(private sanitizer: DomSanitizer,
              public dialogRef: MatDialogRef<FilePreviewDialogComponent>,
              private storageService: StorageService,
              @Inject(MAT_DIALOG_DATA) public data: { storageRef: string}) {
    this.fileRef = data.storageRef;
  }

  ngOnInit() {
    console.log('File Reference:', this.fileRef);
    this.storageService.getDownloadURL(this.fileRef)
      .subscribe({
        next: (url) => {
          console.log('File URL:', url);
          this.fileUrl=this.sanitizer.bypassSecurityTrustResourceUrl(url);
        },
        error: (err) => console.error('Failed to get URL', err)
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
