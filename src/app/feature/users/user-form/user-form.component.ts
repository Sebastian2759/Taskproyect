import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/ui/toast/toast.service';
import { UsersService } from '../users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Output() created = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private users = inject(UsersService);
  private toast = inject(ToastService);

  loading = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
  });

  async submit() {
    if (this.form.invalid) return;

    this.loading = true;
    try {
      const res = await this.users.create({
        name: this.form.value.name!,
        email: this.form.value.email!,
      });

      this.toast.success(res.message || 'Usuario creado');
      this.form.reset();
      this.created.emit();
    } finally {
      this.loading = false;
    }
  }
}
