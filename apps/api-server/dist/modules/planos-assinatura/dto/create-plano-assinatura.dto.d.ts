export declare class CreatePlanoAssinaturaDto {
    reason: string;
    auto_recurring: {
        frequency: number;
        frequency_type: string;
        transaction_amount: number;
        currency_id: string;
    };
    back_url: string;
}
