import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'test-comp',
  template: `Hello from lazy load`
})

export class TestComp {}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TestComp
      }
    ])
  ],
  declarations: [TestComp]
})

export class TestModule {}
