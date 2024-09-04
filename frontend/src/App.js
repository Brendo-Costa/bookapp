import {useEffect, useState} from "react";

function App() {

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [release_year, setReleaseYear] = useState(0);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try{
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
      console.log(data, "data aqui");
    } catch (error) {
      console.log(error);
    }
  };

  //Cria um livro no sistema.
  //1 - Prepara os dados do livro. 2 - Prepara a requisição para o servidor criar o livro novo. 
  const createBook = async () => {
    
    const bookData = {
      title: title, 
      release_year: release_year,
    };
    
    try{
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData)
      });

      const data = await response.json();
      setBooks((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  }


  //Deleta um livro no sistema.
  const deleteBook = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/delete/${id}`, {
        method: "DELETE",
      });
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  
  return (

    <>
      <h1>Book Website</h1>

      <div>
        
        <input 
          type="text"  
          placeholder="Book Title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          type="numb" 
          placeholder="Release Date..."
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <button onClick={createBook}>Add Book</button>
      
      </div>

      {books.map((book) => (
        <div key={book.id}>
          <p>Title: {book.title}</p>
          <p>Release Year: {book.release_year}</p>
          <br />
        </div>
      ))}
    </>
    
  );
}

export default App;
