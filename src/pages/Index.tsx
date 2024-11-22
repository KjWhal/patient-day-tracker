import { useState } from "react";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import DoctorFilter from "@/components/DoctorFilter";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const { toast } = useToast();

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialty(specialty);
    toast({
      title: "Filter Updated",
      description: `Now showing ${specialty === "all" ? "all appointments" : specialty + " appointments"}`,
    });
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Patient Appointments
        </h1>
        <div className="grid gap-6 md:grid-cols-[300px,1fr]">
          <DoctorFilter
            selectedSpecialty={selectedSpecialty}
            onSpecialtyChange={handleSpecialtyChange}
          />
          <AppointmentCalendar selectedSpecialty={selectedSpecialty} />
        </div>
      </div>
    </div>
  );
};

export default Index;