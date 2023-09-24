import { useEffect, useState } from 'react';
import './App.css';
import Basketlogo from './assets/icons8-basket-48.png';
import Basketalllogo from './assets/icons8-basket-64.png';
import useStickyState from '../src/helper';
import { Switch } from 'antd';

// const productList = [
//     {
//       id:1,
//       title:'Iphone 15',
//       category:'Elektronik',
//       price:100000,
//       stock:5
//       },
//     {
//       id:2,
//       title:'Pantolon',
//       category:'Tekstil',
//       price:500,
//       stock:100
//     },
//     {
//       id:3,
//       title:'T-shirt',
//       category:'Tekstil',
//       price:300,
//       stock:50
//     },
//     {
//       id:4,
//       title:'Gömlek',
//       category:'Tekstil',
//       price:2000,
//       stock:20
//     },
//     {
//       id:5,
//       title:'Monster',
//       category:'Elektronik',
//       price:20000,
//       stock:15
//     },
//     {
//       id:6,
//       title:'Kulaklık',
//       category:'Elektronik',
//       price:3500,
//       stock:2
//     },
//     {
//       id:7,
//       title:'Top',
//       category:'Spor',
//       price:50,
//       stock:150
//     },
//     {
//       id:8,
//       title:'Mouse',
//       category:'Elektronik',
//       price:500,
//       stock:10
//     },
//     {
//       id:9,
//       title:'Forma',
//       category:'Spor',
//       price:1000,
//       stock:35
//     },
//     {
//       id:10,
//       title:'Ayakkabı',
//       category:'Tekstil',
//       price:1000,
//       stock:10
//     },
//     {
//       id:11,
//       title:'HP',
//       category:'Elektronik',
//       price:50000,
//       stock:5
//     },
//     {
//       id:12,
//       title:'Çanta',
//       category:'Tekstil',
//       price:550,
//       stock:3
//     }

//   ]


let adet = 0;

function ShoppingCart({ cart, setCart, price, setPrice, productList}){

  //Sepette ürün yoksa sepeti gösterme
  if(cart.length === 0 ){
    return;
  }



  //Bütün sepeti sil
  function deleteCart(){
  setCart([]);
  setPrice(0);
  adet = 0;
}

  //Sepet içinde adet arttırma
  function increase(productId){
    const productAdd = productList.find(x => x.id == productId);
    
    if(productAdd.stock > 0){
            const updateCart = [...cart];
            const alreadyhaveindex = updateCart.findIndex(x => x.id === productId);
            let newPrice = price;

            if(alreadyhaveindex !== -1){
              updateCart[alreadyhaveindex].quantity += 1;
              productAdd.stock -=1;
              newPrice += productAdd.price;
              setPrice(newPrice);
              adet+=1;
            }
            setCart(updateCart);
          
      }else{
        alert('Bu üründen daha fazla yok');
      }
  }
//Sepet içinde ürün arttırmak
  function decrease(productId){

    const productAdd = productList.find(x => x.id === productId);
    const updateCart = [...cart];

    const alreadyhaveindex = updateCart.findIndex(x => x.id === productId);
    let newPrice = price;

    if(alreadyhaveindex !== -1){
      if(updateCart[alreadyhaveindex].quantity === 1){
        productAdd.stock +=1;
        updateCart.splice(alreadyhaveindex,1);
        adet -=1;
        
      }else{
        updateCart[alreadyhaveindex].quantity -=1;
        productAdd.stock +=1;
        adet -=1;
      }
    }
    
    setCart(updateCart);
    newPrice -= productAdd.price; 
    setPrice(newPrice);
  }

  return (
    <div className='basket-all' id='sepet'>
      <h2>Sepet</h2>
      <ul className='basket-list'>
        {cart.map((product) => (
          <li className='basket-item' key={product.id}>
            <div className='basket'>
            <span className='little-title'>Ürün Adı: {product.title}</span>
            <span className='little-category'>Kategori: {product.category}</span>
            <span className='little-price'>Fiyat: {product.price} ₺</span>
            </div>
            <div className='increase-decrease'>
            <span className='decrease' onClick={() => decrease(product.id)} data-decreaseid={product.id}>-</span>
            <span className='many'>{product.quantity}</span>
            <span className='increase' onClick={() => increase(product.id)} data-increaseid={product.id}>+</span>
            </div>
          </li>
        ))}
      </ul>
      <hr/>
      <div className='total-button'>
      <span className='total'>Toplam Fiyat: {price} ₺</span>
      <button className='delete-btn' onClick={deleteCart} >Sepeti Sil</button>
      </div>
    </div>
  );
}

function ShowList({ cart, setCart, price, setPrice, productList, setProductList, isOpen, setIsOpen }){

  let filteredProducts = [];
  
  //Kategoriye ayırma
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  
  
  function ShowBasket(){
    if(isOpen == false){
      setIsOpen(true)
    }else{
      setIsOpen(false)
    }
  }
  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };
  if(category){
      if(category == 'Tümü'){
          filteredProducts = productList;
      }else{
          filteredProducts = productList.filter((product) => product.category === category);
      }
  }else{
      filteredProducts = productList;
  }
  if(search){
      filteredProducts = productList.filter(product => product.title.toLocaleLowerCase('tr').includes(search.toLocaleLowerCase('tr')));
  }  

  
  
    //Sepete ürün ekleme
    const addToCart = (productId) => {

      const productAdd = productList.find(x => x.id == productId);
      //const productIndex = productList.findIndex(x => x.id === productId);

          if(productAdd.stock > 0){
            const updateCart = [...cart];
            const alreadyhaveindex = updateCart.findIndex(x => x.id === productId);
            let newPrice =  price;
            
            if(alreadyhaveindex !== -1){
              updateCart[alreadyhaveindex].quantity += 1;
              productAdd.stock -=1;
              newPrice+= productAdd.price;
              setPrice(newPrice);
              adet+=1;

            }else {
              updateCart.push({...productAdd, quantity:1})
              productAdd.stock -=1;
              newPrice+= productAdd.price;
              setPrice(newPrice);
              adet+=1;
              
            }
             setCart(updateCart);
          }else {
            alert('Bu üründen daha fazla yok');
            return;
           
          }
        }

        function delProduct(productId){
           setProductList(productList.filter((urun) => urun.id !== productId));
        }

  return (
    <div>
      <div className='header'>
        <h1 className='title'>Products</h1>
        <div className='sepet-search-basket'>
            <div className='search-basket'>
              <input className='search-input' type="text" placeholder='Search' value={search} onChange={(e) => {setSearch(e.target.value)}} /> 
              <div className='img-position'>
                  <a href="#" onClick={ShowBasket} ><img src={Basketalllogo} className="all-logo" alt="basket-logo2" /></a>
                  <span className='basketItem'>{adet}</span> 
              </div>
            </div>
            <div className='sepet'>
              {isOpen ? (<ShoppingCart cart={cart} setCart={setCart} price={price} setPrice={setPrice} productList={productList} setProductList={setProductList} isOpen={isOpen} setIsOpen={setIsOpen}/>) : ''}
            </div>
        </div>
      </div>
      
      <div id="category-list">
        <a href='#' onClick={() => handleCategoryClick('Tümü')}>Tümü</a>
        <a href='#' onClick={() => handleCategoryClick('Elektronik')}>Elektronik</a>
        <a href='#' onClick={() => handleCategoryClick('Tekstil')}>Tekstil</a>
        <a href='#' onClick={() => handleCategoryClick('Spor')}>Spor</a>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className='list-item' key={product.id}>
            <div className='product-info'>
              <span>id: {product.id}</span>
              <span className='product-title'><strong>Product: </strong>{product.title}</span>
              <span className='product-category'><strong>Category: </strong>{product.category}</span>
              <span className='product-price'><strong>Price: </strong>{product.price} ₺</span>
              <span className='product-stock'><strong>Stock: </strong>{product.stock}</span>
            </div>
            <div className='basket-buton'>
            <a href="#sepet" onClick={ShowBasket}><img src={Basketlogo} className="logo" onClick={() => addToCart(product.id)} alt="basket-logo" /></a>
            <button className='del-product' onClick={() => delProduct(product.id)}>Ürünü Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}  

function Fixed({productList, setProductList}){
const [title, setTitle] = useState('');
const [category,setCategory] = useState('');
const [cost,setCost] =useState('');
const [stock,setStock] =useState('');

function addProduct(){

  const newProduct = {
    id: ProductId(),
    title: title,
    category: category,
    price: Number(cost),
    stock :stock
  };
  
  const alreadyHave = productList.find(product => product.title == title);
  console.log(alreadyHave);
  if(alreadyHave == undefined){
     setProductList([...productList,newProduct]);
     alert('Ürün başarıyla eklendi')
  }else{
    alert('Bu ürün zaten mevcut!');
  }
  
  

  setTitle('');
  setCategory('');
  setCost('');
  setStock('');
  
  
}

let lastProductId = 11;
if(localStorage.lastProductId){
  lastProductId = Number(localStorage.lastProductId);
}

function ProductId(){
  lastProductId ++;
  localStorage.lastProductId = lastProductId;
  return lastProductId;
}

 function handleChange(e){
     setCategory(e.target.value)
 }
 
console.log(category);
  return (
   <div>
    <h1 className='urunler-header'>Ürün Ekle</h1>
    <div className='inputs'>
      <input type="text"
             placeholder='Ürün adını girin'
             required
             value = {title}
             onChange={(e) => {setTitle(e.target.value)}} 
      />
      <input type="number"
             placeholder='Ürün fiyatını girin'
             required
             value = {cost}
             onChange={(e) => {setCost(e.target.value)}}
       />
       <input type="number"
              placeholder='Stok girin'
              required
              value= {stock}
              onChange={(e) => {setStock(e.target.value)}} 
       />
       <div className='category-option'>
        <select className='category-kismi'  value={category} onChange={handleChange}>
          <option value="Tümü">Tümü</option>
          <option value="Elektrik">Elektrik</option>
          <option value="Tekstil">Tekstil</option>
          <option value="Spor">Spor</option>
        </select>
       </div>
       <button className='ürün-ekle' onClick={addProduct}>Ürün Ekleyin</button>
    </div>
   </div> 
  )

}

export function App(){
const [cart, setCart] = useStickyState([],'cart');
const [price,setPrice] = useStickyState(0,'price');
const [isEditModOn,setisEditmodOn] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [productList, setProductList] = useStickyState([{
      id:1,
      title:'Iphone 15',
      category:'Elektronik',
      price:100000,
      stock:5
      },
    {
      id:2,
      title:'Pantolon',
      category:'Tekstil',
      price:500,
      stock:100
    },
    {
      id:3,
      title:'T-shirt',
      category:'Tekstil',
      price:300,
      stock:50
    },
    {
      id:4,
      title:'Gömlek',
      category:'Tekstil',
      price:2000,
      stock:20
    },
    {
      id:5,
      title:'Monster',
      category:'Elektronik',
      price:20000,
      stock:15
    },
    {
      id:6,
      title:'Kulaklık',
      category:'Elektronik',
      price:3500,
      stock:2
    },
    {
      id:7,
      title:'Top',
      category:'Spor',
      price:50,
      stock:150
    },
    {
      id:8,
      title:'Mouse',
      category:'Elektronik',
      price:500,
      stock:10
    },
    {
      id:9,
      title:'Forma',
      category:'Spor',
      price:1000,
      stock:35
    },
    {
      id:10,
      title:'Ayakkabı',
      category:'Tekstil',
      price:1000,
      stock:10
    },
    {
      id:11,
      title:'HP',
      category:'Elektronik',
      price:50000,
      stock:5
    },
    {
      id:12,
      title:'Çanta',
      category:'Tekstil',
      price:550,
      stock:3
    }],'productList')

function editMod(){
  
  if(isEditModOn){
    setisEditmodOn(false);
  }else{
    setisEditmodOn(true);
  }
}



  return (
  <>
    <div className='container'>
      <Switch onClick={editMod} className='ürünicin' />
    {/* <label className='ürünicin'><input type="checkbox" onClick={editMod} />Ürün Ekle</label> */}
    {isEditModOn ? (<Fixed  productList={productList} setProductList={setProductList}/>) : (<><ShowList cart={cart} setCart={setCart} price={price} setPrice={setPrice} productList={productList} setProductList={setProductList} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>) 
     }
    </div>
  </>
  )
  
}




