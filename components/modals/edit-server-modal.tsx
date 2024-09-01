"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { FileUpload } from "@/components/file-upload";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStoreModal } from "@/hooks/use-modal-store";
import { useEffect } from "react";

// form schema
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required!",
  }),
  imageUrl: z.string().min(1, {
    message: "Server Image is required!",
  }),
});

const EditServerModal = () => {
  const { isOpen, onClose, type, data } = useStoreModal();
  const router = useRouter();
  const { server } = data;
  const isModalOpen = isOpen && type === "editServer";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  useEffect(() => {
    if (server) {
      form.setValue("name", server.name);
      form.setValue("imageUrl", server.imageUrl);
    }
  }, [server, form]);
  // extract loading state from form
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/servers/${server?.id}`, values);
      toast.success(`Server Update ${values.name}`);
      form.reset();
      router.refresh();
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleCloseModal = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 font-bold">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          {/* going to use handleForm  from {...form} 
         and we have also pass by the values onSubmit
         */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <FileUpload
                            endpoint="serverImage"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold
                     text-zinc-500 dark:text-secondary/70"
                    >
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0
                     focus-visible:ring-0 text-black 
                     focus-visible:ring-offset-0
                     "
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditServerModal;
