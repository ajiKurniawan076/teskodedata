import BigTextInput from '@/Components/BigTextInput';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import Th from '@/Components/Th';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Product({ product, auth }) {
    const [show, setshow] = useState(false)
    const [showupdate, setshowupdate] = useState(false)
    const { data, setData, post, put, reset, processing } = useForm({
        name: '',
        price: '',
        stock: '',
        description: '',
    })
    const submit = () => {
        post(route('product'))
        setshow(false)
    }
    const updatesubmit = () => {
        put(('product/' + data.id), data)
        setshowupdate(false)
    }
    const update = (n) => {
        setData({ 'name': n.name, 'price': n.price, 'stock': n.stock, 'description': n.description, 'id': n.id })
        setshowupdate(true)
    }
    const hapus = (id) => {
        router.delete('product/' + id)
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Products List
                            <SecondaryButton className='ms-5' onClick={() => { setshow(true) }}>+ New Products </SecondaryButton>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <Th>Id</Th>
                                    <Th>Name</Th>
                                    <Th>Price</Th>
                                    <Th>Stock</Th>
                                    <Th>Description</Th>
                                    <Th>Created At</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.data.map((produk, index) => (
                                    <tr key={index}>
                                        <td>{produk.id}</td>
                                        <td>{produk.name}</td>
                                        <td>{produk.price}</td>
                                        <td>{produk.stock}</td>
                                        <td>{produk.description}</td>
                                        <td>{produk.created_at}</td>
                                        <td className='ms-2 flex gap-2'>
                                            <button className='text-white rounded-md hover:scale-110 duration-200 p-1 bg-green-700' onClick={() => { update(produk) }}>Update</button>
                                            <button className='text-white rounded-md hover:scale-110 duration-200 p-1 bg-red-700' onClick={() => { hapus(produk.id) }}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='flex gap-2 justify-center p-3'>
                            {product.links.map((link, i) =>{
                                if (i == 0) {
                                    return(<a href={link.url} key={i} className='p-1 rounded-md text-black hover:scale-110 duration-200 font-bold border-2 border-gray-600'>First Page</a>)
                                }
                                else if (i == product.links.length-1){
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
                            <div className='w-full h-fit'>
                                <div className='flex justify-center mb-3'>
                                    <h4>Add New Products</h4>
                                </div>
                                <div className='flex justify-center'>
                                    <form action="">
                                        <div className='mt-2'>
                                            <InputLabel value='Product Name' />
                                            <TextInput
                                                id='productName'
                                                name='name'
                                                onChange={(e) => { setData('name', e.target.value) }}
                                            />
                                        </div>
                                        <div className='mt-2'>
                                            <InputLabel value='Price' />
                                            <TextInput
                                                id='price'
                                                name='price'
                                                onChange={(e) => { setData('price', e.target.value) }}
                                            />
                                        </div>
                                        <div className='mt-2'>
                                            <InputLabel value='Stock' />
                                            <TextInput
                                                id='stock'
                                                name='stock'
                                                onChange={(e) => { setData('stock', e.target.value) }}
                                            />
                                        </div>
                                        <div className='mt-2'>
                                            <InputLabel value='Descripton' />
                                            <BigTextInput
                                                id='description'
                                                name='description'
                                                onChange={(e) => { setData('description', e.target.value) }}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className='flex justify-center p-3'><PrimaryButton onClick={() => { submit() }}>Submit</PrimaryButton>
                                    <SecondaryButton onClick={() => { setshow(false) }}>Close</SecondaryButton>
                                </div>
                            </div>
                        </Modal>
                        <Modal show={showupdate}>
                            <div className='w-full h-fit'>
                                <div className='flex justify-center mb-3'>
                                    <h4>Update Products</h4>
                                </div>
                                <div className='flex justify-center'>
                                    <form action="">
                                        <div className='mt-2'>
                                            <InputLabel value='Product Name' />
                                            <TextInput
                                                id='productName'
                                                name='name'
                                                defaultValue={data.name}
                                                onChange={(e) => { setData('name', e.target.value) }}
                                            />
                                        </div>
                                        <div className='mt-2'>
                                            <InputLabel value='Price' />
                                            <TextInput
                                                id='price'
                                                name='price'
                                                defaultValue={data.price}
                                                onChange={(e) => { setData('price', e.target.value) }}
                                            />
                                        </div>
                                        <div className='mt-2'>
                                            <InputLabel value='Stock' />
                                            <TextInput
                                                id='stock'
                                                name='stock'
                                                defaultValue={data.stock}
                                                onChange={(e) => { setData('stock', e.target.value) }}
                                            />
                                        </div>
                                        <div className='mt-2'>
                                            <InputLabel value='Descripton' />
                                            <BigTextInput
                                                id='description'
                                                name='description'
                                                defaultValue={data.description}
                                                onChange={(e) => { setData('description', e.target.value) }}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className='flex justify-center p-3'><PrimaryButton onClick={() => { updatesubmit() }}>Submit</PrimaryButton>
                                    <SecondaryButton onClick={() => { setshowupdate(false); console.log(data); }}>Close</SecondaryButton></div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
