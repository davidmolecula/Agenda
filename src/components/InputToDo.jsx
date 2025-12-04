import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { date_getTask, date_task, resetSuccess} from "@/store/actions/dateActions";
import { Checkbox } from "./ui/checkbox.jsx"
import useEffectRepeated from "./ui/useEffectRepeated.jsx"

export function InputToDo({ fields, date }) {
  const user=useSelector(store=> store.userReducer.user)
  const dispatch=useDispatch()
  const [status, setStatus] = useState("idle"); // Posibles valores: "idle", "saving", "success", "error"
  const [isOpen, setIsOpen] = useState(false); // Controla si el diálogo está abierto o cerrado
  const [formData,setFormData]=useState({

    user: user?.id || null,
    date:date,
    task:"",
    fixed:false,
    bg:'',
    checked:'x',
    type:"usuario"
  })

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

  const handleSaveTask = async(event) => {
    event.preventDefault();
    // Si hubo un error previo, limpiamos el estado de error
      setStatus("idle");
    if (formData.task ) {
      setStatus("saving");
      await dispatch(date_task({ data: formData }));
    
    if (user.id) {
      await dispatch(date_getTask({ id: user.id, date }));
    }
    setStatus("idle");
  }else {
      setStatus("saving");
      setTimeout(() => setStatus("error"), 1000);
      // Mostrar error si hay campos vacíos
    }
  };

  return (
    <div className="flex dark:border-red-500 w-full justify-center">
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
 
          <Button className="text-white dark:text-black" type="submit" onClick={handleSaveTask} disabled={status === "saving"}>
            {status === "saving" ? "Guardando..." : "Guardar cambios"}
          </Button>

        {/* Indicador de estado */}
        {status === "error" && (
          <p className="text-red-500 mt-2">There was an error saving your profile. Please try again.</p>
        )}
    </div>
  );
}
