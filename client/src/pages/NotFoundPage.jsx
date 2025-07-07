import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
            <img
                src="https://cdn.jsdelivr.net/gh/enterprise-ui/assets/404-enterprise.svg"
                alt="Not Found"
                className="mx-auto mb-8 w-48 h-48"
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page not found</h2>
            <p className="text-gray-500 mb-6">
                Sorry, we couldn’t find the page you’re looking for.
            </p>
            <Link
                to="/"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
            >
                Go back home
            </Link>
        </div>
    </div>
);

export default NotFoundPage;