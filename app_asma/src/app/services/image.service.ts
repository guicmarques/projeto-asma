import { Injectable } from '@angular/core';
import { Base64 } from '@ionic-native/base64/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private base64: Base64) { }

  convertToBase64(filePath: string) {
    return new Promise ((resolve, reject) => {
      this.base64.encodeFile(filePath).then((base64File: string) => {
        console.log(base64File);
        resolve(base64File)
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }
}
