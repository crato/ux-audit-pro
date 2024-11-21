'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Switch } from "@/components/ui/switch";
import { Moon, Laptop, Sun } from "lucide-react";


const displayFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  fontSize: z.enum(["default", "compact", "large"], {
    required_error: "Please select a font size.",
  }),
  animationsEnabled: z.boolean().default(true),
  highContrastMode: z.boolean().default(false),
  sidebarCollapsed: z.boolean().default(false),
});

type DisplayFormValues = z.infer<typeof displayFormSchema>;

const defaultValues: Partial<DisplayFormValues> = {
  theme: "system",
  fontSize: "default",
  animationsEnabled: true,
  highContrastMode: false,
  sidebarCollapsed: false,
};

export default function DisplaySettings() {
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
  });

  function onSubmit(data: DisplayFormValues) {
    // TODO: Implement the display settings update
    toast({
      title: "Display settings updated",
      description: "Your display preferences have been updated successfully.",
    });
    console.log(data);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Display Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize your display preferences and interface settings.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Theme Selection */}
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-4"
                  >
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          <RadioGroupItem
                            value="light"
                            id="light"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="light"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Sun className="mb-2 h-6 w-6" />
                            Light
                          </Label>
                        </div>
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          <RadioGroupItem
                            value="dark"
                            id="dark"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="dark"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Moon className="mb-2 h-6 w-6" />
                            Dark
                          </Label>
                        </div>
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          <RadioGroupItem
                            value="system"
                            id="system"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="system"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Laptop className="mb-2 h-6 w-6" />
                            System
                          </Label>
                        </div>
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Font Size */}
          <FormField
            control={form.control}
            name="fontSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Font Size</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid max-w-md grid-cols-3 gap-4"
                  >
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          <RadioGroupItem
                            value="default"
                            id="default"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="default"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <span className="text-base">Aa</span>
                            Default
                          </Label>
                        </div>
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          <RadioGroupItem
                            value="compact"
                            id="compact"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="compact"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <span className="text-sm">Aa</span>
                            Compact
                          </Label>
                        </div>
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          <RadioGroupItem
                            value="large"
                            id="large"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="large"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <span className="text-lg">Aa</span>
                            Large
                          </Label>
                        </div>
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Select the font size for the interface.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Interface Options */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Interface Options</h4>
            
            <FormField
              control={form.control}
              name="animationsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Animations</FormLabel>
                    <FormDescription>
                      Enable animations and transitions.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="highContrastMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">High Contrast</FormLabel>
                    <FormDescription>
                      Increase contrast for better readability.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sidebarCollapsed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Collapsed Sidebar</FormLabel>
                    <FormDescription>
                      Use collapsed sidebar by default.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Save preferences</Button>
        </form>
      </Form>
    </div>
  );
}