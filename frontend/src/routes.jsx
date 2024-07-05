import ProtectedRoute from "./components/ui/protected-route/ProtectedRoute";
import Root from "./components/ui/root/Root";
import AddThing from "./components/views/add-thing/AddThing";
import DeleteThing from "./components/views/delete-thing/DeleteThing";
import EditThing from "./components/views/edit-thing/EditThing";
import Home from "./components/views/home/Home";
import Login from "./components/views/login/Login";
import MyThings from "./components/views/my-things/MyThings";
import Register from "./components/views/register/Register";
import TagList from "./components/views/tag-list/tag-list";
import ThingDetail from "./components/views/thing-detail/ThingDetail";
import ThingsList from "./components/views/things-list/ThingsList";
import UserDetail from "./components/views/user-detail/UserDetail";
import UsersList from "./components/views/users-list/UsersList";
import TagArticlesList from "./components/views/tag-articles-list/TagArticlesList";

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
				path: "articles/",
				element: <ThingsList />,
			},
			{
				path: "tags/",
				element: <TagList />,
			},
			{
				path:"with-tag/:tagName",
				element: <TagArticlesList/>
			},
			{
				path: "articles/:id/",
				element: <ThingDetail />,
			},
			{
				path: "my/",
				element: <ProtectedRoute element={<MyThings />} />,
			},
			{
				path: "my/add/",
				element: <ProtectedRoute element={<AddThing />} />,
			},
			{
				path: "my/:id/edit/",
				element: <ProtectedRoute element={<EditThing />} />,
			},
			{
				path: "my/:id/delete/",
				element: <ProtectedRoute element={<DeleteThing />} />,
			},
			{
				path: "users/",
				element: <ProtectedRoute element={<UsersList />} />,
			},
			{
				path: "users/:username/",
				element: <ProtectedRoute element={<UserDetail />} />,
			},
		],
	},
];

export default routes;
