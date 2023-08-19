import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
	controllers: [MediaController],
	providers: [MediaService],
	exports: [MediaService],
	imports: [AuthModule],
})
export class MediaModule {}
