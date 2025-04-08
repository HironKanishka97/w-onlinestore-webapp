import {useEffect, useState} from "react";
import {API_DATA, DEFAULT_IMAGE} from "../constants/constants.ts";
import axios from "axios";
import {Product} from "../types/Product.ts";
import {Category} from "../types/Category.ts";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import showAlert from "../util/showAlert.ts";


function ProductPage() {
    const url = API_DATA.BASE_URL;
    const [imageLoaded, setImageLoaded] = useState(false)
    const [base64Image, setBase64Image] = useState('');
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [isUpdate, setIsUpdate] = useState(false);
    const [productToChange, setProductToChange] = useState<Product>(new Product(0, "", "", "", new Category(0, ""), 0.0, 0.0, 0, 0, ""));
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const apiCall = async () => {
            try {
                const response = await axios.get(API_DATA.BASE_URL + 'product/getAllProducts');
                setProducts(response.data.data);
                setBase64Image(DEFAULT_IMAGE)
            } catch (e) {
                showAlert('Products Fetching Status', 'Failed.', 'error', 'Close')
                console.log(e);
            }
        }
        apiCall();
    }, [load])

    useEffect(() => {
        const apiCallforCats = async () => {
            try {
                const response = await axios.get(API_DATA.BASE_URL + 'category/getAllCategories');
                setCategories(response.data.data);
            } catch (e) {
                showAlert('Categories Fetching Status', 'Failed.', 'error', 'Close')
                console.log(e);
            }
        }
        apiCallforCats();
    }, [load])


    const schema = z.object({
        name: z.string().min(4, {message: "Name must contain at least 4 characters"}),
        brand: z.string().min(3, {message: "Brand must contain at least 3 characters"}),
        description: z.string().min(10, {message: "Description must contain at least 10 characters"}),
        category: z.string().nonempty({message: "Category must be selected"}),
        price: z.number().nonnegative({message: "Price must be a non-negative number"}),
        discount: z.number().nonnegative({message: "Discount cannot be negative"}),
        quantity: z.number().int().nonnegative({message: "Quantity must be a non-negative integer"}),
        rop: z.number().int().nonnegative({message: "Reorder point (ROP) must be a non-negative integer"}),
        image: z
            .instanceof(FileList, {message: 'Please Choose an Image'}) // bcz html input accepts as filelist
            .refine((files) => files.length > 0, {message: 'Image file is required'})
            .refine((files) => {
                const file = files[0];
                return (
                    file && ["image/jpeg", "image/png", "image/gif"].includes(file.type)
                );
            }, {message: 'Image must be a JPEG, PNG, or GIF'})
            .refine((files) => {
                const file = files[0];
                return file && file.size <= 5 * 1024 * 1024;
            }, {message: 'Image file must be less than 5MB'})
    });

    type Formfields = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<Formfields>({resolver: zodResolver(schema)})

    function handleFileChange(event: React.FormEvent<HTMLInputElement>){

       const file = event.currentTarget.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            // Event listener that runs when the file has been successfully read
            reader.onloadend = () => {
                setBase64Image(reader.result as string)
            };
        }
    }

    const formSubmit: SubmitHandler<Formfields> = (data) => {
       saveProduct(data);
    }

    const saveProduct = async (data: Formfields) => {
        const cat: Category = categories.find((cat) => cat.id === Number(data.category))!;
        const productToSave = new Product(0, data.name, data.brand, data.description, cat, data.price, data.discount, data.quantity, data.rop,
            btoa(base64Image));
        try {
            const res = await axios.post(url + 'product/saveProduct', productToSave)
            showAlert('Product Add', 'Success.', 'success', 'Close')
            setLoad(!load);
            cancelHandle();
        } catch (e) {
            console.log(e);
            showAlert('Product Add', 'Unsuccess.', 'error', 'Close')
        }


    }

    async function updateProduct(product: Product) {
        try {
            const cat: Category = categories.find((cat) => cat.name === getValues('category'))!;
            const updateProduct = new Product(product.id, getValues('name'),getValues('brand'), getValues('description'),
                cat,getValues('price'),getValues('discount'),getValues('rop'),getValues('quantity'), btoa(base64Image));
            const res = await axios.put(url + `product/updateProduct/${product.id}`, updateProduct);
            showAlert('Product Update', 'Success.', 'success', 'Close');
            setLoad(!load)
            setIsUpdate(false)
            setImageLoaded(false)
            cancelHandle(); //reset form
        } catch (error) {
            showAlert('Product Update', 'Unsuccess.', 'error', 'Close')
            console.log(error);
        }

    }

    async function deleteProduct(product: Product) {
        try {
            const res = await axios.delete(url + `product/deleteProduct/${product.id}`);
            showAlert('Product Delete', 'Success.', 'success', 'Close');
            setLoad(!load)
            setIsUpdate(false)
            setImageLoaded(false)
            cancelHandle(); //reset form
        } catch (error) {
            showAlert('Product Delete', 'Unsuccess.', 'error', 'Close')
            console.log(error);
        }
    }

    function edit(product: Product) {
        setBase64Image(DEFAULT_IMAGE);
        setIsUpdate(true);
        setProductToChange(product);
        setValue('name', product.name);
        setValue('brand', product.brand);
        setValue('description', product.description);
        setValue('category', product.category.name);
        setValue('price', product.price);
        setValue('discount', product.discount);
        setValue('quantity', product.quantity);
        setValue('rop', product.rop);
        if (product.image) {
            setImageLoaded(true)
            setBase64Image(atob(product.image))
        }

    }
    function handleImageUpdate(){
        setImageLoaded(false)
    }

    function cancelHandle() {
        reset();
    }

    return (
        <>
            <div className="mt-3 container text-center">
                <div className="row">
                    <div className="col-4  border border-2 m-3 p-3">
                        <h3 className='bg-dark text-white p-2'>Product Form</h3>
                        <form className='w-auto mt-3' onSubmit={handleSubmit(formSubmit)}>
                            <div className="mb-3">
                                <label  htmlFor="name" className="form-label text-start d-block">Product Name</label>
                                <input type="input" className="form-control" id="name"
                                       placeholder="Enter New Product"
                                       {...register("name")}/>
                                {errors.name && (<p className='text-danger'>{errors.name.message}</p>)}
                            </div>

                            <div className="mb-3">
                                <label  htmlFor="brand" className="form-label text-start d-block">Brand</label>
                                <input type='input' className="form-control" id="brand"
                                       placeholder="Enter Brand"
                                       {...register('brand')}/>
                                {errors.brand && (<p className='text-danger'>{errors.brand.message}</p>)}
                            </div>

                            <div className="mb-3">
                                <label  htmlFor="description" className="form-label text-start d-block">Description</label>
                                <input type='input' className="form-control" id="description"
                                       placeholder="Enter Description"
                                       {...register('description')}/>
                                {errors.description && (<p className='text-danger'>{errors.description.message}</p>)}
                            </div>

                            <div className="mb-3">
                                <label  htmlFor="category" className="form-label text-start d-block">Category</label>
                                <select className="form-select" aria-label="Default select example"
                                        value={watch('category') || ''} {...register('category')}>
                                    <option value='' disabled>Select a Category</option>
                                    {categories.map((category, index: number) => (
                                        <option key={index} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                                {errors.category && (<p className='text-danger'>{errors.category.message}</p>)}
                            </div>

                            <div className="mb-3">
                                <label  htmlFor="price" className="form-label text-start d-block">Price</label>
                                <input type='number' className="form-control" id="price"
                                       placeholder="Enter Price"
                                       {...register('price', {valueAsNumber: true})}/>
                                {errors.price && (<p className='text-danger'>{errors.price.message}</p>)}
                            </div>

                            <div className="mb-3">
                                <label  htmlFor="discount" className="form-label text-start d-block">Discount</label>
                                <input type='number' className="form-control" id="discount"
                                       placeholder="Enter Discount"
                                       {...register('discount', {valueAsNumber: true})}/>
                                {errors.discount && (<p className='text-danger'>{errors.discount.message}</p>)}
                            </div>

                            <div className="mb-3">
                                <label  htmlFor="quantity" className="form-label text-start d-block">Quantity</label>
                                <input type='number' className="form-control" id="quantity"
                                       placeholder="Enter Quantity"
                                       {...register('quantity', {valueAsNumber: true})}/>
                                {errors.quantity && (<p className='text-danger'>{errors.quantity.message}</p>)}
                            </div>

                            <div className="mb-3">
                                <label  htmlFor="rop" className="form-label text-start d-block">Reorder Point (ROP)</label>
                                <input type='number' className="form-control" id="rop"
                                       placeholder="Enter ROP"
                                       {...register('rop', {valueAsNumber: true})}/>
                                {errors.rop && (<p className='text-danger'>{errors.rop.message}</p>)}
                            </div>

                            <div className="mb-3">
                                <label  htmlFor="image" className="form-label text-start d-block" hidden={imageLoaded}>Product Image</label>
                                <label  hidden={!imageLoaded} className='h6'>Current Image</label>
                                <input hidden={imageLoaded} className="form-control"
                                       onInput={(event) => handleFileChange(event)}
                                       type="file" id='image'
                                       accept="image/*"
                                       {...register('image')}/>
                                {errors.image && (<p className='text-danger'>{errors.image.message}</p>)}
                            </div>
                            <div className="mb-3 d-flex justify-content-around align-items-center ">
                                <img className='border border-2' style={{width: '100px'}} src={base64Image}/>
                                <button className='btn btn-sm btn-warning' hidden={!imageLoaded}
                                        onClick={() => handleImageUpdate()}>Update Image
                                </button>
                            </div>

                            <div className='d-flex gap-2 justify-content-center'>
                                <button disabled={isSubmitting || isUpdate} type="submit"
                                        className="btn btn-primary">
                                    {isSubmitting ? "Waiting" : "Add"}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => cancelHandle()}>
                                    Cancel
                                </button>
                                <button disabled={!isUpdate}
                                        onClick={() => updateProduct(productToChange)} type="button"
                                        className="btn btn-warning">
                                    Update
                                </button>
                                <button disabled={!isUpdate}
                                        onClick={() => deleteProduct(productToChange)} type="button"
                                        className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </form>

                    </div>
                    <div className="col-7  border border-2 m-3 p-3">
                        <h2 className='bg-dark text-white p-2'>Product Table</h2>
                        <table className="table table-hover ">
                            <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>

                            </thead>
                            <tbody>
                            {products.map((product: Product, index: number) => (
                                <tr key={product.name} onClick={() => edit(product)}>
                                    <td>{++index}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
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

export default ProductPage;