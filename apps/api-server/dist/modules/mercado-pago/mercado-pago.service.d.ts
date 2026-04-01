import { PreApproval } from 'mercadopago';
export declare class MercadoPagoService {
    private readonly client;
    constructor();
    get preApproval(): PreApproval;
}
