import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Allorder() {
    let [allorder, setAllorder] = useState([]);
    async function getAllorder() {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/orders/"
      );
      console.log(data.data);
      setAllorder(data.data);
    }
    let { data, isError, isLoading, isFetching } = useQuery(
        "getAllorder",
        getAllorder
      );
    useEffect(() => {
        getAllorder();
    }, []);
    if (isLoading) return <Loading />;
  return (
    <>
    <div className="container">
        <table className='table'>
            <thead>
                <th>
                    Order ID
                </th>
                <th>
                    Customer Name
                </th>
                <th>
                    Total price
                </th>
            </thead>
            <tbody>
            {allorder.map((item) => (
                <tr key={item._id}>
                    <td>
                        {item._id}
                    </td>
                    <td>
                        {item.user.name}
                    </td>
                    <td>
                        {item.totalOrderPrice} EGP
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
   
    </div>

    </>
  )
}
