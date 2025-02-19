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
  const user=useSelector(store=> store.userReducer.user)
  const agenda=useSelector(store=>store.dateReducer.agenda)
  const [status, setStatus] = useState("idle"); // Posibles valores: "idle", "saving", "success", "error"
  const [isOpen, setIsOpen] = useState(false); // Controla si el diálogo está abierto o cerrado
  const [colorSelected,setColorSelected]=useState("")
  const [formData,setFormData]=useState({
    name:"",
    description:"",
    importance:"",
    date:{},
    color:"bg-indigo-500",
    user:user.id,
  })
  useEffect(() => {
    if (user?.id) {
      setFormData((prevData) => ({
        ...prevData,
        user: user.id, // Actualiza el campo user
      }));
    }
  }, [user]);
  const colors = [
  'bg-red-500',      // Alerta
  'bg-yellow-400',   // Fecha importante
  'bg-indigo-500',   // Base principal
  'bg-purple-400',   // Evento especial
  'bg-blue-400',     // Evento neutro
  'bg-green-400',    // Evento positivo
];
  const colorMapping = {
    'bg-red-500': 'bg-red-700',      // Alerta
    'bg-yellow-400': 'bg-yellow-600',// Fecha importante
    'bg-indigo-500': 'bg-indigo-700',// Base principal
    'bg-purple-400': 'bg-purple-600',// Evento especial
    'bg-blue-400': 'bg-blue-600',    // Evento neutro
    'bg-green-400': 'bg-green-600',  // Evento positivo
  };
  const dispatch=useDispatch()
  const { success, lastAction } = useSelector((store) => store.dateReducer);
  const agendaSuccess = success && lastAction === "date_agenda";

  const handleInput=(event)=>{
    const { name, value } = event.target; 
    setFormData({
      ...formData,
      [name]:value,
      date:date,
      color:colorSelected,
      user: user.id
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
      console.log(formData)
    } else {
      setStatus("saving");
      setTimeout(() => setStatus("error"), 1000);
      // Mostrar error si hay campos vacíos
    }
  };

  const handleChecked = (event) => {
    const selectedColor = event.target.getAttribute("data-name");
    setColorSelected((prevColor) => 
      prevColor === selectedColor ? "" : selectedColor
    );

    setFormData({
      ...formData,
      color:selectedColor
    });
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
          {Object.entries(fields).map(([key,value]) => (
            <div  key={key} className={key==='importance'?`flex grid-cols-4 items-center gap-4` :`grid  grid-cols-4 items-center gap-4`}>
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
                                onClick={handleChecked}
                                checked={colorSelected === color}
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
          <Button type="submit" onClick={handleSaveAgenda} disabled={status === "saving"}>
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
