import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@demo/core';
import { untilDestroyed } from '@demo/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'demo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token: string;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.route.queryParams.subscribe(values => {
      this.token = values['token'];
    });

  }

  login() {
    this.isLoading = true;
    const loginData = this.loginForm.value;

    this.authService.login(loginData)
      .pipe(first())
      .subscribe(
        () => {
          this.loginForm.markAsPristine();
          this.isLoading = false;

          untilDestroyed(this);

          this.router.navigate(
            [this.route.snapshot.queryParams['referUrl'] || '/dashboard'],
            { replaceUrl: true }
          );
        },
        error => {
          this.isLoading = false;
        }
      );


  }
}
