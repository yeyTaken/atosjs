import { QuickDB } from 'quick.db';
// import { ErrorMessages } from '../../src/errors';
import { GiftManager } from '../../src';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { GiftManager } = require('../../lib'); // testar a versão buildada

import { describe, expect, beforeAll, afterEach, test } from 'vitest';

describe('GiftManager', () => {
    // let gm: typeof GiftManager; // versão buildada
    let gm: GiftManager;

    beforeAll(() => {
        gm = new GiftManager({
            dbLocal: {
                filePath: 'test.yaml'
            }
        });
    });

    afterEach(async () => {
        // Limpa os dados do banco após cada teste
        const db = new QuickDB({ filePath: 'test.yaml' });
        await db.delete('gifts');
    });

    test('Deve gerar um gift com sucesso', async () => {
        const giftId = await gm.generate({
            type: 'test',
            value: { id: 1, wallet: { coins: 100, bank: true } },
            expiration: '7d',
        });

        expect(giftId).toBeDefined();

        const gift = await gm.view(giftId);
        expect(gift.valid).toBe(true);
        expect(gift.type).toBe('test');
        expect(gift.value).toEqual({ id: 1, wallet: { coins: 100, bank: true } });
    });

    test('Deve gerar um giftId editado com sucesso', async () => {
        const customCode = 'ABC123EDITED'; // Código personalizado
    
        const generatedCode = await gm.generate({
            edit: {
                code: customCode, // Força o uso desse código
            },
        });
    
        expect(generatedCode).toBe(customCode); // Verifica se o código gerado é igual ao enviado
    });

    test('Deve respeitar o limite de resgates', async () => {
        const giftId = await gm.generate({ type: 'coins', value: 500, maxRedeem: 2 });

        expect(await gm.redeem(giftId)).toEqual({ success: true });
        expect(await gm.redeem(giftId)).toEqual({ success: true });
        expect(await gm.redeem(giftId)).toEqual({ success: false });

        const gift = await gm.view(giftId);
        expect(gift.valid).toBe(false);
    });

    test('Não deve permitir mais resgates do que o limite', async () => {
        const giftId = await gm.generate({
            type: 'coins',
            value: 500,
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
            value: { id: 1, wallet: { coins: 100, bank: true } },
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
            value: 500,
        });

        const redeemResult = await gm.redeem(giftId);
        expect(redeemResult.success).toBe(true);

        const gift = await gm.view(giftId);
        expect(gift.valid).toBe(false); // Depois de resgatar, deve estar inválido
    });

    test('Não deve resgatar um gift expirado', async () => {
        const giftId = await gm.generate({
            type: 'coins',
            value: 100,
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
            value: 100,
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
            value: { id: 1234, value: 500 },
        });

        const gift = await gm.view(giftId);
        expect(gift.valid).toBe(true);
        expect(gift.value).toEqual({ id: 1234, value: 500 });
    });
});
