import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {API_DATA} from "../constants/constants.ts";
import {User} from "../types/User.ts";

function LoginPage() {
    const navigate = useNavigate();

    const schema = z.object({
        username: z.string().min(3, {message: "Has to be more than 3 characters"}),
        password: z.string().min(5, {message: "Has to be more than 5 characters"}),
    })

    type FormFields = z.infer<typeof schema>
    const {
        reset,
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<FormFields>({resolver: zodResolver(schema)});


    // navigate('/app/home');

    const submitForm: SubmitHandler<FormFields> = (data, event) => {
        const button = event!.target as HTMLFormElement;
        const action = button.querySelector('button[type="submit"]:focus')?.getAttribute('name');
        const userName = data.username;
        const password = data.password;
        const user = new User(0, userName, password);

        if (action === "register") {
            const url =API_DATA.BASE_URL + 'user/registerUser';
            apiCallForRegister(url,user)
        } else if (action === "login") {
            const url2 =API_DATA.BASE_URL + 'user/login';
            apiCallForLogin(url2,user)
        } else {
            console.log("btn event not triggerd");
        }

    }
    const apiCallForLogin = async (url:string,user:User) => {
        try {
            const res = await axios.post(url, user)
            alert(res.data.message);
            if(res.data.code ===200) {
                localStorage.setItem('jwtToken', res.data.data.token)
                navigate('/app')
                reset();
            }

        } catch (e) {
            alert('Login Failed')
            console.log(e);
        }
    }
    const apiCallForRegister = async (url:string,user:User) => {
        try {
            const res = await axios.post(url, user)
            alert(res.data.message);
            if(res.data.code ===201) {
                reset();
            }

        } catch (e) {
            alert('Registration Failed')
            console.log(e);
        }
    }
    return (
        <div className="d-flex justify-content-center p-5">
            <div
                className="d-flex flex-column justify-content-center align-items-center p-5 gap-3
                 border border-gray-300 rounded-5 shadow-lg bg-body-secondary"
                style={{width: '600px'}}>
                <h1>User Login</h1>
                <img className='rounded-5' src='../../public/WONLINESTORE.png'/>
                <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(submitForm)}>
                    <div className="text-center">
                        <p className='form-label'>Username</p>
                        <input className="form-control" type="text" id="username" placeholder="Enter Username"
                               {...register('username')}     />
                        {errors && <p className='text-danger'>{errors.username?.message}</p>}
                    </div>
                    <div className="text-center">
                        <p className='form-label'>Password</p>
                        <input className="form-control" type="password" id="password" placeholder="Enter Password"
                               {...register('password')}     />
                        {errors && <p className='text-danger'>{errors.password?.message}</p>}
                    </div>
                    <div className='d-flex justify-content-around '>
                        <button className="btn btn-primary" type="submit" name='login'>Login</button>
                        <p className='align-self-center'> OR </p>
                        <button className="btn btn-dark" type="submit" name='register'>Register</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default LoginPage;