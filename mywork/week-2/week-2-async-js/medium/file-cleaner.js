const fs = require('fs').promises;

async function cleanFile(filename){
    try{
      const data = await fs.readFile(filename,'utf-8');

      const CleanedData= data.replace(/\s+/g , " ").trim();

      await fs.writeFile(filename,CleanedData);
      console.log('The data has been cleaned');

    }
    catch(error)
    {
        console.log(error);
    }
}
const filename  = 'a.txt';
cleanFile(filename);