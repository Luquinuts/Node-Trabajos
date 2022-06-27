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

function esPrimo(num) {
  if (num == 0 || num == 1 || num == 4) return false; //para casos especiales
  for (let x = 2; x < num / 2; x++) { 
    if (num % x == 0) return false; //
  }
  return true;
}


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
      </head><body style="background: darkred;">
      <center>
      <div style="border: 10px; text-align: center;">
      <p style="color: ghostwhite; font-style: normal;">Valores:${formulario.get('primero')}</p>
      <p style="color: ghostwhite; font-style: normal;">Valores:${formulario.get('segundo')}</p>`

    let mayor; let menor; let g; let r; let m = "";

    if(formulario.get('primero')<formulario.get('segundo')){
      mayor = formulario.get('segundo');
      menor = formulario.get('primero');
    }else if(formulario.get('primero')>formulario.get('segundo')){
      mayor = formulario.get('primero');
      menor = formulario.get('segundo');
    }else{
      mayor = menor = mayor = formulario.get('primero');
    }
     
    for (let i = menor; i <= mayor; i++) {
      console.log(i);
      g = i;
      if(esPrimo(i)==true){
        let suma = 0;
        do{
          r = g%10;
          g = g/10;
          g = Math.trunc(g);
          suma = suma + r;
        }while(g!=0);

        if (esPrimo(suma)==true) {
          m += i;
          m += ' - '
        }
      }
     
    }

  
    CreationPage += '<p style="color: ghostwhite; font-style: normal;">' + m + '</p>';

    CreationPage +=`
     </center>
     <a href="index.html">Volver</a> </div>
     </body></html>`
    respuesta.end(CreationPage)
  })
}

console.log('Servidor web iniciado')