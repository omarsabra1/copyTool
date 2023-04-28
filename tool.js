import clipboard from "clipboardy";
import { log } from "console";
import { existsSync } from "fs";
import fs from "fs/promises";
import getPercentage from "./getPercentage.js";
import promp from "prompt-sync";
const prompt = promp();
async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}
async function main(path) {
  //get content
  const data = await fs.readdir(path);
  log(data);
  log("this data will be in clipboard [Y/n]");
  const check = prompt();
  if (check === "n" || check === "N" || check === "no" || check === "No") {
    return log("thank you 😄");
  }
  for (let i = 0; i < data.length; i++) {
      process.stdout.write(`Progress: ${getPercentage(i, data.length)}%\r`);
        await sleep(100);
    clipboard.writeSync(data[i]);
  }
  process.stdout.write("\n");
  log("Done 😎");
}

log("can you Enter path please");
const path = prompt();
if (!existsSync(path)) {
  throw ("Directory does not exist.");
}
main(path);
