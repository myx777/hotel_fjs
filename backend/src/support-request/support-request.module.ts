import { Module } from '@nestjs/common';
import { SupportRequestService } from './support-request.service';

@Module({
  providers: [SupportRequestService]
})
export class SupportRequestModule {}
