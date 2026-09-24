"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePortfolioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_portfolio_dto_1 = require("./create-portfolio.dto");
class UpdatePortfolioDto extends (0, mapped_types_1.PartialType)(create_portfolio_dto_1.CreatePortfolioDto) {
}
exports.UpdatePortfolioDto = UpdatePortfolioDto;
//# sourceMappingURL=update-portfolio.dto.js.map