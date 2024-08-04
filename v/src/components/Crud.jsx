import React, { useEffect, useReducer, useRef, useState } from 'react';
import axios from 'axios';

const Crud = () => {
  const [state, setState] = useState([]);
  const [pages, setPage] = useState(1);
//  const[totalpages,setTotalpages]=useState(1)
 const[filer,setfilter]=useState("")
 const[sort,setsort]=useState("")
  
// const paginationData=()=>{
//     axios.get(('https://fakestoreapi.com/Products')).then((res)=>{
//         const totalCount=res.data.length;
//         console.log(totalCount)
//         setTotalpages(Math.ceil(totalCount/5))
//     })
// }
// const sorfiler=useRef(null)
// const filterref=useRef(null)
  const getData = () => {
    const category = filer ? `/category/${filer}` : "";
    const sortny = sort ? `&sort=${sort}` : "";

    axios
    .get(`https://fakestoreapi.com/products${category}?limit=5&page=${pages}${sortny}`)

      .then((res) => {
        console.log(res.data);
        

        setState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    // paginationData()
  }, [pages,sort,filer]);

  const handleClick = (pageNum) => {
    setPage(pageNum);
  };

const handleChange=(e)=>{
const value=e.target.value;
console.log(value)
setfilter(value)
setPage(1)

// getData(`https://fakestoreapi.com/Products/category/${value}`)
}

const handleSortChange=(e)=>{
    const value2=e.target.value
    setsort(value2)
// const sortedData = [...state].sort((a, b) => {
//     if (value === 'asc') {
//       return a.price - b.price;
//     } else if (value === 'desc') {
//       return b.price - a.price;
//     } else {
//       return 0;
//     }
//   });
//   getData(`https://fakestoreapi.com/Products?sort=${value2}`)
}
  return (
    <>
    <select onChange={handleChange} >
    <option >category</option>
        <option value='jewelery'>jewelery</option>
       
    </select>
    <select onChange={handleSortChange}>
        <option value=''>Sort by price</option>
        <option value='asc'>Price: Low to High</option>
        <option value='desc'>Price: High to Low</option>
      </select>
    
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', objectFit: 'contain' }}>
        {state.map((el, index) => (
          <div key={index} style={{ margin: 'auto', textAlign: 'center' }}>
            <img src={el.image} width="300px" height="300px" alt={el.title} />
            <p>{el.title}</p>
            <p>{el.price}</p>
            <p>{el.category}</p>
          </div>
        ))}
      </div>
      {/* {Array(4).fill(0).map((el, i) => {
        return (
          <button  onClick={() => handleClick(i + 1)}>
            {i + 1}
          </button>
        );
      })} */}
    </>
  );
};

export default Crud;
