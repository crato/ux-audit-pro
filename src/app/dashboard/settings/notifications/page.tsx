'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const notificationsFormSchema = z.object({
  communication_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(), // Required notification
  audit_updates: z.enum(["all", "mentions", "none"]),
  team_notifications: z.enum(["all", "important", "none"]),
  push_notifications: z.boolean().default(false).optional(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

// Default notification values
const defaultValues: Partial<NotificationsFormValues> = {
  communication_emails: true,
  marketing_emails: false,
  social_emails: true,
  security_emails: true,
  audit_updates: "all",
  team_notifications: "important",
  push_notifications: true,
};

export default function NotificationsSettings() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  function onSubmit(data: NotificationsFormValues) {
    // TODO: Implement API call to update notification settings
    toast({
      title: "Notifications updated",
      description: "Your notification preferences have been updated successfully.",
    });
    console.log(data);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Configure how and when you want to be notified.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8">
            {/* Email Notifications */}
            <div>
              <h4 className="text-sm font-medium">Email Notifications</h4>
              <div className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="communication_emails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Communication emails</FormLabel>
                        <FormDescription>
                          Receive emails about your account activity.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marketing_emails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Marketing emails</FormLabel>
                        <FormDescription>
                          Receive emails about new features and updates.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="security_emails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled
                          aria-label="Security emails cannot be disabled"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Security emails</FormLabel>
                        <FormDescription>
                          Receive emails about your account security.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Audit Update Preferences */}
            <div>
              <h4 className="text-sm font-medium mb-4">Audit Updates</h4>
              <FormField
                control={form.control}
                name="audit_updates"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audit update preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All updates</SelectItem>
                        <SelectItem value="mentions">Only mentions</SelectItem>
                        <SelectItem value="none">No updates</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose how you want to receive audit update notifications.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Team Notifications */}
            <div>
              <h4 className="text-sm font-medium mb-4">Team Notifications</h4>
              <FormField
                control={form.control}
                name="team_notifications"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team notification preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All team updates</SelectItem>
                        <SelectItem value="important">Important only</SelectItem>
                        <SelectItem value="none">No notifications</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Configure team-related notification preferences.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Push Notifications */}
            <div>
              <h4 className="text-sm font-medium mb-4">Push Notifications</h4>
              <FormField
                control={form.control}
                name="push_notifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Enable push notifications</FormLabel>
                      <FormDescription>
                        Receive push notifications in your browser.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit">Save preferences</Button>
        </form>
      </Form>
    </div>
  );
}