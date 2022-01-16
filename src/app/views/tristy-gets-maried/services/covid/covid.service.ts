import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';

export interface CovidData {
  name: string;
  files: {
    name: string,
    downloadUrl: string;
    path: string;
  }[];
}

@Injectable()
export class CovidService {

  constructor(private firestore: Firestore) { }

  addProof(data: CovidData) {
    const covidRef = collection(this.firestore, 'covidProof');
    return addDoc(covidRef, data);
  }
}
