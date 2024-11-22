import { useState } from "react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  time: Date;
  duration: number;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card 
        className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold truncate">{appointment.patientName}</h3>
            <p className="text-sm text-gray-600 truncate">{appointment.doctorName}</p>
          </div>
          <span className="text-sm font-medium text-primary">
            {format(appointment.time, "h:mm a")}
          </span>
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Patient</p>
                <p className="text-sm">{appointment.patientName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Doctor</p>
                <p className="text-sm">{appointment.doctorName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Specialty</p>
                <p className="text-sm capitalize">{appointment.specialty}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Time</p>
                <p className="text-sm">{format(appointment.time, "h:mm a")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="text-sm">{appointment.duration} minutes</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-sm">{format(appointment.time, "MMM d, yyyy")}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentCard;