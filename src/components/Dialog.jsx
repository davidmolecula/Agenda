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
import { date_agenda, resetSuccess} from "@/store/actions/dateActions";
import { Checkbox } from "@/components/ui/checkbox"

export function DialogDemo({ initialOpen = false,  title, description, fields, date }) {
  const [status, setStatus] = useState("idle"); // Posibles valores: "idle", "saving", "success", "error"
  const [isOpen, setIsOpen] = useState(false); // Controla si el diálogo está abierto o cerrado
  const [formData,setFormData]=useState({
    name:"",
    description:"",
    importance:"",
    date:{},
    checked:""
  })
  const dispatch=useDispatch()
  const { success, lastAction } = useSelector((store) => store.dateReducer);
  const agendaSuccess = success && lastAction === "date_agenda";

  const handleInput=(event)=>{
    const { name, value } = event.target; 
    setFormData({
      ...formData,
      [name]:value,
      date:date
    })
  }

  useEffect(() => {
    if (agendaSuccess) {
      setStatus("saving");
      setTimeout(() => setStatus("success"), 500);
      setTimeout(() => {
        setIsOpen(false); // Cierra el diálogo
        setStatus("idle");
        dispatch(resetSuccess()); // Limpia el estado global
      }, 500);
    } else if (lastAction === "date_agenda" && !success) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 500);
      dispatch(resetSuccess());
    }
  }, [lastAction, success, dispatch]);

  const handleSaveAgenda = (event) => {
    event.preventDefault();
    // Si hubo un error previo, limpiamos el estado de error
      setStatus("idle");
    if (formData.name && formData.description && formData.importance) {
      setStatus("saving");
      dispatch(date_agenda({ data: formData }));
    } else {
      setStatus("saving");
      setTimeout(() => setStatus("error"), 1000);
      // Mostrar error si hay campos vacíos
    }
  };

  const handleChecked = (isChecked, checkboxValue) => {
    setFormData((prevState) => ({  
      ...prevState,
      importance: isChecked ? checkboxValue : "", // Si está marcado, asignar el valor; si no, limpiar
    }));
  };
  
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        description: "",
        importance: "",
        date:{}
      });
      setTimeout(() => setStatus("idle"), 2000);
      
    }
  }, [isOpen,status]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Mapear las propiedades del objeto fields */}
          {Object.entries(fields).map(([key, value]) => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="text-right">
                {key.charAt(0).toUpperCase()+key.slice(1).toLowerCase()}
              </Label>
              {key === "importance" ? (
  <div className="flex items-center gap-2">
    <Checkbox
      onCheckedChange={(isChecked) => handleChecked(isChecked, "Urgente")}
      className="flex items-center rounded-2xl justify-center w-20 h-10 border bg-red-400 data-[state=checked]:bg-red-700"
    >
      <span className="text-sm font-medium">Urgente</span>
    </Checkbox>
    <Checkbox
      onCheckedChange={(isChecked) => handleChecked(isChecked, "Resuelto")}
      className="flex items-center rounded-2xl justify-center w-20 h-10 border bg-green-400 data-[state=checked]:bg-green-700"
    >
      <span className="text-sm font-medium">Resuelto</span>
    </Checkbox>
  </div>
) : (
  <Input
    id={key}
    name={key}
    defaultValue={value}
    onChange={handleInput}
    className="col-span-3"
  />
)}
              
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveAgenda} disabled={status === "saving"}>
            {status === "saving" ? "Saving..." : "Save changes"}
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
