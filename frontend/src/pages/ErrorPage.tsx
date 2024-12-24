import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <>
            <h1 className="text-center">404 Not Found</h1>
            <Link to="/" className='btn btn-primary'>Back to Main</Link>

        </>
    )
}

export default ErrorPage