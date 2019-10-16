import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@demo/core';
import { MatchValidators, PasswordStrengthValidators } from '@demo/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'demo-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          PasswordStrengthValidators.validatePassword
        ]),
        passwordRepeat: new FormControl('', [Validators.required])
      },
      MatchValidators.Password
    );
  }

  signup() {
    const signupData = this.signupForm.value;
    this.isLoading = true;

    this.authService.signup(signupData).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/auth']);
        // this.router.navigateByUrl('/auth');
      },
      error => {
        this.isLoading = false;
      }
    );

    // this.authService
    //   .login(signupData)
    //   .pipe(first())
    //   .subscribe(
    //     () => {},
    //     error => {
    //       this.submitButton.disabled = false;
    //       this.isLoading = false;
    //     }
    //   );
  }
}
