const fs = require("node:fs");
const readline = require('node:readline');
const path = require('path');
const byte = require('bytes');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const app = {}

// Fungsi Cek Extensi File
function extenFile(f){
    let namaExtensi = {"txt": "Text", "md": "MarkDown", "png": "Gambar", "jpg": "Gambar"};
    let EXT = f.slice(1);
    if(namaExtensi[EXT]){
        return namaExtensi[EXT]
    }else{
        return EXT;
    }
}

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

// Untuk Sortir File Ke Folder Type Masing-Masing
app.extSorter = () =>{
    fs.readdir('./unorganize_folder/', (err, file)=>{
        if(err){
            console.log(err)
        }else{

                // Akses Setiap File Array
                file.forEach((f)=>{
                    
                    // Cek Apakah Extensi Nya ada
                    if(path.parse(f).ext !== ``){

                    // Mendapatkan Nama Folder
                    const nameFolder = extenFile(path.parse(f).ext);

                    // Direktori File
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

                    // Jika Extensi File Tidak Ada
                    }else{
                        const currPath = `./unorganize_folder/${f}`

                        // Direktori Ke Folder Unknown
                        const newPath = `./unknown/${f}`

                        // Buat Folder Ke Unknown
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

// Membaca Isi Folder
app.readFolder = () => {
    let temp = [];
    rl.question("Masukan Nama Folder : ",(folderName) => {
        fs.readdir(`./${folderName}/`, (err, file)=>{
            if(err){
                console.log(err)
            }else{
                for (let index = 0; index < file.length; index++) {
                    const element = file[index];
                    try {
                        const stat = fs.statSync(`./${folderName}/${element}`);
                        temp.push({
                            nama: element,
                            extensi: path.extname(element),
                            jenisFile: extenFile(path.parse(file[index]).ext),
                            tanggalDibuat: stat.birthtime.toString(),
                            ukuranFile: byte(stat.size),
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }
                console.log(JSON.stringify(temp, null, 2));
            }
        })
        rl.close()
    })
} 
// To Do : lanjutkan pembuatan logic disini 


module.exports = app