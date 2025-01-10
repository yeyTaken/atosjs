import { GiftManager } from '../src';
import { QuickDB } from 'quick.db';

describe('GiftManager', () => {
    let gm: GiftManager;

    beforeAll(() => {
        gm = new GiftManager({
            fileName: 'test'
        });
    });

    afterEach(async () => {
        // Limpa os dados do banco após cada teste
        const db = new QuickDB({ filePath: 'test.json' });
        await db.delete('gifts');
    });
    
    test('Deve gerar um gift com sucesso', async () => {
        const giftId = await gm.generate({
            type: 'test',
            amount: { id: 1, wallet: { coins: 100, bank: true } },
            expiration: '7d',
        });

        expect(giftId).toBeDefined();

        const gift = await gm.view(giftId);
        expect(gift.valid).toBe(true);
        expect(gift.type).toBe('test');
        expect(gift.amount).toEqual({ id: 1, wallet: { coins: 100, bank: true } });
    });

    test('Deve gerar um gift com limite de resgates', async () => {
        const giftId = await gm.generate({
            type: 'coins',
            amount: 500,
            maxRedeem: 2, // Definindo um limite de 2 resgates
        });

        expect(giftId).toBeDefined();

        const gift = await gm.view(giftId);
        expect(gift.valid).toBe(true);
        expect(gift.type).toBe('coins');
        expect(gift.amount).toEqual(500);

        // Resgatar uma vez
        const redeemResult1 = await gm.redeem(giftId);
        expect(redeemResult1.success).toBe(true);

        const giftAfterFirstRedeem = await gm.view(giftId);
        expect(giftAfterFirstRedeem.valid).toBe(true);

        // Resgatar novamente
        const redeemResult2 = await gm.redeem(giftId);
        expect(redeemResult2.success).toBe(true);

        const giftAfterSecondRedeem = await gm.view(giftId);
        expect(giftAfterSecondRedeem.valid).toBe(false); // Não pode resgatar mais após 2 vezes
    });

    test('Não deve permitir mais resgates do que o limite', async () => {
        const giftId = await gm.generate({
            type: 'coins',
            amount: 500,
            maxRedeem: 1, // Limite de 1 resgate
        });

        const redeemResult1 = await gm.redeem(giftId);
        expect(redeemResult1.success).toBe(true);

        const redeemResult2 = await gm.redeem(giftId);
        expect(redeemResult2.success).toBe(false); // Excedeu o limite
    });

    test('Deve marcar gift como expirado após o tempo de validade', async () => {
        const giftId = await gm.generate({
            type: 'test',
            amount: { id: 1, wallet: { coins: 100, bank: true } },
            expiration: '1s',
        });

        // Aguarda 2 segundos para que o código expire
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const gift = await gm.view(giftId);
        expect(gift.valid).toBe(false); // Deve estar inválido
    });

    test('Deve resgatar um gift válido com sucesso', async () => {
        const giftId = await gm.generate({
            type: 'coins',
            amount: 500,
        });

        const redeemResult = await gm.redeem(giftId);
        expect(redeemResult.success).toBe(true);

        const gift = await gm.view(giftId);
        expect(gift.valid).toBe(false); // Depois de resgatar, deve estar inválido
    });

    test('Não deve resgatar um gift expirado', async () => {
        const giftId = await gm.generate({
            type: 'coins',
            amount: 100,
            expiration: '1s',
        });

        // Aguarda 2 segundos para que o código expire
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const redeemResult = await gm.redeem(giftId);
        expect(redeemResult.success).toBe(false); // Não deve permitir o resgate
    });

    test('Não deve resgatar um gift inválido ou já resgatado', async () => {
        const giftId = await gm.generate({
            type: 'coins',
            amount: 100,
        });

        // Resgata o código uma vez
        const firstRedeem = await gm.redeem(giftId);
        expect(firstRedeem.success).toBe(true);

        // Tenta resgatar novamente
        const secondRedeem = await gm.redeem(giftId);
        expect(secondRedeem.success).toBe(false); // Já foi resgatado
    });

    test('Deve gerar um gift sem expiração e permanecer válido', async () => {
        const giftId = await gm.generate({
            type: 'coins',
            amount: { id: 1234, value: 500 },
        });

        const gift = await gm.view(giftId);
        expect(gift.valid).toBe(true);
        expect(gift.amount).toEqual({ id: 1234, value: 500 });
    });
});

