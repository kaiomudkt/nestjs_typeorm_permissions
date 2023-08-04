// import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

// @Injectable()
export class SlugService {
  generateSlug(title: string): string {
    const options = {
      replacement: '-', // Separador para o slug
      lower: true, // Converter para minúsculas
    };
    return slugify(title, options);
  }
}
