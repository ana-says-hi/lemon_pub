import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CarouselModule} from '@coreui/angular';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    RouterLink,
    CarouselModule,
    CommonModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  slides: any[] = new Array(4).fill({id: -1, src: '', title: '', subtitle: '', ref:''});

  constructor(private router: Router) {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    // hamburger.addEventListener('click', () => {
    // Toggle the active class to show/hide the menu
    // navLinks.classList.toggle('active');
    // });
  }

  ngOnInit(): void {

    this.slides[0] = {
      id: 0,
      src: './assets/pictures/bluelemonade.jpg',
      title: 'Welcome',
      subtitle: 'Thank you for allowing us to help you an your author journey!',
      ref:'/',
    };
    this.slides[1] = {
      id: 1,
      src: './assets/pictures/toast.jpg',
      title: 'Your work',
      subtitle: 'Have all your work in one place!',
      ref:'/work',
    };
    this.slides[2] = {
      id: 2,
      src: './assets/pictures/toopink.jpg',
      title: 'Offers',
      subtitle: 'Get offers to publish your work!',
      ref:'/offers',
    };
    this.slides[3] = {
      id: 3,
      src: './assets/pictures/juicyccake.jpg',
      title: 'Forums',
      subtitle: 'Talk to other artists about your interests!',
      ref:'/forums',
    };

  }
  activeSlide = 0;

  onItemChange(index: number) {
    this.activeSlide = index;
  }

  navigateTo(ref: string) {
    this.router.navigate([ref]);
  }
}
