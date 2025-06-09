import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {SignUpRequest} from "../model/sign-up.request";
import {SignUpResponse} from "../model/sign-up.response";
import {SignInRequest} from "../model/sign-in.request";
import {SignInResponse} from "../model/sign-in.response";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  basePath: string = "http://localhost:8080/api/v1";
  //basePath = 'https://experimentos-hormonal-care-backend-production.up.railway.app/swagger-ui/index.html/api/v1';
  httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };

  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router, private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.signedIn.next(true);
      const username = localStorage.getItem('username');
      const userId = localStorage.getItem('userId');
      if (username) this.signedInUsername.next(username);
      if (userId) this.signedInUserId.next(Number(userId));
    }
  }


  get isSignedIn() { return this.signedIn.asObservable();}

  get currentUserId() { return this.signedInUserId.asObservable(); }

  get currentUsername() { return this.signedInUsername.asObservable(); }

  signUp(signUpRequest: SignUpRequest): void {
    this.http.post<SignUpResponse>(`${this.basePath}/authentication/sign-up`, signUpRequest, this.httpOptions)
      .subscribe({
        next: (response) => {
          console.log(`Signed up as ${response.username} with id: ${response.id}`);
          this.router.navigate(['/sign-in']).then();
        },
        error: (error) => {
          console.error(`Error while signing up: ${error}`);
          this.router.navigate(['/sign-up']).then();
        }
      });
  }

  /**
   * 🔐 LOGIN - Se puede usar modo simulado o real
   */
  signIn(signInRequest: SignInRequest): void {
    const useBackend = false; // ✅ CAMBIA A TRUE cuando actives backend

    if (!useBackend) {
      console.log('▶ Login simulado activado');
      // === MODO SIMULADO (sin backend, frontend puro) ===
      if (signInRequest.username === 'admin@gmail.com' && signInRequest.password === '123456') {
        console.log('✅ Credenciales válidas, redirigiendo...');
        this.signedIn.next(true);
        this.signedInUserId.next(1);
        this.signedInUsername.next('Admin User');
        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('username', 'Admin User');
        localStorage.setItem('userId', '1');
        this.router.navigate(['/admin']).then();
      } else {
        this.signedIn.next(false);
        this.signedInUserId.next(0);
        this.signedInUsername.next('');
        localStorage.removeItem('token');
        alert('Credenciales incorrectas');
      }
      return;
    }
      // === MODO REAL (con backend activo) ===
    this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions)
        .subscribe({
          next: (response) => {
            this.signedIn.next(true);
            this.signedInUserId.next(response.id);
            this.signedInUsername.next(response.username);
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('userId', response.id.toString());
            this.router.navigate(['/admin']).then();
          },
          error: (error) => {
            this.signedIn.next(false);
            this.signedInUserId.next(0);
            this.signedInUsername.next('');
            localStorage.removeItem('token');
            console.error(`Error while signing in: ${error}`);
            this.router.navigate(['/sign-in']).then();
          }
        });

  }
  /**
   * 🚪 LOGOUT
   */
  signOut() {
    this.signedIn.next(false);
    this.signedInUserId.next(0);
    this.signedInUsername.next('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    this.router.navigate(['/sign-in']).then();
  }
}
