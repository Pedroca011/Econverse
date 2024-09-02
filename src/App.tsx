//componets
import Category from "./components/Category";
import Products from "./components/Products";
//styles
import './styles/layout/header.sass'

function App() {
  return (
    <>
      <header>
        <hr />
        <h1>Produtos relacionados</h1>
        <hr />
      </header>
      <div>
        <Category />
          <Products />
      </div>
    </>
  );
}

export default App;
