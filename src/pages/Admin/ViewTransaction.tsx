/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Search, ChevronLeft, ChevronRight,
  Calendar, Filter, ArrowUpDown
} from "lucide-react";
import { TxQuery, useGetAllTransactionsQuery } from "@/redux/features/transaction/transactions.api";
import { ITransaction } from "@/types/transaction.type";

function useDebounced<T>(value: T, delay = 500) {
  const [v, setV] = useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

const fmtDateTime = (iso?: string) =>
  iso ? new Date(iso).toLocaleString() : "—";
const money = (n?: number) =>
  typeof n === "number" ? n.toFixed(2) : "0.00";

const typeOptions = [
  "ADDMONEY",
  "WITHDRAWMONEY",
  "SENDMONEY",
  "CASHIN",
  "CASHOUT",
] as const;

const ViewTransaction = () => {
  // filters / query state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");  // YYYY-MM-DD
  const [endDate, setEndDate] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [amountMin, setAmountMin] = useState<string>("");
  const [amountMax, setAmountMax] = useState<string>("");
  const [sortBy, setSortBy] = useState<TxQuery["sortBy"]>("createdAt");
  const [sortOrder, setSortOrder] = useState<TxQuery["sortOrder"]>("desc");

  const debouncedSearch = useDebounced(search);

  const queryArgs: TxQuery = useMemo(() => ({
    page,
    limit,
    search: debouncedSearch || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    type: type || undefined,
    amountMin: amountMin ? Number(amountMin) : undefined,
    amountMax: amountMax ? Number(amountMax) : undefined,
    sortBy,
    sortOrder,
  }), [page, limit, debouncedSearch, startDate, endDate, type, amountMin, amountMax, sortBy, sortOrder]);

  const { data, isLoading, isFetching, error } = useGetAllTransactionsQuery(queryArgs);

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const msg = error?.data?.message || "Failed to load transactions";
      toast.error(msg);
    }
  }, [error]);

  const total = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? Math.max(1, Math.ceil(total / Math.max(limit, 1)));

  const onReset = () => {
    setPage(1);
    setLimit(10);
    setSearch("");
    setStartDate("");
    setEndDate("");
    setType("");
    setAmountMin("");
    setAmountMax("");
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  const toggleSort = (key: TxQuery["sortBy"]) => {
    if (sortBy === key) {
      setSortOrder((s) => (s === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">View Transactions</h1>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search */}
            <div className="md:col-span-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sender/receiver/agent (name, email, phone)"
                  className="pl-8"
                  value={search}
                  onChange={(e) => { setPage(1); setSearch(e.target.value); }}
                />
              </div>
            </div>

            {/* Dates */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => { setPage(1); setStartDate(e.target.value); }}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => { setPage(1); setEndDate(e.target.value); }}
                />
              </div>
            </div>

            {/* Type */}
            <div className="md:col-span-2">
              <select
                className="w-full h-9 border rounded-md px-3 bg-background"
                value={type}
                onChange={(e) => { setPage(1); setType(e.target.value); }}
              >
                <option value="">All Types</option>
                {typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Amount range */}
            <div className="md:col-span-1">
              <Input
                type="number"
                placeholder="Min"
                value={amountMin}
                onChange={(e) => { setPage(1); setAmountMin(e.target.value); }}
              />
            </div>
            <div className="md:col-span-1">
              <Input
                type="number"
                placeholder="Max"
                value={amountMax}
                onChange={(e) => { setPage(1); setAmountMax(e.target.value); }}
              />
            </div>

            {/* Reset */}
            <div className="md:col-span-12 flex gap-2">
              <Button variant="ghost" onClick={onReset}>
                <Filter className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr className="text-left">
                  <th className="py-2.5 px-3">
                    <button className="inline-flex items-center gap-1" onClick={() => toggleSort("createdAt")}>
                      Date/Time <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </th>
                  <th className="py-2.5 px-3">
                    <button className="inline-flex items-center gap-1" onClick={() => toggleSort("type")}>
                      Type <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </th>
                  <th className="py-2.5 px-3">
                    <button className="inline-flex items-center gap-1" onClick={() => toggleSort("amount")}>
                      Amount <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </th>
                  <th className="py-2.5 px-3">Fee</th>
                  <th className="py-2.5 px-3">Commission</th>
                  <th className="py-2.5 px-3">Sender</th>
                  <th className="py-2.5 px-3">Receiver</th>
                  <th className="py-2.5 px-3">Agent</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={`sk-${i}`} className="border-t">
                      {Array.from({ length: 8 }).map((__, j) => (
                        <td key={`sk-${i}-${j}`} className="py-3 px-3">
                          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  data?.data?.map((t: ITransaction) => (
                    <tr key={t._id} className="border-t">
                      <td className="py-3 px-3">{fmtDateTime(t.createdAt)}</td>
                      <td className="py-3 px-3">{t.type}</td>
                      <td className="py-3 px-3 font-medium">{money(t.amount)}</td>
                      <td className="py-3 px-3">{money(t.fee)}</td>
                      <td className="py-3 px-3">{money(t.commission)}</td>
                      <td className="py-3 px-3">
                        {t.sender ? (
                          <div className="leading-tight">
                            <div className="font-medium">{t.sender.name ?? "—"}</div>
                            <div className="text-xs text-muted-foreground">
                              {t.sender.email ?? t.sender.phone ?? "—"}
                            </div>
                          </div>
                        ) : "—"}
                      </td>
                      <td className="py-3 px-3">
                        {t.receiver ? (
                          <div className="leading-tight">
                            <div className="font-medium">{t.receiver.name ?? "—"}</div>
                            <div className="text-xs text-muted-foreground">
                              {t.receiver.email ?? t.receiver.phone ?? "—"}
                            </div>
                          </div>
                        ) : "—"}
                      </td>
                      <td className="py-3 px-3">
                        {t.agent ? (
                          <div className="leading-tight">
                            <div className="font-medium">{t.agent.name ?? "—"}</div>
                            <div className="text-xs text-muted-foreground">
                              {t.agent.email ?? t.agent.phone ?? "—"}
                            </div>
                          </div>
                        ) : "—"}
                      </td>
                    </tr>
                  ))
                )}
                {!isLoading && (data?.data?.length ?? 0) === 0 && (
                  <tr className="border-t">
                    <td className="py-6 px-3 text-center text-muted-foreground" colSpan={8}>
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">{Math.min((page - 1) * limit + 1, total)}</span>{" "}
              to{" "}
              <span className="font-medium">{Math.min(page * limit, total)}</span>{" "}
              of <span className="font-medium">{total}</span>
            </div>
            <div className="flex gap-2">
              <select
                className="h-9 border rounded-md px-3 bg-background"
                value={limit}
                onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}
              >
                {[10, 20, 50, 100].map((n) => <option key={n} value={n}>{n}/page</option>)}
              </select>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || isFetching}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Prev
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages ?? 1, p + 1))}
                disabled={page >= (totalPages ?? 1) || isFetching}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewTransaction;
