import { router } from "./Route/Routes";
import { RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <RouterProvider router={router}>

      </RouterProvider>
    </>
  );
}

export default App;
