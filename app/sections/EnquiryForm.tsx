import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  courseInterest: z.string({ required_error: "Please select a course" }),
  location: z.string().min(2, { message: "Please enter your location" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const EnquiryForm = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      courseInterest: "",
      location: "",
      message: "",
    },
  });

  // const onSubmit = (data: FormValues) => {
  //   console.log("Form submitted:", data);
    
  //   // Using Formspree for form handling
  //   fetch("https://formspree.io/f/yourformid", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         toast({
  //           title: "Enquiry Submitted Successfully!",
  //           description: "We'll get back to you as soon as possible.",
  //           variant: "default",
  //         });
  //         form.reset();
  //       } else {
  //         throw new Error("Form submission failed");
  //       }
  //     })
  //     .catch((error) => {
  //       toast({
  //         title: "Submission Failed",
  //         description: "Please try again or contact us directly.",
  //         variant: "destructive",
  //       });
  //     });
  // };
  const onSubmit = (data: FormValues) => {
    const { name, email, phone, courseInterest, location, message } = data;
  
    const textMessage = `
  📝 *New Enquiry Received from FastAdmissionPortal!*
  
  👤 *Name:* ${name}
  📧 *Email:* ${email}
  📱 *Phone:* ${phone}
  🎓 *Interested In:* ${courseInterest}
  📍 *Location:* ${location}
  💬 *Message:* ${message || "No additional message."}
    `.trim();
  
    const encodedMessage = encodeURIComponent(textMessage);
    const yourWhatsAppNumber = "916200594193"; // Replace with your number (with country code)
  
    // Redirect to WhatsApp
    window.open(`https://wa.me/${yourWhatsAppNumber}?text=${encodedMessage}`, "_blank");
  
    // Optional toast
    toast({
      title: "Redirecting to WhatsApp...",
      description: "You will be redirected to WhatsApp to send your enquiry.",
    });
  
    form.reset();
  };
  
  return (
    <section id="enquiry" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            data-aos="fade-up"
          >
            Enquire Now
          </h2>
          <p 
            className="text-lg text-gray-600"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Take the first step towards a successful future. Fill the form below and our experts will guide you.
          </p>
        </div>

        <Card 
          className="max-w-2xl mx-auto border-none shadow-xl"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="courseInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interested In</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select course type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="medical">Medical</SelectItem>
                            <SelectItem value="law">Law</SelectItem>
                            <SelectItem value="management">Management</SelectItem>
                            <SelectItem value="abroad">Study Abroad</SelectItem>
                            <SelectItem value="other">Other Courses</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City/State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any specific questions or concerns..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Submit Enquiry <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
