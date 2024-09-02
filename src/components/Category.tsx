

const Category = () => {

    const cagories = [
        "CELULAR",
        "ACESSÓRIOS",
        "TABLETS",
        "NOTEBOOK",
        "TVS",
        "VER TODOS"        
    ]


  return (
    <nav>
        <ul>
           {cagories.map((itens, index) => (
             <li key={index}><button>{itens}</button></li>
           ))}
        </ul>
    </nav>
  )
}

export default Category