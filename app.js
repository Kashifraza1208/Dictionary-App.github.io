let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');

searchBtn.addEventListener('click', function(e){
    e.preventDefault();

    // clear data 
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';

    // Get input data
    let word = input.value;
    // call API get data
    if (word === '') {
        alert('Word is required');
        return;
    }

    getData(word);
})


async function getData(word) {
    loading.style.display = 'block';
    // Ajax call 
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    // if empty result 
    loading.style.display = 'none';
    if (!data.length) {
        notFound.innerText = ' No result found';
        return;
    }

    // If result is suggetions
    if (typeof data[0] === 'string') {
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggetion = document.createElement('span');
            suggetion.classList.add('suggested');
            suggetion.innerText = element;
            notFound.appendChild(suggetion);
            
        })
        return;
    }

    // Result found 
    //loading.style.display = 'none';
     let defination = data[0].meanings[0].definitions[0].definition;
     defBox.innerText = defination;

    //Sound 
    const soundName = data[0].phonetics[0].audio;
        if(soundName) {
            renderSound(soundName);
        }

     console.log(data);
}

function renderSound(soundName) {
 
    console.log(soundName);
    let soundSrc = `http:${soundName}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);

}