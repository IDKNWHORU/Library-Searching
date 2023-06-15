import { useEffect, useState } from 'react'
import './App.css'
import { BookListPage } from './pages/BookList'
import { BookDetailInformationPage } from './pages/BookDetailInformation';

function App() {
  const [route, setRoute] = useState(location.pathname);

  useEffect(()=>{
    onpopstate = () => {
      setRoute(location.pathname);
    }
  });

  const navigateTo = (pathname: string) => {
    history.pushState({}, '', pathname);
    setRoute(pathname);
  }

  return (
    <>
      {route === '/' ? <BookListPage setRoute={navigateTo}/> : <BookDetailInformationPage id={route}/>}
    </>
  )
}

export default App
