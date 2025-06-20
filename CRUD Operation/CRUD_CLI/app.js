const readline = require("readline");
const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");


// Chalk
// ===========================================
const red = chalk.red;
const green = chalk.greenBright;
const blue= chalk.blue;
const bold = chalk.bold;
const main = chalk.inverse;
// ===========================================



// Read Line // using Promises
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// ===========================================
const askQuestion = (query, additional) => {
  return new Promise((resolve, reject) => {
    if(query) {
      if(additional) rl.write(additional)
      rl.question(bold(query), (ans) => {
        let a = ans.toLowerCase().replace(/\s+/g, " ");
        switch (a) {
          case "create":
            createFile();
            break;
          case "read":
            viewFile();
            break;
          case "update":
              editFile();
            break;
          case "remove":
              removeFile()
            break;
          default:
            break;
        }
        resolve(ans);
      })
    }else{
      reject(null)
    }
  })
}
// ===========================================





const folderPath = path.join("output")

// Close or Continue
// ===========================================
async function closeAndContinue(){
  let ans = await askQuestion(`Continue CRUD ${blue("(y)")} : `)
  if(ans == "y"){
    console.clear()
    initialQuestion();
  }else{
    rl.close();
    console.clear()
  }
}
// ===========================================


// Initial Function
// ===========================================
async function initialQuestion(){
  console.clear()
  askQuestion(`
${main("=============== CRUD CLI ===============")}

${bold(`select ${blue("(create)")} for create new file`)}
${bold(`select ${blue("(read)")} for read file`)}
${bold(`select ${blue("(update)")} for update existing file content`)}
${bold(`select ${blue("(remove)")} for delete file`)}

${bold("Select What You Want To Do : ")}`);
}
initialQuestion();
// ===========================================














// ====================================
// =============== CRUD ===============
// ====================================


// create File
// ===========================================
const createFile = async () => {
  const fileName = await askQuestion("Enter File Name : ")
  const fileContent = await askQuestion("Enter File Content : ");
  await fs.writeFile(path.join(folderPath,fileName), fileContent, "utf-8")
  console.log(green("File Is Created"));
  closeAndContinue();
};
// ===========================================


// Read File
// ===========================================
const viewFile = async () => {
  const allFiles = await fs.readdir(folderPath, "utf-8")
  console.log("Files :",allFiles);
  const fileName = await askQuestion(`Select File To Read ${red("(Valid File)")} : `);
  if(allFiles.includes(fileName)){
    const fileContent = await fs.readFile(path.join(folderPath, fileName), "utf-8");
    console.log(green("File Content : "), fileContent)
    closeAndContinue();
  }else{
    initialQuestion();
  }
  
};
// ===========================================


// Update
// ===========================================
const editFile = async () => {
  const allFiles = await fs.readdir(folderPath, "utf-8");
  console.log("Files :",allFiles);
  const fileName = await askQuestion("Select File To Edit : ");
  if(allFiles.includes(fileName)){
    const fileContent = await fs.readFile(path.join(folderPath, fileName), "utf-8");
    const editedContent = await askQuestion(blue("Your Current File Content : "), fileContent);
    await fs.writeFile(path.join(folderPath, fileName), editedContent, "utf-8");
    console.log(green("Successfully Updated"))
    closeAndContinue();
  }else{
    initialQuestion();
  }
};
// ===========================================


// Delete
// ===========================================
const removeFile = async () => {
  const allFiles = await fs.readdir(folderPath);
  console.log("Files :",allFiles);
  const fileName = await askQuestion(red("Select File To Delete : "));
  if(allFiles.includes(fileName)){
    await fs.unlink(path.join(folderPath, fileName))
    console.log(green("Successfullt Deleted"));
    closeAndContinue();
  }else{
    initialQuestion();
  }
};
// ===========================================