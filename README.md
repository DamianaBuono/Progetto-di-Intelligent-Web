# Alla Scoperta del Giappone – Ontologia e Web Application
## Descrizione

“**Alla scoperta del Giappone**” è un progetto che nasce con l’obiettivo di creare un’applicazione web interattiva che permetta agli utenti di esplorare la cultura, le città, la storia, le tradizioni e la gastronomia del Giappone.
Per garantire una rappresentazione **strutturata, semantica e flessibile** delle informazioni, il progetto si basa sulla realizzazione di un’**ontologia** invece che su un semplice dataset tradizionale.

L’ontologia consente di modellare in modo chiaro le relazioni tra concetti come città, arti, tradizioni, piatti tipici, periodi storici e molto altro, facilitando anche l’interrogazione tramite **SPARQL**.

## Tecnologie Utilizzate
* **Node.js** – Runtime JavaScript lato server utilizzato per gestire logica backend e interrogazioni all’ontologia.

* **Visual Studio Code** – Editor di sviluppo utilizzato per scrivere, organizzare e gestire il codice del progetto.

* **Apache Jena** – Framework per il Semantic Web utilizzato per gestire ontologie, triple store e interrogazioni SPARQL.

* **Protégé** – Editor ontologico per la modellazione delle classi, delle proprietà e della struttura semantica del dominio.

* **React** – Libreria JavaScript per costruire l’interfaccia web interattiva e dinamica dell’applicazione.

* **JavaScript** – Linguaggio principale usato per la logica dell’applicazione, l’interazione con l’ontologia e il frontend.

* **CSS** – Utilizzato per la definizione dello stile, del layout e della grafica dell’intero sito web.

## Motivazione

Il progetto è guidato da:

* la passione per la cultura giapponese

* il desiderio di creare un sistema di esplorazione intuitivo e accessibile

* la volontà di sperimentare strumenti moderni per la gestione semantica dell’informazione

* la necessità di offrire un’esperienza informativa immersiva e ben strutturata

## Modellazione dell’Ontologia

L’ontologia è composta da:

### Classi

Rappresentano i concetti principali, come:

* Città

* Arti (visive, performative)

* Tradizioni

* Periodi Storici

* Piatti Tipici

* Festività

* Parchi Nazionali

### Object Property

Definiscono le relazioni tra concetti, ad esempio:

* una città appartiene a una regione

* una festività è legata a uno specifico periodo storico

* una tradizione utilizza determinate tecniche e materiali

### Data Property

Permettono di associare ai concetti valori testuali e descrittivi (es. nome, significato simbolico, descrizione dei piatti).

## Popolamento dell’Ontologia

L’ontologia è stata popolata includendo:

* Città e relative regioni

* Arti visive e performative

* Tradizioni, tecniche, materiali e autori

* Festività e i relativi legami con periodi storici e città

* Piatti tipici con descrizione

* Parchi nazionali e regioni in cui si estendono

La rappresentazione semantica consente un’esplorazione coerente e ben strutturata del patrimonio culturale giapponese.

## Query SPARQL

L’ontologia è interrogabile tramite SPARQL.

Esempi di funzionalità ottenute tramite query:

### Città

Restituisce tutte le città e le loro regioni di appartenenza, con eventuale associazione alle culture correlate (gestite tramite raggruppamento concatenato).

### Attività nelle città

Permette di visualizzare attività e punti d'interesse nelle diverse località.

### Periodi storici

Interroga i quattro principali periodi della storia giapponese:

* Giappone Classico

* Giappone Medioevale

* Giappone Pre-Moderno

* Giappone Moderno

### Arti

Restituisce tutte le arti visive e performative modellate nell’ontologia.

### Festività

Restituisce le festività, con eventuali informazioni su:

* tecniche utilizzate

* materiali

* significato simbolico

* città coinvolte

* periodi storici

### Tradizioni

Restituisce le tradizioni culturali del Giappone, con tutte le loro caratteristiche (materiali, tecniche, autori, città e periodi).

### Piatti tipici

Restituisce piatti tipici giapponesi con le relative descrizioni.

### Parchi nazionali

Restituisce i parchi nazionali e le regioni coinvolte (una o due), gestendo correttamente i casi multipli con raggruppamento concatenato.

### Conclusioni

L’ontologia sviluppata offre una rappresentazione semantica completa e flessibile del patrimonio culturale giapponese.
Permette di esplorare il Giappone attraverso concetti interconnessi, supportando un’applicazione web intuitiva e ricca di contenuti.
La struttura semantica facilita interrogazioni precise e consente un arricchimento futuro del modello.

### Sviluppi futuri

* Sono previste possibili estensioni quali:

* Integrazione di **hotel, B&B e altre forme di alloggio**

* Visualizzazione delle attrazioni e attività vicine alla struttura scelta dall’utente

* Creazione di un **itinerario di viaggio personalizzato** basato su preferenze e localizzazione

* Ampliamento dell’ontologia con ulteriori aspetti culturali e geografici



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
