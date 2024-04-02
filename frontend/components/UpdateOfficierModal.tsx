import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CalendarIcon } from "@radix-ui/react-icons";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

import { cn } from "@/lib/utils";
import useUpdateOfficerModal from "@/hooks/useUpdateOfficerModal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "قم بإدخال الاسم",
  }),
  status: z.string().min(1, {
    message: "قم بإدخال التمام",
  }),
  militaryUnit: z.string().min(1, {
    message: "قم بإدخال الوحدة",
  }),
  lastArrivalDate: z.date({
    required_error: "قم باختيار تاريخ أخر عودة",
  }),
  durationSinceLastArrivalDate: z.number(),
});

export async function UpdateOfficierModal({
  officierId,
}: {
  officierId?: string;
}) {
  const router = useRouter();
  if (!officierId) {
    return;
  }
  const officier = (await axios.get(`/users/${officierId}`)) as User;

  const { isOpen, onClose } = useUpdateOfficerModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: officier.name,
      militaryUnit: officier.militaryUnit,
      status: officier.status,
      durationSinceLastArrivalDate: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      await axios.post(`/api/users/${officierId}`, values);
      toast.success("تم الحفظ بنجاح");
      router.refresh();
      form.reset();
      onClose();
    } catch (error) {}
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            تعديل بيانات الضابط
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-2">
                  <FormLabel>الاسم</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className=""
                      placeholder="ادخل الاسم"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="militaryUnit"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-2">
                  <FormLabel>الوحدة</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className=""
                      placeholder="ادخل الوحدة"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-2">
                  <FormLabel>التمام</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className=""
                      placeholder="ادخل التمام"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastArrivalDate"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-2">
                  <FormLabel>تاريخ أخر عودة</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>اختار التاريخ</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        locale={ar}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription>
              يتم حساب مدة التاجد بناء على تاريخ أخر عودة
            </FormDescription>
            <DialogFooter className="px-6 py-4">
              <Button disabled={isLoading}>حفظ</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
