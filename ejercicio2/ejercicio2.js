const http = require('http')
const fs = require('fs')

const mime = {
  'html': 'text/html',
  'css': 'text/css',
  'jpg': 'image/jpg',
  'ico': 'image/x-icon',
  'mp3': 'audio/mpeg3',
  'mp4': 'video/mp4',
  'min.css': 'text/css',
  'js': 'script/js',
  'min.js':'script/js'
}

const servidor = http.createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:8088' + pedido.url)
  let camino = 'public' + url.pathname
  if (camino == 'public/')
    camino = 'public/index.html'
  encaminar(pedido, respuesta, camino)
})

servidor.listen(8888)


function encaminar(pedido, respuesta, camino) {
  console.log(camino)
  switch (camino) {
    case 'public/recuperardatos': {
      recuperar(pedido, respuesta)
      break
    }
    default: {
      fs.stat(camino, error => {
        if (!error) {
          fs.readFile(camino, (error, contenido) => {
            if (error) {
              respuesta.writeHead(500, { 'Content-Type': 'text/plain' })
              respuesta.write('Error interno')
              respuesta.end()
            } else {
              const vec = camino.split('.')
              const extension = vec[vec.length - 1]
              const mimearchivo = mime[extension]
              respuesta.writeHead(200, { 'Content-Type': mimearchivo })
              respuesta.write(contenido)
              respuesta.end()
            }
          })
        } else {
          respuesta.writeHead(404, { 'Content-Type': 'text/html' })
          respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>')
          respuesta.end()
        }
      })
    }
  }
}

function NumerosAleatorios(min, max) { return Math.round(Math.random() * (max - min) + min) } 


function recuperar(pedido, respuesta) {
  let info = ''
  pedido.on('data', datosparciales => {
    info += datosparciales
  })
  pedido.on('end', () => {
    const formulario = new URLSearchParams(info)
    console.log(formulario)
    respuesta.writeHead(200, { 'Content-Type': 'text/html' })
    let CreationPage =
      `<!doctype html><html><head>
      <script src="bootstrap/css/bootstrap.min"></script>
      <script src="bootstrap/js/bootstrap.min.js"></script>
      </head><body style="background: darkred;>
     
      <div style="border: 10px; text-align: center; margin-top: 20%;">
     <p style="color: ghostwhite; font-style: normal; font-size: xx-large;">Tu Eleccion:${formulario.get('OptionPlayer')}<br>`
     let player = formulario.get('OptionPlayer')

      let nashe = NumerosAleatorios(1, 3);

     if(player == 'r'){
         if(nashe == '1'){
          CreationPage +=`La Web Site eligio piedra <br>`; CreationPage +=`Empataste <br>`;
         }else if(nashe == '2'){
          CreationPage +=`La Web Site eligio Papel <br>`; CreationPage +=`Cagaste <br>`;
         }else if(nashe == '3'){
          CreationPage +=`La Web Site eligio Tijeras <br>`; CreationPage +=`Ganaste <br>`;
         }
     }else if(player == 'p'){
        if(nashe == '1'){
          CreationPage +=`La Web Site eligio Piedra <br>`; CreationPage +=`Ganaste <br>`;
        }else if(nashe == '2'){
          CreationPage +=`La Web Site eligio Papel <br>`; CreationPage +=`Cagaste <br>`;
        }else if(nashe == '3'){
          CreationPage +=`La Web Site eligio Tijeras <br>`; CreationPage +=`Perdiste <br>`;
        }
     }else if(player == 's'){
        if(nashe == '1'){
          CreationPage +=`La Web Site eligio Piedra <br>`; CreationPage +=`Perdiste <br>`;
        }else if(nashe == '2'){
          CreationPage +=`La Web Site eligio Papel <br>`; CreationPage +=`Cagaste <br>`;
        }else if(nashe == '3'){
          CreationPage +=`La Web Site eligio Tijeras <br>`; CreationPage +=`Empataste <br>`;
        }
     }else{
      CreationPage += `Elegi una opcion valida-<br>`;
     }

    CreationPage +=`
     </center>
     <a href="index.html">Volver</a> </div>
     </body></html>`
    
    
    respuesta.end(CreationPage)
  })
}

console.log('Servidor web iniciado')