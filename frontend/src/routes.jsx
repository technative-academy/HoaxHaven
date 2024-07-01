import ProtectedRoute from "./components/ui/protected-route/ProtectedRoute";
import Root from "./components/ui/root/Root";
import AddThing from "./components/views/add-thing/AddThing";
import DeleteThing from "./components/views/delete-thing/DeleteThing";
import EditThing from "./components/views/edit-thing/EditThing";
import Home from "./components/views/home/Home";
import Login from "./components/views/login/Login";
import MyThings from "./components/views/my-things/MyThings";
import Register from "./components/views/register/Register";
import ThingDetail from "./components/views/thing-detail/ThingDetail";
import ThingsList from "./components/views/things-list/ThingsList";
import UserDetail from "./components/views/user-detail/UserDetail";
import UsersList from "./components/views/users-list/UsersList";

const routes = [
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "login/",
				element: <Login />,
			},
			{
				path: "register/",
				element: <Register />,
			},
			{
				path: "things/",
				element: <ThingsList />,
			},
			{
				path: "things/:id/",
				element: <ThingDetail />,
			},
			{
				path: "my-things/",
				element: <ProtectedRoute element={<MyThings />} />,
			},
			{
				path: "my-things/add/",
				element: <ProtectedRoute element={<AddThing />} />,
			},
			{
				path: "my-things/:id/edit/",
				element: <ProtectedRoute element={<EditThing />} />,
			},
			{
				path: "my-things/:id/delete/",
				element: <ProtectedRoute element={<DeleteThing />} />,
			},
			{
				path: "users/",
				element: <ProtectedRoute element={<UsersList />} />,
			},
			{
				path: "users/:id/",
				element: <ProtectedRoute element={<UserDetail />} />,
			},
		],
	},
];

export default routes;
