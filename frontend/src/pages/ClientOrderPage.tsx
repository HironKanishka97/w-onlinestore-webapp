import {useEffect, useState} from "react";
import {CartItem} from "../types/CartItem.ts";
import {API_DATA} from "../constants/constants.ts";
import {Product} from "../types/Product.ts";
import axios from "axios";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ClientOrder} from "../types/ClientOrder.ts";
import {Client} from "../types/Client.ts";
import showAlert from "../util/showAlert.ts";

function ClientOrderPage() {
    const url = API_DATA.BASE_URL;
    const [error, setError] = useState<string>('');
    const [clientOrders, setClientOrders] = useState([])
    const [emptyCartError, setEmptyCartError] = useState<string>('')
    const [lineTotalButtonHide, setLineTotalButtonHide] = useState(false)
    const [, setOrderLineTotal] = useState(0);
    const [loadFromCart, setLoadFromCart] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const [products, setProducts] = useState<Product[]>([])
    const [clients, setClients] = useState<Client[]>([])
    const [isUpdate, setIsUpdate] = useState(false);
    const [orderToChange, setOrderToChange] =
        useState<ClientOrder>(new ClientOrder(0, '', new Client(0, '', '', ''), [], 0));
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const apiCall = async () => {
            try {
                const response = await axios.get(API_DATA.BASE_URL + 'product/getAllProducts');
                setProducts(response.data.data);

            } catch (e) {
                showAlert('Products Fetching Status', 'Failed.', 'error', 'Close')
                console.log(e);
            }
        }
        apiCall();
    }, [load])

    //check cart emptiness
    useEffect(() => {
        if (localStorage.getItem('cart') !== null) {
            setLoadFromCart(true)
            const storedCartItems = localStorage.getItem("cart");
            if (storedCartItems) {
                const parsedCartItems: CartItem[] = JSON.parse(storedCartItems);
                const mergedCartItems = parsedCartItems.reduce((acc: CartItem[], currentItem: CartItem) => {
                    const existingItem = acc.find(item => item.product.id === currentItem.product.id);

                    if (existingItem) {
                        existingItem.productCount += currentItem.productCount;
                        existingItem.totalAmount = existingItem.productCount * existingItem.product.price;
                    } else {
                        acc.push(currentItem);
                    }
                    return acc;
                }, []);
                setCartItems(mergedCartItems);
            }
        } else {
            setLoadFromCart(false)
        }

    }, []);

    useEffect(() => {
        const apiCallForClientOrders = async () => {
            try {
                const response = await axios.get(API_DATA.BASE_URL + 'clientOrder/getAllClientOrders');
                setClientOrders(response.data.data);
            } catch (e) {
                showAlert('Client Orders Fetching Status', 'Failed.', 'error', 'Close')
                console.log(e);
            }
        }
        apiCallForClientOrders();
    }, [load])

    useEffect(() => {
        const apiCallForClients = async () => {
            try {
                const response = await axios.get(API_DATA.BASE_URL + 'client/getAllClients');
                setClients(response.data.data);
            } catch (e) {
                showAlert('Clients Fetching Status', 'Failed.', 'error', 'Close')
                console.log(e);
            }
        }
        apiCallForClients();
    }, [load])

    const defaultValues = {
        date: '',
        client: '',
        product: '',
        productCount: 0,
        lineTotal: 0,
    };

    const schema = z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {message: "Invalid Date Format"}),
        client: z.string().nonempty({message: "Client must Be Selected"}),
        lineTotal: z.number().min(1, "Please press 'calculate Line Total' Button").nonnegative({message: "Please Enter Non Negative Total"}),

    });

    type FormFields = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        trigger,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<FormFields>({defaultValues, resolver: zodResolver(schema)})

    const formSubmit: SubmitHandler<FormFields> = (data) => {
        if (cartItems.length < 1) {
            setEmptyCartError('Please Add some products');
            return;
        }
        const clientToSave = clients.find((c) => (c.id === Number(data.client)))!
        saveProduct(data.date ,clientToSave ,data.lineTotal ,cartItems);
    }

    const saveProduct = async (date:string , clientToSave: Client, lineTotal: number, cartItems: CartItem[]) => {
        const co:ClientOrder =new ClientOrder(0,date,clientToSave,cartItems,lineTotal)

        try {
            const res = await axios.post(url + 'clientOrder/saveClientOrder', co)
            showAlert('Client Order Add', 'Success.', 'success', 'Close')
            setLoad(!load);
            cancelHandle();
        } catch (e) {
            console.log(e);
            showAlert('Client Order Add', 'Unsuccess.', 'error', 'Close')
        }


    }

    async function updateClientOrder(clientOrder: ClientOrder) {
        try {
            const cli: Client = clients.find((cl) => cl.id === Number(getValues('client')))!;
            const updateClientOrder =
                new ClientOrder(clientOrder.id,getValues('date') ,cli,cartItems ,getValues('lineTotal'));

            const res =
                await axios.put(url + `clientOrder/updateClientOrder/${clientOrder.id}`, updateClientOrder);
                showAlert('Client Order Update', 'Success.', 'success', 'Close')
            setLoad(!load)
            setIsUpdate(false)
            cancelHandle(); //reset form
        } catch (error) {
            showAlert('Client Order Update', 'Unsuccess.', 'error', 'Close')
            console.log(error);
        }

    }

    async function deleteClientOrder(clientOrder: ClientOrder) {
        try {
            const res = await axios.delete(url + `clientOrder/deleteClientOrder/${clientOrder.id}`);
            showAlert('Client Order Delete', 'Success.', 'success', 'Close')
            setLoad(!load)
            setIsUpdate(false)
            cancelHandle(); //reset form
        } catch (error) {
            showAlert('Client Order Delete', 'Unsuccess.', 'error', 'Close')
            console.log(error);
        }
    }

    function edit(order: ClientOrder) {
        setIsUpdate(true);
        setOrderToChange(order);
        setValue('date',new Date(order.date).toLocaleDateString('en-CA'))
        const clientIdString =String(order.client.id)
        setValue('client', clientIdString);
        setCartItems(order.cartItems)
        setValue('lineTotal', order.lineTotal);

    }

    function cancelHandle() {
        reset();
    }

    function calcLineTotal(mergedCartitems: CartItem[]) {
        if (mergedCartitems.length !== 0) {
            setEmptyCartError('')
        }
        if (mergedCartitems.length === 0 && cartItems.length === 0) {
            setEmptyCartError("Please add some products")
            return;
        }

        let lineTotal = 0;
        mergedCartitems.forEach((cartItem: CartItem) => {
            lineTotal += cartItem.product.price * cartItem.productCount
        })
        setValue('lineTotal', lineTotal)
        trigger('lineTotal');
        setOrderLineTotal(lineTotal);
    }

    function addProduct() {

        const productName = (document.getElementById('productSelect') as HTMLSelectElement).value;
        const productCount = Number((document.getElementById('productCount') as HTMLInputElement).value);

        if (!productName) {
            setError('Please select a product');
            return;
        }

        if (productCount <= 0 || isNaN(Number(productCount))) {
            setError('Please enter a valid amount greater than 0');
            return;
        }
        setLineTotalButtonHide(true);
        setError('');

        const product = products.find((p) => (p.name === productName))!;

        const newCartItem = new CartItem(0, product, productCount, product.price);

        const parsedCartItems: CartItem[] = [...cartItems, newCartItem];

        const mergedCartItems = parsedCartItems.reduce((acc: CartItem[], currentItem: CartItem) => {
            const existingItem = acc.find(item => item.product.id === currentItem.product.id);

            if (existingItem) {
                existingItem.productCount += productCount;
                existingItem.totalAmount = existingItem.productCount * existingItem.product.price;
            } else {
                acc.push(currentItem);
            }
            return acc;
        }, []);

        setCartItems(mergedCartItems);
        calcLineTotal(mergedCartItems);
        (document.getElementById('productSelect') as HTMLSelectElement).value = '';
        (document.getElementById('productCount') as HTMLInputElement).value = '';

    }

    return (
        <>
            <div className="mt-3 container text-center">
                <div className="row">
                    <div className="col-4  border border-2 m-3 p-3">
                        <h3 className='bg-dark text-white p-2'>Client Order Form</h3>
                        <form className='w-auto mt-3' onSubmit={handleSubmit(formSubmit)} noValidate>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label text-start d-block">Select Date</label>
                                <input type="date" className="form-control" id="date"
                                       placeholder="Select Date" {...register("date")}/>
                                {errors.date && (<p className='text-danger'>{errors.date.message}</p>)}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="client" className="form-label text-start d-block">Select a
                                    Client</label>
                                <select className="form-select"
                                        aria-label="Default select example" {...register('client')}>
                                    <option value='' disabled>Select a Client</option>
                                    {clients.map((client, index: number) => (
                                        <option key={index} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                                {errors.client && (<p className='text-danger'>{errors.client.message}</p>)}
                            </div>

                            <p className='text-primary'>{loadFromCart ? "Products Automatically added from cart.Add Additional if you Need" : "No Products in cart. Add Products Manually"}</p>

                            <div className='mb-3'>
                                <label htmlFor="productSelect" className="form-label text-start d-block">Select a
                                    Product</label>
                                <select id='productSelect' className="form-select" defaultValue=''
                                        aria-label="Default select example">
                                    <option value='' disabled>Select a Product</option>
                                    {products.map((product, index: number) => (
                                        <option key={index} value={product.name}>{product.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="productCount" className="form-label text-start d-block">Enter Amount you
                                    Need</label>
                                <input type="number" className="form-control" id="productCount"
                                       placeholder="Enter Amount you Need"/>
                            </div>

                            {error && <div className="text-danger">{error}</div>}

                            <div className='mb-3'>
                                <button type='button' className='btn btn-sm btn-outline-info'
                                        onClick={() => addProduct()}>Add Product
                                </button>
                            </div>

                            <div className='mb-3'>
                                {emptyCartError && <div className="text-danger">{emptyCartError}</div>}
                                <table className='table table-hover text-start border border-2'>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Count</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartItems.map((cartItem: CartItem, index: number) => (
                                        <tr key={index}>
                                            <td>{cartItem.product.name}</td>
                                            <td>{cartItem.productCount}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className='mb-3'>
                                <button hidden={lineTotalButtonHide} type='button'
                                        className='btn btn-sm btn-outline-success'
                                        onClick={() => calcLineTotal(cartItems)}>Calculate Line Total
                                </button>
                                <p hidden={!lineTotalButtonHide} className='text-primary'>LineTotal Updated</p>
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="lineTotal" className="form-label text-start d-block">LineTotal</label>
                                <input type='number' className="form-control" id="lineTotal" disabled
                                       placeholder="LineTotal" {...register('lineTotal', {valueAsNumber: true})}/>
                                {errors.lineTotal && (<p className='text-danger'>{errors.lineTotal.message}</p>)}
                            </div>

                            <div className='d-flex gap-2 justify-content-center'>
                                <button disabled={isSubmitting || isUpdate} type="submit" className="btn btn-primary">
                                    {isSubmitting ? "Waiting" : "Add"}
                                </button>
                                <button type="button" className="btn btn-secondary"
                                        onClick={() => cancelHandle()}>Cancel
                                </button>
                                <button disabled={!isUpdate} onClick={() => updateClientOrder(orderToChange)}
                                        type="button" className="btn btn-warning">Update
                                </button>
                                <button disabled={!isUpdate} onClick={() => deleteClientOrder(orderToChange)}
                                        type="button" className="btn btn-danger">Delete
                                </button>
                            </div>
                        </form>

                    </div>
                    <div className="col-7  border border-2 m-3 p-3">
                        <h2 className='bg-dark text-white p-2'>Client Order Table</h2>
                        <table className="table table-hover ">
                            <thead>
                            <tr>
                                <th>No.</th>
                                <th>Client Name</th>
                                <th>Order Date</th>
                                <th>Line Total</th>
                            </tr>

                            </thead>
                            <tbody>
                            {clientOrders.map((co: ClientOrder, index: number) => (
                                <tr key={index} onClick={() => edit(co)}>
                                    <td>{++index}</td>
                                    <td>{co.client.name}</td>
                                    <td>{new Date(co.date).toLocaleDateString('en-CA')}</td>
                                    <td>{co.lineTotal}</td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientOrderPage;