import {Injectable} from '@angular/core';

import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import {UsersService} from '../../services/users.service';

import {Observable, of, EMPTY} from 'rxjs';

@Injectable()
export class UserProfileResolver implements Resolve<any> {
  constructor(private usersService: UsersService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.usersService.getUserById(route.params.id).pipe(user => {
        if (user) {
          return user;
        } else { // id not found
          this.router.navigate(['/']);
          // return EMPTY;
          return EMPTY;
        }
      }
    );

  }
}
