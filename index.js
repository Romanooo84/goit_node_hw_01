const { program } = require('commander');
const fs = require(`fs`)
const readline = require('readline');;
const { v4: uuidv4 } = require('uuid');
const argv = require("yargs").argv;

require('colors')


const rl = readline.createInterface(
  {
    input: process.stdin,
    output : process.stdout
  }
)

program.option(
  "-f, --file [string]",
  "file for contacts",
  CONTACTS_FILE
)

program.option(
  "-c, --contact [number]",
  "phone book contact number",
  CONTACT_NUMBER
)

program.option(
  "-n, --name-contact [string]",
  "phone book contact name",
  CONTACT_NAME
)

program.option(
  "-e, --email [string]",
  "phone book contact e-mail",
  CONTACT_EMAIL
)

program.option(
  "-a, --action [string]",
  "choose action list, get, add, del",
  CONTACT_EMAIL
)

const { file, contact, nameContact, email } = program.parse(process.argv).opts()

 

const start = async({ action, id, name, email, phone }) => {
  rl.question(
    'Co chcesz zrobić?'.blue,
    async value => {
      if (value == 'list') {
       await readFile()
       await start()  
      }
      else if (value === 'add user') {
        addUser()
      }
      else if (value === 'end') {
        rl.close()
      }
    }
    )
    
}
  
const addUser = async () => {
  await new Promise((resolve, reject)=> {
  rl.question(
    'Podaj imię i nazwisko:\n',
    value => {
      CONTACT_NAME = value
      resolve()
    }
  )
  })
  await new Promise((resolve, reject)=> {
    rl.question(
      'Podaj numer telefonu:\n',
      value => {
        CONTACT_NUMBER = value
        resolve()
      }
    )
  })
  await new Promise((resolve, reject)=> {
    rl.question(
      'Podaj adres email: \n',
      value => {
        CONTACT_EMAIL = value
        resolve()
      }
    )
  })
  
    await new Promise((resolve, reject)=> {
      const userData={
          "id": uuidv4(),
          "name": CONTACT_NAME,
          "email": CONTACT_EMAIL,
          "phone": CONTACT_NUMBER
      }
      
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          console.error('Błąd odczytu pliku:', err);
          return;
        }

      let existingData;
        try {
          existingData = JSON.parse(data);
        } catch (parseError) {
        console.error('Błąd parsowania JSON:', parseError);
        return;
        }

      // Dodaj nowy obiekt do tablicy istniejących danych
        existingData.push(userData);

      // Zapisz zmienioną tablicę z powrotem do pliku
      fs.writeFile(file, JSON.stringify(existingData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Błąd zapisu do pliku:', err);
      } else {
        console.log('Nowa pozycja została dodana do pliku.');
      }
      });
    });
    })
}

const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        console.log("error", err.message);
        reject(err);
      } else {
        console.log(data.toString());
        resolve();
      }
    });
  });
};  


let CONTACTS_FILE = file
let CONTACT_NUMBER = contact
let CONTACT_NAME = nameContact
let CONTACT_EMAIL = email 

start()
