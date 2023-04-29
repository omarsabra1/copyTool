import clipboard from "clipboardy";
import { log } from "console";
import { existsSync } from "fs";
import fs from "fs/promises";
import promp from "prompt-sync";
const prompt = promp();
async function main(path) {
  //get content
  const data = await fs.readdir(path);
  log(data);
  log("this data will be in clipboard [Y/n]");
  let check = prompt();
  if (check === "n" || check === "N" || check === "no" || check === "No") {
    return log("thank you 😄");
  }  
  if (
    check !== "y" &&
    check !== "Y" &&
    check !== "yes" &&
    check != "Yes"
  ) {
    log("Error try again please");
    process.exit();
  }
  for (let i = 0; i < data.length; i++) {
    clipboard.writeSync(data[i]);
  }
  process.stdout.write("\n");
  log("Done 😎");
}
log("can you Enter path please");
const path = prompt();
if(process.platform ===  'win32'){
  path.replaceAll('\\','\\\\');
}

if (!existsSync(path)) {
  log("Directory does not exist.");
  process.exit();
}
main(path);
