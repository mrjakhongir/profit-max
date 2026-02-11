import { cn } from "@/shared/lib/utilities";
import { paths } from "@/shared/routes";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { supabaseClient } from "@/supabase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormValues } from "../model/schema";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: LoginFormValues) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      form.setError("password", {
        type: "manual",
        message: error.message,
      });
      return;
    }

    navigate(paths.home, { replace: true });
  };
  return (
    <div className={"w-full max-w-xl"}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="example@gmail.com"
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : ""}
                />
                <FieldDescription
                  id="email-error"
                  className={cn(
                    "text-xs",
                    errors.email ? "visible" : "invisible",
                  )}
                >
                  {errors?.email?.message}
                </FieldDescription>
              </Field>

              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "password-error" : ""}
                  />

                  <Button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    variant="ghost"
                    size="icon-sm"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>

                <FieldDescription
                  id="password-error"
                  className={cn(
                    "text-xs",
                    errors.password ? "visible" : "invisible",
                  )}
                >
                  {errors?.password?.message}
                </FieldDescription>
              </Field>

              <Button type="submit" size="lg">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
