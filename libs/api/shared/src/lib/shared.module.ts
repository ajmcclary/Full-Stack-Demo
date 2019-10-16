import { Module, Logger, Provider } from '@nestjs/common';
import { PhotonModule } from '@demo/api/photon';

const services: Provider[] = [Logger];

@Module({
  imports: [PhotonModule],
  providers: [
    ...services
  ],
  exports: [
    ...services,
    PhotonModule
  ]
})
export class SharedModule {}
