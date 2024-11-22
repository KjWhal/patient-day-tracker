import { useState } from "react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <Card className={`p-4 hover:shadow-lg transition-shadow ${isOpen ? 'bg-accent/50' : ''}`}>
          <div className="flex justify-between items-start">
            <div className="flex-1 text-left">
              <h3 className="font-semibold truncate">{appointment.patientName}</h3>
              <p className="text-sm text-gray-600 truncate">{appointment.doctorName}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-primary">
                {format(appointment.time, "h:mm a")}
              </span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>
          </div>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent className="animate-accordion-down">
        <Card className="p-4 mt-1 bg-background/50">
          <div className="space-y-2 text-left">
            <div className="grid grid-cols-2 gap-2">
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
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="text-sm">{appointment.duration} minutes</p>
              </div>
            </div>
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AppointmentCard;