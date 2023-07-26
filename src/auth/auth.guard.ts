import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		try {
			const token = request.headers.authorization.split(' ')[1];

			const verifiedToken = this.authService.verifyToken(token);

			if (verifiedToken) {
				request.user = verifiedToken;

				return true;
			}

			return false;
		} catch (error) {
			throw new UnauthorizedException('Пользователь не авторизован');
		}
	}
}
