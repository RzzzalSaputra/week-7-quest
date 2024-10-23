const fs = require("node:fs")
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {}

// contoh script pembuatan folder
 app.makeFolder = () => {
    rl.question("Masukan Nama Folder : ",(folderName) => {
        fs.mkdir(__dirname + `/${folderName}`,() => {
            console.log("success created new folder");
            
        })
        rl.close()
    })
} 

// Script Membuat File
app.makeFile = () =>{

    // Tanya Extensi File Yang Diinginkan
    rl.question("Masukkan Extensi File Yang Diinginkan (txt, md) : ", (extensiFile) => {
        const type = ["txt", "md"];
        const ef = extensiFile.toLowerCase();
        
        // Cek Apakah Tipe File Yang Diinginkan Tersedia
        if(!type.includes(ef)){
            rl.close()
            return console.log(`Tipe File ${ef} Tidak Didukung`);
        }
        
        // Tanya Nama File Yang Diinginkan
        rl.question(`Masukkan Nama File : `, (namaFile)=>{

            // Tanya Isi File Yang Diinginkan
            rl.question("Masukkan Isi File : ", (isiFile)=>{
                fs.writeFile(`./unorganize_folder/${namaFile}.${ef}`, isiFile, err => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("File Berhasil Dibuat");
                    rl.close();
                    }
                });
            })
        })
    })
}

// To Do : lanjutkan pembuatan logic disini 


module.exports = app