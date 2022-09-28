import * as fs from 'fs'

class ContenedorArchivo {

        constructor(ruta) {
            this.ruta = ruta;
        }
    
        async listar(id) {
                
        }
    
        async listarAll() {
            try {
                let messages = await fs.readFileSync(this.ruta, 'utf-8');
                return JSON.parse(messages);
            } catch (error) {
                console.error("No hay nada en el archivo",error);
                return [];
        }   
        }
    
        async guardar(obj) {
            let result = await this.listarAll();
            result.push({...obj});
            fs.writeFileSync(this.ruta, JSON.stringify(result,null,2));
        }
    
    
        async actualizar(obj,id) {
            
        }
    
        async borrar(id) {
          
        }
    
        async borrarAll() {
            const arr = [];
            fs.writeFileSync(this.ruta, JSON.stringify(arr,null,2));            
           
        }
    }

export default ContenedorArchivo