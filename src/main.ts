import { bootstrapApplication } from '@angular/platform-browser';
import { ProductoComponent } from './app/components/producto/producto.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(ProductoComponent,   {
  providers: [provideHttpClient(), provideAnimations()],
}).catch((err) => console.error(err));
