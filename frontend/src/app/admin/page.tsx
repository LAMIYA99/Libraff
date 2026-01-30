import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function admin() {
  return (
    <>
      <div className="h-16 border-b border-border bg-card flex items-center justify-between px-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Salamdır, Admin!</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary">
          Yeni Kitab Əlavə Et
        </Button>
      </div>

      <div className="p-8 overflow-auto">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Son Sifarişlər
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground">
                    Sifariş ID
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground">
                    Müştəri
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground">
                    Cəmi
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground">
                    Tarix
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "#12345",
                    customer: "Əhməd Hüseynov",
                    total: "₼89.99",
                    status: "Tamamlandı",
                    date: "2026-01-28",
                  },
                  {
                    id: "#12344",
                    customer: "Fatimə Quliyeva",
                    total: "₼124.50",
                    status: "Qəbul edildi",
                    date: "2026-01-27",
                  },
                  {
                    id: "#12343",
                    customer: "Rəhim Məmmədov",
                    total: "₼45.99",
                    status: "Gəzitdə",
                    date: "2026-01-26",
                  },
                  {
                    id: "#12342",
                    customer: "Leyla Asgarova",
                    total: "₼199.99",
                    status: "Tamamlandı",
                    date: "2026-01-25",
                  },
                ].map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border hover:bg-muted"
                  >
                    <td className="py-3 px-4 text-foreground font-medium">
                      {order.id}
                    </td>
                    <td className="py-3 px-4 text-foreground">
                      {order.customer}
                    </td>
                    <td className="py-3 px-4 text-foreground">{order.total}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Tamamlandı"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Qəbul edildi"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
