import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useState } from "react";

export function SchedulingModal({ 
  isOpen, 
  onClose,
  onConfirm 
}: { 
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");

  const availableTimes = [
    "08:00", "09:00", "10:00", "11:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const services = [
    "Construção de Laje",
    "Alvenaria/Levantamento de Parede",
    "Reboco e Acabamento",
    "Pintura",
    "Reforma Geral",
    "Consultoria/Orçamento"
  ];

  const handleConfirm = () => {
    if (date && selectedTime && selectedService) {
      onConfirm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Agendar Serviço com Carlos Silva</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Service Type Selection */}
          <div>
            <label className="text-sm mb-2 block">Tipo de Serviço *</label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo de serviço" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div>
            <label className="text-sm mb-2 block">Selecione a Data *</label>
            <div className="flex justify-center border rounded-lg p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                disabled={(date) => date < new Date() || date.getDay() === 0}
              />
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label className="text-sm mb-2 block">Horários Disponíveis *</label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`
                    py-3 px-4 rounded-lg border transition-all
                    ${selectedTime === time 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-white hover:border-primary hover:bg-primary/5'
                    }
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          {date && selectedTime && selectedService && (
            <div className="bg-[#F8FAFC] p-4 rounded-lg border border-primary/20">
              <h4 className="text-sm mb-2">Resumo do Agendamento</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><strong>Serviço:</strong> {selectedService}</p>
                <p><strong>Data:</strong> {date.toLocaleDateString('pt-BR')}</p>
                <p><strong>Horário:</strong> {selectedTime}</p>
                <p><strong>Profissional:</strong> Carlos Silva</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!date || !selectedTime || !selectedService}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Confirmar Agendamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
