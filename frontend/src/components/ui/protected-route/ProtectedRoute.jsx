import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
	const location = useLocation();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	if (!isLoggedIn) {
		return <Navigate to="/login/" state={{ from: location }} />;
	}

	return element;
};

export default ProtectedRoute;
