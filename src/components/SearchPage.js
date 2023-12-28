import searchLogo from '../icons8-search-64.png';
import LoadingRing from '../components/LoadingRing';


export function SearchPage(){

  function getMeaning(){
    
    let word = document.getElementById('user-input').value.trim();
    if(!word){
      document.getElementById('error-display').innerHTML = "Word cannot be empty";
      return
    }
    
    showRing();
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'ContentType': 'application/json'
      }
    }).then(response => response.json())
      .then(response => {
        document.getElementById('result').replaceChildren();
        hideRing();
        backToDefault();
        workOnResult(response);

      }).catch((error) => {
        hideRing();
        document.getElementById('error-display').innerHTML = "An Error Occured / Word not found";
        console.log(error);
      })
    
  }

  function workOnResult(response){
    const [{ meanings, phonetic, phonetics}] = response;
    const [{definitions, synonyms}] = meanings;


    // console.log(phonetic);
    console.log(phonetics);
    
    let result = document.getElementById('result');

    if(phonetics[0].audio){
      let audioTag = createAudio(phonetics[0].audio);
      result.appendChild(audioTag);
    }

    if (synonyms) getSynonyms(synonyms, result);
    getDefinitions(definitions, result);

  }

  function createAudio(audioMedia){
    let audioTag = document.createElement('audio');
    let sourceTag = document.createElement("source");
    sourceTag.setAttribute('src', audioMedia);
    sourceTag.setAttribute('type', 'audio/mpeg')
    audioTag.controls = true;
    audioTag.appendChild(sourceTag);
    return audioTag;
  }

  function getSynonyms(synonyms, result){

    let divTag = createDivElement();

    let allSynonyms = "Synonyms: " + synonyms.join(", ");
    let allSynonymsTag = createPElement();
    allSynonymsTag.innerHTML = allSynonyms;

    divTag.appendChild(allSynonymsTag);
    result.appendChild(divTag);

  }

  function getDefinitions(definitions, result){
    let counter = 1;

    for(let word of definitions){

      let definitionElement= createPElement();
      let exampleElement = createHElement();

      
      definitionElement.innerHTML = `Definition ${counter}: ${word.definition}`;
      if(word.example){
        exampleElement.innerHTML = `Example: ${word.example}`;
      }

      let resultDiv = addAllTags(definitionElement, exampleElement);
      result.appendChild(resultDiv);

      counter++;
    }
  }

  function addAllTags(definitionElement, exampleElement){
    let divTag = createDivElement();
    divTag.appendChild(definitionElement);
    divTag.appendChild(exampleElement);

    return divTag;
  }

  function createPElement(){
    let pTag = document.createElement('p');
    return pTag;
  }

  function createHElement(){
    let hTag = document.createElement('h5');
    return hTag;
  }

  function createDivElement(){
    let divTag = document.createElement('div');
    return divTag;
  }

  
  function backToDefault(){
    document.getElementById('error-display').innerHTML = ""; 
    // document.getElementById('user-input').value = "";
  }

  function showRing(){
    document.getElementById('ring').style.display = 'flex';
  }

  function hideRing(){
    document.getElementById('ring').style.display = 'none';
  }

  return(
    <div className='search-area'>
      <p className='app-name'>LexiGuide Dictionary</p>
      
      <div className="search-area">
        <p id='error-display'></p>
        <div className='search-line'>
          <input placeholder="Enter word..." className="user-input" id="user-input"/>
          <button onClick={getMeaning}><img src={searchLogo} alt='search logo'/></button>
        </div>
          <LoadingRing/>

        <div className='result' id='result'>

        </div>
      </div>
    </div>
    
  );
}

