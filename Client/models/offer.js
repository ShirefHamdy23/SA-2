import * as fs from "fs";
export class offer {
  id;
  method;
  item;
  percentage;
  valid;
  constructor(message) {
    if (
      (typeof message.item === "string" &&
        typeof message.percentage === "number" &&
        message.method === methods.post) ||
      (Object.values(methods).includes(message.method) &&
        message.id != undefined)
    ) {
      this.id = message.id;
      this.method = message.method;
      this.item = message.item;
      this.percentage = message.percentage;
      this.valid = true;
    } else this.valid = false;
  }
}
const data = fs.readFileSync("config/global.conf", "utf8");
export const methods = JSON.parse(data);
