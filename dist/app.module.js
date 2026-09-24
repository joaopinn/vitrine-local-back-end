"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const addresses_module_1 = require("./addresses/addresses.module");
const auth_module_1 = require("./auth/auth.module");
const categories_module_1 = require("./categories/categories.module");
const portfolio_module_1 = require("./portfolio/portfolio.module");
const professionals_module_1 = require("./professionals/professionals.module");
const search_module_1 = require("./search/search.module");
const security_module_1 = require("./security/security.module");
const services_module_1 = require("./services/services.module");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            addresses_module_1.AddressesModule,
            auth_module_1.AuthModule,
            categories_module_1.CategoriesModule,
            portfolio_module_1.PortfolioModule,
            professionals_module_1.ProfessionalsModule,
            search_module_1.SearchModule,
            security_module_1.SecurityModule,
            services_module_1.ServicesModule,
            users_module_1.UsersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map