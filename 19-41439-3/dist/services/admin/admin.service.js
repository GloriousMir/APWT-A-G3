"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const adminentity_entity_1 = require("../../Entities/adminentity.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const dist_1 = require("@nestjs-modules/mailer/dist");
let AdminService = class AdminService {
    constructor(adminRepo, mailerService) {
        this.adminRepo = adminRepo;
        this.mailerService = mailerService;
    }
    async sendEmail(mydata) {
        return await this.mailerService.sendMail({
            to: mydata.email,
            subject: mydata.subject,
            text: mydata.text,
        });
    }
    async signup(mydto) {
        const adminaccount = new adminentity_entity_1.AdminEntity();
        adminaccount.name = mydto.name;
        adminaccount.email = mydto.email;
        adminaccount.address = mydto.address;
        adminaccount.filename = mydto.filename;
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        adminaccount.password = hassedpassed;
        return this.adminRepo.save(adminaccount);
    }
    async signin(mydto) {
        console.log(mydto.password);
        const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
        const isMatch = await bcrypt.compare(mydto.password, mydata.password);
        if (isMatch) {
            return 1;
        }
        else {
            return 0;
        }
    }
    getAdmin() {
        return this.adminRepo.find();
    }
    getAdminByID(id) {
        return this.adminRepo.findOneBy({ id });
    }
    getAdminByName(name) {
        return this.adminRepo.findOneBy({ name });
    }
    getAdminByIDName(qry) {
        return this.adminRepo.findOneBy({ id: qry.id, name: qry.name });
    }
    updateAdmin(name, id) {
        return this.adminRepo.update(id, { name: name });
    }
    deleteAdminbyid(id) {
        return this.adminRepo.remove(id);
    }
    getStudentByAdminID(id) {
        return this.adminRepo.find({
            where: { id: id },
            relations: {
                students: true,
            },
        });
    }
    getTeacherByAdminID(id) {
        return this.adminRepo.find({
            where: { id: id },
            relations: {
                students: true,
            },
        });
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(adminentity_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        dist_1.MailerService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map