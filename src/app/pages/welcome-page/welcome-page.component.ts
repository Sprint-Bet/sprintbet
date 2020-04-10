import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoteService } from '@src/app/services/vote.service';
import { NewVoter } from '@src/app/model/dtos/new-voter';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  name = '';
  showGroupField = false;

  registrationForm = this.formBuilder.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    group: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private voteService: VoteService,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    const registrationInfo: NewVoter = {
      name: form['name'],
      role: form['role'],
      group: form['group'],
    };

    this.voteService.registerVoter(registrationInfo).subscribe(res => console.log(res));
  }

  roleChange() {
    this.showGroupField =
      this.registrationForm.get('role').value === '0' ||
      this.registrationForm.get('role').value === '1';

    this.showGroupField ?
      this.registrationForm.get('group').setValidators(Validators.required) :
      this.registrationForm.get('group').clearValidators();

    this.registrationForm.get('group').updateValueAndValidity();
  }

}
