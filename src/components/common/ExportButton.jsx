import { useApp } from "../../context/AppContext";
import exportCSV from "../../utils/exportCSV";
import Button from "../ui/Button";

/**
 * Trigger to generate and download a CSV representation of the transaction ledger.
 */
export default function ExportButton() {
  const { transactions } = useApp();

  return (
    <Button
      onClick={() => exportCSV(transactions)}
      variant="secondary"
      className="flex h-10 items-center justify-center gap-2 rounded-xl"
      disabled={!transactions.length}
      aria-label="Export to CSV"
    >
      <span className="text-sm">📥</span>
      <span>Export</span>
    </Button>
  );
}