"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.generateOTP = void 0;
const generateOTP = () => __awaiter(void 0, void 0, void 0, function* () {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
});
exports.generateOTP = generateOTP;
const verifyOTP = (otp, dbotp) => __awaiter(void 0, void 0, void 0, function* () {
    if (otp === dbotp) {
        return true;
    }
    else {
        return false;
    }
});
exports.verifyOTP = verifyOTP;
