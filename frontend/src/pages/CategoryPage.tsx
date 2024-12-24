import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Category} from "../types/Category.ts";
import axios from "axios";
import {API_DATA} from "../constants/constants.ts";
import {useEffect, useState} from "react";


function CategoryPage() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [catToChange, setCatToChange] = useState<Category>(new Category(0,''));
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const getCats = async () => {
            try {
                const res = await axios.get(API_DATA.BASE_URL + 'category/getAllCategories');
                setCategories(res.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCats();

    }, [load]);


    const schema = z.object({
        name: z.string().min(3, "Name is required and Must contain at least 3 characters"),
    })

    type FormFields = z.infer<typeof schema>

    const {
        register
        , handleSubmit
        ,reset
        , formState: {errors, isSubmitting},
        setValue ,getValues
    }
        = useForm<FormFields>({resolver: zodResolver(schema)})

    const formSubmit: SubmitHandler<FormFields> = async (data) => {
        const category: Category = new Category(0, data.name);
        console.log(category);
        //api call

        try {
            const res = await axios.post(API_DATA.BASE_URL + 'category/saveCategory', category)
            alert(res.data.message)
            setLoad(!load);
            cancelHandle(); //reset form
        } catch (error) {
            alert("Not Successful")
            console.log(error);
        }

    }

     function edit(category: Category) {
        setValue("name", category.name);
        setCatToChange(category);
        setIsUpdate(true);
    }
    async function updateCategory(category: Category) {
        try {
            const {name} = getValues();
            const updateCat:Category =new Category(category.id ,name)
            const res = await axios.put(API_DATA.BASE_URL + `category/updateCategory/${category.id}`, updateCat)
            alert(res.data.message)
            setLoad(!load);
            cancelHandle(); //reset form
        } catch (error) {
            alert("Not Successful")
            console.log(error);
        }
    }

    async function deleteCategory(category: Category) {
        try {
            const res = await axios.delete(API_DATA.BASE_URL + `category/deleteCategory/${category.id}`);
            alert(res.data.message)
            setLoad(!load);
            cancelHandle(); //reset form
        } catch (error) {
            alert("Not Successful")
            console.log(error);
        }
    }
    function cancelHandle() {
        reset({
            name: ""
        });
    }

    return (
        <>
            <div className="mt-3 container text-center">
                <div className="row">
                    <div className="col-4  border border-2 m-3 p-3">
                        <h3 className='bg-dark text-white p-2'>Category Form</h3>
                        <form className='w-auto mt-3' onSubmit={handleSubmit(formSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text-start d-block">Category Name</label>
                                <input type="input" className="form-control" id="name"
                                       placeholder="Enter New Category"
                                       {...register("name")}/>
                                {errors.name && (<p className='text-danger'>{errors.name.message}</p>)}
                            </div>
                            <div className='d-flex gap-2 justify-content-center'>
                                <button disabled={isSubmitting || isUpdate} type="submit" className="btn btn-primary">
                                    {isSubmitting ? "Waiting" : "Add"}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => cancelHandle()}>
                                    Cancel
                                </button>
                                <button disabled={!isUpdate}
                                        onClick={() => updateCategory(catToChange)} type="button"
                                        className="btn btn-warning">
                                    Update
                                </button>
                                <button disabled={!isUpdate}
                                        onClick={() => deleteCategory(catToChange)} type="button"
                                        className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </form>

                    </div>
                    <div className="col-7  border border-2 m-3 p-3">
                        <h2 className='bg-dark text-white p-2'>Category Table</h2>
                        <table className="table table-hover ">
                            <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                            </tr>

                            </thead>
                            <tbody >
                            {categories.map((category:Category,index:number) => (
                                <tr key={category.name} onClick={()=>edit(category)}>
                                    <td>{++index}</td>
                                    <td>{category.name}</td>
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

export default CategoryPage;