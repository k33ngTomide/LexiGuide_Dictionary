import searchLogo from '../icons8-search-64.png'
export function SearchPage(){

  function getMeaning(){
    
    let word = document.getElementsById('user-input').value;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    console.log(word);
    console.log(url);
  }

  return(
    <div className="search-bar">
      <input placeholder="Enter word ..." className="user-input" id="user-input"/>
      <button onClick={getMeaning}><img src={searchLogo} alt='search logo'/></button>
    </div>
  );
}

