import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import AppointmentCard, { Appointment } from "./AppointmentCard";

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
];

interface AppointmentCalendarProps {
  selectedSpecialty: string;
}

const AppointmentCalendar = ({ selectedSpecialty }: AppointmentCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startDate = startOfWeek(currentDate);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const filteredAppointments = mockAppointments.filter(
    (apt) => selectedSpecialty === "all" || apt.specialty === selectedSpecialty
  );

  const getAppointmentsForDay = (date: Date) =>
    filteredAppointments.filter((apt) => isSameDay(apt.time, date));

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
            <div className="text-center mb-2">
              <div className="font-medium">{format(day, "EEE")}</div>
              <div className="text-sm text-gray-500">{format(day, "d")}</div>
            </div>
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