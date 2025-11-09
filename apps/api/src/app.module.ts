import { ClassSerializerInterceptor, Module } from "@nestjs/common"
import { APP_INTERCEPTOR } from "@nestjs/core"
import { DatabaseModule } from "./database.module"
import { HealthModule } from "./modules/health/health.module"

@Module({
  imports: [
    DatabaseModule,
    // UserModule, AuthModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
