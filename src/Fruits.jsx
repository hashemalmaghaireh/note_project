import React from 'react'

const Fruits = (props) => {
   props.f.sort((a,b)=>a.calories - (b.calories))
// const listF=fruits.filter((x)=> x.calories>50)
// const listF=fruits.filter((x)=>x.name.startsWith('a'))
const listF=props.f.filter((x)=>x.name.includes('a'))

 const newList=listF.map((f)=>
    
    
    <div className="card">
        <p>{f.name}</p>
        <p>{f.calories}</p>
    </div>
    
)
 
  return (
    <div className="cards">
        {newList}
   </div>
  )
}

export default Fruits
