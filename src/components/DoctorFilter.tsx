import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const specialties = [
  { id: "all", name: "All Specialties" },
  { id: "general", name: "General Practice" },
  { id: "cardiology", name: "Cardiology" },
  { id: "pediatrics", name: "Pediatrics" },
  { id: "dermatology", name: "Dermatology" },
];

interface DoctorFilterProps {
  selectedSpecialty: string;
  onSpecialtyChange: (specialty: string) => void;
}

const DoctorFilter = ({ selectedSpecialty, onSpecialtyChange }: DoctorFilterProps) => {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Filter by Specialty</h2>
      <div className="space-y-2">
        {specialties.map((specialty) => (
          <Button
            key={specialty.id}
            variant={selectedSpecialty === specialty.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => onSpecialtyChange(specialty.id)}
          >
            {specialty.name}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default DoctorFilter;