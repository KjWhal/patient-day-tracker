import { Card } from "@/components/ui/card";
import { format } from "date-fns";

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
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold">{appointment.patientName}</h3>
          <p className="text-sm text-gray-600">{appointment.doctorName}</p>
        </div>
        <span className="text-sm font-medium text-primary">
          {format(appointment.time, "h:mm a")}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        <p>{appointment.specialty}</p>
        <p>{appointment.duration} minutes</p>
      </div>
    </Card>
  );
};

export default AppointmentCard;