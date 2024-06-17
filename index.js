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
  "-f, --file <type>",
  "file for contacts",
  'contacts.json'
)

program.option(
  "-c, --phone <type>",
  "phone book contact number",
)

program.option(
  "-n, --name <type>",
  "phone book contact name",
)

program.option(
  "-e, --email <type>",
  "phone book contact e-mail",
)

program.option(
  "-a, --action <type>",
  "choose action list, get, add, del",
)

program.option(
  "-, --id <type>",
  "contact id",
)


const { file, phone, name, email, id, action } = program.parse(process.argv).opts()

 

const start = async (phone, name, email, action, id) => {
  switch (action) {
    case "list":
      readFile()
      break;

    case "get":
      
      showUser(id)
      break;

    case "add":
      addUser(phone, name, email, id)
      break;

    case "remove":
      delUser(id)
      break;
    
  }
}
  
const addUser = async (phone, name, email) => {
      const userData={
          "id": uuidv4(),
          "name": name,
          "email": email,
          "phone": phone
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
        rl.close()
      });
    });
}
    
const delUser = async (id) => {
      
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
        ; let filtredgData = existingData.filter(item => item.id !== id);

      // Zapisz zmienioną tablicę z powrotem do pliku
      fs.writeFile(file, JSON.stringify(filtredgData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Błąd zapisu do pliku:', err);
      } else {
        console.log('Pozycja została usunięta pliku.');
        }
        rl.close()
      });
    });
}
    
const showUser = async (id) => {
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

        const foundItem = existingData.find(item => item.id === id);
        if (foundItem) {
           console.log(foundItem);
        }
        else(console.log('brak danych'))
        rl.close()
      });
    }


const readFile = () => {
  fs.readFile('contacts.json', (err, data) => {
    if (err) {
      console.log("error", err.message);
    } else {
      console.log(data.toString());
    }
  });
}  


start(phone, name, email, action, id)
