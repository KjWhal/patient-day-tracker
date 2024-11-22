import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import AppointmentCard, { Appointment } from "./AppointmentCard";
import { cn } from "@/lib/utils";

// Mock data - in a real app this would come from an API
const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    specialty: "general",
    time: new Date(2024, 2, 20, 9, 0),
    duration: 30,
  },
  {
    id: "2",
    patientName: "Jane Smith",
    doctorName: "Dr. Johnson",
    specialty: "cardiology",
    time: new Date(2024, 2, 20, 10, 0),
    duration: 45,
  },
  {
    id: "3",
    patientName: "Bob Wilson",
    doctorName: "Dr. Davis",
    specialty: "pediatrics",
    time: new Date(2024, 2, 21, 14, 0),
    duration: 30,
  },
  {
    id: "4",
    patientName: "Sarah Johnson",
    doctorName: "Dr. Brown",
    specialty: "dermatology",
    time: new Date(2024, 2, 22, 11, 30),
    duration: 45,
  },
  {
    id: "5",
    patientName: "Michael Chen",
    doctorName: "Dr. Smith",
    specialty: "general",
    time: new Date(2024, 2, 22, 15, 0),
    duration: 30,
  },
  {
    id: "6",
    patientName: "Emily White",
    doctorName: "Dr. Johnson",
    specialty: "cardiology",
    time: new Date(2024, 2, 23, 9, 30),
    duration: 60,
  },
  {
    id: "7",
    patientName: "David Lee",
    doctorName: "Dr. Davis",
    specialty: "pediatrics",
    time: new Date(2024, 2, 23, 13, 0),
    duration: 30,
  },
  {
    id: "8",
    patientName: "Lisa Anderson",
    doctorName: "Dr. Brown",
    specialty: "dermatology",
    time: new Date(2024, 2, 24, 10, 0),
    duration: 45,
  },
  {
    id: "9",
    patientName: "Tom Wilson",
    doctorName: "Dr. Smith",
    specialty: "general",
    time: new Date(2024, 2, 24, 14, 30),
    duration: 30,
  },
  {
    id: "10",
    patientName: "Maria Garcia",
    doctorName: "Dr. Johnson",
    specialty: "cardiology",
    time: new Date(2024, 2, 25, 11, 0),
    duration: 45,
  }
];

interface AppointmentCalendarProps {
  selectedSpecialty: string;
}

const AppointmentCalendar = ({ selectedSpecialty }: AppointmentCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const startDate = startOfWeek(currentDate);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const filteredAppointments = mockAppointments.filter(
    (apt) =>
      (selectedSpecialty === "all" || apt.specialty === selectedSpecialty) &&
      (!selectedDay || isSameDay(apt.time, selectedDay))
  );

  const getAppointmentsForDay = (date: Date) =>
    filteredAppointments.filter((apt) => isSameDay(apt.time, date));

  const handleDayClick = (date: Date) => {
    setSelectedDay(isSameDay(date, selectedDay as Date) ? null : date);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Week of {format(startDate, "MMM d, yyyy")}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDate(addDays(currentDate, -7))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <div key={day.toISOString()}>
            <Button
              variant="ghost"
              className={cn(
                "w-full mb-2 hover:bg-primary/10",
                selectedDay && isSameDay(day, selectedDay) && "bg-primary/20"
              )}
              onClick={() => handleDayClick(day)}
            >
              <div className="text-center">
                <div className="font-medium">{format(day, "EEE")}</div>
                <div className="text-sm text-gray-500">{format(day, "d")}</div>
              </div>
            </Button>
            <div className="space-y-2">
              {getAppointmentsForDay(day).map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AppointmentCalendar;