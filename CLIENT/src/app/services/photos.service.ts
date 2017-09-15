import { Injectable } from '@angular/core';
import { Photo } from '../models/photos';

@Injectable()
export class PhotosService {

  constructor() { }

  photos: Photo[] = [
    { name: 'korea', description: 'Teaching children to read' },
    { name: 'mexico', description: 'Kitesurfing' },
    { name: 'francia', description: 'Kitesurfing' },
    { name: 'peru', description: 'Designing the masterplan' },
    { name: 'india', description: 'Teaching children to read' },
    { name: 'argentina', description: 'Kitesurfing' },
    { name: 'españa', description: 'Teaching children to read' },
    { name: 'londres', description: 'Teaching children to read' },
    { name: 'italia', description: 'Teaching children to read' },
    { name: 'usa', description: 'Teaching children to read' },
    { name: 'japon', description: 'Teaching children to read' },
    { name: 'tailandia', description: 'Teaching children to read' },
    { name: 'sudafrica', description: 'Teaching children to read' },
    { name: 'brasil', description: 'Teaching children to read' },
    { name: 'egipto', description: 'Teaching children to read' }
  ];

  public getAll(): Photo[] {
    return this.photos;
  }

}
