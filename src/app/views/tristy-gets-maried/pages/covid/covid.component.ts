import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AngularFireUploadTask } from '@angular/fire/compat/storage';

import { Observable, BehaviorSubject } from 'rxjs';
import { finalize, takeWhile } from 'rxjs/operators';

//import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

import { CovidService } from '../../services/covid/covid.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {
  covidForm: FormGroup;

  public files = [];// NgxFileDropEntry[] = [];
  percentage!: Observable<number>;
  snapshot!: any;//Observable<any>;
  task!: AngularFireUploadTask;
  errorString!: string;

  uploads = new BehaviorSubject<{name: string, url: string}[]>([]);
  submitting: boolean = false;
  complete: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private covidService: CovidService,
              private storage: StorageService,
              private snackBar: MatSnackBar,
              private ref: ChangeDetectorRef) {
    this.covidForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  // public dropped(files: NgxFileDropEntry[]) {
  //   try {
  //     this.files = files;
  //     for (const droppedFile of files) {

  //       // Is it a file?
  //       if (droppedFile.fileEntry.isFile) {
  //         const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //         fileEntry.file((file: File) => {
  //           if (!this.checkFileUploadType(file.type)) {
  //             throw new Error('That file type is not supported. We can accept image files as JPEG, PNG, BMP, GIF, SVG as well as PDF and TXT');
  //           }
  //         });
  //       } else {
  //         // It was a directory (empty directories are added, otherwise only files)
  //         const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //         console.log(droppedFile.relativePath, fileEntry);
  //         this.files = [];
  //         throw new Error('You can\'t upload directories, sorry!');
  //       }
  //     }
  //   } catch(err: any) {
  //     this.snackBar.open(err?.message ? err.message : 'An error occurred', null, {duration: 5000});
  //     this.files = [];
  //   }
    
  // }

  disableSubmit() {
    return this.covidForm.invalid || !this.files || this.files?.length == 0;
  }

  async submit() {
    if (this.covidForm.valid && this.files?.length) {
      this.submitting = true;
      const formData = this.covidForm.value;

      // for (let i = 0; i < this.files.length; i++) {
      //   const droppedFile = this.files[i];
      //   const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      //     fileEntry.file(async (file: File) => {

      //     // Here you can access the real file
      //     console.log(droppedFile.relativePath, file);

      //     const res = await this.runUpload(file),
      //           url = res.url,
      //           fileName = res.name;

      //     const urls = this.uploads.getValue();
      //     this.uploads.next(urls ? [...urls, {name: fileName, url: url}] : [{name: fileName, url: url}]);
      //   });
      // }

      this.uploads.pipe(takeWhile((uploads: any) => uploads?.length !== this.files?.length, true)).subscribe(uploads => {
        if (uploads?.length == this.files?.length) {
          const uploadData = {
            name: formData.name,
            files: uploads
          };

          this.covidService.addProof(uploadData);
          this.submitting = false;
          this.complete = true;
        }
      })
    }
  }

  /**
   * Runs the upload task for either normal media or profile pic
   *
   * @since 0.9.7
   */
  private runUpload(file: File): Promise<{name: string, url: string}> {
    return new Promise((resolve, reject) => {
      const res = this.storage.uploadMedia(file);
      const fileName = res.appended + '-' + file.name;
      this.task = res.task

      this.percentage = this.task.percentageChanges() as any;
      this.percentage.subscribe(res => {
        this.ref.markForCheck();
      });
      this.snapshot = this.task.snapshotChanges();

      this.snapshot.pipe(finalize(() => {
        this.snackBar.open('Upload Complete', null, {duration: 2000}).afterDismissed().subscribe(() => {
          this.percentage = null as any;
          this.ref.markForCheck();
        });

        this.storage.getUrl(fileName, 'covidProof/').then(url => {
          resolve({name: fileName, url: url});
        });
      })).subscribe();
    })
    
  }

  private checkFileUploadType(type: any, isImageUpload:boolean = false) {
    let typeArray = [];
      typeArray = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/bmp',
            'application/msword', 'application/pdf', 'text/plain'];
  
    if(typeArray.indexOf(type) > -1) {           
      return true;
    } else {             
      return false;
    }

  }

}
