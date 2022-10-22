import './question.css'
import { Badge,Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios';

export const Question=()=>{
    const [score,setScore]=useState(0);
    const [data,setData]=useState([]);
    const [ind,setind]=useState(0);
    const [loader,setLoader]=useState(false);
    useEffect(()=>{
        axios.get('http://localhost:8080/posts').then((res)=>{
            setData(res.data);
        })
        const datais=fetch('http://localhost:8080/posts');
        console.log('data is',datais)
    },[])
    console.log(data);
    //function to check the correctness!!
    const handleCheck=(ans)=>{
       if(ans==data[ind].answer){
          setTimeout(()=>{
            setind((ind)=>ind+1);
          },1000)
       }
       else{
         alert('wrong answer ')
       }
    }
   
    return <>   <div>
        <div className="header-q">      
        </div>
        <div className="q-main">
         <div className="q-plate">{data[ind]?.question}</div>
         <div className="a-plate">
            <div className="first">
                <div className="q-1" onClick={(()=>{
                    handleCheck(data[ind]?.option1)
                })} >{data[ind]?.option1}</div>
                <div className="q-1"onClick={(()=>{
                    handleCheck(data[ind]?.option2)
                })}>{data[ind]?.option2}</div>
            </div>
            <div className="second">
                <div className="q-1"onClick={(()=>{
                    handleCheck(data[ind]?.option3)
                })}>{data[ind]?.option3}</div>
                <div className="q-1"onClick={(()=>{
                    handleCheck(data[ind]?.option4)
                })}>{data[ind]?.option4}</div>
            </div>
         </div>
        </div>
    </div>
    </> 
}