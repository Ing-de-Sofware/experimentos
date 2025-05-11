import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isImage'
})
export class IsImagePipe implements PipeTransform {
  transform(base64: string): boolean {
    return typeof base64 === 'string' && base64.startsWith('data:image/');
  }
}
