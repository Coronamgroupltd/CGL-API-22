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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const UsersRepository_1 = __importDefault(require("../../repositories/UsersRepository"));
const EmailService_1 = require("../../../../infrastruture/services/EmailService");
let Forgotpassword = class Forgotpassword {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    execute(email, url) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if user exist using email
            const user = yield this.userRepository.getUser({ email: email });
            //returns false if user doesn't exist
            if (user === null) {
                return false;
            }
            //send email
            const sendEmailPayload = {
                email: user.email,
                name: user.firstname,
                subject: 'Account Verification',
                message: `${url}/?token=${user.email_token}`
            };
            yield this.emailService.sendEmail(sendEmailPayload);
            return user;
        });
    }
};
Forgotpassword = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [UsersRepository_1.default,
        EmailService_1.EmailService])
], Forgotpassword);
exports.default = Forgotpassword;
