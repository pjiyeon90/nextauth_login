import { signIn } from 'next-auth/react'
import React from 'react'


const login = () => {
  async function handleSubmit(e){
    
    e.preventDefault(); 

    let id=e.target.id.value,
        password =e.target.pw.value;
        console.log(id, password);

    //signIn이 계속 새로고침을 함 -> redirect: false로 해야 새로고침 안됨
    let result = await signIn('credentials',{
                  redirect:false, id, password
                 }); 
      //console.log(result);
      if(result.ok){
        console.log("로그인 되었습니다.");
        //홈 화면으로 페이지 이동시
        //const router = useRouter()
        //router.push('/')홈으로 이동시

      }else{
        console.log("Error", result.error);
      }
   }

  return (
    <div>
       <h2>로그인</h2>
       <div>
          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='id' name="id"/> <br/>
            <input type='password' placeholder='pw' name='pw'/>
            <input type='submit' value='Sign In'/>
          </form>
       </div>
          <div>
              <button onClick={()=>signIn('github',{callbackUrl:'/'})}>Github</button>
              <button onClick={()=>signIn('google',{callbackUrl:'/'})}>Google</button>
              <button onClick={()=>signIn('naver',{callbackUrl:'/'})}>Naver</button>
          </div>
    </div>
  )
}

export default login