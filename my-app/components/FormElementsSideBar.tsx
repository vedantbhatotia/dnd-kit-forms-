import SideBarButtonElement from "./SideBarButtonElement"
import { FormElements } from "./FormElements"
function FormElementsSideBar() {
  return (
    <div>
    <SideBarButtonElement formElement={FormElements.TextField} />
    </div>
  )
}
export default FormElementsSideBar