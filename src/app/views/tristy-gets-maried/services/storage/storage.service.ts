import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';

@Injectable()
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadMedia(file: File, appendToName: number = new Date().getTime()): {appended: number, task: AngularFireUploadTask} {
    const folder = 'covidProof/';
    let path = appendToName ? `${folder}/${appendToName}-${file.name}` : `${folder}/${file.name}`;

    const customMetadata = {
      dateCreated: new Date().toISOString()
    };
    const fileRef = this.storage.ref(path);

    return {appended: appendToName, task: this.storage.upload(path, file, { customMetadata })};
  }

  getUrl(imageName: string, folder: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let path;
      if (!folder)
        path = `covidProof/${imageName}`;
      else
        path = `${folder}/${imageName}`;

      const fileRef = this.storage.ref(path);

      fileRef.getDownloadURL().subscribe(url => {
        if (url)
          resolve(url);
      }, err => {
        reject(err);
      });
    })
  }
}
