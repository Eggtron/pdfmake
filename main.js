import pdfmake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import fs from 'fs-extra' //Asynchrone Operationen auf dem Dateisystem
import dayjs from 'dayjs' //Mega Geile library zur manipulation des Javascript Date Objekts

pdfMake.vfs = pdfFonts.pdfMake.vfs; //Verbindung der Fonts von PDF Make

/*
Die Docdefintion binhaltet das Dokument, bzw. das was dargestellt werden soll. Die Dokumentation ist auf 
https://pdfmake.github.io/docs/0.1/document-definition-object/ zu finden. 

Ich würde vorschlagen, das du ein einfaches Dokument nimmst was du schonmal druckst, also den SLB und versuchst den hier nachzubilden. Der Inhalt der informationen ist erstmal wurscht.

Du kannst das data objekt gerne in diesem Stil erweitern, beispielsweise mit Kunden oder Objekt informationen

*/

const data = {
    termin: dayjs('01.02.2024'),
    start: dayjs('01.02.2024 06:00'),
    end: dayjs('01.02.2024 14:00'),
    taetigkeitsbeschreibung: 'Langer text was alles für fliesen kaputt gehauen wurden',    
}

console.log(data.start.format('DD.MM.YYYY HH:mm'))

const docDefintion = {
    info: {
        title: 'Stundenlohnbericht',
        author: 'Sexy Name',
        creationDate: dayjs()
    },
    header: { text: 'Titel', fontSize: 15, alignment: 'center' },
     content: 'Hi. I am a PDF.' 
}


const pdfDocGenerator = pdfMake.createPdf(docDefintion);

// Generieren Sie das PDF-Dokument.
pdfDocGenerator.getBuffer(async (buffer) => {
  try {
    // Konvertieren Sie den Buffer in einen Puffer.
    const pdfBuffer = Buffer.from(buffer);

    // Speichern Sie das PDF lokal.
    await fs.writeFile('test.pdf', pdfBuffer);

    console.log('PDF wurde erfolgreich lokal gespeichert.');
  } catch (error) {
    console.error('Fehler beim Speichern des PDF:', error);
  }
});