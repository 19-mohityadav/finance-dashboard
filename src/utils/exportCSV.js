export default function exportCSV(transactions) {
    if (!transactions.length) return;

    const header = ["Date,Category,Amount,Type"];
    const rows = transactions.map(
        (transaction) =>
            `${transaction.date},"${transaction.category}","₹${transaction.amount}",${transaction.type}`
    );

    const csv = [...header, ...rows].join("\n");
    // Prefix with \uFEFF to act as a BOM (Byte Order Mark), forcing Excel to treat contents as UTF-8
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const exactDate = new Date().toISOString().split("T")[0];

    const link = document.createElement("a");
    link.href = url;
    link.download = `transactions_${exactDate}.csv`;
    link.click();

    URL.revokeObjectURL(url);
}