import './user.css';
import supabase from './supabase';
import { useState } from 'react';


function User({user, setUser}) {
   

    async function RegisterUser(e){
      e.preventDefault();
      const form = new FormData(e.target);
      const formData = Object.fromEntries(form);

      const { data } = await supabase.auth.signUp({
         username: formData.username,
         email: formData.email,
         password: formData.password,
       });
       

      const { error } = await supabase
         .from('users')
         .insert(formData)

       if(error){
         console.log(error);
       }
       alert('Başarıyla Kayıt Oldunuz ' + formData.username );
    }

    async function SignUpUser(e){
      e.preventDefault();

      const form = new FormData(e.target);
      const formData = Object.fromEntries(form);

      const { error } = await supabase.auth.signInWithPassword({
         email: formData.email,
         password: formData.password,
        })

        if(!error){
         alert('Hoşgeldin, '+ formData.email);
         setUser(formData.email);
         
        }else{
         console.log(error);
         console.log('Olmadı');
        }

      
        
    }

   

  return(

    <div className="wrapper">
        <div className="card-switch" >
            <label className="switch">
               <input type="checkbox" className="toggle" />
               <span className="slider"></span>
               <span className="card-side"></span>
               
               <div className="flip-card__inner">
                  <div className="flip-card__front">
                     <div className="title">Giriş Yap</div>
                     <form className="flip-card__form" onSubmit={SignUpUser}>
                        <input className="flip-card__input" name='email'  placeholder="Email" type="email"  />
                        <input className="flip-card__input" name='password'  placeholder="Password" type="password"  />
                        <button className="flip-card__btn">Giriş Yap</button>
                     </form>
                  </div>
                  <div className="flip-card__back">
                     <div className="title">Kayıt Ol</div>
                     <form className="flip-card__form" onSubmit={RegisterUser}>
                        <input className="flip-card__input" name='username' placeholder="Username" type="name"  />
                        <input className="flip-card__input" name="email" placeholder="Email" type="email"   />
                        <input className="flip-card__input" name="password" placeholder="Password" type="password"  />
                        <button className="flip-card__btn">Kaydol</button>
                     </form>
                  </div>
               </div>
            </label>
        </div>   
   </div>

  )
}

export default User