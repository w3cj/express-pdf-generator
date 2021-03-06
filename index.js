const path = require('path');
const ezc = require('express-zero-config');
const HTMLToPDF = require('html5-to-pdf');

const router = ezc.createRouter();

router.get('/', (req, res, next) => {
  res.json({
    message: 'Hello World!'
  })
});

router.get('/pdf', function(req, res, next) {

    const fileName = `TEST.pdf`;
    const filePath = `./emails/${fileName}`

    htmlToPDF = new HTMLToPDF({
        inputPath: `./emails/preparedHTML.html`,
        outputPath: `${filePath}`
    })

		console.log('Building PDF...');
    htmlToPDF.build((error) => {
        if (error) {
            console.log(error);
						res.json({error});
        } else {
            res.json({
							message: "No error returned from htmlToPDF build"
						});
            // var bitmap = fs.readFileSync(filePath);
            // const pdfBase64 = Buffer(bitmap).toString('base64');
        }
    })


});

const app = ezc.createApp({
  router,
  static_dir: path.join(__dirname, 'emails')
});

const server = ezc.createServer(app); // createServer parameters: (express app, port_number)

server.start();
