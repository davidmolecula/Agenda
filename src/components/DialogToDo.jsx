import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { date_gettracking, date_tracking, resetSuccess} from "@/store/actions/dateActions";
import { Checkbox } from "../components/ui/checkbox.jsx"

export function DialogToDo({ initialOpen = false,  title, description, fields, date }) {
  const user=useSelector(store=> store.userReducer.user)
  const [status, setStatus] = useState("idle"); // Posibles valores: "idle", "saving", "success", "error"
  const [isOpen, setIsOpen] = useState(false); // Controla si el diálogo está abierto o cerrado
  const [formData,setFormData]=useState({
    meassure:0,
    user: user?.id || null,
    date:date,
    task:"",
    fixed:false,
    bg:'',
    type:"usuario"
  })
  useEffect(() => {
    if (user?.id) {
      setFormData((prevData) => ({
        ...prevData,
        user: user.id, // Actualiza el campo user
      }));
    }
  }, [user]);

const dispatch=useDispatch()
const { success, lastAction } = useSelector((store) => store.dateReducer);
const trackingSuccess = success && lastAction === "date_tracking";

  useEffect(() => {
      if (trackingSuccess) {
        setStatus("saving");
        setTimeout(() => setStatus("success"), 500);
        setTimeout(() => {
          setIsOpen(false); // Cierra el diálogo
          setStatus("idle");
          dispatch(resetSuccess()); // Limpia el estado global
        }, 500);
      } else if (lastAction === "date_tracking" && !success) {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 500);
        dispatch(resetSuccess());
      }
    }, [lastAction, success, dispatch]);

  const handleInput=(event)=>{
    const { name, value } = event.target; 
    setFormData({
      ...formData,
      [name]:value,
      date:date,
      user: user?.id||null,
      type:"usuario"
    })
  }

  const handleChecked = (checked) => {
    setFormData({
      ...formData,
      fixed:checked? true: false, 
    })
  };


  const handleSaveAgenda = async(event) => {
    event.preventDefault();
    // Si hubo un error previo, limpiamos el estado de error
      setStatus("idle");

    if (formData.task ) {
      setStatus("saving");
      await dispatch(date_tracking({ data: formData }));
    
    if (user.id) {
      await dispatch(date_gettracking({ id: user.id, date }));
    }
    setStatus("idle");
  }else {
      setStatus("saving");
      setTimeout(() => setStatus("error"), 1000);
      // Mostrar error si hay campos vacíos
    }
  };

  return (
    //Este dialog se usa solo en AGREGAR de la AGENDA"
    <div className="flex  border border-white w-full justify-center">
        <div className="grid gap-4 ">
          {/* Mapear las propiedades del objeto fields */}
          {Object.entries(fields).map(([key,value]) => (
            <div  key={key} className="flex justify-between gap-10">
              <Label htmlFor={key} className="flex self-start justify-center pt-3">
                {value}
              </Label>
                <Input
                    id={key}
                    name={key}
                    onChange={handleInput}
                    className="col-span-3 "
                />
                <div className="flex w-fit">
                <div className="flex gap-3 align-center items-center">
                    <Checkbox
                    id="toggle"
                    onCheckedChange={(checked) =>
                      handleChecked(checked)}
                      className="self-center"/>
                    <Label htmlFor="toggle" className="w-fit p-2">Permanente</Label>
                </div>
                </div>
            </div>
          ))}
        </div>
 
          <Button className="text-white dark:text-black" type="submit" onClick={handleSaveAgenda} disabled={status === "saving"}>
            {status === "saving" ? "Guardando..." : "Guardar cambios"}
          </Button>

        {/* Indicador de estado */}
        {status === "error" && (
          <p className="text-red-500 mt-2">There was an error saving your profile. Please try again.</p>
        )}
    </div>
  );
}
