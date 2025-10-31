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
    bg:'bg-transparent',
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


  const handleSaveAgenda = (event) => {
    event.preventDefault();
    // Si hubo un error previo, limpiamos el estado de error
      setStatus("idle");

    if (formData.task ) {
      setStatus("saving");
      dispatch(date_tracking({ data: formData }));
    } else {
      setStatus("saving");
      setTimeout(() => setStatus("error"), 1000);
      // Mostrar error si hay campos vacíos
    }
    if (user.id) dispatch(date_gettracking({ id: user.id, date }));
  };

  return (
    //Este dialog se usa solo en AGREGAR de la AGENDA"
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-black dark:text-white" variant="outline" onClick={() => setIsOpen(true)}>
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription >
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Mapear las propiedades del objeto fields */}
          {Object.entries(fields).map(([key,value]) => (
            <div  key={key} className="grid  grid-cols-4 items-center gap-4">
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
                <div className="flex gap-3">
                    <Checkbox
                    id="toggle"
                    onCheckedChange={(checked) =>
                      handleChecked(checked)}
                      className="self-center"/>
                    <Label htmlFor="toggle" className="w-14">Permanente</Label>
                </div>
                </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button className="text-white dark:text-black" type="submit" onClick={handleSaveAgenda} disabled={status === "saving"}>
            {status === "saving" ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>

        {/* Indicador de estado */}
        {status === "error" && (
          <p className="text-red-500 mt-2">There was an error saving your profile. Please try again.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
