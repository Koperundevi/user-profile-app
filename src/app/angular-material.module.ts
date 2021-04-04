import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const materialModules = [MatIconModule, MatInputModule, MatFormFieldModule];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class AngularMaterialModule {}
