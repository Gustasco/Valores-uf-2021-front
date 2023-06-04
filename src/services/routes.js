import { createBrowserRouter } from "react-router-dom";
import { Data, Create, Update, Delete } from "../views";

const router = createBrowserRouter([{
    path: "/",
    element: <Data />
},
{
    path: "/create",
    element: <Create />
},
{
    path: "/update",
    element: <Update />
},
{
    path: "/delete",
    element: <Delete />
}])

export default router