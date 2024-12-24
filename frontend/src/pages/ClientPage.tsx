import {useEffect, useState} from "react";
import {API_DATA} from '../constants/constants.ts';
import axios from "axios";
import {Client} from "../types/Client.ts";
import {z} from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


function ClientPage() {

    const [clients, setClients] = useState<Client[]>([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [clientToChange, setClientToChange] = useState<Client>(new Client(0, '', '', ''));
    const [load, setLoad] = useState(true);

    const schema = z.object({
        name: z.string().min(4, {message: "Name must contain at least 4 characters"}),
        address: z.string().min(4, {message: "Address must contain at least 4 characters"}),
        contact: z
            .string()
            .regex(/^\d{3}-\d{7}$/, {message: "Contact must be a valid phone number"})
    })

    type Formfields = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<Formfields>({resolver:zodResolver(schema)})

    const url: string = API_DATA.BASE_URL;
    useEffect(() => {
        const getClients = async () => {
            try {
                const res = await axios.get(url + 'client/getAllClients');
                setClients(res.data.data);
            } catch (error) {
                alert('Clients Not Fetched Successfully');
                console.log(error);
            }
        }
        getClients();
    }, [load]);

    const formSubmit: SubmitHandler<Formfields> = async (data) => {
        try {
            const res = await axios.post(url + 'client/saveClient', data);
            alert(res.data.message);
            setLoad(!load)
            cancelHandle(); //reset form
        } catch (e) {
            alert('Save Unsuccessful');
            console.log(e);
        }

        console.log(data);
    }

    async function updateClient(client: Client) {
        try {
            const updateClient =new Client(client.id ,getValues('name'),getValues('address'),getValues('contact'))
            const res = await axios.put(url + `client/updateClient/${client.id}`, updateClient);
            alert(res.data.message);
            setLoad(!load)
            cancelHandle(); //reset form
        } catch (error) {
            alert('Update Unsuccessful');
            console.log(error);
        }

    }

    async function deleteClient(client: Client) {
        try {
            const res = await axios.delete(url + `client/deleteClient/${client.id}`);
            alert(res.data.message);
            setLoad(!load)
            cancelHandle(); //reset form
        } catch (error) {
            alert('Delete Unsuccessful');
            console.log(error);
        }
    }

    function edit(client: Client) {
        setIsUpdate(true);
        setClientToChange(client);
        setValue('name', client.name);
        setValue('address', client.address);
        setValue('contact', client.contact);
    }

    function cancelHandle() {
        reset({
            name: "",
            address: "",
            contact: ""
        });
    }

    return (
        <>
            <div className="mt-3 container text-center">
                <div className="row">
                    <div className="col-4  border border-2 m-3 p-3">
                        <h3 className='bg-dark text-white p-2'>Client Form</h3>
                        <form className='w-auto mt-3' onSubmit={handleSubmit(formSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text-start d-block">Client Name</label>
                                <input type="input" className="form-control" id="name"
                                       placeholder="Enter New Client" {...register("name")}/>
                                {errors.name && (<p className='text-danger'>{errors.name.message}</p>)}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="address" className="form-label text-start d-block">Address</label>
                                <input type='input' className="form-control" id="address"
                                       placeholder="Enter Address" {...register('address')}/>
                                {errors.address && (<p className='text-danger'>{errors.address.message}</p>)}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="contact" className="form-label text-start d-block">Contact
                                    Number</label>
                                <input type='input' className="form-control" id="contact"
                                       placeholder="Enter Contact Number" {...register('contact')}/>
                                {errors.contact && (<p className='text-danger'>{errors.contact.message}</p>)}
                            </div>

                            <div className='d-flex gap-2 justify-content-center'>
                                <button disabled={isSubmitting || isUpdate} type="submit" className="btn btn-primary">
                                    {isSubmitting ? "Waiting" : "Add"}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => cancelHandle()}>
                                    Cancel
                                </button>
                                <button disabled={!isUpdate} onClick={() => updateClient(clientToChange)} type="button"
                                        className="btn btn-warning">
                                    Update
                                </button>
                                <button disabled={!isUpdate} onClick={() => deleteClient(clientToChange)} type="button"
                                        className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </form>

                    </div>
                    <div className="col-7  border border-2 m-3 p-3">
                        <h2 className='bg-dark text-white p-2'>Client Table</h2>
                        <table className="table table-hover ">
                            <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Contact</th>
                            </tr>

                            </thead>
                            <tbody>
                            {clients.map((client: Client, index: number) => (
                                <tr key={client.name} onClick={() => edit(client)}>
                                    <td>{++index}</td>
                                    <td>{client.name}</td>
                                    <td>{client.address}</td>
                                    <td>{client.contact}</td>
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

export default ClientPage;