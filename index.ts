import Jimp from 'jimp';
import axios from 'axios';
import fs from 'fs';
import qrCode from 'qrcode-reader';
import { ApiResult, qrCodeInvalid } from './interface';
function decodeQrCode(image: Jimp): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const qrcode = new qrCode();
    qrcode.callback = function (err: Error | null, value: any) {
      if (err) {
        reject(err);
      } else {
        resolve(value.result);
      }
    };
    qrcode.decode(image.bitmap);
  });
}

export async function getSlipDataRaw(apiKey: string, path: string): Promise<any> {
    const buffer = fs.readFileSync(path);
    const image = await Jimp.read(buffer);
    const data = await decodeQrCode(image);
    if(!data || data.trim().length == 0){
      throw new qrCodeInvalid("QRcoode is not a valid")
    }
    const result = await axios.post('https://slipverify.hmpr.xyz/api/api1/apislip', {
      "api_key": apiKey,
      "qrcode": data
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'HMPRSLIPAPI'
      }
    });
    
    const body: ApiResult = result.data
    return body
  };
export default async function getSlipData(apiKey: string, path: string): Promise<any> {
    const buffer = fs.readFileSync(path);
    const image = await Jimp.read(buffer);
    const data = await decodeQrCode(image);
    if(!data || data.trim().length == 0){
      throw new qrCodeInvalid("QRcoode is not a valid")
    }
    const result = await axios.post('https://slipverify.hmpr.xyz/api/api1/apislip', {
      "api_key": apiKey,
      "qrcode": data
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'HMPRSLIPAPI'
      }
    });
    
    const body: ApiResult = result.data
    if(body.data == null) {
        const respone = {
            status: (body.data == null) ? false : true,
        }
        return respone
    }
    const respone = {
        status: (body.data == null) ? false : true,
        transferRef: body.data?.verifySlipInfo?.transRef,
        date: body.data?.verifySlipInfo?.transDate,
        amount: body.data?.verifySlipInfo?.transAmount,
        sender: {
            bank: body.data?.verifySlipInfo?.fromBankName,
            name: body.data?.verifySlipInfo?.fromAccountNameTh,
            accountNumber: body.data?.verifySlipInfo?.fromAccountNo
        },
        receiver: {
            bank: body.data?.verifySlipInfo?.toBankName,
            name: body.data?.verifySlipInfo?.toAccountNameTh,
            accountNumber: body.data?.verifySlipInfo?.toAccountNo
        }
    }
    return respone
};
