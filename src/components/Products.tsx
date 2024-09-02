import { useState } from "react";
import useFetchProducts from "../hook/useFetchProducts";

//types
import { Product } from "../types/types";

// Icons
import { MdChevronLeft, MdChevronRight, MdAdd, MdRemove } from "react-icons/md";

// Styles
import "../styles/components/Products.sass";
import "../styles/components/popUp.sass";

const Products = () => {
  const { products, loading, error } = useFetchProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [value, setValue] = useState(0); 
  const itemsPerPage = 4;

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!Array.isArray(products)) {
    return <p>Os produtos não estão disponíveis no momento.</p>;
  }

  const prevProducts = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? products.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  const nextProducts = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= products.length - itemsPerPage ? 0 : prevIndex + itemsPerPage
    );
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  const handleIncrement = () => {
    setValue(value + 1); 
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1); 
    }
  };

  return (
    <div className="products-container">
      <div className="arrow">
        <div className="arrow-left" onClick={prevProducts}>
          <MdChevronLeft />
        </div>
        <div className="arrow-right" onClick={nextProducts}>
          <MdChevronRight />
        </div>
      </div>
      <div className="container">
        {products
          .slice(currentIndex, currentIndex + itemsPerPage)
          .map((product, index) => (
            <div
              className="product-item"
              key={index}
              onClick={() => handleProductClick(product)}
            >
              <img src={product.photo} alt={product.productName} />
              <h4>{product.productName}</h4>
              <p className="tachad">R$30,00</p>
              <p className="price">R${product.price},00</p>
              <p className="parcela">ou 2x de R$ 49,95 sem juros</p>
              <p className="frete">Frete grátis</p>
              <button>COMPRAR</button>
            </div>
          ))}
      </div>

      {isPopupOpen && selectedProduct && (
        <>
        <div className="overlay" onClick={closePopup}></div>
          <div className="bottom"></div>
          <div className="popup">
            <div className="popup-image">
              <img
                src={selectedProduct.photo}
                alt={selectedProduct.productName}
              />
            </div>
            <div className="popup-descrition">
              <div className="container-close">
                <button onClick={closePopup}>X</button>
              </div>
              <h2>{selectedProduct.productName}</h2>
              <p className="price">R${selectedProduct.price},00</p>
              <p className="description">{selectedProduct.descriptionShort}</p>
              <p className="details">Veja mais detalhes do produto &gt;</p>
              <form>
                <div className="number-input">
                  <button
                    type="button"
                    className="decrement"
                    onClick={handleDecrement}
                  >
                    <MdRemove />
                  </button>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                  />
                  <button
                    type="button"
                    className="increment"
                    onClick={handleIncrement}
                  >
                    <MdAdd />
                  </button>
                </div>
                <button type="submit">COMPRAR</button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
