export default function exportCSV(transactions) {
    if (!transactions.length) return;

    const header = ["Date,Category,Amount,Type"];
    const rows = transactions.map(
        (transaction) =>
            `${transaction.date},${transaction.category},${transaction.amount},${transaction.type}`
    );

    const csv = [...header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();

    URL.revokeObjectURL(url);
}