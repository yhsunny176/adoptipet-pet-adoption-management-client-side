import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";

const DateField = ({ value, onChange, placeholder }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="justify-between font-normal outline-0 border-gray-border py-6 rounded-lg w-full text-gray-dark bg-base-white">
                        {value ? (value instanceof Date ? value.toLocaleDateString() : value) : `${placeholder}`}
                        <CalendarIcon className="ml-2 h-4 w-4 text-blue-regular" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0 mt-3 outline-0 border-card-border-prim bg-base-white"
                    align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            onChange(date);
                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DateField;
