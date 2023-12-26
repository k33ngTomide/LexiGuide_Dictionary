import logo from '../dictionary.png';

export function LoadingPage(){
  return (
    <div className='App-header'>
      <h1>LexiGuide</h1>
      <img src={logo} alt="Logo" className='App-logo'/>
      <div className="loader-line"></div>
    </div>
  )
}