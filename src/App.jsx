import './App.css';
import Basketlogo from '../assets/icons8-basket-48.png';
import { useState } from 'react';
import Basketalllogo from '../assets/icons8-bag-32.png';
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

function ShoppingCart({
  cart,
  setCart,
  price,
  setPrice,
  productList,
  adet,
  setAdet,
  setIsOpen,
}) {
  //Sepette ürün yoksa sepeti gösterme
  if (cart.length === 0) {
    return;
  }

  //Bütün sepeti sil
  function deleteCart() {
    setCart([]);
    setPrice(0);
    setAdet(0);
    StockRender();
  }

  function StockRender() {
    cart.forEach((element) => {
      const product = productList.find((x) => x.id == element.id);
      if (product) {
        product.stock += element.quantity;
      }
    });
  }

  //Sepet içinde adet arttırma
  function increase(productId) {
    const productAdd = productList.find((x) => x.id == productId);

    if (productAdd.stock > 0) {
      const alreadyhaveindex = cart.findIndex((x) => x.id === productId);
      if (alreadyhaveindex !== -1) {
        cart[alreadyhaveindex].quantity += 1;
        productAdd.stock -= 1;
        price += productAdd.price;
        setPrice(price);
        setAdet(adet + 1);
      }
      setCart([...cart]);
      // setProductList([...productList]);
    } else {
      alert('Bu üründen daha fazla yok');
    }
  }
  //Sepet içinde ürün arttırmak
  function decrease(productId) {
    const productAdd = productList.find((x) => x.id === productId);
    const alreadyhaveindex = cart.findIndex((x) => x.id === productId);

    if (alreadyhaveindex !== -1) {
      if (cart[alreadyhaveindex].quantity === 1) {
        productAdd.stock += 1;
        cart.splice(alreadyhaveindex, 1);
      } else {
        cart[alreadyhaveindex].quantity -= 1;
        productAdd.stock += 1;
      }
    }

    setCart([...cart]);
    price -= productAdd.price;
    setPrice(price);
    // setProductList([...productList]);
    setAdet(adet - 1);
  }

  return (
    <div className='basket-all' id='sepet'>
      <div className='basket-header'>
        <h2>Sepet</h2>
        <span className='close-basket' onClick={() => setIsOpen(false)}>
          x
        </span>
      </div>

      <ul className='basket-list'>
        {cart.map((product) => (
          <li className='basket-item' key={product.id}>
            <div className='basket-resim'>
              <img src={product.img} alt='' />
            </div>
            <div className='basket'>
              <span className='little-title'> {product.title}</span>

              <span className='little-price'>
                {product.price.toLocaleString('en')} ₺
              </span>
            </div>
            <div className='increase-decrease'>
              <span
                className='decrease'
                onClick={() => decrease(product.id)}
                data-decreaseid={product.id}
              >
                -
              </span>
              <span className='many'>{product.quantity}</span>
              <span
                className='increase'
                onClick={() => increase(product.id)}
                data-increaseid={product.id}
              >
                +
              </span>
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <div className='total-button'>
        <span className='total'>
          Toplam Fiyat:
          {price.toLocaleString('en')} ₺
        </span>
        <button className=' btn' onClick={deleteCart}>
          Sepeti Sil
        </button>
        <button className=' btn' onClick={deleteCart}>
          Sipariş Ver
        </button>
      </div>
    </div>
  );
}

function ShowList({
  cart,
  setCart,
  price,
  setPrice,
  productList,
  setProductList,
  isOpen,
  setIsOpen,
  adet,
  setAdet,
}) {
  let filteredProducts = [];

  //Kategoriye ayırma
  const [category, setCategory] = useState('Tümü');
  const [search, setSearch] = useState('');

  //Kategoriler
  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  if (category) {
    if (category == 'Tümü') {
      filteredProducts = productList;
    } else {
      filteredProducts = productList.filter(
        (product) => product.category === category
      );
    }
  } else {
    filteredProducts = productList;
  }
  if (search) {
    filteredProducts = productList.filter((product) =>
      product.title
        .toLocaleLowerCase('tr')
        .includes(search.toLocaleLowerCase('tr'))
    );
  }

  //Sepete ürün ekleme
  const addToCart = (productId) => {
    const productAdd = productList.find((x) => x.id == productId);
    // console.log(productAdd);
    if (productAdd.stock > 0) {
      const alreadyhaveindex = cart.findIndex((x) => x.id === productId);

      if (alreadyhaveindex !== -1) {
        cart[alreadyhaveindex].quantity += 1;
        productAdd.stock -= 1;
        price += productAdd.price;
        setPrice(price);
      } else {
        cart.push({ ...productAdd, quantity: 1 });
        productAdd.stock -= 1;
        price += productAdd.price;

        setPrice(price);
      }
      setCart([...cart]);
      setAdet(adet + 1);
    } else {
      alert('Bu üründen daha fazla yok');
      const updatedProductList = [...productList];
      const indexToRemove = updatedProductList.findIndex(
        (x) => x.id === productId
      );
      updatedProductList.splice(indexToRemove, 1);
      setProductList(updatedProductList);

      return;
    }
  };

  // function delProduct(productId) {
  //   setProductList(productList.filter((urun) => urun.id !== productId));
  // }

  return (
    <div>
      <div className='header'>
        <h1 className='title'>Products</h1>

        <div className='sepet-search-basket'>
          <div className='search-basket'>
            <input
              className='search-input'
              type='text'
              placeholder='Search'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <div className='img-position' onClick={() => setIsOpen(true)}>
              <a href='#'>
                <img
                  src={Basketalllogo}
                  className='all-logo'
                  alt='basket-logo2'
                />
              </a>
              <span className='basketItem'>{adet}</span>
            </div>
          </div>
        </div>
      </div>
      <div id='category-list'>
        {}
        <a
          href='#'
          onClick={() => handleCategoryClick('Tümü')}
          style={{ color: category === 'Tümü' ? '#1e1b4b' : '#a8a9a9' }}
        >
          Tümü
        </a>
        <a
          href='#'
          onClick={() => handleCategoryClick('Elektronik')}
          style={{ color: category === 'Elektronik' ? '#1e1b4b' : '#a8a9a9' }}
        >
          Elektronik
        </a>
        <a
          href='#'
          onClick={() => handleCategoryClick('Tekstil')}
          style={{ color: category === 'Tekstil' ? '#1e1b4b' : '#a8a9a9' }}
        >
          Tekstil
        </a>
        <a
          href='#'
          onClick={() => handleCategoryClick('Spor')}
          style={{ color: category === 'Spor' ? '#1e1b4b' : '#a8a9a9' }}
        >
          Spor
        </a>
      </div>

      <div className='product-list'>
        {filteredProducts.map((product) => (
          <div className='list-item' key={product.id}>
            <div className='resim'>
              <img src={product.img} alt='' />
            </div>
            <div className='info-btns'>
              <div className='product-info'>
                {/* <span>id: {product.id}</span> */}

                <span className='product-title'>
                  <strong>Product: </strong>
                  {product.title}
                </span>
                <span className='product-category'>
                  <strong>Category: </strong>
                  {product.category}
                </span>
                <span className='product-price'>
                  <strong>Price: </strong>
                  {product.price.toLocaleString('en')} ₺
                </span>
                <span className='product-stock'>
                  <strong>Stock: </strong>
                  {product.stock}
                </span>
              </div>
              <div className='basket-buton'>
                <button
                  type='button'
                  className='button'
                  onClick={() => setIsOpen(true)}
                >
                  <span className='button__text'>Sepete Ekle</span>
                  <span
                    className='button__icon'
                    onClick={() => addToCart(product.id)}
                  >
                    +
                  </span>
                </button>
                {/* <button
                  className='del-product'
                  onClick={() => delProduct(product.id)}
                >
                  Ürünü Sil
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Fixed({ productList, setProductList }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState('');
  const [stock, setStock] = useState('');
  const [img, setImg] = useState('');

  function addProduct() {
    const newProduct = {
      id: ProductId(),
      img: img,
      title: title,
      category: category,
      price: Number(cost),
      stock: stock,
    };

    const alreadyHave = productList.find((product) => product.title == title);
    console.log(alreadyHave);
    if (alreadyHave == undefined) {
      if (title !== '' && cost !== '' && category !== '') {
        setProductList([...productList, newProduct]);
        alert('Ürün başarıyla eklendi');
      } else {
        alert('Lütfen bilgileri doğru giriniz');
      }
    } else {
      alert('Bu ürün zaten mevcut!');
    }

    setTitle('');
    setCategory('');
    setCost('');
    setStock('');
    setImg('');
  }

  let lastProductId = 12;
  if (localStorage.lastProductId) {
    lastProductId = Number(localStorage.lastProductId);
  }

  function ProductId() {
    lastProductId++;
    localStorage.lastProductId = lastProductId;
    return lastProductId;
  }

  function handleChange(e) {
    setCategory(e.target.value);
  }

  console.log(category);
  return (
    <div>
      <h1 className='urunler-header'>Ürün Ekle</h1>
      <div className='inputs'>
        <input
          type='text'
          placeholder='Ürün adını girin'
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type='number'
          placeholder='Ürün fiyatını girin'
          required
          value={cost}
          onChange={(e) => {
            setCost(e.target.value);
          }}
        />
        <input
          type='number'
          placeholder='Stok girin'
          required
          value={stock}
          onChange={(e) => {
            setStock(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Resim adresi girin'
          required
          value={img}
          onChange={(e) => {
            setImg(e.target.value);
          }}
        />
        <div className='category-option'>
          <select
            className='category-kismi'
            value={category}
            onChange={handleChange}
          >
            <option value='Tümü'>Tümü</option>
            <option value='Elektrik'>Elektrik</option>
            <option value='Tekstil'>Tekstil</option>
            <option value='Spor'>Spor</option>
          </select>
        </div>
        <button className='btn' onClick={addProduct}>
          Ürün Ekleyin
        </button>
      </div>
    </div>
  );
}

export function App() {
  const [cart, setCart] = useStickyState([], 'cart');
  const [price, setPrice] = useStickyState(0, 'price');
  const [isEditModOn, setisEditmodOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [adet, setAdet] = useStickyState(0, 'adet');
  const [productList, setProductList] = useStickyState(
    [
      {
        id: 1,
        img: 'https://picsum.photos/200',
        title: 'Iphone 15',
        category: 'Elektronik',
        price: 100000,
        stock: 5,
      },
      {
        id: 2,
        img: 'https://picsum.photos/500',
        title: 'Pantolon',
        category: 'Tekstil',
        price: 500,
        stock: 100,
      },
      {
        id: 3,
        img: 'https://picsum.photos/400',
        title: 'T-shirt',
        category: 'Tekstil',
        price: 300,
        stock: 50,
      },
      {
        id: 4,
        img: 'https://picsum.photos/200',
        title: 'Gömlek',
        category: 'Tekstil',
        price: 2000,
        stock: 20,
      },
      {
        id: 5,
        img: 'https://picsum.photos/200',
        title: 'Monster',
        category: 'Elektronik',
        price: 20000,
        stock: 15,
      },
      {
        id: 6,
        img: 'https://picsum.photos/200',
        title: 'Kulaklık',
        category: 'Elektronik',
        price: 3500,
        stock: 2,
      },
      {
        id: 7,
        img: 'https://picsum.photos/200',
        title: 'Top',
        category: 'Spor',
        price: 50,
        stock: 150,
      },
      {
        id: 8,
        img: 'https://picsum.photos/200',
        title: 'Mouse',
        category: 'Elektronik',
        price: 500,
        stock: 10,
      },
      {
        id: 9,
        img: 'https://picsum.photos/200',
        title: 'Forma',
        category: 'Spor',
        price: 1000,
        stock: 35,
      },
      {
        id: 10,
        img: 'https://picsum.photos/200',
        title: 'Ayakkabı',
        category: 'Tekstil',
        price: 1000,
        stock: 10,
      },
      {
        id: 11,
        img: 'https://picsum.photos/200',
        title: 'HP',
        category: 'Elektronik',
        price: 50000,
        stock: 5,
      },
      {
        id: 12,
        img: 'https://picsum.photos/200',
        title: 'Çanta',
        category: 'Tekstil',
        price: 550,
        stock: 3,
      },
    ],
    'productList'
  );

  function editMod() {
    if (isEditModOn) {
      setisEditmodOn(false);
    } else {
      setisEditmodOn(true);
    }
  }
  return (
    <>
      {isOpen ? (
        <ShoppingCart
          cart={cart}
          setCart={setCart}
          price={price}
          setPrice={setPrice}
          productList={productList}
          setProductList={setProductList}
          setIsOpen={setIsOpen}
          setAdet={setAdet}
          adet={adet}
        />
      ) : (
        ''
      )}
      <div className='container'>
        <Switch onClick={editMod} className='ürünicin' />
        {/* <label className='ürünicin'><input type="checkbox" onClick={editMod} />Ürün Ekle</label> */}
        {isEditModOn ? (
          <Fixed productList={productList} setProductList={setProductList} />
        ) : (
          <>
            <ShowList
              cart={cart}
              setCart={setCart}
              price={price}
              setPrice={setPrice}
              productList={productList}
              setProductList={setProductList}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setAdet={setAdet}
              adet={adet}
            />
          </>
        )}
      </div>
    </>
  );
}
