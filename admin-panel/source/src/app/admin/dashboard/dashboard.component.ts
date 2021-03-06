import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

/*service*/
import { AdminService,CustomerService,StaffService} from '../../service/index';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    currentAdmin: any = {};
    staffs: any = [];
    customers: any = [];
    loginForm: FormGroup;
      returnUrl: string;
    err:any;

      constructor(
        private lf: FormBuilder, 
        private adminService: AdminService,
        private staffService: StaffService,
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
      }

    ngOnInit() {
        this.getCustomerList()
        this.getStaffList()
    }

    getCustomerList(){
        this.customerService.customerList().subscribe(
            (data) => {
              if (!data.error) {
                     this.customers = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getStaffList(){
        this.staffService.staffList().subscribe(
            (data) => {
              if (!data.error) {
                     this.staffs = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
}

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class AdminProfileComponent implements OnInit {
	currentAdmin: any = {};
	customerAddForm: FormGroup;
    emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    passwordp : any = '';
    newo : any = false;
    MutchPassword : any = false;

    formErrors = {
        'firstname': '',
        'lastname': '',
        'email' : '',
        'username' : '',
        'password' : '',
        'newpassword' : ''     
    };

    validationMessages = {
        'firstname': {
            'required':      'First Name is required.',
        },
        'lastname': {
            'required':      'Last Name is required.',
        },
        'username': {
            'required':      'Username is required.',
        },
        'email' : {
            'required':      'Email is required.',
            'pattern'   :    'Email not in well format.'
        }, 
        'password' : {
            'required':      'Password is required.'
        },
        'newpassword' : {
            'required':      'Password is required.'
        }            
    };

  	constructor(
        private lf: FormBuilder, 
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
  		this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
  	}

  	ngOnInit() {
        this.customerAddForm = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            password: ['', Validators.required]
        });
        this.customerAddForm.patchValue(this.currentAdmin);
  	}

    admin(id){
        this.adminService.admin(id).subscribe(
            (data) => {
              if (!data.error) {
                    localStorage.removeItem('currentAdmin');
                    localStorage.setItem('currentAdmin', JSON.stringify(data.message));
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }


    adminUpdate(){
        this.adminService.adminUpdate(this.customerAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.admin(this.customerAddForm.value._id);
                  this.router.navigate(['admin/dashboard']);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }


}