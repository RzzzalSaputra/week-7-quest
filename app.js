const fs = require("node:fs")
const readline = require('node:readline');
const path = require('path')

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

app.extSorter = () =>{
    fs.readdir('./unorganize_folder/', (err, file)=>{
        if(err){
            console.log(err)
        }else{
                // Akses Setiap File Array
                file.forEach((f)=>{
                    // Direktori File
                    if(path.parse(f).ext !== ``){
                    const nameFolder = path.parse(f).ext.slice(1);
                    const currPath = `./unorganize_folder/${f}`
                    const newPath = `./${nameFolder}/${f}`

                    // Buat Folder
                    fs.mkdir(__dirname + `/${nameFolder}`,() => {
                        console.log(`Berhasil Buat Folder ${nameFolder}`);
                    });
                    
                    // Rename Path File
                    fs.rename(currPath, newPath, (err)=>{
                        if(err){
                            console.log(err)
                        }else{
                            console.log(`File ${f} Telah Berhasil Dipindahkan Ke Folder ${nameFolder}`)
                        }
                    });
                    }else{
                        const currPath = `./unorganize_folder/${f}`
                        const newPath = `./unknown/${f}`

                        // Buat Folder
                        fs.mkdir(__dirname + `/unknown`,() => {
                            console.log(`Berhasil Buat Folder unknown`);
                        });
                        
                        // Rename Path File
                        fs.rename(currPath, newPath, (err)=>{
                            if(err){
                                console.log(err)
                            }else{
                                console.log(`File ${f} Telah Berhasil Dipindahkan Ke Folder unknown`)
                            }
                        });
                    }
            })
        }
    })
    rl.close();
}
// To Do : lanjutkan pembuatan logic disini 


module.exports = app