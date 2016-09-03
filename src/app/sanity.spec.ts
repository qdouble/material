/* tslint:disable: max-line-length */
import { TestBed } from '@angular/core/testing';
import 'rxjs/Rx';

import { SanityComp } from './sanity';

describe('SanityComp', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [SanityComp],
      providers: []
    });
  });

  it('should have an url', () => {
    let fixture = TestBed.createComponent(SanityComp);
    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.url).toEqual('https://github.com/preboot/angular2-webpack');
  });
});
