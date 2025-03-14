import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { environment } from "./environments/environment";
import { routes } from "./app/app.routes";
import { initializeApp } from "firebase/app"; // Import from firebase/app directly
import { getAuth } from "firebase/auth"; // Import from firebase/auth
import { getFirestore } from "firebase/firestore";
import { provideFirebaseApp } from "@angular/fire/app";
import { provideAuth } from "@angular/fire/auth";
import { provideFirestore } from "@angular/fire/firestore";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
})
  .catch((err) => console.error(err));
