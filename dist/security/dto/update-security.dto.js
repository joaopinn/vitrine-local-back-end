"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSecurityDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_security_dto_1 = require("./create-security.dto");
class UpdateSecurityDto extends (0, mapped_types_1.PartialType)(create_security_dto_1.CreateSecurityDto) {
}
exports.UpdateSecurityDto = UpdateSecurityDto;
//# sourceMappingURL=update-security.dto.js.map