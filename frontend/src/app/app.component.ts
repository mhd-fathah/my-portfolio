import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './partials/navbar/navbar.component';

declare var Revealator: any

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  constructor (private router: Router) {}
  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        setTimeout(()=>{
          const revealator = (window as any).Revealator;
          if(Revealator && typeof Revealator.refresh === 'function'){
            Revealator.refresh();
          }else{
            console.warn('Revealator is not ready')
          }
        },300)
      }
    })
  }
  title = 'my-portfolio';
}
