
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSuccess } from "@/store/actions/dateActions";

export default function useEffectRepeated() {
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
}