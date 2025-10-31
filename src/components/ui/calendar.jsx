"use client";
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker"
import { es } from "date-fns/locale/es";
import { cn } from "/src/lib/utils"
import { buttonVariants } from "/src/components/ui/button.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@radix-ui/react-select";
import { format, setMonth } from "date-fns";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    (<DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-linear-to-bl! from-indigo-500! to-indigo-700!", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 ",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        dropdown_buttons:"bg-black",
        caption_dropdowns:"flex overflow-hidden  [&>*:first]:hidden relative z-50 justify-center pt-0 [&>div]:absolute [&>div]:z-100 [&>div]:mt-10 [&>div]:pl-3 [&>div]:pr-3 [&>div]:opacity-100 [&>div]:bg-white dark:[&>div]:bg-transparent   gap-1 [&>button]:relative  [&>button]:border [&>button]:m-1 [&>button:nth-child(3):hover]:bg-white [&>button:nth-child(3):hover]:text-black [&>button:nth-child(2):hover]:bg-white [&>button:nth-child(2):hover]:text-black [&>button]:px-3  *:rounded ",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center rounded-md text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 rounded-r border border-black shadow-2xl font-normal aria-selected:opacity- hover:bg-pink-400"
        ),
        day_range_end: "day-range-end",
        day_selected:
          " text-white dark:text-black  hover:text-primary-foreground hover:bg-pink-400 bg-pink-500 focus:text-white!",
        day_today: "dark:bg-white bg-black text-white dark:text-black focus:text-white",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        Dropdown: (props)  => {
          const {fromDate,fromMonth,fromYear,toDate,toMonth,toYear}=useDayPicker()
          const {goToMonth,currentMonth}=useNavigation()
        if(props.name==="months"){
          const selectItems= Array.from({length:12},(_,i)=>({
            value:i.toString(),
            label:format(setMonth(new Date(),i),"MMMMMM",{locale:es}),
          }))
          return (
          <Select onValueChange={(newValue)=>{
            const newDate=new Date(currentMonth)
            newDate.setMonth(parseInt(newValue))
            goToMonth(newDate)
          }} 
            value={props.value?.toString()}>
            <SelectTrigger>{format(currentMonth,"MMMMMM",{locale: es})}</SelectTrigger>
            <SelectContent>
              {selectItems.map((selectItem) => (
                <SelectItem key={selectItem.value} value={selectItem.value}>
                  {selectItem.label}
                </SelectItem>
              ))}
          </SelectContent>
          </Select>
          )
        }else if(props.name==="years"){
          const earliestYear=fromYear || fromMonth?.getFullYear() || fromDate?.getFullYear()
          const latestYear=toYear || toMonth?.getFullYear() || toDate?.getFullYear()
          let selectItems=[]  
          if(earliestYear&&latestYear){
            const yearsLength= latestYear-earliestYear+1 
            selectItems=Array.from({length:yearsLength},(_,i)=>({
              label:(earliestYear+i).toString(),
              value:(earliestYear+i).toString(),
            }))
          }
          return (
            <Select onValueChange={(newValue)=>{
              const newDate=currentMonth
              newDate.setFullYear(parseInt(newValue))
              goToMonth(newDate)
            }} value={props.value?.toString()}>
              <SelectTrigger>{currentMonth.getFullYear()} ↓</SelectTrigger>
              <SelectContent>
                {selectItems.map((selectItem)=>(
                  <SelectItem key={selectItem.value} value={selectItem.value}>
                    {selectItem.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            )
        }},
      }}
      {...props} />)
  );
}
Calendar.displayName = "Calendar"

export { Calendar }
