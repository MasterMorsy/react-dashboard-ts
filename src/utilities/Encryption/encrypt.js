import { AES, enc } from "crypto-js";

export function encrypt(data) {
  return AES.encrypt(JSON.stringify(data), "secret");
}

export function dcrypt(encryptedData) {
  let dycryptData = AES.decrypt(encryptedData, "secret");
  return JSON.parse(dycryptData.toString(enc.Utf8));
}
