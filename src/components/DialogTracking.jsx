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
import { date_tracking, resetSuccess} from "@/store/actions/dateActions";
import { Checkbox } from "@/components/ui/checkbox"

export function DialogTracking({ initialOpen = false,  title, description, fields, date, onSave}) {
  const user=useSelector(store=> store.userReducer.user)
  const [status, setStatus] = useState("idle"); // Posibles valores: "idle", "saving", "success", "error"
  const [isOpen, setIsOpen] = useState(false); // Controla si el diálogo está abierto o cerrado
  const [formData,setFormData]=useState({
  })
  useEffect(() => {
    if (user?.id) {
      setFormData((prevData) => ({
        ...prevData,
        user: user.id, // Actualiza el campo user
      }));
    }
  }, [user, status]);
  
  const dispatch=useDispatch()
  const { success, lastAction } = useSelector((store) => store.dateReducer);
  const trackingSuccess = success && lastAction === "date_tracking";

  const handleInput=(event)=>{
    const { name, value } = event.target; 
    setFormData({
      ...formData,
      [name]:value,
      date:date,
      user: user.id,
      type:"usuario"
    })
  }

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

  const handleSaveAgenda = (event) => {
    event.preventDefault();
    // Si hubo un error previo, limpiamos el estado de error
      setStatus("idle");

    if (formData.meassure ) {
      setStatus("saving");
      dispatch(date_tracking({ data: formData }));
      if (onSave) onSave(); 
    } else {
      setStatus("saving");
      setTimeout(() => setStatus("error"), 1000);
      // Mostrar error si hay campos vacíos
    }
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
            <div  key={key} className={key==='importance'?`flex text-black  dark:text-white grid-cols-4 items-center gap-4` :`grid  grid-cols-4 items-center gap-4`}>
              <Label htmlFor={key} className="flex self-start justify-center pt-3">
                {value}
              </Label>
                {key.toLowerCase() === "importance" ? (
                  
                  <div className="flex flex-col  h-32  gap-10">
                        <Input
                        id={key}
                        name={key}
                        onChange={handleInput}
                        className={`ml-2 w-24  align-center  items-center rounded-lg justify-center h-10 border ${colorSelected}`}
                      />
                        <div className="flex  items-center gap-2">
                        {colors.map((color) => (
                              <Checkbox
                                key={color}
                                data-name={color}
                                className={`flex items-center rounded-lg justify-center w-8 h-8  ${
                                  colorSelected === color ? colorMapping[color] : color
                                }` }
                              >
                                <span className="text-sm font-medium"></span>
                              </Checkbox>
                            ))
                          } 
                          </div>  
                    </div>
                ) : (
                  <Input
                    id={key}
                    name={key}
                    onChange={handleInput}
                    className="col-span-3 "
                  />
              )    
              } 
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
          <p className="text-red-500 mt-2">Hubo un error agregando el seguimiento por favor intentar nuevamente</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
