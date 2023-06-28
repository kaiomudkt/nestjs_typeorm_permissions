import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly userService: UserService,
//     private readonly mailer: MailerService,
//   ) {}

//   createToken(user: UserEntity) {

//   }

//   checkToken(token: string) {

//   }

//   async login(login: string, password: string) {

//   }

//   async forget(email: string) {}

//   async reset(password: string, token: string) {}

//   async register(data: AuthRegisterDto) {}
}
