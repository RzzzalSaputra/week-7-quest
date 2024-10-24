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
    let namaExtensi = {"txt": "Text", "md": "MarkDown", "png": "Image", "jpg": "Image"};
    let EXT = f.slice(1);
    if(namaExtensi[EXT]){
        return namaExtensi[EXT]
    }else{
        return EXT;
    }
}

// Fungsi Untuk Membaca Isi File
function read(folderName, element){
    fs.readFile(`./${folderName}/${element}`, `utf8`, (err, data) => {
        if (err) {
            return err;
        }else{
            console.log(`\n>>Isi Dari File ${element}<< \n\n ${data} \n`);
            return data;
        }
    });
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

    // Tanya Folder Yang Ingin Dibaca Isinya
    rl.question("Masukan Nama Folder : ",(folderName) => {
        fs.readdir(`./${folderName}/`, (err, file)=>{
            if(err){
                console.log(err)
            }else{

                // Mengakses Array file Yang Berisi Nama File
                for (let index = 0; index < file.length; index++) {
                    const element = file[index];
                    try {

                        // Menggunkan Stat Untuk Mengakses Data Sebuah File
                        const stat = fs.statSync(`./${folderName}/${element}`);

                        // Push Data Yang Dipilih Ke Dalam temp Array
                        temp.push({
                            namaFile: element,
                            extensi: path.extname(element),
                            jenisFile: extenFile(path.parse(file[index]).ext),
                            tanggalDibuat: stat.birthtime.toString(),
                            ukuranFile: byte(stat.size),
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }
                // Tampilkan Data Yang Ada Di Temp Ke Bentuk JSON
                console.log(JSON.stringify(temp, null, 2));
            }
        })
        rl.close()
    })
}

// Membaca Isi File
app.readFile = ()=>{

    // Tanya Folder Yang File Nya Ingin Dibaca Isinya
    rl.question("Masukan Nama Folder : ",(folderName) => {
    fs.readdir(__dirname + `/${folderName}`,(err,file) => {
        if(err){
            console.log(err)
        }else{

             //Mengakses Array file Yang Berisi Nama File
            for (let index = 0; index < file.length; index++) {
                const element = file[index];
                
                //Jika Extensinya Text 
                if(path.parse(element).ext == `.txt`){

                    // Panggil Fungsi Read
                    read(folderName,element)

                // Jika Extensinya MarkDown
                }else if(path.parse(element).ext == `.md`){

                    // Panggil Fungsi Read
                    read(folderName,element)
                }
                
            }
        }
        })
        rl.close()
    })
}
// To Do : lanjutkan pembuatan logic disini 


module.exports = app