import SecondaryButton from '@/Components/SecondaryButton';
import Th from '@/Components/Th';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import BigTextInput from '@/Components/BigTextInput';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import axios from 'axios';
import Tc from '@/Components/Tc';

export default function Transaction({auth, product, transaction}) {
    const [show,setshow] = useState(false)
    const [submits,setsubmits] = useState(false)
    const [index,setIndex] = useState(0)
    const {data,setData, errors, processing, reset} = useForm({
        product_id: '',
        quantity: '',
        price: '',
        payment_amount: '',
    })
    const submit = async () =>{

        await axios.post('api/transaction',{'quantity':data.quantity, 'price':data.price, 'payment_amount':data.payment_amount}, {headers:{
            'X-API-KEY' : 'DATAUTAMA',
            'X-SIGNATURE' : '8796a8cefcd8b6b00f028751f1f21df1f706e3fa08e8651ad3d32f7b85f9975e'
        }}).then(
            (n)=>{if(n.data.message == 'OK')  {
                setsubmits(true)
                setData('reference_no', n.data.data.reference_no)
            }}
        )
        
        setshow(false)  
    }

    useEffect(()=>{
        if(data.quantity!==''){
            console.log(data.quantity);
            const amount = product[index].price * data.quantity
            setData({'product_id': product[index].id, 'price': product[index].price, 'payment_amount': amount, 'quantity': data.quantity})
            
        }

    },[index,data.quantity])

    useEffect(()=>{
        if (submits==true){
            console.log(data);
            router.post('transaction', data)
        }
    }, [submits])
    /*const submit = () =>{
        post(route('transaction'),{headers:{
            'X-API-KEY' : 'DATAUTAMA',
            'X-SIGNATURE' : '8796a8cefcd8b6b00f028751f1f21df1f706e3fa08e8651ad3d32f7b85f9975e'
        }})
        setshow(false)  
    }*/

  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Transactions</h2>}
        >
            <Head title="Transactions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Transactions List
                            <SecondaryButton type='button' className='ms-5' onClick={()=>{setshow(true)}}>+ New Transaction </SecondaryButton>
                        </div>
                        <table className='table-atuo border-2 border-black'>
                            <thead>
                                <tr>
                                    <Th>Id</Th>
                                    <Th>Reference No</Th>
                                    <Th>Price</Th>
                                    <Th>Quantity</Th>
                                    <Th>Payment Amount</Th>
                                    <Th>Product ID</Th>
                                    <Th>Created At</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction.data.map((tran, i)=>(
                                    <tr key={i}>
                                        <Tc>{tran.id}</Tc>
                                        <Tc>{tran.reference_no}</Tc>
                                        <Tc>{tran.price}</Tc>
                                        <Tc>{tran.quantity}</Tc>
                                        <Tc>{tran.payment_amount}</Tc>
                                        <Tc>{tran.product_id}</Tc>
                                        <Tc>{tran.created_at}</Tc>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='flex gap-2 justify-center p-3'>
                            {transaction.links.map((link, i) =>{
                                if (i == 0) {
                                    return(<a href={link.url} key={i} className='p-1 rounded-md text-black hover:scale-110 duration-200 font-bold border-2 border-gray-600'>First Page</a>)
                                }
                                else if (i == transaction.links.length-1){
                                    return(<a href={link.url} key={i} className='p-1 rounded-md text-black hover:scale-110 duration-200 font-bold border-2 border-gray-600'>Last Page</a>)
                                }
                                else {
                                    return(<a href={link.url} key={i} className='p-1 rounded-md text-black hover:scale-110 duration-200 font-bold border-2 border-gray-600'>Page-{i}</a>)
                                }
}
                            )
                            }
                        </div>
                        <Modal show={show}>
                            <datalist id='dataproduk'>
                                {product.map((produk,index)=>(
                                    <option key={index} value={index}>{produk.name}</option>
                                ))}
                            </datalist>
                            <div className='w-full h-fit'>
                                <div className='flex justify-center mb-3'>
                                    <h4>Add New Transactions</h4>
                                </div>
                                <div className='flex justify-center'>
                                    <form>
                                        <div className='mt-2'>
                                            <InputLabel value='Product' />
                                            <TextInput
                                                id='idproduk'
                                                name='idproduk'
                                                list='dataproduk'
                                                autoComplete='off'
                                                onChange={(e) => {setIndex(e.target.value);}}
                                            />
                                        </div>
                                        <div className='mt-2'>
                                            <InputLabel value='Quantity' />
                                            <TextInput
                                                id='quantity'
                                                name='quantity'
                                                onChange={(e) => setData('quantity', e.target.value)}
                                            />
                                        </div>
                                        
                                    </form>
                                </div>
                                <div className='flex justify-center p-3'><PrimaryButton onClick={()=>{submit()}}>Submit</PrimaryButton>
                                <SecondaryButton onClick={()=>{setshow(false)}}>Close</SecondaryButton>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
  )
}
