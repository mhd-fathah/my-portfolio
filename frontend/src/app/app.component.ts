import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './partials/navbar/navbar.component';
import {isPlatformBrowser} from '@angular/common'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'my-portfolio';
  isBrowser: boolean;
  constructor (private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId)
  }
  ngAfterViewInit(): void {
    if(!this.isBrowser) return
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        setTimeout(()=>{
          if(typeof window !== 'undefined'){
            const revealator = (window as any).Revealator;
            if(revealator && typeof revealator.refresh === 'function'){
              revealator.refresh();
            }else{
              console.warn('Revealator is not ready')
            }
          }
        },300)
      }
    })
  }
}
