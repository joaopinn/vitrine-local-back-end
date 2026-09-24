"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfessionalDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_professional_dto_1 = require("./create-professional.dto");
class UpdateProfessionalDto extends (0, mapped_types_1.PartialType)(create_professional_dto_1.CreateProfessionalDto) {
}
exports.UpdateProfessionalDto = UpdateProfessionalDto;
//# sourceMappingURL=update-professional.dto.js.map