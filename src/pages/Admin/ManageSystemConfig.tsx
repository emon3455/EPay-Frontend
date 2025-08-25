/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  useGetSystemConfigQuery,
  useUpdateSystemConfigMutation,
} from "@/redux/features/systemConfig/systemConfig.api";
import { toast } from "sonner";
import { Pencil, Save, X, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ISystemConfig } from "@/types/systemConfig.type";

const schema = z.object({
  agentCashInRate: z.coerce.number().min(0, "Must be ≥ 0"),
  agentCashOutRate: z.coerce.number().min(0, "Must be ≥ 0"),
  userSendMoneyRate: z.coerce.number().min(0, "Must be ≥ 0"),
  userWithdrawRate: z.coerce.number().min(0, "Must be ≥ 0"),
});

type FormValues = z.infer<typeof schema>;

const resolver: Resolver<FormValues> = zodResolver(schema);

const FieldRow = ({
  id,
  label,
  disabled,
  register,
  error,
  step = "0.01",
}: {
  id: keyof FormValues;
  label: string;
  disabled: boolean;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  error?: string;
  step?: string;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
    <Label htmlFor={id} className="text-sm md:text-base">
      {label}
    </Label>
    <div className="md:col-span-2">
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="number"
          step={step}
          min={0}
          disabled={disabled}
          {...register(id)}
        />
        {/* optional little helper to remind about decimals */}
        <span className="text-xs text-muted-foreground">decimal (e.g. 0.03)</span>
      </div>
      {error ? <p className="text-red-600 text-xs mt-1">{error}</p> : null}
    </div>
  </div>
);

const ReadRow = ({
  label,
  value,
}: {
  label: string;
  value: number | string | undefined;
}) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value ?? "—"}</span>
  </div>
);

const formatDateTime = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString();
};

// % formatter for read-only view
const pct = (v?: number) =>
  v == null ? "—" : `${(v * 100).toFixed(2).replace(/\.00$/, "")}%`;

const diffPayload = (initial: FormValues, current: FormValues) => {
  const out: Partial<ISystemConfig> = {};
  (Object.keys(initial) as (keyof FormValues)[]).forEach((k) => {
    if (initial[k] !== current[k]) {
      (out as any)[k] = current[k];
    }
  });
  return out;
};

const ManageSystemConfig = () => {
  const { data, isLoading, isFetching, refetch } = useGetSystemConfigQuery();
  const [mutate, { isLoading: isSaving }] = useUpdateSystemConfigMutation();
  const [editing, setEditing] = useState(false);

  const defaultValues: FormValues | undefined = useMemo(() => {
    if (!data) return undefined;
    return {
      agentCashInRate: data.agentCashInRate,
      agentCashOutRate: data.agentCashOutRate,
      userSendMoneyRate: data.userSendMoneyRate,
      userWithdrawRate: data.userWithdrawRate,
    };
  }, [data]);

  const form = useForm<FormValues>({
    resolver,
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues, { keepDefaultValues: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(defaultValues)]);

  const currentValues = form.watch();
  const hasChanges = React.useMemo(() => {
    if (!defaultValues) return false;
    return JSON.stringify(currentValues) !== JSON.stringify(defaultValues);
  }, [currentValues, defaultValues]);

  const onEdit = () => setEditing(true);

  const onCancel = () => {
    if (defaultValues) form.reset(defaultValues);
    setEditing(false);
  };

  const onSubmit = async (values: FormValues) => {
    if (!defaultValues) return;
    const payload = diffPayload(defaultValues, values);

    if (Object.keys(payload).length === 0) {
      toast.info("No changes to save.");
      setEditing(false);
      return;
    }

    try {
      await mutate(payload).unwrap();
      toast.success("System configuration updated.");
      setEditing(false);
    } catch (err: any) {
      const msg =
        err?.data?.message || err?.message || "Failed to update configuration.";
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 flex flex-col justify-center items-center h-full">
      <div className="w-full flex items-center justify-between gap-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          Manage System Configuration
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching || isLoading}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          {!editing ? (
            <Button onClick={onEdit} disabled={isLoading || !data}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={onCancel} disabled={isSaving}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSaving || !hasChanges || !form.formState.isValid}
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      <Card className="shadow-sm w-full">
        <CardHeader>
          <CardTitle>Current Rates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Loading skeleton */}
          {isLoading && !data ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-10 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
            </div>
          ) : null}

          {/* Read-only view (shows percentages) */}
          {!editing && data ? (
            <div className="space-y-2">
              <ReadRow label="Agent Cash-In Rate" value={pct(data.agentCashInRate)} />
              <Separator />
              <ReadRow label="Agent Cash-Out Rate" value={pct(data.agentCashOutRate)} />
              <Separator />
              <ReadRow label="User Send Money Rate" value={pct(data.userSendMoneyRate)} />
              <Separator />
              <ReadRow label="User Withdraw Rate" value={pct(data.userWithdrawRate)} />
              <Separator />
              <div className="text-xs text-muted-foreground">
                <div>
                  Config ID: <span className="font-mono">{data._id}</span>
                </div>
                <div>Updated: {formatDateTime(data.updatedAt)}</div>
                <div>Created: {formatDateTime(data.createdAt)}</div>
              </div>
            </div>
          ) : null}

          {/* Editable form (decimal inputs) */}
          {editing && (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn("space-y-5", isSaving && "opacity-90")}
            >
              <FieldRow
                id="agentCashInRate"
                label="Agent Cash-In Rate"
                disabled={isSaving}
                register={form.register}
                error={form.formState.errors.agentCashInRate?.message}
              />
              <FieldRow
                id="agentCashOutRate"
                label="Agent Cash-Out Rate"
                disabled={isSaving}
                register={form.register}
                error={form.formState.errors.agentCashOutRate?.message}
              />
              <FieldRow
                id="userSendMoneyRate"
                label="User Send Money Rate"
                disabled={isSaving}
                register={form.register}
                error={form.formState.errors.userSendMoneyRate?.message}
              />
              <FieldRow
                id="userWithdrawRate"
                label="User Withdraw Rate"
                disabled={isSaving}
                register={form.register}
                error={form.formState.errors.userWithdrawRate?.message}
              />

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onCancel}
                  disabled={isSaving}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving || !hasChanges || !form.formState.isValid}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSystemConfig;
