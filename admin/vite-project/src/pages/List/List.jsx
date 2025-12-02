// import React, { useEffect, useState } from 'react'
// import './List.css'
// import { url } from '../../assets/assets'
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const List = () => {

//   const [list,setList] = useState([]);
  
//   const fetchList = async () => {
//     const response = await axios.get(`${url}/api/food/list`)
//     if(response.data.success)
//     {
//       setList(response.data.data);
//     }
//     else{
//       toast.error("Error")
//     }
//   }

//   const removeFood = async (foodId) => {
//     const response = await axios.post(`${url}/api/food/remove`,{
//       id:foodId
//     })
//     await fetchList();
//     if (response.data.success) {
//       toast.success(response.data.message);
//     }
//     else {
//       toast.error("Error")
//     }
//   }

//   useEffect(()=>{
//     fetchList();
//   },[])

  

//   return (
//     <div className='list add flex-col'>
//         <p>All Foods List</p>
//         <div className='list-table'>
//           <div className="list-table-format title">
//             <b>Image</b>
//             <b>Name</b>
//             <b>Category</b>
//             <b>Price</b>
//             <b>Action</b>
//           </div>
//           {list.map((item,index)=>{
//             return (
//               <div key={index} className='list-table-format'>
//                 <img src={`${url}/images/`+item.image} alt="" />
//                 <p>{item.name}</p>
//                 <p>{item.category}</p>
//                 <p>${item.price}</p>
//                 <p className='cursor' onClick={()=>removeFood(item._id)}>x</p>
//               </div>
//             )
//           })}
//         </div>
//     </div>
//   )
// }

// export default List




import React, { useEffect, useState } from 'react'
import './List.css'
import { url } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      console.log("Fetched List from Backend:", response.data.data);
      if(response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list")
      }
    } catch (err) {
      toast.error("Server Error")
      console.log(err);
    }
  }

  const removeFood = async (foodId) => {
    if(!foodId) {
      toast.error("Invalid food ID");
      return;
    }

    console.log("Removing food: ",foodId);
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // update list after remove
      } else {
        toast.error("Error removing food")
      }
    } catch (err) {
      toast.error("Server Error")
      console.log(err);
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format title'>
            <img src={`${url}/images/${item.image}`} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p className='cursor' onClick={() => removeFood(item._id)}>x</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
