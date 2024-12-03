import { dictionary } from './dictionary.js';

    //TRADUCIR PALABRA SELECCIONADA

document.getElementById('translate-btn').addEventListener('click', () => {

    // PALABRA INGRESADA E IDOMA SELECCIONADA

    const wordInput = document.getElementById('word-input').value.trim().toLowerCase();
    const selectedLanguage = document.querySelector('input[name="language"]:checked').value;
    const responseArea = document.getElementById('response-area');

    // BUSCA EN QUE IDIOMA SE REQUIERE TRADUCCIR

    const searchLanguage = selectedLanguage === 'english' ? 'spanish' : 'english';
    const translationLanguage = selectedLanguage === 'english' ? 'english' : 'spanish';

    // BUSCA LA PALABRA EN EL DICCIONARIO

    const result = Object.values(dictionary.categories)
        .flat()
        .find(word => word[searchLanguage].toLowerCase() === wordInput);

    // MUESTRA LA RESPUESTA 

    if (result) {
        const translation = result[translationLanguage];
        responseArea.textContent = `${translation} (${result.example})`;
    } else {
        responseArea.textContent = 'Palabra no encontrada.';
    }
});

    // MUESTRA LA CATEGORIA SELECCIONADA

document.querySelectorAll('input[name="category"]').forEach(categoryRadio => {
    categoryRadio.addEventListener('change', () => {
        const selectedCategory = categoryRadio.value;
        const wordsArea = document.getElementById('words-area');
        wordsArea.innerHTML = ''; 

        //OBTIENE LAS PALABRAS SELECCIONADAS DE LA CATEGORIA

        dictionary.categories[selectedCategory].forEach(word => {
            const wordElement = document.createElement('span');
            wordElement.textContent = `${word.english} -> ${word.spanish}`;
            wordElement.style.marginRight = "10px"; // ESPACIO ENTRE LAS LINEAS
            wordsArea.appendChild(wordElement);
        });
    });
});

        //AÑADE UNA PALABRA NNUEVA EN EL DICCIONARIO

document.getElementById('new-word-form').addEventListener('submit', event => {
    event.preventDefault(); // NO DEJA QUE SE RECARGE LA PAGINA

    // OBTIEBE LOS VALORES DE LOS CAMPOS DEL FORMULARIO 

    const newWordEnglish = document.getElementById('new-word-english').value.trim();
    const newWordSpanish = document.getElementById('new-word-spanish').value.trim();
    const newWordExample = document.getElementById('new-word-example').value.trim();
    const category = document.getElementById('new-word-category').value;

    // ASEGURA QUE TODOS LOS CAMPOS ESTEN LLENOS

    if (!newWordEnglish || !newWordSpanish || !newWordExample) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // ID UNICO PARA CADA PALABRA
    
    const newId = dictionary.categories[category].length + 1;

    // CREA UN OBJETO PARA LA NUEVA PALABRA
    
    const newWord = {
        id: newId,
        english: newWordEnglish,
        spanish: newWordSpanish,
        example: newWordExample
    };

    // AÑADE UNA NUEVA PALABRA AL FORMULARIO
    
    dictionary.categories[category].push(newWord);

    // REFRESCA LA LISTA SI LA CATGORIA SELECCIONADA ES LA CORRECTA

    const wordsArea = document.getElementById('words-area');
    if (document.querySelector(`input[name="category"][value="${category}"]`).checked) {
        const wordElement = document.createElement('span');
        wordElement.textContent = `${newWord.english} -> ${newWord.spanish}`;
        wordElement.style.marginRight = "10px"; // ESPACIO ENTE PALABRAS
        wordsArea.appendChild(wordElement);
    }

    //LIMPIA LOS ESPACIOS DEL FORMULARIO
    
    document.getElementById('new-word-form').reset();
});
