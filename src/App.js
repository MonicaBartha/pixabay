import React, {useState, useEffect} from 'react';
import Form from './components/Form';
import ImageList from './components/ImageList';

function App() {

const [ search, setSearch ] = useState('');
const [ images, setImages ] = useState([]);
const [ page, setPage ] = useState(1);
const [ allPages, setAllPages ] = useState(1);

useEffect( () => {
  
  const callAPI = async () => {
    // if search bar is empty, nothing executes
    if( search === '' ) return;

    const imagesOnPage = 30;
    const key = '5337015-0b98e1f6ae2da0a0ccad2d2da';
    const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesOnPage}&page=${page}`;

    const responseAPI = await fetch(url);
    const resultAPI = await responseAPI.json();
    setImages(resultAPI.hits);
    
    // calculate the total of result pages of images
    const calcPages = Math.ceil(resultAPI.totalHits / imagesOnPage);
    setAllPages(calcPages);

    // go up on page when the next button is pushed
    const startPageFromUp = document.querySelector('.jumbotron');
    startPageFromUp.scrollIntoView({ behaviour: 'smooth' })
  }
  callAPI();

}, [search, page])

// go to previous page
const previousPage = () => {
  const newPage = page - 1; 
  // avoid negative values  
  if(newPage === 0 ) return;

  setPage(newPage);
}

// go to next page
const nextPage = () => {
  const newPage = page + 1; 
  // stop when arrive to last page
  if(newPage > allPages ) return;
  setPage(newPage);
}

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Search Image</p>  
        <Form
          setSearch={setSearch}
        />
      </div>   

      <div className="row justify-content-center">
        <ImageList
          images={images}
        />  
        { (page === 1) ? null : (
          <button type="button" className="btn btn-info mr-1"
          onClick={previousPage} >
          &laquo; Previous 
          </button>
        )}
        
        { (page === allPages) ? null : (
          <button type="button" className="btn btn-info"
          onClick={nextPage}>
            Next &raquo;
          </button>
        )}
        
      </div> 
    </div>
  );
}

export default App;
