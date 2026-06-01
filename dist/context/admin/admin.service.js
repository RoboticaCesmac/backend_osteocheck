"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const admin_entity_1 = require("./entity/admin.entity");
const httpResponses_1 = require("../../utils/httpResponses");
class AdminService {
    constructor(adminRepository, encryptService, jwtService) {
        this.getAdminByEmail = async (email) => {
            if (!email) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'É preciso enviar o email do admin para verificar sua existência',
                });
            }
            const admin = await this.adminRepository.findOne({
                where: {
                    email: email,
                }
            });
            return admin;
        };
        this.create = async (createAdminDTO) => {
            const adminWithSameEmail = await this.getAdminByEmail(createAdminDTO.email);
            if (adminWithSameEmail) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'Já existe um admin com esse e-mail',
                });
            }
            const encryptedPassword = this.encryptService.encrypt(createAdminDTO.password);
            if (!encryptedPassword) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'Houve um erro ao encriptar a senha. Verifique se a senha é válida e tente novamente',
                });
            }
            const newAdmin = new admin_entity_1.Admin();
            newAdmin.email = createAdminDTO.email;
            newAdmin.password = encryptedPassword;
            const newAdminRepositoryResponse = await this.adminRepository.save(newAdmin);
            return httpResponses_1.HttpResponse.created({
                data: newAdminRepositoryResponse,
                message: 'Usuário admin criado com sucesso!',
            });
        };
        this.login = async (loginDTO) => {
            try {
                const { email, password } = loginDTO;
                const adminByEmail = await this.getAdminByEmail(email);
                if (!adminByEmail) {
                    throw httpResponses_1.HttpResponse.badRequest({
                        message: 'Não existe usuário com essas credenciais no sistema',
                    });
                }
                const comparePassword = this.encryptService.compare(password, adminByEmail.password);
                if (!comparePassword) {
                    throw httpResponses_1.HttpResponse.badRequest({ message: "As credenciais não coincidem!" });
                }
                const thisUserJwt = this.jwtService.sign({
                    id: adminByEmail.id,
                });
                return httpResponses_1.HttpResponse.success({ data: { user: adminByEmail, jwt: thisUserJwt }, message: 'Usuário logado' });
            }
            catch (err) {
                throw err;
            }
        };
        this.adminRepository = adminRepository;
        this.encryptService = encryptService;
        this.jwtService = jwtService;
    }
}
exports.AdminService = AdminService;
