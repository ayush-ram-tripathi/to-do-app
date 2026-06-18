"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  customerAddress: z.string().min(5, "Address must be at least 5 characters"),
  serviceId: z.string().min(1, "Please select a service"),
  trainerId: z.string().min(1, "Please select a trainer"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  goals: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const steps = [
  { id: 1, title: "Your Details" },
  { id: 2, title: "Choose Service" },
  { id: 3, title: "Choose Trainer" },
  { id: 4, title: "Date & Time" },
  { id: 5, title: "Goals" },
];

export function MultiStepForm({ services, trainers }: { services: any[], trainers: any[] }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, trigger, setValue, watch } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange"
  });

  const watchServiceId = watch("serviceId");
  const watchTrainerId = watch("trainerId");

  const handleNext = async () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = await trigger(["customerName", "customerEmail", "customerPhone", "customerAddress"]);
    } else if (currentStep === 2) {
      isValid = await trigger(["serviceId"]);
    } else if (currentStep === 3) {
      isValid = await trigger(["trainerId"]);
    } else if (currentStep === 4) {
      isValid = await trigger(["date", "time"]);
    }
    
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit booking");

      setIsSuccess(true);
      toast.success("Booking submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto p-12 text-center shadow-lg border-0 bg-slate-50">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
        <h2 className="text-3xl font-bold mb-4 text-slate-800">Booking Requested!</h2>
        <p className="text-slate-600 mb-8 text-lg">
          Thank you for choosing Pure Lifestyle Yoga. We have received your request and will contact you shortly to confirm your session.
        </p>
        <Button onClick={() => window.location.href = "/"} className="rounded-full px-8">Return Home</Button>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-800 -z-10 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                currentStep >= step.id ? "bg-slate-800 text-white" : "bg-white text-slate-400 border-2 border-slate-200"
              }`}>
                {step.id}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${currentStep >= step.id ? "text-slate-800" : "text-slate-400"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Card className="border-0 shadow-xl overflow-hidden rounded-2xl">
        <div className="bg-slate-800 p-6 sm:p-10 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold">{steps[currentStep - 1].title}</h2>
          <p className="text-slate-300 mt-2">Please fill in the details below to proceed.</p>
        </div>
        <CardContent className="p-6 sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Step 1: Customer Info */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Full Name</Label>
                    <Input id="customerName" {...register("customerName")} placeholder="John Doe" className="h-12" />
                    {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Phone Number</Label>
                    <Input id="customerPhone" {...register("customerPhone")} placeholder="+91 9876543210" className="h-12" />
                    {errors.customerPhone && <p className="text-red-500 text-sm">{errors.customerPhone.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email Address</Label>
                  <Input id="customerEmail" type="email" {...register("customerEmail")} placeholder="john@example.com" className="h-12" />
                  {errors.customerEmail && <p className="text-red-500 text-sm">{errors.customerEmail.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerAddress">Home Address (for sessions)</Label>
                  <Textarea id="customerAddress" {...register("customerAddress")} placeholder="Your full address..." className="min-h-[100px]" />
                  {errors.customerAddress && <p className="text-red-500 text-sm">{errors.customerAddress.message}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Service Selection */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid gap-4">
                  {services.map((service) => (
                    <div 
                      key={service.id}
                      onClick={() => setValue("serviceId", service.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 flex justify-between items-center ${
                        watchServiceId === service.id ? "border-slate-800 bg-slate-50" : "border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <h4 className="font-semibold text-lg">{service.name}</h4>
                        <p className="text-sm text-slate-500">{service.duration} mins</p>
                      </div>
                      <div className="font-bold text-lg">₹{service.price}</div>
                    </div>
                  ))}
                  <input type="hidden" {...register("serviceId")} />
                  {errors.serviceId && <p className="text-red-500 text-sm">{errors.serviceId.message}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Trainer Selection */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid sm:grid-cols-2 gap-4">
                  {trainers.map((trainer) => (
                    <div 
                      key={trainer.id}
                      onClick={() => setValue("trainerId", trainer.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 text-center space-y-2 ${
                        watchTrainerId === trainer.id ? "border-slate-800 bg-slate-50" : "border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4" />
                      <h4 className="font-semibold text-lg">{trainer.name}</h4>
                      <p className="text-sm text-slate-500">{trainer.specialization}</p>
                      <div className="flex items-center justify-center text-sm text-amber-500 font-medium">
                        ★ {trainer.rating}
                      </div>
                    </div>
                  ))}
                  <input type="hidden" {...register("trainerId")} />
                  {errors.trainerId && <p className="text-red-500 text-sm">{errors.trainerId.message}</p>}
                </div>
              </div>
            )}

            {/* Step 4: Date & Time */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" type="date" {...register("date")} className="h-12" min={new Date().toISOString().split('T')[0]} />
                  {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Preferred Time</Label>
                  <Select onValueChange={(val) => setValue("time", val)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00 AM">06:00 AM - Early Morning</SelectItem>
                      <SelectItem value="08:00 AM">08:00 AM - Morning</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM - Late Morning</SelectItem>
                      <SelectItem value="05:00 PM">05:00 PM - Evening</SelectItem>
                      <SelectItem value="07:00 PM">07:00 PM - Late Evening</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...register("time")} />
                  {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                </div>
              </div>
            )}

            {/* Step 5: Goals & Notes */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                  <Label htmlFor="goals">What are your primary goals? (Optional)</Label>
                  <Textarea id="goals" {...register("goals")} placeholder="E.g. Weight loss, stress relief, flexibility..." className="min-h-[100px]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Any medical conditions or notes? (Optional)</Label>
                  <Textarea id="notes" {...register("notes")} placeholder="E.g. Lower back pain, pregnancy..." className="min-h-[100px]" />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={handlePrev} className="rounded-full px-8">
                  Back
                </Button>
              ) : (
                <div /> // Empty div to keep 'Next' button on the right
              )}
              
              {currentStep < steps.length ? (
                <Button type="button" onClick={handleNext} className="rounded-full px-8 bg-slate-800 hover:bg-slate-700">
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="rounded-full px-8 bg-emerald-600 hover:bg-emerald-700">
                  {isSubmitting ? "Submitting..." : "Confirm Booking"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
