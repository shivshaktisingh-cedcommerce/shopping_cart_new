import React from 'react'
import "./Component1.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Badge from '@mui/material/Badge';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {data} from "./Data.js";
import {useState ,useEffect} from 'react'
import { Button, Drawer } from '@mui/material'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export default function Component1(props) {
     //selected items are in cart arrray
     const [cart,setCart]=useState([])

     const[flag1,setFlag1]=useState(false)

        //searchname contains the text typed in searchbox
   const[searchname, setSearchname]=useState([])

   //searchinput contains list of all mathched search items
   const[searchinput, setSearchinput]=useState()

    

     //total amount is totalbill
     const[totalamount,setTotalamount]=useState(0)

     //cartis contains id of selected item
     const [cartid,setCartid]=useState([])
    const[currentdisplayproducts,setCurrentdisplayproducts] = useState([...data.tshirt])

    const carousel_fun=(d)=>{
        setCurrentdisplayproducts([])
        if(d===1){
           setCurrentdisplayproducts([...data.tshirt])
        }
        if(d===2){
            console.log(data.trouser)
            setCurrentdisplayproducts([...data.trouser])
        }
        if(d===3){
            console.log(data.shirt)
            setCurrentdisplayproducts([...data.shirt])
        }
    }
    
    useEffect(()=>{
        var z = 0;
         cart.map((d)=>{
             z = z + d.quantity * d.selling;
  
         })
         setTotalamount(z)
  
      },[cart])
  
    const addtocartfun=(d , i)=>{
        if(cartid.indexOf(i)===-1){
            setCartid([...cartid,i])
            setCart([...cart,d])
        }
    
    }

    const decreasequantfun =(d)=>{
        cart.map((x)=>{
            if(x.clotheid==d.clotheid){
                if(x.quantity>1){
                x.quantity = x.quantity - 1;
               
                }}
                x.total = parseInt(x.selling) * parseInt(x.quantity);
                setCart([...cart])
              
        })
    }

    const increasequantfun=(d)=>{ 
        cart.map((x)=>{
            if(x.clotheid==d.clotheid){
                x.quantity = x.quantity +1;
                x.total = parseInt(x.selling) * parseInt(x.quantity);
                }
            setCart([...cart])
        })
    }


    const searchfun=(event)=>{
        setCurrentdisplayproducts([])
        var query = event.target.value
        setSearchinput(query)
        var temp=[]
        if (query.length > 0) {           
         data.clothes.map((i)=>{
             if(i.title.includes(query)){
                 temp.push(i)
             }
           
         })
        }
        setCurrentdisplayproducts([...temp])
         console.log(cart)
    }
    
    //will execute on click of search icon
    
    const searchiconclick=()=>{
    
     
       
    }
    
  
  return (
    <div id="component1">
        <div id="navbar1">Free shipping over Rs. 1000 shopping.</div>
        <div id="navbar2">
            <div id="searchbox_div_id"><input type="text" id="input_search_id" autoFocus  onChange={searchfun}/><SearchOutlinedIcon id="search_icon_id" onClick={searchiconclick}/></div>
            <div id="logo_id"><span id="logo_span_id">SHOPCLUES</span></div>
            <div id="cart_div_id"><Badge badgeContent={cartid.length} color="primary" id="badge_id" onClick={()=>setFlag1(true)}>
               <ShoppingBagOutlinedIcon color="action" id="cart_id"/>
               </Badge></div>
        </div>
        <div id="carousel_div_id">
        <Carousel>
                <div className="carousel_position">
                    <img src="121.jpg" alt=""/>
                    <p className="legend1">Buy trendy Men's T-shirt with exciting offers</p>
                    <a href='#categories_div_id' className="shop_now_btn" onClick={()=>carousel_fun(1)}>SHOP NOW</a>
                </div>
                <div className="carousel_position">
                    <img src="122.jpg" alt=""/>
                    <p className="legend1">Buy trendy Men's trouser with exciting offers</p>
                    <a href='#categories_div_id' className="shop_now_btn" onClick={()=>carousel_fun(2)}>SHOP NOW</a>                  
                </div>
                <div className="carousel_position">
                    <img src="123.jpg" alt=""/>
                    <p className="legend1">Buy trendy Men's shirt with exciting offers</p>
                    <a href='#categories_div_id' className="shop_now_btn" onClick={()=>carousel_fun(3)}>SHOP NOW</a>              
                </div>
            </Carousel>
        </div>
        <div id="categories_div_id">
            <div className="category"><button className="category_btn" onClick={()=>carousel_fun(1)}>T-shirt</button></div>
            <div className="category"><button className="category_btn" onClick={()=>carousel_fun(3)}>Shirt</button></div>
            <div className="category"><button className="category_btn" onClick={()=>carousel_fun(2)}>Trouser</button></div>
        </div>

        <div id="display_products_div_id">
            {currentdisplayproducts===[]?"":currentdisplayproducts.map((item)=>{
                console.log(currentdisplayproducts)
                return <div id="main_product_repetitive">
                <div id="product_image_div_id">
                    <img src={item.image} alt="" id="product_image_id"/>
                </div>
                 <h3 id="title_h3">{item.title}</h3>
                 <p id="price_p"><button id="price_btn1"><CurrencyRupeeIcon/><del>{item.Listprice}</del></button>
                 <button id="price_btn2"><CurrencyRupeeIcon/>{item.selling}</button></p>
                 
                 <p id="size_p">{"Size: " +item.size}</p>
                 <button className="btn" id={item.type} onClick={()=>addtocartfun(item , item.clotheid)}>Add to Cart</button>
                </div>
                })}
        </div>
        <Drawer
         open={flag1}
         anchor='right'
         onClose = {()=>setFlag1(false)}
        >
            <Button variant='contained' onClick={()=>setFlag1(false)}>Close</Button>
           <div id="cart_products">   
          {cart.map((e)=>{
              return <div id="repetitive_cart_div">
                  <div id="cart_image_div"><img src={e.image} alt="" id="cart_image_id"/><br/>{e.title}</div>
                  <div id="button_div_id"><button onClick={()=>increasequantfun(e)} className="increment_btn_id_add">+</button><button className="increment_btn_id_quant">{e.quantity}</button><button onClick={()=>decreasequantfun(e)} className="increment_btn_id_decrease">-</button>
                  <p id="amt_p">{"Rs. " +e.total}</p>
                  </div>
                  </div> 
          })}

          {cart.length>0?<p id="total_amount">{"Total Amount : " +totalamount}</p>:""}
          {cart.length>0?  <button id="checkout" >Checkout</button>:""}
      
          </div>
        
       
        </Drawer >
      

    </div>
  )
}
