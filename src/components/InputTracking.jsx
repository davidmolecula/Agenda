import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { date_tracking, resetSuccess } from "@/store/actions/dateActions";
import { Checkbox } from "@/components/ui/checkbox";

export function InputTracking({ fields, date, onSave, task }) {
  const user = useSelector((store) => store.userReducer.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("idle"); // Posibles valores: "idle", "saving", "success", "error"
  const [formData, setFormData] = useState({});
  const [isOpen, setIsOpen] = useState(false); 
  const { success, lastAction } = useSelector((store) => store.dateReducer);
  const trackingSuccess = success && lastAction === "date_tracking";
console.log(task)
console.log(formData)

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      date: date,
      user: user.id,
      type: "usuario",
    });
  };

  useEffect(() => {
    if (user?.id) {
      setFormData((prevData) => ({
        ...prevData,
        user: user.id,
        task: task,
      }));
    }
  }, [user, status]);

  useEffect(() => {
    if (trackingSuccess) {
      setStatus("saving");
      setTimeout(() => setStatus("success"), 500);
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
        dispatch(resetSuccess()); // Limpia el estado global
      }, 500);
    } else if (lastAction === "date_tracking" && !success) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 500);
      dispatch(resetSuccess());
    }
  }, [lastAction, success, dispatch]);

  const handleSaveTracking = (event) => {
    event.preventDefault();
    setStatus("idle");
    if (formData.task==='Estudio'||formData.task==='Entrenamiento'||formData.task==='Hobbie') {
      setStatus("saving");
      dispatch(date_tracking({ data: formData }));
      if (onSave) onSave();
    } else {
      setStatus("saving");
      setTimeout(() => setStatus("error"), 1000);
    }
  };

  return (
    <>
      <div className="flex gap-3">
        {Object.entries(fields).map(([key, value]) => (
          <div
            key={key}
            className={
              key === "importance"
                ? `flex text-black dark:text-white  items-center h-fit gap-3`
                : `flex items-center h-fit gap-3`
            }
          >
            <Label htmlFor={key} className="">
              {value}
            </Label>
            
              <div className="flex">
                <Input id={key} name={key} onChange={handleInput} />
              </div>
            
          </div>
        ))}
        <Button
          className="text-white dark:text-black"
          type="submit"
          onClick={handleSaveTracking}
          disabled={status === "saving"}
        >
          {status === "saving" ? "Guardando..." : "Guardar cambios"}
        </Button>
        {status === "error" && (
          <p className="text-red-500 mt-2">
            Hubo un error agregando el seguimiento por favor intentar nuevamente
          </p>
        )}
      </div>
    </>
  );
}
