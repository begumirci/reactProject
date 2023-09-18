import { useState } from 'react';
import './App.css';
import Basketlogo from './assets/icons8-basket-48.png';
import Basketalllogo from './assets/icons8-basket-64.png';
import useStickyState from '../src/helper';

const productList = [
    {
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
    }

  ]


let adet = 0;

function ShoppingCart({ cart, setCart, price, setPrice}){


  if(cart.length === 0 ){
    return;
  }

  function deleteCart(){
  setCart([]);
  setPrice(0);
}


  function increase(productId){
    const productAdd = productList.find(x => x.id == productId);
    const productIndex = productList.findIndex(x => x.id === productId);
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
        productList.splice(productIndex,1);
        alert('Bu üründen daha fazla yok');
        adet-=1;
      }
  }

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
            <span className='little-price'>Fiyat: {product.price}</span>
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
      <span className='total'>Toplam Fiyat:{price}</span>
      <button className='delete-btn' onClick={deleteCart} >Sepeti Sil</button>
      </div>
    </div>
  );
}

function ShowList({ cart, setCart, price, setPrice }){
  const [category, setCategory] = useState('');
  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const filteredProducts = category
    ? productList.filter((product) => product.category === category)
    : productList;

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
  return (
    <div>
      <div id="category-list">
        <a href='#' onClick={() => handleCategoryClick('Elektronik')}>Elektronik</a>
        <a href='#' onClick={() => handleCategoryClick('Tekstil')}>Tekstil</a>
        <a href='#' onClick={() => handleCategoryClick('Spor')}>Spor</a>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className='list-item' key={product.id}>
            <div className='product-info'>
              <span className='product-title'><strong>Product: </strong>{product.title}</span>
              <span className='product-title'><strong>Category: </strong>{product.category}</span>
              <span className='product-title'><strong>Price: </strong>{product.price} ₺</span>
              <span className='product-title'><strong>Stock: </strong>{product.stock}</span>
            </div>
            <img src={Basketlogo} className="logo" onClick={() => addToCart(product.id)} alt="basket-logo" />
          </div>
        ))}
      </div>
    </div>
  );
}  



export function App(){
const [cart, setCart] = useStickyState([],'cart');
const [price,setPrice] = useStickyState(0,'price');
  return (
    <>
    <div className='container'>
    <div className='header'>
    <h1 className='title'>Products</h1>
    <div className='img-position'>
      <a href="#sepet">
    <img src={Basketalllogo} className="all-logo" alt="basket-logo2" />
    </a>
    <span className='basketItem'>{adet}</span>
    </div>
    </div>
    <ShowList cart={cart} setCart={setCart} price={price} setPrice={setPrice}/>
    <ShoppingCart cart={cart} setCart={setCart} price={price} setPrice={setPrice}/>
    </div>
    </>
  )
  
}




