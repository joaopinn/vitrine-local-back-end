import { Module } from '@nestjs/common';
import { AddressesModule } from './addresses/addresses.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { SearchModule } from './search/search.module';
import { SecurityModule } from './security/security.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AddressesModule,
    AuthModule,
    CategoriesModule,
    PortfolioModule,
    ProfessionalsModule,
    SearchModule,
    SecurityModule,
    ServicesModule,
    UsersModule,
  ],
})
export class AppModule {}