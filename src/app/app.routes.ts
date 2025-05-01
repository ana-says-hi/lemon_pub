import { Routes } from '@angular/router';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {WorkComponent} from "./components/work/work.component";
import {OffersComponent} from "./components/offers/offers.component";
import {ForumsComponent} from "./components/forums/forums.component";
import {ProfilePageComponent} from "./components/profile-page/profile-page.component";
import {AskAiComponent} from "./components/ask-ai/ask-ai.component";

export const routes: Routes = [
  {path:'login', component:LoginPageComponent},
  {path:'register', component:RegisterPageComponent},
  {path:'', component:MainPageComponent},
  {path:'work', component:WorkComponent},
  {path:'offers', component:OffersComponent},
  {path:'forums', component:ForumsComponent},
  {path:'profile',component:ProfilePageComponent},
  {path:'ask-ai', component:AskAiComponent}
];
