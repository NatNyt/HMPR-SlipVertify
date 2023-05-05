export interface VerifySlipInfo {
    slipType: string;
    transType: string | null;
    transferType: string;
    transRef: string;
    transAmount: number;
    transFeeAmount: number;
    transDate: number;
    transTime: string;
    fromAccountNo: string;
    fromAccountNameTh: string;
    fromAccountNameEn: string;
    fromBankName: string;
    fromBankId: string;
    toAccountNo: string;
    toAccountNameEn: string;
    toAccountNameTh: string;
    toBankName: string;
    toBankId: string;
    toMerchantName: string | null;
    billReference1: string | null;
    billReference2: string | null;
    billReference3: string | null;
    numberOfRef: number;
    reference1Name: string | null;
    reference2Name: string | null;
    reference3Name: string | null;
    kShopReference: string | null;
    kShopMerchantName: string | null;
    kShopMerchantAccountName: string | null;
    merchantCode: string | null;
    merchantAlias: string | null;
    merchantCategory: string | null;
    slipBankCode: string;
    swiftCode: string | null;
    interfundStatus: string | null;
    interfundStatusDesc: string | null;
    foreignExchangeAmount: number;
    currencyCode: string | null;
    currencyExponent: number;
    isForeignPayment: string | null;
    info1: string | null;
    info2: string | null;
    info3: string | null;
}

export interface Data {
    actionCode: string;
    rawQrBarcode: string;
    kPayQrPaymentInfo: any | null;
    promptPayTransferInfo: any | null;
    transferInfo: any | null;
    billPaymentInfo: any | null;
    verifySlipInfo: VerifySlipInfo | null;
    atmCardlessInfo: any | null;
    authenticationInfo: any | null;
    upiPaymentInfo: any | null;
    freeText: string;
}

export interface ApiResult {
    status: string;
    data: Data | null;
}
export class qrCodeInvalid extends Error {}
